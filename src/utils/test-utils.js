/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { TasksContext } from '../contexts/TasksContext';
import { ListsContext } from '../contexts/ListsContext';

export const listState = {
  lists: [
    {
      id: -1,
      title: 'Tasks',
      counter: 1,
    },
    {
      id: 1,
      title: 'Test list',
      counter: 1,
    },
  ],
};

export const taskState = {
  tasks: [],
};

const AllTheProviders = ({ children }) => {
  return (
    <MemoryRouter>
      <TasksContext.Provider value={{ taskState }}>
        <ListsContext.Provider value={{ listState }}>
          {children}
        </ListsContext.Provider>
      </TasksContext.Provider>
    </MemoryRouter>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
