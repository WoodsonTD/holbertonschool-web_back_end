import { gql } from 'apollo-boost';

const getTasksQuery = gql`
  {
    tasks {
      id
      title
    }
  }
`;

const getProjectsQuery = gql`
  {
    projects {
      id
      title
    }
  }
`;

const addTaskMutation = gql`
  mutation($title: String!, $description: String!, $weight: Int!, $projectId: ID!) {
    addTask(title: $title, description: $description, weight: $weight, projectId: $projectId) {
      id
      title
    }
  }
`;

const addProjectMutation = gql`
  mutation($title: String!, $weight: Int!, $description: String!) {
    addProject(title: $title, weight: $weight, description: $description) {
      id
      title
    }
  }
`;

export { getTasksQuery, getProjectsQuery, addTaskMutation, addProjectMutation };
