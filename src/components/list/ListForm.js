import React, { useState, useContext } from 'react';
import { ListsContext } from './ListsContext';
import ListService from '../../services/ListService';
import { useHistory } from 'react-router-dom';

const KEYCODE_ENTER = 13;
const KEYCODE_ESCAPE = 27;

const ListForm = () => {
  const history = useHistory();
  const { dispatch } = useContext(ListsContext);

  const [title, setTitle] = useState('');

  const upadteTitle = (event) => {
    setTitle(event.target.value);
  };

  const createList = async (event) => {
    if (event.keyCode === KEYCODE_ENTER) {
      event.preventDefault();
      if (event.target.value.trim().length > 0) {
        const response = await new ListService().create(
          event.target.value,
          dispatch
        );
        if (response.status === 201) {
          setTitle('');
          history.push(`/tasks/${response.data.id}`);
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
