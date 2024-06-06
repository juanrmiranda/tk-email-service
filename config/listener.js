const createSubscriber = require('pg-listen');
const sendEmail = require('../services/emailService');
require('dotenv').config();

const subscriber = createSubscriber({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

subscriber.notifications.on('new_activity', async (payload) => {
  console.log('Received notification:', payload);
  const { email, subject, message, activities } = payload;
  await sendEmail(email, subject, 'activity_notification', { title: subject, message: message, activities: activities });
});

(async () => {
  await subscriber.connect();
  await subscriber.listenTo('new_activity');
  console.log('Listening for notifications on "new_activity" channel...');
})();

subscriber.events.on('error', (error) => {
  console.error('Error in pg-listen subscriber:', error);
});

module.exports = subscriber;
