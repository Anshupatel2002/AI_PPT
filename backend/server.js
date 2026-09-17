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

app.listen(config.port, () => {
  console.log(`Backend server ready and listening on http://localhost:${config.port}`);
});
