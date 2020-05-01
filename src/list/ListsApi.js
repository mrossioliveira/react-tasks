import axios from 'axios';

import TOKEN from '../token';

export default class ListsApi {
  async find() {
    try {
      const headers = { Authorization: 'Bearer ' + TOKEN };
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
      const headers = { Authorization: 'Bearer ' + TOKEN };
      const URL = `http://localhost:3000/lists`;
      const response = await axios.post(URL, { title }, { headers });

      console.log(response.data);

      dispatch({ type: 'addList', payload: response.data });
      return true;
    } catch (error) {
      dispatch({ type: 'addListError' });
      return false;
    }
  }
}
