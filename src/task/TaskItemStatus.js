import React, { useContext } from 'react';
import { TasksContext } from './TasksContext';
import PropTypes from 'prop-types';
import TasksApi from './TasksApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './TaskItemStatus.css';

const TaskItemStatus = ({ task }) => {
  const { dispatch } = useContext(TasksContext);

  function handleChanges(e) {
    e.stopPropagation();
    
    // optimistic update in the UI
    dispatch({ type: 'updateStatus', payload: task });

    // database update
    new TasksApi().updateStatus(task, dispatch);
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
