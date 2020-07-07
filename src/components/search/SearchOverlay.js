import React, { useContext } from 'react';
import './SearchOverlay.css';
import { TasksContext } from '../../contexts/TasksContext';
import TaskList from '../task/TaskList';

const SearchOverlay = () => {
  const { taskState } = useContext(TasksContext);

  console.log(taskState);

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
            {_getFilteredTasks().length > 0 ? (
              <span className="color-primary">Found results for</span>
            ) : (
              <span className="color-danger">No results for</span>
            )}{' '}
            <span>{taskState.searchQuery}</span>
          </div>
          <TaskList tasks={_getFilteredTasks()} />
        </div>
      )}
    </>
  );
};

export default SearchOverlay;
