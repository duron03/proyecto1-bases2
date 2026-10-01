import { Router } from 'express';
import {

    // Peticiones GET
    getCustomers,
    getCustomerDetails,
    getInventories,
    getInventoryDetails,
    getSuppliers,
    getSupplierDetails,
    getInvoices,
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

// Clientes.
router.get('/getCustomers', getCustomers);

router.get('/getCustomerDetails/:CustomerID', getCustomerDetails);

// Inventarios.
router.get('/getInventories', getInventories);

router.get('/getInventoryDetails/:StockItemID', getInventoryDetails);

// Proveedores.
router.get('/getSuppliers', getSuppliers);

router.get('/getSupplierDetails/:SupplierID', getSupplierDetails);

// Ventas.
router.get('/getInvoices', getInvoices);

router.get('/getInvoiceDetails/:InvoiceID', getInvoiceDetails);
// ======================================================== //

// ==================== Peticiones POST ==================== //

// Clientes.
router.post('/createCustomer', createCustomer);

// Inventarios.
router.post('/createInventory', createInventory);

// Proveedores.
router.post('/createSupplier', createSupplier);

// Ventas.
router.post('/createSale', createSale);

// ========================================================= //

// ==================== Peticiones PUT ==================== //

// Clientes.
router.put('/updateCustomer/:CustomerID', updateCustomer);

// Inventarios.
router.put('/updateInventory/:StockItemID', updateInventory);

// Proveedores.
router.put('/updateSupplier/:SupplierID', updateSupplier);

// Ventas.
router.put('/updateSale/:InvoiceID', updateSale);

// ======================================================== //

// ==================== Peticiones DELETE ==================== //

// Clientes.
router.delete('/deleteCustomer/:CustomerID', deleteCustomer);

// Inventarios.
router.delete('/deleteInventory/:StockItemID', deleteInventory);

// Proveedores.
router.delete('/deleteSupplier/:SupplierID', deleteSupplier);

// Ventas.
router.delete('/deleteSale/:InvoiceID', deleteSale);

// =========================================================== //

export default router;
