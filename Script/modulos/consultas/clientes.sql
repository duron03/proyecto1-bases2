USE [WideWorldImporters];
GO

-- Sinónimos utilizados por el módulo de clientes.
IF OBJECT_ID('dbo.src_Cliente', 'SN') IS NULL
    EXEC('CREATE SYNONYM dbo.src_Cliente FOR Sales.Customers;');
GO

IF OBJECT_ID('dbo.src_CategoriaCliente', 'SN') IS NULL
    EXEC('CREATE SYNONYM dbo.src_CategoriaCliente FOR Sales.CustomerCategories;');
GO

IF OBJECT_ID('dbo.src_GrupoCompra', 'SN') IS NULL
    EXEC('CREATE SYNONYM dbo.src_GrupoCompra FOR Sales.BuyingGroups;');
GO

IF OBJECT_ID('dbo.src_Persona', 'SN') IS NULL
    EXEC('CREATE SYNONYM dbo.src_Persona FOR Application.People;');
GO

IF OBJECT_ID('dbo.src_MetodoEntrega', 'SN') IS NULL
    EXEC('CREATE SYNONYM dbo.src_MetodoEntrega FOR Application.DeliveryMethods;');
GO

IF OBJECT_ID('dbo.src_Ciudad', 'SN') IS NULL
    EXEC('CREATE SYNONYM dbo.src_Ciudad FOR Application.Cities;');
GO

-- Lista los clientes. Los filtros son opcionales y se pueden combinar.
CREATE OR ALTER PROCEDURE dbo.usp_Clientes_Listar
    @CustomerName nvarchar(100) = NULL,
    @CustomerCategoryID int = NULL,
    @DeliveryMethodID int = NULL
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        SELECT
            C.CustomerID,
            C.CustomerName,
            CC.CustomerCategoryID,
            CC.CustomerCategoryName,
            DM.DeliveryMethodID,
            DM.DeliveryMethodName
        FROM dbo.src_Cliente AS C
        INNER JOIN dbo.src_CategoriaCliente AS CC
            ON C.CustomerCategoryID = CC.CustomerCategoryID
        INNER JOIN dbo.src_MetodoEntrega AS DM
            ON C.DeliveryMethodID = DM.DeliveryMethodID
        WHERE (@CustomerName IS NULL
               OR C.CustomerName LIKE '%' + @CustomerName + '%')
          AND (@CustomerCategoryID IS NULL
               OR C.CustomerCategoryID = @CustomerCategoryID)
          AND (@DeliveryMethodID IS NULL
               OR C.DeliveryMethodID = @DeliveryMethodID)
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

-- Muestra todos los datos de un cliente.
CREATE OR ALTER PROCEDURE dbo.usp_Clientes_ObtenerDetalle
    @CustomerID int
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        SELECT
            C.CustomerID,
            C.CustomerName,
            CC.CustomerCategoryName,
            BG.BuyingGroupName,
            P1.FullName AS PrimaryContactPerson,
            P2.FullName AS AlternateContactPerson,
            C1.CustomerID AS BillToCustomerID,
            C1.CustomerName AS BillToCustomerName,
            DM.DeliveryMethodName,
            DC.CityName AS DeliveryCityName,
            C.DeliveryPostalCode,
            C.PhoneNumber,
            C.FaxNumber,
            C.PaymentDays,
            C.WebsiteURL,
            CONCAT(
                'Delivery: ', C.DeliveryAddressLine1, ' ', C.DeliveryAddressLine2,
                ' - ', C.DeliveryPostalCode,
                '; Postal: ', C.PostalAddressLine1, ' ', C.PostalAddressLine2,
                ' - ', C.PostalPostalCode
            ) AS [Address],
            C.DeliveryLocation,
            C.DeliveryLocation.Lat AS DeliveryLatitude,
            C.DeliveryLocation.Long AS DeliveryLongitude
        FROM dbo.src_Cliente AS C
        INNER JOIN dbo.src_CategoriaCliente AS CC
            ON C.CustomerCategoryID = CC.CustomerCategoryID
        LEFT JOIN dbo.src_GrupoCompra AS BG
            ON C.BuyingGroupID = BG.BuyingGroupID
        INNER JOIN dbo.src_Persona AS P1
            ON C.PrimaryContactPersonID = P1.PersonID
        LEFT JOIN dbo.src_Persona AS P2
            ON C.AlternateContactPersonID = P2.PersonID
        INNER JOIN dbo.src_Cliente AS C1
            ON C.BillToCustomerID = C1.CustomerID
        INNER JOIN dbo.src_MetodoEntrega AS DM
            ON C.DeliveryMethodID = DM.DeliveryMethodID
        INNER JOIN dbo.src_Ciudad AS DC
            ON C.DeliveryCityID = DC.CityID
        WHERE C.CustomerID = @CustomerID;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        THROW;
    END CATCH;
END;
GO
