import React, { useContext } from 'react';
import './Navbar.css';

import MenuItem from './MenuItem';
import MenuItemDivider from './MenuItemDivider';
import ListForm from '../list/ListForm';

import { ListsContext } from '../list/ListsContext';
import { TasksContext } from '../task/TasksContext';

const Navbar = () => {
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
          (task) => task.list === null && task.status === 'OPEN'
        ).length;
      }
    } else {
      // custom list
      list.counter = taskState.tasks
        .filter((task) => task.list !== null)
        .filter((task) => task.list.id === list.id).length;
    }
  });

  return (
    <div className="navbar">
      <div className="navbar-header">
        <div className="item-content">
          <input
            className="transparent-input"
            placeholder="Search"
            maxLength="120"
          />
        </div>
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
      </div>
      <MenuItemDivider />
      <div className="navbar-items">
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
      <MenuItemDivider />
      <div className="navbar-footer">
        <div className="item-content">
          <ListForm />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
