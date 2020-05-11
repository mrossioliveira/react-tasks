import React, { useContext, useState, useEffect } from 'react';
import { TasksContext } from '../../contexts/TasksContext';

import PropTypes from 'prop-types';
import TaskService from '../../services/TaskService';

const KEYCODE_ESCAPE = 27;

const TaskEditNotesForm = ({ task }) => {
  const { dispatch, taskState } = useContext(TasksContext);

  const [notes, setNotes] = useState(task.title);

  useEffect(() => {
    setNotes(task.description);
  }, [task]);

  const onUpdateNotes = (event) => {
    if (event.keyCode === KEYCODE_ESCAPE) {
      setNotes(task.description);
    }
  };

  const onBlur = (event) => {
    if (event.target.value.trim().length > 0) {
      task.description = event.target.value;
      new TaskService().update(task, dispatch);
    }
  };

  const updateNotes = (event) => {
    setNotes(event.target.value);
  };

  return (
    taskState.selectedTask && (
      <form>
        <textarea
          className="transparent-input notes-area"
          placeholder="Notes"
          maxLength="120"
          value={notes}
          onChange={updateNotes}
          onKeyDown={onUpdateNotes}
          onBlur={onBlur}
        ></textarea>
      </form>
    )
  );
};

TaskEditNotesForm.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskEditNotesForm;
