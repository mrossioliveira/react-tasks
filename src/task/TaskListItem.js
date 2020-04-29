import React from 'react';
import './TaskListItem.css';
import TaskItemStatus from './TaskItemStatus';
import TaskItemImportant from './TaskItemImportant';

const TaskListItem = ({ task }) => {
  return (
    <div className="task-list-item">
      <div className="task-list-item-prefix">
        <TaskItemStatus task={task} />
      </div>
      <div className="task-list-item-content">{task.title}</div>
      <div className="task-list-item-sufix">
        <TaskItemImportant task={task} />
      </div>
    </div>
  );
};

export default TaskListItem;
