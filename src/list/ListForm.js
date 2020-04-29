import React, { useState, useContext } from 'react';
import { ListsContext } from './ListsContext';

const KEYCODE_ENTER = 13;
const KEYCODE_ESCAPE = 27;

const ListForm = () => {
  const [title, setTitle] = useState('');
  const { dispatch } = useContext(ListsContext);

  const upadteTitle = (event) => {
    setTitle(event.target.value);
  };

  const createList = (event) => {
    if (event.keyCode === KEYCODE_ENTER) {
      event.preventDefault();
      dispatch({ type: 'add', payload: event.target.value });
      setTitle('');
    } else if (event.keyCode === KEYCODE_ESCAPE) {
      setTitle('');
    }
  };

  return (
    <form>
      <input
        className="transparent-input"
        placeholder="Add a list"
        maxLength="120"
        value={title}
        onChange={upadteTitle}
        onKeyDown={createList}
      />
    </form>
  );
};

export default ListForm;
