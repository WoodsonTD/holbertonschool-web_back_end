// Import the required library
import kue from 'kue';

// Create a Kue queue
const queue = kue.createQueue();

// Create a function to send notifications
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Set up the queue process for the "push_notification_code" queue
queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message);
  done();
});

