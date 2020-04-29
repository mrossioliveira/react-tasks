import React from 'react';

const TaskItemImportant = ({ task }) => {
  return <div>{task.important.toString() === 'true' ? '*' : '.'}</div>;
};

export default TaskItemImportant;
