import React from 'react';
import TaskListItem from './TaskListItem';
import PropTypes from 'prop-types';

const TaskList = ({ tasks }) => {
  return (
    <div>
      {tasks && tasks.map((task) => <TaskListItem key={task.id} task={task} />)}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default TaskList;
