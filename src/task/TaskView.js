import React, { useContext } from 'react';
import { TasksContext } from './TasksContext';
import { ListsContext } from '../list/ListsContext';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import MenuItemDivider from '../navbar/MenuItemDivider';
import VerticalSpacer from '../components/VerticalSpacer';

const TaskView = () => {
  const { taskState } = useContext(TasksContext);
  const { listState } = useContext(ListsContext);

  let titleStyle = 'list-view-title';

  let tasks = [];
  if (listState.selectedList) {
    if (listState.selectedList.id < 0) {
      if (listState.selectedList.id === -1) {
        // important
        titleStyle = 'list-view-title color-accent';
        tasks = [...taskState.tasks.filter((task) => task.important)];
      } else {
        // tasks
        titleStyle = 'list-view-title color-primary';
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
      <div className={titleStyle}>
        {listState.selectedList && listState.selectedList.title}
      </div>
      {taskState.loading ? (
        <div>...loading</div>
      ) : (
        <TaskList tasks={tasks} list={listState.selectedList} />
      )}
      <MenuItemDivider />
      <VerticalSpacer />
      <TaskForm />
    </React.Fragment>
  );
};

export default TaskView;
