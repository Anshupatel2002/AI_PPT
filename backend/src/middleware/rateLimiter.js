const config = require('../config/env');

const requestHistory = new Map();

function rateLimiter(req, res, next) {
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  const oldRequests = requestHistory.get(ip) || [];
  const validRequests = oldRequests.filter(time => now - time < config.rateLimitWindowMs);

  if (validRequests.length >= config.rateLimitMax) {
    return res.status(429).json({
      error: 'Too many requests. Please wait one minute and try again.'
    });
  }

  validRequests.push(now);
  requestHistory.set(ip, validRequests);

  next();
}

module.exports = rateLimiter;
