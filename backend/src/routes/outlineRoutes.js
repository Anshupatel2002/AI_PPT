const express = require('express');
const router = express.Router();
const outlineController = require('../controllers/outlineController');
const rateLimiter = require('../middleware/rateLimiter');

router.post('/generate-outline', rateLimiter, (req, res, next) => {
  outlineController.generateOutline(req, res, next);
});

module.exports = router;
