// Import the required library
import kue from 'kue';

// Create a Kue queue
const queue = kue.createQueue();

// Create an object with job data
const jobData = {
  phoneNumber: '1234567890',
  message: 'Hello, this is a notification message',
};

// Create a job in the "push_notification_code" queue
const job = queue.create('push_notification_code', jobData);

// Handle job creation events
job.on('complete', () => {
  console.log('Notification job completed');
});

job.on('failed', () => {
  console.log('Notification job failed');
});

job.save((err) => {
  if (!err) {
    console.log(`Notification job created: ${job.id}`);
  }
});

// Close the queue after creating the job
queue.shutdown(5000, () => {
  console.log('Queue is now shut down');
});

