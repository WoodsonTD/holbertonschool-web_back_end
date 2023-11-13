import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getProjectsQuery, addTaskMutation, getTasksQuery } from '../queries/queries';

const AddTask = (props) => {
  const [state, setState] = useState({
    title: '',
    description: '',
    weight: 1,
    projectId: '',
  });

  const displayProjects = () => {
    const data = props.getProjectsQuery;

    if (data.loading) {
      return <option>Loading projects...</option>;
    } else {
      return data.projects.map((project) => (
        <option key={project.id} value={project.id}>
          {project.title}
        </option>
      ));
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    props.addTaskMutation({
      variables: {
        title: state.title,
        description: state.description,
        weight: state.weight,
        projectId: state.projectId,
      },
      refetchQueries: [{ query: getTasksQuery }],
    });
  };

  return (
    <form id="add-task" onSubmit={submitForm}>
      <div className="field">
        <label>Task Title:</label>
        <input type="text" onChange={(e) => setState({ ...state, title: e.target.value })} />
      </div>

      <div className="field">
        <label>Description:</label>
        <textarea onChange={(e) => setState({ ...state, description: e.target.value })}></textarea>
      </div>

      <div className="field">
        <label>Weight:</label>
        <input type="number" onChange={(e) => setState({ ...state, weight: parseInt(e.target.value) })} />
      </div>

      <div className="field">
        <label>Project:</label>
        <select onChange={(e) => setState({ ...state, projectId: e.target.value })}>
          <option>Select project</option>
          {displayProjects()}
        </select>
      </div>

      <button>+</button>
    </form>
  );
};

export default compose(
  graphql(addTaskMutation, { name: 'addTaskMutation' }),
  graphql(getProjectsQuery, { name: 'getProjectsQuery' })
)(AddTask);
