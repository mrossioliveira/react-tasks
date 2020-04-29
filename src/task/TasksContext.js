import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

import TOKEN from '../token';

const initialState = {
  tasks: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'load':
      return { tasks: action.payload };

    default:
      throw new Error('TaskContext invalid action');
  }
}

export const TasksContext = React.createContext();

export const TasksProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * Loads all lists
   */
  useEffect(() => {
    async function loadData() {
      // get all lists and tasks
      try {
        const headers = { Authorization: 'Bearer ' + TOKEN };
        const URL = 'http://localhost:8090/tasks';

        // custom user lists
        const response = await axios.get(URL, { headers });

        // load lists
        dispatch({ type: 'load', payload: response.data });
      } catch (error) {
        console.error(error);
      }
    }
    loadData();
  }, []);

  return (
    <TasksContext.Provider value={{ taskState: state }}>
      {props.children}
    </TasksContext.Provider>
  );
};
