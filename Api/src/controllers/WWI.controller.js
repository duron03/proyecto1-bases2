import { getConnection } from '../database/connection.js';

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

// ==================== Peticiones PUT ==================== //
// ======================================================== //

// Clientes.

// Inventario.

// Proveedores.

// Ventas.

// ==================== Peticiones DELETE ==================== //
// =========================================================== //

// Clientes.

// Inventario.

// Proveedores.

// Ventas.
