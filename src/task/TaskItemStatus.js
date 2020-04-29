import React from 'react';

const TaskItemStatus = ({ task }) => {
  return <div>{task.status === 'OPEN' ? 'TODO' : task.status}</div>;
};

export default TaskItemStatus;
