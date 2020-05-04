import React, { useContext, useState, useEffect } from 'react';
import { TasksContext } from '../task/TasksContext';

import PropTypes from 'prop-types';
import TasksApi from '../task/TasksApi';

const KEYCODE_ENTER = 13;
const KEYCODE_ESCAPE = 27;

const TaskEditTitleForm = ({ task }) => {
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

  const onBlur = (event) => {
    if (event.target.value.trim().length > 0) {
      task.title = event.target.value;
      new TasksApi().update(task, dispatch);
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
          onBlur={onBlur}
        />
      </form>
    )
  );
};

TaskEditTitleForm.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskEditTitleForm;
