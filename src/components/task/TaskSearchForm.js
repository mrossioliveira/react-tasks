import React, { useState, useContext } from 'react';
import { TasksContext } from '../../contexts/TasksContext';

const KEYCODE_ESCAPE = 27;

const TaskSearchForm = () => {
  const [query, setQuery] = useState('');
  const { dispatch } = useContext(TasksContext);

  const updateQuery = (event) => {
    setQuery(event.target.value);
    dispatch({ type: 'filterTasks', payload: event.target.value.trim() });
  };

  const handleEscape = (event) => {
    if (event.keyCode === KEYCODE_ESCAPE) {
      dispatch({ type: 'filterTasks', payload: null });
      setQuery('');
    }
    return;
  };

  return (
    <form>
      <input
        autoFocus
        className="transparent-input"
        placeholder="Search tasks"
        maxLength="120"
        value={query}
        onChange={updateQuery}
        onKeyDown={handleEscape}
      />
    </form>
  );
};

export default TaskSearchForm;
