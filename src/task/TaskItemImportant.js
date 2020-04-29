import React from 'react';

const TaskItemImportant = ({ important }) => {
  return <div>{important.toString() === 'true' ? '*' : '.'}</div>;
};

export default TaskItemImportant;
