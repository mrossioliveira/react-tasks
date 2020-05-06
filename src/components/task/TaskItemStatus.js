import React, { useContext } from 'react';
import { TasksContext } from './TasksContext';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './TaskItemStatus.css';
import TaskService from '../../services/TaskService';

const TaskItemStatus = ({ task }) => {
  const { dispatch } = useContext(TasksContext);

  function handleChanges(e) {
    e.stopPropagation();
    
    // optimistic update in the UI
    dispatch({ type: 'updateStatus', payload: task });

    // database update
    new TaskService().updateStatus(task, dispatch);
  }

  return (
    <div onClick={handleChanges}>
      <FontAwesomeIcon
        size="lg"
        icon={
          task.status === 'DONE' ? ['fas', 'check-circle'] : ['far', 'circle']
        }
        className={
          task.status === 'DONE'
            ? 'task-item-status-yes'
            : 'task-item-status-no'
        }
      />
    </div>
  );
};

TaskItemStatus.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskItemStatus;
