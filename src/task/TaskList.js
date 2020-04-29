import React from 'react';
import TaskListItem from './TaskListItem';

const TaskList = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
