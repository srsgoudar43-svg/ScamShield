import express from 'express';
import cors from 'cors';
import apiRoutes from '../backend/src/routes/apiRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Mount the API routes
app.use('/api', apiRoutes);

// Root health check for the serverless function
app.get('/', (req, res) => {
  res.json({
    service: 'ScamShield India Serverless API (Vercel)',
    status: 'online',
    version: '1.0.0',
    documentation: '/api/health'
  });
});

export default app;
