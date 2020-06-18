import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getToken } from '../services/AuthService';

const IMPORTANT_KEY = -1;
const TASKS_KEY = -2;

const initialState = {
  lists: [],
};

function _getListIndex(state, list) {
  return state.lists.map((it) => it.id).indexOf(list.id);
}

function reducer(state, action) {
  switch (action.type) {
    case 'load': {
      return {
        lists: action.payload,
      };
    }

    case 'addList': {
      let updatedLists = [...state.lists];
      updatedLists.push(action.payload);

      return { ...state, lists: updatedLists };
    }

    case 'deleteList': {
      let updatedLists = [...state.lists].filter(
        (list) => list.id !== action.payload
      );

      return {
        ...state,
        lists: updatedLists,
      };
    }

    case 'updateList': {
      let updatedLists = [...state.lists];
      updatedLists.splice(
        _getListIndex(state, action.payload),
        1,
        action.payload
      );

      return {
        ...state,
        lists: updatedLists,
      };
    }

    default:
      throw new Error('ListsContext: Invalid action');
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
        const headers = {
          Authorization: 'Bearer ' + getToken(),
        };
        const LISTS_URL = 'http://localhost:3000/lists';

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
