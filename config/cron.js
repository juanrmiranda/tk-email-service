const cron = require('node-cron');
const { getPendingActivities } = require('../services/dbService');
const sendEmail = require('../services/emailService');

cron.schedule('0 8 * * *', async () => {
  console.log('Running daily job at 8 AM');
  const activities = await getPendingActivities();
  if (activities.length > 0) {
    await sendEmail('recipient@example.com', 'Daily Pending Activities', 'activity_notification', { title: 'Daily Pending Activities', message: 'Here are your pending activities:', activities: activities.map(activity => activity.description) });
  }
});
