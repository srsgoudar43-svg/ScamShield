import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/apiRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Root greeting
app.get('/', (req, res) => {
  res.json({
    name: 'ScamShield India Backend API',
    status: 'online',
    version: '1.0.0',
    documentation: '/api/health'
  });
});

// Start listening
app.listen(PORT, () => {
  console.log(`[ScamShield] Backend server active on port ${PORT}`);
});

