import React, { useState } from 'react';
import TaskDetails from './TaskDetails';

const TaskList = (props) => {
  const [state, setState] = useState({
    selected: null,
  });

  const displayTasks = () => {
    const data = props.getTasksQuery;

    if (data.loading) {
      return <div>Loading tasks...</div>;
    } else {
      return data.tasks.map((task) => (
        <li
          key={task.id}
          onClick={(e) => {
            setState({ selected: task.id });
          }}
        >
          {task.title}
        </li>
      ));
    }
  };

  return (
    <div>
      <ul id="task-list">{displayTasks()}</ul>
      <TaskDetails taskId={state.selected} />
    </div>
  );
};

export default TaskList;
