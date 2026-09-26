import { Router } from 'express';
import {
    getCustomers
} from '../controllers/WWI.controller.js';

const router = Router();

router.get('/getCustomers', getCustomers);

export default router;
