import React, { useContext } from 'react';
import './MenuItem.css';
import { ListsContext } from '../list/ListsContext';

const MenuItem = ({ id, title, counter }) => {
  const { listState, dispatch } = useContext(ListsContext);

  return (
    <div
      className={
        listState.selectedList.id === id ? 'item item-selected' : 'item'
      }
      onClick={() => dispatch({ type: 'select', payload: id })}
    >
      <div className="item-prefix">#</div>
      <div className="item-title">{title}</div>
      <div className="item-sufix">{counter > 0 ? counter : null}</div>
    </div>
  );
};

export default MenuItem;
