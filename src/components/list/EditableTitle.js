/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';

import './EditableInput.css';
import { ListsContext } from '../../contexts/ListsContext';
import ListService from '../../services/ListService';

const KEYCODE_ENTER = 13;
const KEYCODE_ESCAPE = 27;

const EditableInput = ({ list }) => {
  const [editTitle, setEditTitle] = useState('');
  const { dispatch } = useContext(ListsContext);

  useEffect(() => {
    if (list) {
      setEditTitle(list.title);
    }
  }, [list]);

  const updateTitle = (event) => {
    setEditTitle(event.target.value);
  };

  const saveTitle = () => {
    if (editTitle === '') {
      setEditTitle(list.title);
    } else {
      list.title = editTitle;
      new ListService().update(list, dispatch);
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === KEYCODE_ENTER) {
      event.preventDefault();
      saveTitle();
    } else if (event.keyCode === KEYCODE_ESCAPE) {
      setEditTitle(list.title);
    }
  };

  return (
    <>
      <input
        className="transparent-input"
        value={editTitle || ''}
        onChange={updateTitle}
        onBlur={saveTitle}
        onKeyDown={handleKeyDown}
        maxLength="80"
      />
    </>
  );
};

export default EditableInput;
