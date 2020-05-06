import axios from 'axios';
import { getToken } from './AuthService';

export default class ListService {
  async find() {
    try {
      const headers = { Authorization: 'Bearer ' + getToken() };
      const URL = 'http://localhost:8090/lists';

      const response = await axios.get(URL, { headers });
      return response.data;
    } catch (error) {
      console.error(error);
      this.dispatch({});
    }
  }

  async create(title, dispatch) {
    try {
      const headers = { Authorization: 'Bearer ' + getToken() };
      const URL = `http://localhost:3000/lists`;
      const response = await axios.post(URL, { title }, { headers });

      dispatch({ type: 'addList', payload: response.data });
      return response;
    } catch (error) {
      dispatch({ type: 'addListError' });
      return null;
    }
  }

  delete(list, dispatch) {
    try {
      // optimistic update
      dispatch({ type: 'deleteList', payload: list.id });

      const headers = { Authorization: 'Bearer ' + getToken() };
      const URL = `http://localhost:3000/lists/${list.id}`;
      axios.delete(URL, { headers });
    } catch (error) {
      console.log(error);
      // rollback changes
      dispatch({ type: 'deleteListError', payload: list });
    }
  }
}
