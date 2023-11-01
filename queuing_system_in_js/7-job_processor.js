// Import the required library
import kue from 'kue';

// Create a Kue queue
const queue = kue.createQueue();

// Define an array of blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

// Create a function to send notifications
function sendNotification(phoneNumber, message, job, done) {
  job.progress(0, 100);

  if (blacklistedNumbers.includes(phoneNumber)) {
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }

  job.progress(50);

  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  done();
}

// Process jobs from the push_notification_code_2 queue
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});

// Handle any errors occurring in the Kue queue
queue.on('error', (err) => {
  console.error('Kue queue error:', err);
});
