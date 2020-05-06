import React, { useContext } from 'react';
import { TasksContext } from './TasksContext';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './TaskItemImportant.css';
import TaskService from '../../services/TaskService';

const TaskItemImportant = ({ task }) => {
  const { dispatch } = useContext(TasksContext);

  function handleChanges(e) {
    e.stopPropagation();

    // optimistic update in the UI
    dispatch({ type: 'updateImportant', payload: task });

    // database update
    new TaskService().updateImportant(task, dispatch);
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
