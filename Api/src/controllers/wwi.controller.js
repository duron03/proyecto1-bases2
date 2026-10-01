import { getConnection, sql } from '../database/connection.js';

// ==================== Peticiones GET ==================== //

// Clientes.
export const getCustomers = async (req, res) => {
    try {
        const { CustomerName } = req.body;
        const { CustomerCategoryID } = req.body;
        const { DeliveryMethodID } = req.body;

        const pool = await getConnection();

        const result = await pool.request()
        .input('CustomerName', CustomerName)
        .input('CustomerCategoryID', CustomerCategoryID)
        .input('DeliveryMethodID', DeliveryMethodID)
        .execute('dbo.usp_Clientes_Listar');

        res.json(result.recordset);

    } catch (error) {
        console.error('Error founded:', error);
        res.status(500).json({ error: error.message });
    }
};

export const getCustomerDetails = async (req, res) => {
    try {
        const { CustomerID } = req.params;

        const pool = await getConnection();

        const result = await pool.request()
        .input('CustomerID', CustomerID)
        .execute('dbo.usp_Clientes_ObtenerDetalle');

        res.json(result.recordset);

    } catch (error) {
        console.error('Error founded:', error);
        res.status(500).json({ error: error.message });
    }
};

// Inventarios.
export const getInventories = async (req, res) => {
    try {
        const { StockItemName } = req.body;
        const { StockGroupID }  = req.body;
        const { MinimumQuantityOnHand }  = req.body;
        const { MaximumQuantityOnHand } = req.body;

        const pool = await getConnection();

        const result = await pool.request()
        .input('StockItemName', StockItemName)
        .input('StockGroupID', StockGroupID)
        .input('MinimumQuantityOnHand', MinimumQuantityOnHand)
        .input('MaximumQuantityOnHand', MaximumQuantityOnHand)
        .execute('dbo.usp_Inventarios_Listar');

        res.json(result.recordset);

    } catch (error) {
        console.error('Error founded:', error);
        res.status(500).json({ error: error.message });
    }
};

export const getInventoryDetails = async (req, res) => {
    try {
        const { StockItemID } = req.params;

        const pool = await getConnection();

        const result = await pool.request()
        .input('StockItemID', StockItemID)
        .execute('dbo.usp_Inventarios_ObtenerDetalle');

        res.json(result.recordset);

    } catch (error) {
        console.error('Error founded:', error);
        res.status(500).json({ error: error.message });
    }
};

// Proveedores.
export const getSuppliers = async (req, res) => {
    try {
        const { SupplierName } = req.body;
        const { SupplierCategoryID } = req.body;
        const { DeliveryMethodID } = req.body;

        const pool = await getConnection();

        const result = await pool.request()
        .input('SupplierName', SupplierName)
        .input('SupplierCategoryID', SupplierCategoryID)
        .input('DeliveryMethodID', DeliveryMethodID)
        .execute('dbo.usp_Proveedores_Listar');

        res.json(result.recordset);

    } catch (error) {
        console.error('Error founded: ', error);
        res.status(500).json({ error: error.message });
    }
};

export const getSupplierDetails = async (req, res) => {
    try {
        const { SupplierID } = req.params;

        const pool = await getConnection();

        const result = await pool.request()
        .input('SupplierID', SupplierID)
        .execute('dbo.usp_Proveedores_ObtenerDetalle');

        res.json(result.recordset);

    } catch (error) {
        console.error('Error founded', error);
        res.status(500).json({ error: error.message });
    }
};

// Ventas.
export const getInvoices = async (req, res) => {
    try {
        const { CustomerName } = req.body;
        const { InvoiceDateFrom } = req.body;
        const { InvoiceDateTo } = req.body;
        const { MinimumInvoiceAmount } = req.body;
        const { MaximumInvoiceAmount } = req.body;
        const { DeliveryMethodID } = req.body;

        const pool = await getConnection();

        const result = await pool.request()
        .input('CustomerName', CustomerName)
        .input('InvoiceDateFrom', InvoiceDateFrom)
        .input('InvoiceDateTo', InvoiceDateTo)
        .input('MinimumInvoiceAmount', MinimumInvoiceAmount)
        .input('MaximumInvoiceAmount', MaximumInvoiceAmount)
        .input('DeliveryMethodID', DeliveryMethodID)
        .execute('dbo.usp_Ventas_Listar');

        res.json(result.recordset);
        
    } catch (error) {
        console.error('Error founded: ', error);
        res.status(500).json({ error: error.message });
    }
};

export const getInvoiceDetails = async (req, res) => {
    try {
        const { InvoiceID } = req.params;

        const pool = await getConnection();

        const result = await pool.request()
        .input('InvoiceID', InvoiceID)
        .execute('dbo.usp_Ventas_ObtenerDetalle');

        res.json(result.recordset);

    } catch (error) {
        console.error('Error founded: ', error);
        res.status(500).json({ error: error.message });
    }
};

// ======================================================== //

// ==================== Peticiones POST ==================== //

// Clientes.
export const createCustomer = async (req, res) => {
    try {
        const { CustomerName } = req.body;
        const { CustomerCategoryID } = req.body;
        const { PrimaryContactPersonID } = req.body;
        const { DeliveryMethodID } = req.body;
        const { DeliveryCityID } = req.body;
        const { PostalCityID } = req.body;
        const { AccountOpenedDate } = req.body;
        const { StandardDiscountPercentage } = req.body;
        const { IsStatementSent } = req.body;
        const { IsOnCreditHold } = req.body;
        const { PaymentDays } = req.body;
        const { PhoneNumber } = req.body;
        const { FaxNumber } = req.body;
        const { WebsiteURL } = req.body;
        const { DeliveryAddressLine1 } = req.body;
        const { DeliveryPostalCode } = req.body;
        const { PostalAddressLine1 } = req.body;
        const { PostalPostalCode } = req.body;
        const { LastEditedBy } = req.body;
        const { BillToCustomerID } = req.body;
        const { BuyingGroupID } = req.body;
        const { AlternateContactPersonID } = req.body;
        const { CreditLimit } = req.body;
        const { DeliveryRun } = req.body;
        const { RunPosition } = req.body;
        const { DeliveryAddressLine2 } = req.body;
        const { DeliveryLatitude } = req.body;
        const { DeliveryLongitude } = req.body;
        const { PostalAddressLine2 } = req.body;

        const pool = await getConnection();

        const result = await pool.request()
        .input('CustomerName', CustomerName)
        .input('CustomerCategoryID', CustomerCategoryID)
        .input('PrimaryContactPersonID', PrimaryContactPersonID)
        .input('DeliveryMethodID', DeliveryMethodID)
        .input('DeliveryCityID', DeliveryCityID)
        .input('PostalCityID', PostalCityID)
        .input('AccountOpenedDate', AccountOpenedDate)
        .input('StandardDiscountPercentage', StandardDiscountPercentage)
        .input('IsStatementSent', IsStatementSent)
        .input('IsOnCreditHold', IsOnCreditHold)
        .input('PaymentDays', PaymentDays)
        .input('PhoneNumber', PhoneNumber)
        .input('FaxNumber', FaxNumber)
        .input('WebsiteURL', WebsiteURL)
        .input('DeliveryAddressLine1', DeliveryAddressLine1)
        .input('DeliveryPostalCode', DeliveryPostalCode)
        .input('PostalAddressLine1', PostalAddressLine1)
        .input('PostalPostalCode', PostalPostalCode)
        .input('LastEditedBy', LastEditedBy)
        .input('BillToCustomerID', BillToCustomerID)
        .input('BuyingGroupID', BuyingGroupID)
        .input('AlternateContactPersonID', AlternateContactPersonID)
        .input('CreditLimit', CreditLimit)
        .input('DeliveryRun', DeliveryRun)
        .input('RunPosition', RunPosition)
        .input('DeliveryAddressLine2', DeliveryAddressLine2)
        .input('DeliveryLatitude', DeliveryLatitude)
        .input('DeliveryLongitude', DeliveryLongitude)
        .input('PostalAddressLine2', PostalAddressLine2)
        .execute('dbo.usp_Clientes_Crear');

        res.json({
            message: 'Registry created',
            newId: result.recordset[0].CustomerID
        });

    } catch (error) {
        console.error('Error founded: ', error);
        res.status(500).json({ error: error.message });
    }
};

// Inventarios.
export const createInventory = async (req, res) => {
    try {
        const { StockItemName } = req.body;
        const { SupplierID } = req.body;
        const { UnitPackageID } = req.body;
        const { OuterPackageID } = req.body;
        const { LeadTimeDays } = req.body;
        const { QuantityPerOuter } = req.body;
        const { IsChillerStock } = req.body;
        const { TaxRate } = req.body;
        const { UnitPrice } = req.body;
        const { TypicalWeightPerUnit } = req.body;
        const { QuantityOnHand } = req.body;
        const { BinLocation } = req.body;
        const { LastStocktakeQuantity } = req.body;
        const { LastCostPrice } = req.body;
        const { ReorderLevel } = req.body;
        const { TargetStockLevel } = req.body;
        const { LastEditedBy } = req.body;
        const { ColorID } = req.body;
        const { Brand } = req.body;
        const { Size } = req.body;
        const { Barcode } = req.body;
        const { RecommendedRetailPrice } = req.body;
        const { MarketingComments } = req.body;
        const { InternalComments } = req.body;
        const { Photo } = req.body;
        const { CustomFields } = req.body;
        const { StockGroupID } = req.body;

        // Casting del objeto Photo para evitar errores de tipo en la columna
        const PhotoData = Photo ? Buffer.from(Photo, 'base64') : null;

        const pool = await getConnection();

        const result = await pool.request()
        .input('StockItemName', StockItemName)
        .input('SupplierID', SupplierID)
        .input('UnitPackageID', UnitPackageID)
        .input('OuterPackageID', OuterPackageID)
        .input('LeadTimeDays', LeadTimeDays)
        .input('QuantityPerOuter', QuantityPerOuter)
        .input('IsChillerStock', IsChillerStock)
        .input('TaxRate', TaxRate)
        .input('UnitPrice', UnitPrice)
        .input('TypicalWeightPerUnit', TypicalWeightPerUnit)
        .input('QuantityOnHand', QuantityOnHand)
        .input('BinLocation', BinLocation)
        .input('LastStocktakeQuantity', LastStocktakeQuantity)
        .input('LastCostPrice', LastCostPrice)
        .input('ReorderLevel', ReorderLevel)
        .input('TargetStockLevel', TargetStockLevel)
        .input('LastEditedBy', LastEditedBy)
        .input('ColorID', ColorID)
        .input('Brand', Brand)
        .input('Size', Size)
        .input('Barcode', Barcode)
        .input('RecommendedRetailPrice', RecommendedRetailPrice)
        .input('MarketingComments', MarketingComments)
        .input('InternalComments', InternalComments)
        .input('Photo', sql.VarBinary(sql.MAX), PhotoData)
        .input('CustomFields', CustomFields)
        .input('StockGroupID', StockGroupID)
        .execute('dbo.usp_Inventarios_Crear');

        res.json({
            message: 'Registry created',
            newId: result.recordset[0].StockItemID
        });

    } catch (error) {
        console.error('Error founded: ', error);
        res.status(500).json({ error: error.message });
    }
};

// Proveedores.
export const createSupplier = async (req, res) => {
    try {
        const { SupplierName } = req.body;
        const { SupplierCategoryID } = req.body;
        const { PrimaryContactPersonID } = req.body;
        const { AlternateContactPersonID } = req.body;
        const { DeliveryCityID } = req.body;
        const { PostalCityID } = req.body;
        const { PaymentDays } = req.body;
        const { PhoneNumber } = req.body;
        const { FaxNumber } = req.body;
        const { WebsiteURL } = req.body;
        const { DeliveryAddressLine1 } = req.body;
        const { DeliveryPostalCode } = req.body;
        const { PostalAddressLine1 } = req.body;
        const { PostalPostalCode } = req.body;
        const { LastEditedBy } = req.body;
        const { DeliveryMethodID } = req.body;
        const { SupplierReference } = req.body;
        const { BankAccountName } = req.body;
        const { BankAccountBranch } = req.body;
        const { BankAccountCode } = req.body;
        const { BankAccountNumber } = req.body;
        const { BankInternationalCode } = req.body;
        const { InternalComments } = req.body;
        const { DeliveryAddressLine2 } = req.body;
        const { DeliveryLatitude } = req.body;
        const { DeliveryLongitude } = req.body;
        const { PostalAddressLine2 } = req.body;

        const pool = await getConnection();

        const result = await pool.request()
        .input('SupplierName', SupplierName)
        .input('SupplierCategoryID', SupplierCategoryID)
        .input('PrimaryContactPersonID', PrimaryContactPersonID)
        .input('AlternateContactPersonID', AlternateContactPersonID)
        .input('DeliveryCityID', DeliveryCityID)
        .input('PostalCityID', PostalCityID)
        .input('PaymentDays', PaymentDays)
        .input('PhoneNumber', PhoneNumber)
        .input('FaxNumber', FaxNumber)
        .input('WebsiteURL', WebsiteURL)
        .input('DeliveryAddressLine1', DeliveryAddressLine1)
        .input('DeliveryPostalCode', DeliveryPostalCode)
        .input('PostalAddressLine1', PostalAddressLine1)
        .input('PostalPostalCode', PostalPostalCode)
        .input('LastEditedBy', LastEditedBy)
        .input('DeliveryMethodID', DeliveryMethodID)
        .input('SupplierReference', SupplierReference)
        .input('BankAccountName', BankAccountName)
        .input('BankAccountBranch', BankAccountBranch)
        .input('BankAccountCode', BankAccountCode)
        .input('BankAccountNumber', BankAccountNumber)
        .input('BankInternationalCode', BankInternationalCode)
        .input('InternalComments', InternalComments)
        .input('DeliveryAddressLine2', DeliveryAddressLine2)
        .input('DeliveryLatitude', DeliveryLatitude)
        .input('DeliveryLongitude', DeliveryLongitude)
        .input('PostalAddressLine2', PostalAddressLine2)
        .execute('dbo.usp_Proveedores_Crear');

        res.json({
            message: 'Registry created',
            newId: result.recordset[0].SupplierID
        });

    } catch (error) {
        console.error('Error founded: ', error);
        res.status(500).json({ error: error.message });
    }
};

// Ventas.
export const createSale = async (req, res) => {
    try {
        const { CustomerID } = req.body;
        const { BillToCustomerID } = req.body;
        const { DeliveryMethodID } = req.body;
        const { ContactPersonID } = req.body;
        const { AccountsPersonID } = req.body;
        const { SalespersonPersonID } = req.body;
        const { PackedByPersonID } = req.body;
        const { InvoiceDate } = req.body;
        const { LastEditedBy } = req.body;
        const { OrderID } = req.body;
        const { CustomerPurchaseOrderNumber } = req.body;
        const { IsCreditNote = 0 } = req.body;
        const { CreditNoteReason } = req.body;
        const { Comments } = req.body;
        const { DeliveryInstructions } = req.body;
        const { InternalComments } = req.body;
        const { TotalDryItems = 0 } = req.body;
        const { TotalChillerItems = 0 } = req.body;
        const { DeliveryRun } = req.body;
        const { RunPosition } = req.body;
        const { ReturnedDeliveryData } = req.body;

        const pool = await getConnection();

        const result = await pool.request()
        .input('CustomerID', CustomerID)
        .input('BillToCustomerID', BillToCustomerID)
        .input('DeliveryMethodID', DeliveryMethodID)
        .input('ContactPersonID', ContactPersonID)
        .input('AccountsPersonID', AccountsPersonID)
        .input('SalespersonPersonID', SalespersonPersonID)
        .input('PackedByPersonID', PackedByPersonID)
        .input('InvoiceDate', InvoiceDate)
        .input('LastEditedBy', LastEditedBy)
        .input('OrderID', OrderID)
        .input('CustomerPurchaseOrderNumber', CustomerPurchaseOrderNumber)
        .input('IsCreditNote', IsCreditNote)
        .input('CreditNoteReason', CreditNoteReason)
        .input('Comments', Comments)
        .input('DeliveryInstructions', DeliveryInstructions)
        .input('InternalComments', InternalComments)
        .input('TotalDryItems', TotalDryItems)
        .input('TotalChillerItems', TotalChillerItems)
        .input('DeliveryRun', DeliveryRun)
        .input('RunPosition', RunPosition)
        .input('ReturnedDeliveryData', ReturnedDeliveryData)
        .execute('dbo.usp_Ventas_Crear');

        res.json({
            message: 'Registry created',
            newId: result.recordset[0].InvoiceID
        });

    } catch (error) {
        console.error('Error founded: ', error);
        res.status(500).json({ error: error.message });
    }
};

// ========================================================= //

// ==================== Peticiones PUT ==================== //

// Clientes.
export const updateCustomer = async (req, res) => {
    try {
        const { CustomerID } = req.params;
        const { CustomerName } = req.body;
        const { CustomerCategoryID } = req.body;
        const { PrimaryContactPersonID } = req.body;
        const { DeliveryMethodID } = req.body;
        const { DeliveryCityID } = req.body;
        const { PostalCityID } = req.body;
        const { AccountOpenedDate } = req.body;
        const { StandardDiscountPercentage } = req.body;
        const { IsStatementSent } = req.body;
        const { IsOnCreditHold } = req.body;
        const { PaymentDays } = req.body;
        const { PhoneNumber } = req.body;
        const { FaxNumber } = req.body;
        const { WebsiteURL } = req.body;
        const { DeliveryAddressLine1 } = req.body;
        const { DeliveryPostalCode } = req.body;
        const { PostalAddressLine1 } = req.body;
        const { PostalPostalCode } = req.body;
        const { LastEditedBy } = req.body;
        const { BillToCustomerID } = req.body;
        const { BuyingGroupID } = req.body;
        const { AlternateContactPersonID } = req.body;
        const { CreditLimit } = req.body;
        const { DeliveryRun } = req.body;
        const { RunPosition } = req.body;
        const { DeliveryAddressLine2 } = req.body;
        const { DeliveryLatitude } = req.body;
        const { DeliveryLongitude } = req.body;
        const { PostalAddressLine2 } = req.body;

        const pool = await getConnection();

        const result = await pool.request()
        .input('CustomerID', CustomerID)
        .input('CustomerName', CustomerName)
        .input('CustomerCategoryID', CustomerCategoryID)
        .input('PrimaryContactPersonID', PrimaryContactPersonID)
        .input('DeliveryMethodID', DeliveryMethodID)
        .input('DeliveryCityID', DeliveryCityID)
        .input('PostalCityID', PostalCityID)
        .input('AccountOpenedDate', AccountOpenedDate)
        .input('StandardDiscountPercentage', StandardDiscountPercentage)
        .input('IsStatementSent', IsStatementSent)
        .input('IsOnCreditHold', IsOnCreditHold)
        .input('PaymentDays', PaymentDays)
        .input('PhoneNumber', PhoneNumber)
        .input('FaxNumber', FaxNumber)
        .input('WebsiteURL', WebsiteURL)
        .input('DeliveryAddressLine1', DeliveryAddressLine1)
        .input('DeliveryPostalCode', DeliveryPostalCode)
        .input('PostalAddressLine1', PostalAddressLine1)
        .input('PostalPostalCode', PostalPostalCode)
        .input('LastEditedBy', LastEditedBy)
        .input('BillToCustomerID', BillToCustomerID)
        .input('BuyingGroupID', BuyingGroupID)
        .input('AlternateContactPersonID', AlternateContactPersonID)
        .input('CreditLimit', CreditLimit)
        .input('DeliveryRun', DeliveryRun)
        .input('RunPosition', RunPosition)
        .input('DeliveryAddressLine2', DeliveryAddressLine2)
        .input('DeliveryLatitude', DeliveryLatitude)
        .input('DeliveryLongitude', DeliveryLongitude)
        .input('PostalAddressLine2', PostalAddressLine2)
        .execute('dbo.usp_Clientes_Actualizar');

        res.json({
            message: 'Registry updated',
            updatedId: result.recordset[0].CustomerID
        });

    } catch (error) {
        console.error('Error founded: ', error);
        res.status(500).json({ error: error.message });
    }
};

// Inventarios.
export const updateInventory = async (req, res) => {
    try {
        const { StockItemID } = req.params;
        const { StockItemName } = req.body;
        const { SupplierID } = req.body;
        const { UnitPackageID } = req.body;
        const { OuterPackageID } = req.body;
        const { LeadTimeDays } = req.body;
        const { QuantityPerOuter } = req.body;
        const { IsChillerStock } = req.body;
        const { TaxRate } = req.body;
        const { UnitPrice } = req.body;
        const { TypicalWeightPerUnit } = req.body;
        const { QuantityOnHand } = req.body;
        const { BinLocation } = req.body;
        const { LastStocktakeQuantity } = req.body;
        const { LastCostPrice } = req.body;
        const { ReorderLevel } = req.body;
        const { TargetStockLevel } = req.body;
        const { LastEditedBy } = req.body;
        const { ColorID } = req.body;
        const { Brand } = req.body;
        const { Size } = req.body;
        const { Barcode } = req.body;
        const { RecommendedRetailPrice } = req.body;
        const { MarketingComments } = req.body;
        const { InternalComments } = req.body;
        const { Photo } = req.body;
        const { CustomFields } = req.body;
        const PhotoData = Photo ? Buffer.from(Photo, 'base64') : null;

        const pool = await getConnection();

        const result = await pool.request()
        .input('StockItemID', StockItemID)
        .input('StockItemName', StockItemName)
        .input('SupplierID', SupplierID)
        .input('UnitPackageID', UnitPackageID)
        .input('OuterPackageID', OuterPackageID)
        .input('LeadTimeDays', LeadTimeDays)
        .input('QuantityPerOuter', QuantityPerOuter)
        .input('IsChillerStock', IsChillerStock)
        .input('TaxRate', TaxRate)
        .input('UnitPrice', UnitPrice)
        .input('TypicalWeightPerUnit', TypicalWeightPerUnit)
        .input('QuantityOnHand', QuantityOnHand)
        .input('BinLocation', BinLocation)
        .input('LastStocktakeQuantity', LastStocktakeQuantity)
        .input('LastCostPrice', LastCostPrice)
        .input('ReorderLevel', ReorderLevel)
        .input('TargetStockLevel', TargetStockLevel)
        .input('LastEditedBy', LastEditedBy)
        .input('ColorID', ColorID)
        .input('Brand', Brand)
        .input('Size', Size)
        .input('Barcode', Barcode)
        .input('RecommendedRetailPrice', RecommendedRetailPrice)
        .input('MarketingComments', MarketingComments)
        .input('InternalComments', InternalComments)
        .input('Photo', sql.VarBinary(sql.MAX), PhotoData)
        .input('CustomFields', CustomFields)
        .execute('dbo.usp_Inventarios_Actualizar');

        res.json({
            message: 'Registry updated',
            updatedId: result.recordset[0].StockItemID
        });

    } catch (error) {
        console.error('Error founded: ', error);
        res.status(500).json({ error: error.message });
    }
};

// Proveedores.
export const updateSupplier = async (req, res) => {
    try {
        const { SupplierID } = req.params;
        const { SupplierName } = req.body;
        const { SupplierCategoryID } = req.body;
        const { PrimaryContactPersonID } = req.body;
        const { AlternateContactPersonID } = req.body;
        const { DeliveryCityID } = req.body;
        const { PostalCityID } = req.body;
        const { PaymentDays } = req.body;
        const { PhoneNumber } = req.body;
        const { FaxNumber } = req.body;
        const { WebsiteURL } = req.body;
        const { DeliveryAddressLine1 } = req.body;
        const { DeliveryPostalCode } = req.body;
        const { PostalAddressLine1 } = req.body;
        const { PostalPostalCode } = req.body;
        const { LastEditedBy } = req.body;
        const { DeliveryMethodID } = req.body;
        const { SupplierReference } = req.body;
        const { BankAccountName } = req.body;
        const { BankAccountBranch } = req.body;
        const { BankAccountCode } = req.body;
        const { BankAccountNumber } = req.body;
        const { BankInternationalCode } = req.body;
        const { InternalComments } = req.body;
        const { DeliveryAddressLine2 } = req.body;
        const { DeliveryLatitude } = req.body;
        const { DeliveryLongitude } = req.body;
        const { PostalAddressLine2 } = req.body;

        const pool = await getConnection();

        const result = await pool.request()
        .input('SupplierID', SupplierID)
        .input('SupplierName', SupplierName)
        .input('SupplierCategoryID', SupplierCategoryID)
        .input('PrimaryContactPersonID', PrimaryContactPersonID)
        .input('AlternateContactPersonID', AlternateContactPersonID)
        .input('DeliveryCityID', DeliveryCityID)
        .input('PostalCityID', PostalCityID)
        .input('PaymentDays', PaymentDays)
        .input('PhoneNumber', PhoneNumber)
        .input('FaxNumber', FaxNumber)
        .input('WebsiteURL', WebsiteURL)
        .input('DeliveryAddressLine1', DeliveryAddressLine1)
        .input('DeliveryPostalCode', DeliveryPostalCode)
        .input('PostalAddressLine1', PostalAddressLine1)
        .input('PostalPostalCode', PostalPostalCode)
        .input('LastEditedBy', LastEditedBy)
        .input('DeliveryMethodID', DeliveryMethodID)
        .input('SupplierReference', SupplierReference)
        .input('BankAccountName', BankAccountName)
        .input('BankAccountBranch', BankAccountBranch)
        .input('BankAccountCode', BankAccountCode)
        .input('BankAccountNumber', BankAccountNumber)
        .input('BankInternationalCode', BankInternationalCode)
        .input('InternalComments', InternalComments)
        .input('DeliveryAddressLine2', DeliveryAddressLine2)
        .input('DeliveryLatitude', DeliveryLatitude)
        .input('DeliveryLongitude', DeliveryLongitude)
        .input('PostalAddressLine2', PostalAddressLine2)
        .execute('dbo.usp_Proveedores_Actualizar');

        res.json({
            message: 'Registry updated',
            updatedId: result.recordset[0].SupplierID
        });

    } catch (error) {
        console.error('Error founded: ', error);
        res.status(500).json({ error: error.message });
    }
};

// Ventas.
export const updateSale = async (req, res) => {
    try {
        const { InvoiceID } = req.params;
        const { CustomerID } = req.body;
        const { BillToCustomerID } = req.body;
        const { DeliveryMethodID } = req.body;
        const { ContactPersonID } = req.body;
        const { AccountsPersonID } = req.body;
        const { SalespersonPersonID } = req.body;
        const { PackedByPersonID } = req.body;
        const { InvoiceDate } = req.body;
        const { LastEditedBy } = req.body;
        const { OrderID } = req.body;
        const { CustomerPurchaseOrderNumber } = req.body;
        const { IsCreditNote = 0 } = req.body;
        const { CreditNoteReason } = req.body;
        const { Comments } = req.body;
        const { DeliveryInstructions } = req.body;
        const { InternalComments } = req.body;
        const { TotalDryItems = 0 } = req.body;
        const { TotalChillerItems = 0 } = req.body;
        const { DeliveryRun } = req.body;
        const { RunPosition } = req.body;
        const { ReturnedDeliveryData } = req.body;

        const pool = await getConnection();

        const result = await pool.request()
        .input('InvoiceID', InvoiceID)
        .input('CustomerID', CustomerID)
        .input('BillToCustomerID', BillToCustomerID)
        .input('DeliveryMethodID', DeliveryMethodID)
        .input('ContactPersonID', ContactPersonID)
        .input('AccountsPersonID', AccountsPersonID)
        .input('SalespersonPersonID', SalespersonPersonID)
        .input('PackedByPersonID', PackedByPersonID)
        .input('InvoiceDate', InvoiceDate)
        .input('LastEditedBy', LastEditedBy)
        .input('OrderID', OrderID)
        .input('CustomerPurchaseOrderNumber', CustomerPurchaseOrderNumber)
        .input('IsCreditNote', IsCreditNote)
        .input('CreditNoteReason', CreditNoteReason)
        .input('Comments', Comments)
        .input('DeliveryInstructions', DeliveryInstructions)
        .input('InternalComments', InternalComments)
        .input('TotalDryItems', TotalDryItems)
        .input('TotalChillerItems', TotalChillerItems)
        .input('DeliveryRun', DeliveryRun)
        .input('RunPosition', RunPosition)
        .input('ReturnedDeliveryData', ReturnedDeliveryData)
        .execute('dbo.usp_Ventas_Actualizar');

        res.json({
            message: 'Registry updated',
            updatedId: result.recordset[0].InvoiceID
        });

    } catch (error) {
        console.error('Error founded: ', error);
        res.status(500).json({ error: error.message });
    }
};

// ======================================================== //

// ==================== Peticiones DELETE ==================== //

// Clientes.
export const deleteCustomer = async (req, res) => {
    try {
        const { CustomerID } = req.params;

        const pool = await getConnection();

        const result = await pool.request()
        .input('CustomerID', CustomerID)
        .execute('dbo.usp_Clientes_Eliminar');

        res.json({
            message: 'Registry deleted',
            deletedId: result.recordset[0].CustomerID
        });

    } catch (error) {
        console.error('Error founded: ', error);
        res.status(500).json({ error: error.message });
    }
};

// Inventarios.
export const deleteInventory = async (req, res) => {
    try {
        const { StockItemID } = req.params;

        const pool = await getConnection();

        const result = await pool.request()
        .input('StockItemID', StockItemID)
        .execute('dbo.usp_Inventarios_Eliminar');

        res.json({
            message: 'Registry deleted',
            deletedId: result.recordset[0].StockItemID
        });

    } catch (error) {
        console.error('Error founded: ', error);
        res.status(500).json({ error: error.message });
    }
};

// Proveedores.
export const deleteSupplier = async (req, res) => {
    try {
        const { SupplierID } = req.params;

        const pool = await getConnection();

        const result = await pool.request()
        .input('SupplierID', SupplierID)
        .execute('dbo.usp_Proveedores_Eliminar');

        res.json({
            message: 'Registry deleted',
            deletedId: result.recordset[0].SupplierID
        });

    } catch (error) {
        console.error('Error founded: ', error);
        res.status(500).json({ error: error.message });
    }
};

// Ventas.
export const deleteSale = async (req, res) => {
    try {
        const { InvoiceID } = req.params;

        const pool = await getConnection();

        const result = await pool.request()
        .input('InvoiceID', InvoiceID)
        .execute('dbo.usp_Ventas_Eliminar');

        res.json({
            message: 'Registry deleted',
            deletedId: result.recordset[0].InvoiceID
        });

    } catch (error) {
        console.error('Error founded: ', error);
        res.status(500).json({ error: error.message });
    }
};

// =========================================================== //
