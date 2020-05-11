import React, { useContext } from 'react';
import './SearchOverlay.css';
import { TasksContext } from '../../contexts/TasksContext';
import TaskList from '../task/TaskList';

const SearchOverlay = () => {
  const { taskState } = useContext(TasksContext);

  const _getFilteredTasks = () => {
    if (taskState.searchQuery !== null) {
      return taskState.tasks.filter(
        (task) =>
          task.title
            .toUpperCase()
            .indexOf(taskState.searchQuery.toUpperCase()) !== -1
      );
    }
    return [];
  };

  return (
    <>
      {taskState.searchQuery !== null && (
        <div className="search-container ">
          <div className="list-view-title">
            {_getFilteredTasks().length > 0 ? 'Filter results ' : 'No results '}{' '}
            for: <span className="color-primary">{taskState.searchQuery}</span>
          </div>
          <TaskList tasks={_getFilteredTasks()} />
        </div>
      )}
    </>
  );
};

export default SearchOverlay;
