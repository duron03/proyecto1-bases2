import { Router } from 'express';
import {
    getCustomers,
    getCustomerDetails,
    getInventories,
    getInventoryDetails,
    getSuppliers,
    getSupplierDetails,
    getInvoices,
    getInvoiceDetails
} from '../controllers/WWI.controller.js';

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

export default router;
