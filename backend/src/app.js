const express = require('express');
const cors = require('cors');
const outlineRoutes = require('./routes/outlineRoutes');
const healthRoutes = require('./routes/healthRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// CORS configuration (allow frontend dev server and production origins)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Body parser
app.use(express.json({ limit: '1mb' }));

// Mount routes
app.use('/', healthRoutes);
app.use('/api', healthRoutes);
app.get('/api', (req, res) => {
  res.json({ status: 'ok', service: 'Deck Draft Gemini API' });
});
app.use('/api', outlineRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;
