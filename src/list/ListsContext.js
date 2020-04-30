import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import TOKEN from '../token';

const IMPORTANT_KEY = -1;
const TASKS_KEY = -2;

const initialState = {
  lists: [],
  selectedList: { id: 0 },
};

function reducer(state, action) {
  switch (action.type) {
    case 'load': {
      const lists = action.payload;

      return {
        lists: lists,
        selectedList: lists.length > 2 ? lists[2] : lists[1],
      };
    }

    case 'select':
      return {
        ...state,
        selectedList: state.lists.find((list) => list.id === action.payload),
      };

    case 'add': {
      let updatedLists = [...state.lists];
      const newList = { id: Math.random(), title: action.payload, counter: 0 };
      updatedLists.push(newList);

      return { ...state, lists: updatedLists, selectedList: newList };
    }

    default:
      throw new Error('Invalid action');
  }
}

export const ListsContext = React.createContext();

export const ListsProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * Loads all lists then selects one
   */
  useEffect(() => {
    async function loadData() {
      // get all lists and tasks
      try {
        const headers = { Authorization: 'Bearer ' + TOKEN };
        const LISTS_URL = 'http://localhost:8090/lists';

        // system lists (important and tasks)
        let lists = [
          { id: IMPORTANT_KEY, title: 'Important', counter: 0 },
          { id: TASKS_KEY, title: 'Tasks', counter: 0 },
        ];

        // custom user lists
        const response = await axios.get(LISTS_URL, { headers });
        const userLists = response.data;
        userLists.forEach((list) => {
          lists.push(list);
        });

        // load lists
        dispatch({ type: 'load', payload: lists });
      } catch (error) {
        console.error(error);
      }
    }
    loadData();
  }, []);

  return (
    <ListsContext.Provider
      value={{
        listState: state,
        dispatch,
      }}
    >
      {props.children}
    </ListsContext.Provider>
  );
};

ListsProvider.propTypes = {
  children: PropTypes.object,
};
