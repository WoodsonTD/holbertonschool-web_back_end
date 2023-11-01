// Import the required library
import kue from 'kue';

// Create a Kue queue
const queue = kue.createQueue();

// Data array with jobs
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account',
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account',
  },
  // Add more job objects as needed
];

// Create jobs and log job creation, completion, failure, and progress
jobs.forEach((jobData, index) => {
  const job = queue.create('push_notification_code_2', jobData);

  job
    .on('complete', () => {
      console.log(`Notification job ${job.id} completed`);
    })
    .on('failed', (err) => {
      console.log(`Notification job ${job.id} failed: ${err}`);
    })
    .on('progress', (progress) => {
      console.log(`Notification job ${job.id} ${progress}% complete`);
    });

  job.save((err) => {
    if (!err) {
      console.log(`Notification job created: ${job.id}`);
    }
  });
});

// Handle any errors occurring in the Kue queue
queue.on('error', (err) => {
  console.error('Kue queue error:', err);
});

