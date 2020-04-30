import React, { useContext } from 'react';
import { TasksContext } from './TasksContext';
import PropTypes from 'prop-types';
import TasksApi from './TasksApi';

const TaskItemStatus = ({ task }) => {
  const { dispatch } = useContext(TasksContext);

  function handleChanges() {
    // optimistic update in the UI
    dispatch({ type: 'updateStatus', payload: task });

    // database update
    new TasksApi().updateImportant(task, dispatch);
  }

  return (
    <div onClick={handleChanges}>
      {task.status === 'OPEN' ? 'TODO' : task.status}
    </div>
  );
};

TaskItemStatus.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskItemStatus;
