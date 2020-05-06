/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Navbar from '../components/navbar/Navbar';
import TaskEditSidebar from '../components/task-edit/TaskEditSidebar';

import './Home.css';
import { TasksProvider } from '../components/task/TasksContext';
import { ListsProvider } from '../components/list/ListsContext';

export default class Home extends Component {
  render() {
    return (
      <TasksProvider>
        <ListsProvider>
          <div className="container">
            <Navbar />
            <div className="content">{this.props.children}</div>
            <TaskEditSidebar />
          </div>
        </ListsProvider>
      </TasksProvider>
    );
  }
}
