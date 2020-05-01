import axios from 'axios';

import TOKEN from '../token';

export default class TasksApi {
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
      this.dispatch({});
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
}
