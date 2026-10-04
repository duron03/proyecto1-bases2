import { Router } from 'express';
import {

    // Peticiones GET
    getApiHealth,
    getCustomers,
    getCustomerCatalogs,
    getCities,
    getCustomerDetails,
    getInventories,
    getInventoryCatalogs,
    getInventoryDetails,
    getSuppliers,
    getSupplierCatalogs,
    getSupplierDetails,
    getInvoices,
    getSaleCatalogs,
    getInvoiceDetails,

    // Peticiones POST
    createCustomer,
    createInventory,
    createSupplier,
    createSale,

    // Peticiones PUT
    updateCustomer,
    updateInventory,
    updateSupplier,
    updateSale,

    // Peticiones DELETE
    deleteCustomer,
    deleteInventory,
    deleteSupplier,
    deleteSale
} from '../controllers/wwi.controller.js';

const router = Router();

// ==================== Peticiones GET ==================== //

// Estado de la API.
router.get('/health', getApiHealth);

// Clientes.
router.get('/customers', getCustomers);

router.get('/customers/catalogs', getCustomerCatalogs);

router.get('/cities', getCities);

router.get('/customers/:CustomerID', getCustomerDetails);

// Inventarios.
router.get('/inventory', getInventories);

router.get('/inventory/catalogs', getInventoryCatalogs);

router.get('/inventory/:StockItemID', getInventoryDetails);

// Proveedores.
router.get('/suppliers', getSuppliers);

router.get('/suppliers/catalogs', getSupplierCatalogs);

router.get('/suppliers/:SupplierID', getSupplierDetails);

// Ventas.
router.get('/sales', getInvoices);

router.get('/sales/catalogs', getSaleCatalogs);

router.get('/sales/:InvoiceID', getInvoiceDetails);
// ======================================================== //

// ==================== Peticiones POST ==================== //

// Clientes.
router.post('/customers', createCustomer);

// Inventarios.
router.post('/inventory', createInventory);

// Proveedores.
router.post('/suppliers', createSupplier);

// Ventas.
router.post('/sales', createSale);

// ========================================================= //

// ==================== Peticiones PUT ==================== //

// Clientes.
router.put('/customers/:CustomerID', updateCustomer);

// Inventarios.
router.put('/inventory/:StockItemID', updateInventory);

// Proveedores.
router.put('/suppliers/:SupplierID', updateSupplier);

// Ventas.
router.put('/sales/:InvoiceID', updateSale);

// ======================================================== //

// ==================== Peticiones DELETE ==================== //

// Clientes.
router.delete('/customers/:CustomerID', deleteCustomer);

// Inventarios.
router.delete('/inventory/:StockItemID', deleteInventory);

// Proveedores.
router.delete('/suppliers/:SupplierID', deleteSupplier);

// Ventas.
router.delete('/sales/:InvoiceID', deleteSale);

// =========================================================== //

export default router;
