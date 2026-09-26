import { getConnection } from '../database/connection.js';

export const getCustomers = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Sales.Customers'); // Query de prueba
        res.json(result.recordset);

    } catch (error) {
        console.error(error);
    }
};
