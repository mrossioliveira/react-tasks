import React from 'react';

const TaskItemStatus = ({ status }) => {
  return <div>{status === 'OPEN' ? 'TODO' : status}</div>;
};

export default TaskItemStatus;
