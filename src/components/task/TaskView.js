import React, { useContext } from 'react';
import { TasksContext } from './TasksContext';
import { ListsContext } from '../list/ListsContext';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './TaskView.css';
import VerticalSpacer from '../../components/VerticalSpacer';
import ListService from '../../services/ListService';
import { useParams } from 'react-router-dom';

const TaskView = () => {
  const { id } = useParams();

  const { dispatch: taskDispatch, taskState } = useContext(TasksContext);
  const { dispatch: listDispatch, listState } = useContext(ListsContext);

  let titleStyle = 'list-view-title';
  let tasks = [];
  if (id === 'important') {
    // important
    titleStyle = 'list-view-title color-accent';
    tasks = [...taskState.tasks.filter((task) => task.important)];
  } else if (id === 'default') {
    // tasks
    titleStyle = 'list-view-title color-primary';
    tasks = [
      ...taskState.tasks.filter(
        (task) => task.list === null || task.list === undefined
      ),
    ];
  } else {
    // user list
    tasks = [
      ...taskState.tasks
        .filter((task) => task.list !== null && task.list !== undefined)
        .filter((task) => task.list.id === parseInt(id)),
    ];
  }

  const onListDelete = () => {
    if (
      window.confirm(
        'Are you sure you want to delete this list and all its tasks?'
      )
    ) {
      new ListService().delete(listState.selectedList, listDispatch);
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

  const getTitle = () => {
    if (id === 'important') {
      return 'Important';
    } else if (id === 'default') {
      return 'Tasks';
    } else {
      const list = listState.lists.find((list) => list.id === parseInt(id));
      if (list) {
        return list.title;
      }
    }
    return 'Untitled list';
  };

  return (
    <div
      style={containerStyle}
      onClick={() => taskDispatch({ type: 'unselectTask' })}
    >
      <div className="list-view-header">
        <div className={titleStyle}>{getTitle()}</div>
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
