import React, { useContext } from 'react';
import { TasksContext } from './TasksContext';
import { ListsContext } from '../list/ListsContext';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './TaskView.css';
import ListsApi from '../list/ListsApi';
import VerticalSpacer from '../components/VerticalSpacer';

const TaskView = () => {
  const { dispatch: taskDispatch, taskState } = useContext(TasksContext);
  const { dispatch: listDispatch, listState } = useContext(ListsContext);

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
        tasks = [
          ...taskState.tasks.filter(
            (task) => task.list === null || task.list === undefined
          ),
        ];
      }
    } else {
      // user list
      tasks = [
        ...taskState.tasks
          .filter((task) => task.list !== null && task.list !== undefined)
          .filter((task) => task.list.id === listState.selectedList.id),
      ];
    }
  }

  const onListDelete = () => {
    if (
      window.confirm(
        'Are you sure you want to delete this list and all its tasks?'
      )
    ) {
      new ListsApi().delete(listState.selectedList, listDispatch);
    }
  };

  const containerStyle = {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
    maxHeight: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
  };

  return (
    <div
      style={containerStyle}
      onClick={() => taskDispatch({ type: 'unselectTask' })}
    >
      <div className="list-view-header">
        <div className={titleStyle}>
          {listState.selectedList && listState.selectedList.title}
        </div>
        {listState.selectedList && listState.selectedList.id > 0 && (
          <div className="list-view-header-action" onClick={onListDelete}>
            <FontAwesomeIcon
              className="task-edit-sidebar-icon"
              icon="trash-alt"
            />
          </div>
        )}
      </div>
      {taskState.loading ? (
        <div>...loading</div>
      ) : (
        <TaskList tasks={tasks} list={listState.selectedList} />
      )}
      <div className="flex-spacer"></div>
      <div className="mb-16">
        <VerticalSpacer />
      </div>
      <TaskForm />
    </div>
  );
};

export default TaskView;
