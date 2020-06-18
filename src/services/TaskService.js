import api from './Api';

export default class TaskService {
  async find() {
    // get all lists and tasks
    try {
      const URL = 'http://localhost:3000/tasks';

      // custom user lists
      const response = await api.get(URL);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async create(task, dispatch) {
    try {
      const URL = `http://localhost:3000/tasks`;
      const response = await api.post(URL, task);

      dispatch({ type: 'addTask', payload: response.data });
      return true;
    } catch (error) {
      dispatch({ type: 'addTaskError' });
      return false;
    }
  }

  async update(task, dispatch) {
    try {
      dispatch({ type: 'updateTask', payload: task });

      const URL = `http://localhost:3000/tasks/${task.id}`;
      await api.patch(URL, task);
    } catch (error) {
      // rollback to unchanged task
      dispatch({ type: 'updateImportantError', payload: task });
    }
  }

  async updateImportant(task, dispatch) {
    try {
      const URL = `http://localhost:3000/tasks/${task.id}/important`;
      const payload = {
        important: task.important ? 'false' : 'true',
      };
      await api.patch(URL, payload);
    } catch (error) {
      // rollback to unchanged task
      dispatch({ type: 'updateImportantError', payload: task });
    }
  }

  async updateStatus(task, dispatch) {
    try {
      const URL = `http://localhost:3000/tasks/${task.id}/status`;
      const payload = {
        status: task.status === 'OPEN' ? 'DONE' : 'OPEN',
      };
      await api.patch(URL, payload);
    } catch (error) {
      // rollback to unchanged task
      dispatch({ type: 'updateStatusError', payload: task });
    }
  }

  delete(task, dispatch) {
    try {
      const URL = `http://localhost:3000/tasks/${task.id}`;

      api.delete(URL);
    } catch (error) {
      // rollback to unchanged task
      dispatch({ type: 'deleteTaskError', payload: task });
    }
  }
}
