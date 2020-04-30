import React, { useContext } from 'react';
import './MenuItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ListsContext } from '../list/ListsContext';
import PropTypes from 'prop-types';

const MenuItem = ({ id, title, counter }) => {
  const { listState, dispatch } = useContext(ListsContext);

  let icon = {
    type: 'fas',
    icon: 'list',
  };
  let iconColor = 'color-darker';

  if (id === -1) {
    icon = { ...icon, icon: 'star' };
    iconColor = 'color-accent';
  } else if (id === -2) {
    icon = { type: 'far', icon: 'circle' };
    iconColor = 'color-primary';
  }

  return (
    <div
      className={
        listState.selectedList.id === id ? 'item item-selected' : 'item'
      }
      onClick={() => dispatch({ type: 'select', payload: id })}
    >
      <div className="item-prefix">
        <FontAwesomeIcon
          icon={[icon.type, icon.icon]}
          size="lg"
          className={iconColor}
        />
      </div>
      <div className="item-title">{title}</div>
      <div className="item-sufix">{counter > 0 ? counter : null}</div>
    </div>
  );
};

MenuItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  counter: PropTypes.number,
};

export default MenuItem;
