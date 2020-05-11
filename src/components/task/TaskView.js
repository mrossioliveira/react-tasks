import React, { useContext } from 'react';
import { ListsContext } from '../../contexts/ListsContext';
import { TasksContext } from '../../contexts/TasksContext';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './TaskView.css';
import VerticalSpacer from '../../components/VerticalSpacer';
import ListService from '../../services/ListService';
import { useParams, useHistory } from 'react-router-dom';

const TaskView = () => {
  const { id } = useParams();
  const history = useHistory();

  const { dispatch: taskDispatch, taskState } = useContext(TasksContext);
  const { dispatch: listDispatch, listState } = useContext(ListsContext);

  let canDelete = false;
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
    canDelete = true;
    // user list
    tasks = [
      ...taskState.tasks
        .filter((task) => task.list !== null && task.list !== undefined)
        .filter((task) => task.list.id === parseInt(id)),
    ];
  }

  const _getList = () =>
    listState.lists.find((list) => list.id === parseInt(id));

  const onListDelete = () => {
    const list = _getList();
    console.log(listState.lists);
    console.log(list);
    if (
      window.confirm(
        'Are you sure you want to delete this list and all its tasks?'
      )
    ) {
      new ListService().delete(list, listDispatch);
      history.push('/tasks/default');
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
        {canDelete && (
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
