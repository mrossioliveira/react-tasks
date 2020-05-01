import React, { useState, useContext } from 'react';
import { TasksContext } from './TasksContext';
import { ListsContext } from '../list/ListsContext';

const KEYCODE_ENTER = 13;
const KEYCODE_ESCAPE = 27;

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const { dispatch } = useContext(TasksContext);
  const { listState } = useContext(ListsContext);

  const upadteTitle = (event) => {
    setTitle(event.target.value);
  };

  const createTask = (event) => {
    console.log();
    if (event.keyCode === KEYCODE_ENTER) {
      event.preventDefault();
      if (event.target.value.trim().length > 0) {
        const newTask = {
          id: Math.random(),
          title: event.target.value,
          status: 'OPEN',
          important: listState.selectedList.id === -1,
          list: listState.selectedList || null,
        };
        dispatch({ type: 'add', payload: newTask });
        setTitle('');
      }
    } else if (event.keyCode === KEYCODE_ESCAPE) {
      setTitle('');
    }
  };

  return (
    <form>
      <input
        className="transparent-input"
        placeholder="New task..."
        maxLength="120"
        value={title}
        onChange={upadteTitle}
        onKeyDown={createTask}
      />
    </form>
  );
};

export default TaskForm;
