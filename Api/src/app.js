import express from 'express';
import WWIRoutes from './routes/WWI.routes.js';

const app = express();

app.use(express.json());
app.use(WWIRoutes);

export default app;
