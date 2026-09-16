const app = require('./src/app');
const config = require('./src/config/env');

console.log('');
console.log('======================================');
console.log('       DECK DRAFT BACKEND API');
console.log('======================================');
console.log('Model:          ', config.geminiModel);
console.log('Gemini API Key: ', config.geminiApiKey ? 'CONFIGURED' : 'MISSING');
console.log('Port:           ', config.port);
console.log('======================================');
console.log('');

const port = process.env.PORT || config.port || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Backend server ready and listening on http://localhost:${port}`);
  });
}

module.exports = app;
