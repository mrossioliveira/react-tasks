import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import TaskService from '../services/TaskService';

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

      let selectedTask = state.selectedTask;
      if (state.selectedTask) {
        if (state.selectedTask.id === action.payload.id) {
          selectedTask = updatedTask;
        }
      }

      return { ...state, tasks: updatedTasks, selectedTask };
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

      let selectedTask = state.selectedTask;
      if (state.selectedTask) {
        if (state.selectedTask.id === action.payload.id) {
          selectedTask = updatedTask;
        }
      }

      return { ...state, tasks: updatedTasks, selectedTask };
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

    case 'selectTask': {
      return { ...state, selectedTask: action.payload };
    }

    case 'unselectTask': {
      return { ...state, selectedTask: null };
    }

    case 'addTask': {
      let updatedTasks = [...state.tasks];
      updatedTasks.push(action.payload);
      return { ...state, tasks: updatedTasks };
    }

    case 'updateTask': {
      let updatedTasks = [...state.tasks];
      updatedTasks.splice(
        _getTaskIndex(state, action.payload),
        1,
        action.payload
      );

      return { ...state, tasks: updatedTasks };
    }

    case 'deleteTask': {
      let updatedTasks = [
        ...state.tasks.filter((task) => task.id !== state.selectedTask.id),
      ];
      return { ...state, tasks: updatedTasks, selectedTask: null };
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
    selectedTask: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * Loads all lists
   */
  useEffect(() => {
    async function loadData() {
      dispatch({ type: 'load' });
      var api = new TaskService();
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
