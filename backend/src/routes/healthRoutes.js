const express = require('express');
const router = express.Router();
const config = require('../config/env');

router.get('/healthz', (req, res) => {
  res.json({
    ok: true,
    model: config.geminiModel,
    geminiConfigured: Boolean(config.geminiApiKey)
  });
});

module.exports = router;
