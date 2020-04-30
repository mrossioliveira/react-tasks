import React, { useContext } from 'react';
import { TasksContext } from './TasksContext';
import { ListsContext } from '../list/ListsContext';
import TaskList from './TaskList';

const TaskView = () => {
  const { taskState } = useContext(TasksContext);
  const { listState } = useContext(ListsContext);

  let tasks = [];
  if (listState.selectedList) {
    if (listState.selectedList.id < 0) {
      if (listState.selectedList.id === -1) {
        // important
        tasks = [...taskState.tasks.filter((task) => task.important)];
      } else {
        // tasks
        tasks = [...taskState.tasks.filter((task) => task.list === null)];
      }
    } else {
      // user list
      tasks = [
        ...taskState.tasks
          .filter((task) => task.list !== null)
          .filter((task) => task.list.id === listState.selectedList.id),
      ];
    }
  }

  return (
    <React.Fragment>
      <div className="list-view-title">
        {listState.selectedList && listState.selectedList.title}
      </div>
      {taskState.loading ? (
        <div>...loading</div>
      ) : (
        <TaskList tasks={tasks} list={listState.selectedList} />
      )}
    </React.Fragment>
  );
};

export default TaskView;
