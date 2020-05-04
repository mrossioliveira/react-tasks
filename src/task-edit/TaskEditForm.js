import React, { useContext, useState, useEffect } from 'react';
import { TasksContext } from '../task/TasksContext';

import PropTypes from 'prop-types';
import TasksApi from '../task/TasksApi';

// import _ from 'lodash';

const KEYCODE_ENTER = 13;
const KEYCODE_ESCAPE = 27;

const TaskEditForm = ({ task }) => {
  const { dispatch, taskState } = useContext(TasksContext);

  const [title, setTitle] = useState(task.title);

  useEffect(() => {
    setTitle(task.title);
  }, [task]);

  const onUpdateTitle = (event) => {
    if (event.keyCode === KEYCODE_ENTER) {
      event.preventDefault();
      if (event.target.value.trim().length > 0) {
        task.title = event.target.value;
        new TasksApi().update(task, dispatch);
      }
    } else if (event.keyCode === KEYCODE_ESCAPE) {
      setTitle(task.title);
    }
  };

  const updateTitle = (event) => {
    setTitle(event.target.value);
  };

  return (
    taskState.selectedTask && (
      <form>
        <input
          className="transparent-input"
          placeholder="Task title"
          maxLength="120"
          value={title}
          onChange={updateTitle}
          onKeyDown={onUpdateTitle}
        />
      </form>
    )
  );
};

TaskEditForm.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskEditForm;
