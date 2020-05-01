import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

import TasksApi from './TasksApi';

function _getTaskIndex(state, task) {
  const index = state.tasks.map((it) => it.id).indexOf(task.id);
  return index;
}

function reducer(state, action) {
  switch (action.type) {
    case 'load':
      return { ...state, loading: true };
    case 'load_success':
      return { ...state, loading: false, tasks: action.payload };
    case 'load_failure':
      return { ...state, loading: false };

    case 'updateImportant': {
      const updatedTask = {
        ...action.payload,
        important: action.payload.important ? false : true,
      };

      let updatedTasks = [...state.tasks];
      updatedTasks.splice(_getTaskIndex(state, action.payload), 1, updatedTask);

      return { ...state, tasks: updatedTasks };
    }

    case 'updateImportantError': {
      let updatedTasks = [...state.tasks];
      updatedTasks.splice(
        _getTaskIndex(state, action.payload),
        1,
        action.payload
      );

      return { ...state, tasks: updatedTasks };
    }

    case 'updateStatus': {
      const updatedTask = {
        ...action.payload,
        status: action.payload.status === 'OPEN' ? 'DONE' : 'OPEN',
      };

      let updatedTasks = [...state.tasks];
      updatedTasks.splice(_getTaskIndex(state, action.payload), 1, updatedTask);

      return { ...state, tasks: updatedTasks };
    }

    case 'updateStatusError': {
      let updatedTasks = [...state.tasks];
      updatedTasks.splice(
        _getTaskIndex(state, action.payload),
        1,
        action.payload
      );

      return { ...state, tasks: updatedTasks };
    }

    case 'addTask': {
      let updatedTasks = [...state.tasks];
      updatedTasks.push(action.payload);
      return { ...state, tasks: updatedTasks };
    }

    default:
      throw new Error(`TasksContext: ${action.type} is not a valid action`);
  }
}

export const TasksContext = React.createContext();

export const TasksProvider = (props) => {
  const initialState = {
    loading: true,
    tasks: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * Loads all lists
   */
  useEffect(() => {
    async function loadData() {
      dispatch({ type: 'load' });
      var api = new TasksApi();
      // get all lists and tasks
      const tasks = await api.find();

      // load lists
      dispatch({ type: 'load_success', payload: tasks });
    }
    loadData();
  }, []);

  return (
    <TasksContext.Provider value={{ taskState: state, dispatch }}>
      {props.children}
    </TasksContext.Provider>
  );
};

TasksProvider.propTypes = {
  children: PropTypes.object,
};
