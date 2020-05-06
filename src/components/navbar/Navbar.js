import React, { useContext } from 'react';
import './Navbar.css';

import MenuItem from './MenuItem';
import MenuItemDivider from './MenuItemDivider';
import ListForm from '../list/ListForm';

import { ListsContext } from '../list/ListsContext';
import { TasksContext } from '../task/TasksContext';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
  const history = useHistory();

  const { listState } = useContext(ListsContext);
  const { taskState } = useContext(TasksContext);

  listState.lists.forEach((list) => {
    if (list.id < 0) {
      if (list.id === -1) {
        // important
        list.counter = taskState.tasks.filter(
          (task) => task.important && task.status === 'OPEN'
        ).length;
      } else {
        // tasks
        list.counter = taskState.tasks.filter(
          (task) =>
            (task.list === null || task.list === undefined) &&
            task.status === 'OPEN'
        ).length;
      }
    } else {
      // custom list
      list.counter = taskState.tasks
        .filter((task) => task.list !== null && task.list !== undefined)
        .filter((task) => task.list.id === list.id)
        .filter((task) => task.status === 'OPEN').length;
    }
  });

  const onProfile = () => {
    history.push('/profile');
  };

  const isProfile = () => {
    return history.location.pathname.indexOf('profile') > 0;
  };

  return (
    <div className="navbar">
      <div className="navbar-header">
        <input
          className="transparent-input"
          placeholder="Search"
          maxLength="120"
        />
      </div>

      <div className="navbar-items">
        {listState.lists
          .filter((list) => list.id < 0)
          .map((list) => (
            <MenuItem
              key={list.id}
              id={list.id}
              title={list.title}
              counter={list.counter}
            />
          ))}
        <MenuItemDivider />
        {listState.lists
          .filter((list) => list.id > 0)
          .map((list) => (
            <MenuItem
              key={list.id}
              id={list.id}
              title={list.title}
              counter={list.counter}
            />
          ))}
      </div>
      <div className="navbar-spacer"></div>
      <div
        className={isProfile() ? 'item item-selected' : 'item'}
        onClick={onProfile}
      >
        <div className="item-prefix">
          <FontAwesomeIcon
            icon="user-astronaut"
            size="lg"
            className="color-primary"
          />
        </div>
        <div className="item-title">
          <strong>mrossioliveira</strong>
        </div>
      </div>

      <MenuItemDivider />
      <div className="navbar-footer">
        <div className="navbar-footer-form">
          <ListForm />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
