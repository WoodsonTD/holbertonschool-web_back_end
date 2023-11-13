import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

// Import your mongoose models for Project and Task
import Project from './models/project';
import Task from './models/task';

// Define TaskType
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    project: {
      type: ProjectType,
      resolve(parent) {
        return Project.findById(parent.projectId);
      },
    },
  }),
});

// Define ProjectType
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent) {
        return Task.find({ projectId: parent.id });
      },
    },
  }),
});

// Define RootQueryType
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    tasks: {
      type: new GraphQLList(TaskType),
      resolve() {
        return Task.find();
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve() {
        return Project.find();
      },
    },
  },
});

// Define MutationType
const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProject: {
      type: ProjectType,
      args: {
        title: { type: GraphQLString },
        weight: { type: GraphQLInt },
        description: { type: GraphQLString },
      },
      resolve(parent, args) {
        const newProject = new Project({
          title: args.title,
          weight: args.weight,
          description: args.description,
        });
        return newProject.save();
      },
    },
    addTask: {
      type: TaskType,
      args: {
        title: { type: GraphQLString },
        weight: { type: GraphQLInt },
        description: { type: GraphQLString },
        projectId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const newTask = new Task({
          title: args.title,
          weight: args.weight,
          description: args.description,
          projectId: args.projectId,
        });
        return newTask.save();
      },
    },
  },
});

// Define GraphQL schema
const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationType,
});

export default schema;
