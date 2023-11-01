// Import the required library
import redis from 'redis';

// Create a Redis client
const client = redis.createClient();

// Handle Redis connection events
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (error) => {
  console.error(`Redis client not connected to the server: ${error}`);
});

// Close the client when the script is done
process.on('SIGINT', () => {
  client.quit();
});
