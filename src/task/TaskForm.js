import React, { useState, useContext } from 'react';
import { TasksContext } from './TasksContext';
import { ListsContext } from '../list/ListsContext';
import TasksApi from './TasksApi';

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
        let listId = null;
        if (listState.selectedList) {
          listId = listState.selectedList.id;
        }

        const payload = {
          title: event.target.value,
          description: '',
          status: 'OPEN',
          important: listId === -1,
          listId: listId > 0 ? listId : null,
        };

        const successful = new TasksApi().create(payload, dispatch);
        if (successful) {
          setTitle('');
        }
      }
    } else if (event.keyCode === KEYCODE_ESCAPE) {
      setTitle('');
    }
  };

  const style = {
    padding: '12px 16px',
    background: '#2f3234',
    color: 'rgb(199, 199, 199)',
    borderRadius: '4px',
  };

  return (
    <div style={style}>
      <form>
        <input
          className="transparent-input"
          placeholder="New task"
          maxLength="120"
          value={title}
          onChange={upadteTitle}
          onKeyDown={createTask}
        />
      </form>
    </div>
  );
};

export default TaskForm;
