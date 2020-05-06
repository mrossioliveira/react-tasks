import React, { useContext } from 'react';
import './TaskEditSidebar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { TasksContext } from '../task/TasksContext';
import TaskEditTitleForm from './TaskEditTitleForm';
import TaskItemStatus from '../task/TaskItemStatus';
import TaskItemImportant from '../task/TaskItemImportant';
import VerticalSpacer from '../../components/VerticalSpacer';

import * as moment from 'moment';
import TaskEditNotesForm from './TaskEditNotesForm';
import TaskService from '../../services/TaskService';

const TaskEditSidebar = () => {
  const { dispatch, taskState } = useContext(TasksContext);

  const onTaskDelete = (e) => {
    e.stopPropagation();

    // optimistic update in the UI
    dispatch({ type: 'deleteTask' });

    // database update
    new TaskService().delete(taskState.selectedTask, dispatch);
  };

  return (
    <div
      className={
        taskState.selectedTask
          ? 'task-edit-sidebar task-edit-sidebar-open'
          : 'task-edit-sidebar task-edit-sidebar-closed'
      }
    >
      {taskState.selectedTask && (
        <React.Fragment>
          <div className="task-edit-sidebar-header">
            <div className="mr16">
              <TaskItemStatus task={taskState.selectedTask} />
            </div>
            <TaskEditTitleForm task={taskState.selectedTask} />
            <div className="ml16">
              <TaskItemImportant task={taskState.selectedTask} />
            </div>
          </div>
          <VerticalSpacer />
        </React.Fragment>
      )}
      {taskState.selectedTask && (
        <div className="p16">
          <TaskEditNotesForm task={taskState.selectedTask} />
          <VerticalSpacer />
        </div>
      )}
      <div className="task-edit-sidebar-spacer"></div>
      <VerticalSpacer />
      <div className="task-edit-sidebar-footer">
        <FontAwesomeIcon
          className="task-edit-sidebar-icon"
          icon="chevron-right"
          onClick={() => dispatch({ type: 'unselectTask' })}
        />
        <div className="color-darker">
          {taskState.selectedTask && (
            <span>
              created {moment(taskState.selectedTask.createdAt).fromNow()}
            </span>
          )}
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
