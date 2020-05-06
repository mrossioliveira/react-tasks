import React from 'react';
import './MenuItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const MenuItem = ({ id, title, counter }) => {
  const history = useHistory();

  const getIcon = () => {
    let icon = {
      type: 'fas',
      icon: 'tasks',
      color: 'color-darker',
    };

    if (id === -1) {
      icon = { ...icon, icon: 'star', color: 'color-accent' };
    } else if (id === -2) {
      icon = { type: 'far', icon: 'circle', color: 'color-primary' };
    }

    return icon;
  };

  const getSlug = () => {
    if (id === -1) {
      return 'important';
    } else if (id === -2) {
      return 'default';
    } else {
      return id;
    }
  };

  const onSelect = () => {
    history.push(`/tasks/${getSlug()}`);
  };

  return (
    <div className="item" onClick={onSelect}>
      <div className="item-prefix">
        <FontAwesomeIcon
          icon={[getIcon().type, getIcon().icon]}
          size="lg"
          className={getIcon().color}
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
