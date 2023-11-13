import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { addProjectMutation, getProjectsQuery } from '../queries/queries';

const AddProject = (props) => {
  const [state, setState] = useState({
    title: '',
    weight: 1,
    description: '',
  });

  const submitForm1 = (e) => {
    e.preventDefault();
    props.addProjectMutation({
      variables: {
        title: state.title,
        weight: state.weight,
        description: state.description,
      },
      refetchQueries: [{ query: getProjectsQuery }],
    });
  };

  return (
    <form id="add-project" onSubmit={submitForm1}>
      <div className="field">
        <label>Project Title:</label>
        <input type="text" onChange={(e) => setState({ ...state, title: e.target.value })} />
      </div>

      <div className="field">
        <label>Weight:</label>
        <input type="number" onChange={(e) => setState({ ...state, weight: parseInt(e.target.value) })} />
      </div>

      <div className="field">
        <label>Description:</label>
        <textarea onChange={(e) => setState({ ...state, description: e.target.value })}></textarea>
      </div>

      <button>+</button>
    </form>
  );
};

export default compose(
  graphql(addProjectMutation, { name: 'addProjectMutation' }),
  graphql(getProjectsQuery, { name: 'getProjectsQuery' })
)(AddProject);
