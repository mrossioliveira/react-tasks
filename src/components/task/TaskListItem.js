import React, { useContext } from 'react';
import './TaskListItem.css';
import TaskItemStatus from './TaskItemStatus';
import TaskItemImportant from './TaskItemImportant';
import PropTypes from 'prop-types';
import { ListsContext } from '../list/ListsContext';
import { TasksContext } from './TasksContext';

const TaskListItem = ({ task }) => {
  const { taskState, dispatch: tasksDispatch } = useContext(TasksContext);
  const { listState, dispatch: listsDispatch } = useContext(ListsContext);

  function onTaskSelect(e) {
    e.stopPropagation();
    tasksDispatch({ type: 'selectTask', payload: task });
  }

  var isSelected = false;
  if (taskState.selectedTask) {
    if (taskState.selectedTask.id === task.id) {
      isSelected = true;
    }
  }

  return (
    <div
      className={
        isSelected ? 'task-list-item task-list-item-selected' : 'task-list-item'
      }
      onClick={onTaskSelect}
    >
      <div className="task-list-item-prefix">
        <TaskItemStatus task={task} />
      </div>
      <div className="task-list-item-content">
        <span className={task.status === 'DONE' ? 'strike' : null}>
          {task.title}
        </span>
        <br />

        {listState.selectedList && listState.selectedList.id === -1 ? (
          <small
            className="task-list-item-list-selector color-darker"
            onClick={() =>
              listsDispatch({
                type: 'selectList',
                payload: task.list ? task.list.id : -2,
              })
            }
          >
            {task.list ? task.list.title : 'Tasks'}
          </small>
        ) : null}
      </div>
      <div className="task-list-item-content-spacer"></div>
      <div className="task-list-item-sufix">
        <TaskItemImportant task={task} />
      </div>
    </div>
  );
};

TaskListItem.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskListItem;
