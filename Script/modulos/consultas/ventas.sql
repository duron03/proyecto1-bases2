USE [WideWorldImporters];
GO

-- Sinónimos utilizados por el módulo de ventas.
IF OBJECT_ID('dbo.src_Factura', 'SN') IS NULL
    EXEC('CREATE SYNONYM dbo.src_Factura FOR Sales.Invoices;');
GO

IF OBJECT_ID('dbo.src_DetalleFactura', 'SN') IS NULL
    EXEC('CREATE SYNONYM dbo.src_DetalleFactura FOR Sales.InvoiceLines;');
GO

IF OBJECT_ID('dbo.src_Cliente', 'SN') IS NULL
    EXEC('CREATE SYNONYM dbo.src_Cliente FOR Sales.Customers;');
GO

IF OBJECT_ID('dbo.src_MetodoEntrega', 'SN') IS NULL
    EXEC('CREATE SYNONYM dbo.src_MetodoEntrega FOR Application.DeliveryMethods;');
GO

IF OBJECT_ID('dbo.src_Persona', 'SN') IS NULL
    EXEC('CREATE SYNONYM dbo.src_Persona FOR Application.People;');
GO

IF OBJECT_ID('dbo.src_Producto', 'SN') IS NULL
    EXEC('CREATE SYNONYM dbo.src_Producto FOR Warehouse.StockItems;');
GO

-- Lista las ventas. Los filtros son opcionales y se pueden combinar.
CREATE OR ALTER PROCEDURE dbo.usp_Ventas_Listar
    @CustomerName nvarchar(100) = NULL,
    @InvoiceDateFrom date = NULL,
    @InvoiceDateTo date = NULL,
    @MinimumInvoiceAmount decimal(18, 2) = NULL,
    @MaximumInvoiceAmount decimal(18, 2) = NULL,
    @DeliveryMethodID int = NULL
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        SELECT
            I.InvoiceID,
            I.InvoiceDate,
            C.CustomerID,
            C.CustomerName,
            DM.DeliveryMethodID,
            DM.DeliveryMethodName,
            SUM(IL.ExtendedPrice) AS InvoiceAmount
        FROM dbo.src_Factura AS I
        INNER JOIN dbo.src_Cliente AS C
            ON I.CustomerID = C.CustomerID
        INNER JOIN dbo.src_MetodoEntrega AS DM
            ON I.DeliveryMethodID = DM.DeliveryMethodID
        INNER JOIN dbo.src_DetalleFactura AS IL
            ON I.InvoiceID = IL.InvoiceID
        WHERE (@CustomerName IS NULL
            OR C.CustomerName LIKE '%' + @CustomerName + '%')
            AND (@InvoiceDateFrom IS NULL OR I.InvoiceDate >= @InvoiceDateFrom)
            AND (@InvoiceDateTo IS NULL OR I.InvoiceDate <= @InvoiceDateTo)
            AND (@DeliveryMethodID IS NULL
            OR I.DeliveryMethodID = @DeliveryMethodID)
        GROUP BY
            I.InvoiceID,
            I.InvoiceDate,
            C.CustomerID,
            C.CustomerName,
            DM.DeliveryMethodID,
            DM.DeliveryMethodName
        HAVING (@MinimumInvoiceAmount IS NULL
            OR SUM(IL.ExtendedPrice) >= @MinimumInvoiceAmount)
            AND (@MaximumInvoiceAmount IS NULL
            OR SUM(IL.ExtendedPrice) <= @MaximumInvoiceAmount)
        ORDER BY C.CustomerName ASC;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        THROW;
    END CATCH;
END;
GO

-- Muestra una factura, devuelve primero el encabezado y después el detalle.
CREATE OR ALTER PROCEDURE dbo.usp_Ventas_ObtenerDetalle
    @InvoiceID int
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Encabezado de la factura.
        SELECT
            I.InvoiceID,
            C.CustomerID,
            C.CustomerName,
            C.WebsiteURL AS CustomerWebsiteURL,
            DM.DeliveryMethodName,
            I.CustomerPurchaseOrderNumber,
            CP.FullName AS ContactPerson,
            SP.FullName AS SalesPerson,
            I.InvoiceDate,
            I.DeliveryInstructions
        FROM dbo.src_Factura AS I
        INNER JOIN dbo.src_Cliente AS C
            ON I.CustomerID = C.CustomerID
        INNER JOIN dbo.src_MetodoEntrega AS DM
            ON I.DeliveryMethodID = DM.DeliveryMethodID
        INNER JOIN dbo.src_Persona AS CP
            ON I.ContactPersonID = CP.PersonID
        INNER JOIN dbo.src_Persona AS SP
            ON I.SalespersonPersonID = SP.PersonID
        WHERE I.InvoiceID = @InvoiceID;

        -- Detalle de la factura.
        SELECT
            IL.InvoiceLineID,
            SI.StockItemID,
            SI.StockItemName,
            IL.Quantity,
            IL.UnitPrice,
            IL.TaxRate,
            IL.TaxAmount,
            IL.ExtendedPrice
        FROM dbo.src_DetalleFactura AS IL
        INNER JOIN dbo.src_Producto AS SI
            ON IL.StockItemID = SI.StockItemID
        WHERE IL.InvoiceID = @InvoiceID
        ORDER BY IL.InvoiceLineID ASC;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        THROW;
    END CATCH;
END;
GO
