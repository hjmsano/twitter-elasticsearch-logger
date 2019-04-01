require('dotenv').config();
const cron = require('node-cron');
const archiver = require('./client/archiver');

cron.schedule('*/15 * * * * *', async () => {
  await archiver.archive();
}, {});
