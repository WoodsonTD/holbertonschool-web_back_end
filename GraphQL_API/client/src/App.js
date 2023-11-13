import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import TaskList from './components/TaskList';
import ProjectList from './components/ProjectList';

// Create an Apollo client instance
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // replace with your GraphQL server endpoint
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>GraphQL Project</h1>
        <TaskList />
        <ProjectList />
      </div>
    </ApolloProvider>
  );
}

export default App;
