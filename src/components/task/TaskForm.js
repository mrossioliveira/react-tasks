import React, { useState, useContext } from 'react';
import { TasksContext } from '../../contexts/TasksContext';
import TaskService from '../../services/TaskService';
import { useParams } from 'react-router-dom';

const KEYCODE_ENTER = 13;
const KEYCODE_ESCAPE = 27;

const TaskForm = () => {
  const { id: slug } = useParams();
  const [title, setTitle] = useState('');
  const { dispatch } = useContext(TasksContext);

  const upadteTitle = (event) => {
    setTitle(event.target.value);
  };

  const getListId = () => {
    try {
      return parseInt(slug);
    } catch (error) {
      return null;
    }
  };

  const createTask = (event) => {
    if (event.keyCode === KEYCODE_ENTER) {
      event.preventDefault();
      if (event.target.value.trim().length > 0) {
        const payload = {
          title: event.target.value,
          description: '',
          status: 'OPEN',
          important: slug === 'important',
          listId: getListId(),
        };

        const successful = new TaskService().create(payload, dispatch);
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
