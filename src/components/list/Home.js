import React from 'react';
import './Home.css';

import Navbar from '../navbar/Navbar';

import { ListsProvider } from './ListsContext';
import { TasksProvider } from '../task/TasksContext';

import TaskView from '../task/TaskView';
import TaskEditSidebar from '../task-edit/TaskEditSidebar';

const Home = () => {
  return (
    <TasksProvider>
      <ListsProvider>
        <div className="container">
          <Navbar />
          <div className="content">
            <TaskView />
          </div>
          <TaskEditSidebar />
        </div>
      </ListsProvider>
    </TasksProvider>
  );
};

export default Home;