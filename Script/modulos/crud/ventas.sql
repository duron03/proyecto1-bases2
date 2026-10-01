USE [WideWorldImporters];
GO

-- Sinónimos utilizados por el CRUD de ventas.
IF OBJECT_ID('dbo.src_Factura', 'SN') IS NULL
    EXEC('CREATE SYNONYM dbo.src_Factura FOR Sales.Invoices;');
GO

IF OBJECT_ID('dbo.src_DetalleFactura', 'SN') IS NULL
    EXEC('CREATE SYNONYM dbo.src_DetalleFactura FOR Sales.InvoiceLines;');
GO

-- Crea el encabezado de una venta.
CREATE OR ALTER PROCEDURE dbo.usp_Ventas_Crear
    @CustomerID int,
    @BillToCustomerID int,
    @DeliveryMethodID int,
    @ContactPersonID int,
    @AccountsPersonID int,
    @SalespersonPersonID int,
    @PackedByPersonID int,
    @InvoiceDate date,
    @LastEditedBy int,
    @OrderID int = NULL,
    @CustomerPurchaseOrderNumber nvarchar(20) = NULL,
    @IsCreditNote bit = 0,
    @CreditNoteReason nvarchar(max) = NULL,
    @Comments nvarchar(max) = NULL,
    @DeliveryInstructions nvarchar(max) = NULL,
    @InternalComments nvarchar(max) = NULL,
    @TotalDryItems int = 0,
    @TotalChillerItems int = 0,
    @DeliveryRun nvarchar(5) = NULL,
    @RunPosition nvarchar(5) = NULL,
    @ReturnedDeliveryData nvarchar(max) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        DECLARE @NewInvoiceID int = NEXT VALUE FOR Sequences.InvoiceID;

        INSERT INTO dbo.src_Factura
        (
            InvoiceID,
            CustomerID,
            BillToCustomerID,
            OrderID,
            DeliveryMethodID,
            ContactPersonID,
            AccountsPersonID,
            SalespersonPersonID,
            PackedByPersonID,
            InvoiceDate,
            CustomerPurchaseOrderNumber,
            IsCreditNote,
            CreditNoteReason,
            Comments,
            DeliveryInstructions,
            InternalComments,
            TotalDryItems,
            TotalChillerItems,
            DeliveryRun,
            RunPosition,
            ReturnedDeliveryData,
            LastEditedBy
        )
        VALUES
        (
            @NewInvoiceID,
            @CustomerID,
            @BillToCustomerID,
            @OrderID,
            @DeliveryMethodID,
            @ContactPersonID,
            @AccountsPersonID,
            @SalespersonPersonID,
            @PackedByPersonID,
            @InvoiceDate,
            @CustomerPurchaseOrderNumber,
            @IsCreditNote,
            @CreditNoteReason,
            @Comments,
            @DeliveryInstructions,
            @InternalComments,
            @TotalDryItems,
            @TotalChillerItems,
            @DeliveryRun,
            @RunPosition,
            @ReturnedDeliveryData,
            @LastEditedBy
        );

        SELECT @NewInvoiceID AS InvoiceID;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        THROW;
    END CATCH;
END;
GO

-- Actualiza todos los datos editables del encabezado de una venta.
CREATE OR ALTER PROCEDURE dbo.usp_Ventas_Actualizar
    @InvoiceID int,
    @CustomerID int,
    @BillToCustomerID int,
    @DeliveryMethodID int,
    @ContactPersonID int,
    @AccountsPersonID int,
    @SalespersonPersonID int,
    @PackedByPersonID int,
    @InvoiceDate date,
    @LastEditedBy int,
    @OrderID int = NULL,
    @CustomerPurchaseOrderNumber nvarchar(20) = NULL,
    @IsCreditNote bit = 0,
    @CreditNoteReason nvarchar(max) = NULL,
    @Comments nvarchar(max) = NULL,
    @DeliveryInstructions nvarchar(max) = NULL,
    @InternalComments nvarchar(max) = NULL,
    @TotalDryItems int = 0,
    @TotalChillerItems int = 0,
    @DeliveryRun nvarchar(5) = NULL,
    @RunPosition nvarchar(5) = NULL,
    @ReturnedDeliveryData nvarchar(max) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE dbo.src_Factura
        SET CustomerID = @CustomerID,
            BillToCustomerID = @BillToCustomerID,
            OrderID = @OrderID,
            DeliveryMethodID = @DeliveryMethodID,
            ContactPersonID = @ContactPersonID,
            AccountsPersonID = @AccountsPersonID,
            SalespersonPersonID = @SalespersonPersonID,
            PackedByPersonID = @PackedByPersonID,
            InvoiceDate = @InvoiceDate,
            CustomerPurchaseOrderNumber = @CustomerPurchaseOrderNumber,
            IsCreditNote = @IsCreditNote,
            CreditNoteReason = @CreditNoteReason,
            Comments = @Comments,
            DeliveryInstructions = @DeliveryInstructions,
            InternalComments = @InternalComments,
            TotalDryItems = @TotalDryItems,
            TotalChillerItems = @TotalChillerItems,
            DeliveryRun = @DeliveryRun,
            RunPosition = @RunPosition,
            ReturnedDeliveryData = @ReturnedDeliveryData,
            LastEditedBy = @LastEditedBy,
            LastEditedWhen = SYSDATETIME()
        WHERE InvoiceID = @InvoiceID;

        IF @@ROWCOUNT = 0
            THROW 50301, 'La venta no existe.', 1;

        SELECT @InvoiceID AS InvoiceID;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        THROW;
    END CATCH;
END;
GO

-- Agrega una línea al detalle de la venta.
CREATE OR ALTER PROCEDURE dbo.usp_Ventas_AgregarDetalle
    @InvoiceID int,
    @StockItemID int,
    @Description nvarchar(100),
    @PackageTypeID int,
    @Quantity int,
    @UnitPrice decimal(18, 2),
    @TaxRate decimal(18, 3),
    @TaxAmount decimal(18, 2),
    @LineProfit decimal(18, 2),
    @ExtendedPrice decimal(18, 2),
    @LastEditedBy int
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        DECLARE @NewInvoiceLineID int = NEXT VALUE FOR Sequences.InvoiceLineID;

        INSERT INTO dbo.src_DetalleFactura
        (
            InvoiceLineID,
            InvoiceID,
            StockItemID,
            Description,
            PackageTypeID,
            Quantity,
            UnitPrice,
            TaxRate,
            TaxAmount,
            LineProfit,
            ExtendedPrice,
            LastEditedBy
        )
        VALUES
        (
            @NewInvoiceLineID,
            @InvoiceID,
            @StockItemID,
            @Description,
            @PackageTypeID,
            @Quantity,
            @UnitPrice,
            @TaxRate,
            @TaxAmount,
            @LineProfit,
            @ExtendedPrice,
            @LastEditedBy
        );

        SELECT @NewInvoiceLineID AS InvoiceLineID;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        THROW;
    END CATCH;
END;
GO

-- Actualiza una línea del detalle de la venta.
CREATE OR ALTER PROCEDURE dbo.usp_Ventas_ActualizarDetalle
    @InvoiceLineID int,
    @InvoiceID int,
    @StockItemID int,
    @Description nvarchar(100),
    @PackageTypeID int,
    @Quantity int,
    @UnitPrice decimal(18, 2),
    @TaxRate decimal(18, 3),
    @TaxAmount decimal(18, 2),
    @LineProfit decimal(18, 2),
    @ExtendedPrice decimal(18, 2),
    @LastEditedBy int
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE dbo.src_DetalleFactura
        SET InvoiceID = @InvoiceID,
            StockItemID = @StockItemID,
            Description = @Description,
            PackageTypeID = @PackageTypeID,
            Quantity = @Quantity,
            UnitPrice = @UnitPrice,
            TaxRate = @TaxRate,
            TaxAmount = @TaxAmount,
            LineProfit = @LineProfit,
            ExtendedPrice = @ExtendedPrice,
            LastEditedBy = @LastEditedBy,
            LastEditedWhen = SYSDATETIME()
        WHERE InvoiceLineID = @InvoiceLineID;

        IF @@ROWCOUNT = 0
            THROW 50302, 'La linea de venta no existe.', 1;

        SELECT @InvoiceLineID AS InvoiceLineID;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        THROW;
    END CATCH;
END;
GO

-- Elimina una línea de la venta.
CREATE OR ALTER PROCEDURE dbo.usp_Ventas_EliminarDetalle
    @InvoiceLineID int
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        DELETE FROM dbo.src_DetalleFactura
        WHERE InvoiceLineID = @InvoiceLineID;

        IF @@ROWCOUNT = 0
            THROW 50302, 'La linea de venta no existe.', 1;

        SELECT @InvoiceLineID AS InvoiceLineID;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        THROW;
    END CATCH;
END;
GO

-- Elimina primero las líneas y después el encabezado de la venta.
CREATE OR ALTER PROCEDURE dbo.usp_Ventas_Eliminar
    @InvoiceID int
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        DELETE FROM dbo.src_DetalleFactura
        WHERE InvoiceID = @InvoiceID;

        DELETE FROM dbo.src_Factura
        WHERE InvoiceID = @InvoiceID;

        IF @@ROWCOUNT = 0
            THROW 50301, 'La venta no existe.', 1;

        SELECT @InvoiceID AS InvoiceID;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        THROW;
    END CATCH;
END;
GO
