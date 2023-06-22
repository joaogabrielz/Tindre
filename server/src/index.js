const app = require('./server');
require('dotenv').config();
require('process');

const HOSTNAME = process.env.HOSTNAME;
const PORT = process.env.PORT || 3000;

process.on('uncaughtException', err => {
  console.error('There was an uncaught error ! \n', err)
  process.exit(1)
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`Tindre server running at http://${HOSTNAME}:${PORT}`);
});