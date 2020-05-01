import React, { useState, useContext } from 'react';
import { ListsContext } from './ListsContext';
import ListsApi from './ListsApi';

const KEYCODE_ENTER = 13;
const KEYCODE_ESCAPE = 27;

const ListForm = () => {
  const { dispatch } = useContext(ListsContext);

  const [title, setTitle] = useState('');

  const upadteTitle = (event) => {
    setTitle(event.target.value);
  };

  const createList = async (event) => {
    if (event.keyCode === KEYCODE_ENTER) {
      event.preventDefault();
      if (event.target.value.trim().length > 0) {
        const successful = new ListsApi().create(event.target.value, dispatch);
        if (successful) {
          setTitle('');
        }
      }
    } else if (event.keyCode === KEYCODE_ESCAPE) {
      setTitle('');
    }
  };

  return (
    <form>
      <input
        className="transparent-input"
        placeholder="New list"
        maxLength="120"
        value={title}
        onChange={upadteTitle}
        onKeyDown={createList}
      />
    </form>
  );
};

export default ListForm;
