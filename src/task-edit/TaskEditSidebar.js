import React, { useContext } from 'react';
import './TaskEditSidebar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { TasksContext } from '../task/TasksContext';
import TaskEditForm from './TaskEditForm';
import TasksApi from '../task/TasksApi';

const TaskEditSidebar = () => {
  const { dispatch, taskState } = useContext(TasksContext);

  function onTaskDelete(e) {
    e.stopPropagation();

    // optimistic update in the UI
    dispatch({ type: 'deleteTask' });

    // database update
    new TasksApi().delete(taskState.selectedTask, dispatch);
  }

  return (
    <div
      className={
        taskState.selectedTask
          ? 'task-edit-sidebar task-edit-sidebar-open'
          : 'task-edit-sidebar task-edit-sidebar-closed'
      }
    >
      <div className="task-edit-sidebar-header">
        <TaskEditForm />
      </div>
      <div className="task-edit-sidebar-spacer"></div>
      <div className="task-edit-sidebar-footer">
        <FontAwesomeIcon
          className="task-edit-sidebar-icon"
          icon="chevron-right"
          onClick={() => dispatch({ type: 'unselectTask' })}
        />
        <div className="color-darker">
          {taskState.selectedTask && taskState.selectedTask.createdAt}
        </div>
        <FontAwesomeIcon
          className="task-edit-sidebar-icon color-danger"
          icon="trash-alt"
          onClick={onTaskDelete}
        />
      </div>
    </div>
  );
};

export default TaskEditSidebar;
