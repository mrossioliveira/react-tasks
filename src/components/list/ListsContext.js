import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import TOKEN from '../../token';

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

      // try to find last selected list
      let selectedList = lists.length > 2 ? lists[2] : lists[1];
      const lastListId = localStorage.getItem('selectedListId');
      if (lastListId !== null && lastListId !== undefined) {
        selectedList = lists.find((list) => list.id === parseInt(lastListId));
      }

      return {
        lists: lists,
        selectedList,
      };
    }

    case 'selectList':
      localStorage.setItem('selectedListId', action.payload);
      return {
        ...state,
        selectedList: state.lists.find((list) => list.id === action.payload),
      };

    case 'addList': {
      let updatedLists = [...state.lists];
      updatedLists.push(action.payload);

      return { ...state, lists: updatedLists, selectedList: action.payload };
    }

    case 'deleteList': {
      let updatedLists = [...state.lists].filter(
        (list) => list.id !== state.selectedList.id
      );

      // update selected list
      localStorage.setItem(
        'selectedListId',
        updatedLists[updatedLists.length - 1].id
      );

      return {
        ...state,
        lists: updatedLists,
        selectedList: updatedLists[updatedLists.length - 1],
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
