import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 👇 Ruta de documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.send('Backend en línea NancySilva🚀');
});

app.use('/api/usuarios', userRoutes);

export default app;
