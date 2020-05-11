import React, { useContext } from 'react';
import './TaskListItem.css';
import TaskItemStatus from './TaskItemStatus';
import TaskItemImportant from './TaskItemImportant';
import PropTypes from 'prop-types';
import { TasksContext } from '../../contexts/TasksContext';
import { useParams, useHistory } from 'react-router-dom';

const TaskListItem = ({ task }) => {
  const history = useHistory();
  const { id } = useParams();
  const { taskState, dispatch: tasksDispatch } = useContext(TasksContext);

  function onTaskSelect(e) {
    e.stopPropagation();
    tasksDispatch({ type: 'selectTask', payload: task });
  }

  var isSelected = false;
  if (taskState.selectedTask) {
    if (taskState.selectedTask.id === task.id) {
      isSelected = true;
    }
  }

  const handleListSelect = (event) => {
    event.preventDefault();
    history.push(`/tasks/${task.list.id}`);
  };

  return (
    <div
      className={
        isSelected ? 'task-list-item task-list-item-selected' : 'task-list-item'
      }
      onClick={onTaskSelect}
    >
      <div className="task-list-item-prefix">
        <TaskItemStatus task={task} />
      </div>
      <div className="task-list-item-content">
        <span className={task.status === 'DONE' ? 'strike' : null}>
          {task.title}
        </span>
        <br />

        {id === 'important' || taskState.searchQuery !== null ? (
          <small
            className="task-list-item-list-selector color-darker"
            onClick={handleListSelect}
          >
            {task.list ? task.list.title : 'Tasks'}
          </small>
        ) : null}
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
