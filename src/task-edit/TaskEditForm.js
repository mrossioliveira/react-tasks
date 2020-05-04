import React, { useState, useContext } from 'react';
import { TasksContext } from '../task/TasksContext';

const KEYCODE_ENTER = 13;
const KEYCODE_ESCAPE = 27;

const TaskEditForm = () => {
  const { taskState } = useContext(TasksContext);

  const [title, setTitle] = useState(
    taskState.selectedTask ? taskState.selectedTask.title : ''
  );

  const updateTitle = (event) => {
    setTitle(event.target.value);
  };

  const onUpdateTitle = (event) => {
    if (event.keyCode === KEYCODE_ENTER) {
      event.preventDefault();
      if (event.target.value.trim().length > 0) {
        console.log(event.target.value);
      }
    } else if (event.keyCode === KEYCODE_ESCAPE) {
      setTitle();
    }
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

export default TaskEditForm;
