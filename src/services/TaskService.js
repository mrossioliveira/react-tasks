import axios from 'axios';
import TOKEN from '../token';

export default class TaskService {
  async find() {
    // get all lists and tasks
    try {
      const headers = { Authorization: 'Bearer ' + TOKEN };
      const URL = 'http://localhost:8090/tasks';

      // custom user lists
      const response = await axios.get(URL, { headers });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async create(task, dispatch) {
    try {
      const headers = { Authorization: 'Bearer ' + TOKEN };
      const URL = `http://localhost:3000/tasks`;
      const response = await axios.post(URL, task, { headers });

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

      const headers = { Authorization: 'Bearer ' + TOKEN };
      const URL = `http://localhost:3000/tasks/${task.id}`;

      await axios.patch(URL, task, { headers });
    } catch (error) {
      // rollback to unchanged task
      dispatch({ type: 'updateImportantError', payload: task });
    }
  }

  async updateImportant(task, dispatch) {
    try {
      const headers = { Authorization: 'Bearer ' + TOKEN };
      const URL = `http://localhost:3000/tasks/${task.id}/important`;

      const payload = {
        important: task.important ? 'false' : 'true',
      };
      await axios.patch(URL, payload, { headers });
    } catch (error) {
      // rollback to unchanged task
      dispatch({ type: 'updateImportantError', payload: task });
    }
  }

  async updateStatus(task, dispatch) {
    try {
      const headers = { Authorization: 'Bearer ' + TOKEN };
      const URL = `http://localhost:3000/tasks/${task.id}/status`;

      const payload = {
        status: task.status === 'OPEN' ? 'DONE' : 'OPEN',
      };
      await axios.patch(URL, payload, { headers });
    } catch (error) {
      // rollback to unchanged task
      dispatch({ type: 'updateStatusError', payload: task });
    }
  }

  delete(task, dispatch) {
    try {
      const headers = { Authorization: 'Bearer ' + TOKEN };
      const URL = `http://localhost:3000/tasks/${task.id}`;

      axios.delete(URL, { headers });
    } catch (error) {
      // rollback to unchanged task
      dispatch({ type: 'deleteTaskError', payload: task });
    }
  }
}
