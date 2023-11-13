const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const { schema } = require('./schema/schema'); 

const app = express();

// Connect to MongoDB Atlas database
mongoose.connect('YOUR_MONGODB_ATLAS_CONNECTION_STRING', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to database');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true, // enable the GraphiQL tool for testing
  })
);

app.listen(4000, () => {
  console.log('Now listening for requests on port 4000');
});
