import React, { useContext } from 'react';
import { TasksContext } from './TasksContext';
import PropTypes from 'prop-types';
import TasksApi from './TasksApi';

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
      {task.important.toString() === 'true' ? '*' : '.'}
    </div>
  );
};

TaskItemImportant.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskItemImportant;
