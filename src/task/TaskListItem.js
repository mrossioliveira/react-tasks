import React from 'react';
import './TaskListItem.css';
import TaskItemStatus from './TaskItemStatus';
import TaskItemImportant from './TaskItemImportant';
import PropTypes from 'prop-types';

const TaskListItem = ({ task }) => {
  return (
    <div className="task-list-item">
      <div className="task-list-item-prefix">
        <TaskItemStatus task={task} />
      </div>
      <div className="task-list-item-content">
        <span className={task.status === 'DONE' ? 'strike' : null}>
          {task.title}
        </span>
      </div>
      <div className="task-list-item-content-spacer"></div>
      <div className="task-list-item-sufix">
        <TaskItemImportant task={task} />
      </div>
    </div>
  );
};

TaskListItem.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskListItem;
