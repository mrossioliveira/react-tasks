import React, { useContext } from 'react';
import { TasksContext } from './TasksContext';
import PropTypes from 'prop-types';
import TasksApi from './TasksApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './TaskItemImportant.css';

const TaskItemImportant = ({ task }) => {
  const { dispatch } = useContext(TasksContext);

  function handleChanges() {
    // optimistic update in the UI
    dispatch({ type: 'updateImportant', payload: task });

    // database update
    new TasksApi().updateImportant(task, dispatch);
  }

  return (
    <div onClick={handleChanges}>
      <FontAwesomeIcon
        size="lg"
        icon={[task.important ? 'fas' : 'far', 'star']}
        className={
          task.important ? 'task-item-important-yes' : 'task-item-important-no'
        }
      />
    </div>
  );
};

TaskItemImportant.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskItemImportant;
