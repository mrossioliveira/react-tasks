import api from './Api';

export default class ListService {
  async find() {
    try {
      // const headers = { Authorization: 'Bearer ' + getToken() };
      const URL = 'http://localhost:8090/lists';
      const response = await api.get(URL);
      return response.data;
    } catch (error) {
      console.error(error);
      this.dispatch({});
    }
  }

  async create(title, dispatch) {
    try {
      const URL = `http://localhost:3000/lists`;
      const response = await api.post(URL, { title });

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

      const URL = `http://localhost:3000/lists/${list.id}`;
      api.delete(URL);
    } catch (error) {
      console.log(error);
      // rollback changes
      dispatch({ type: 'deleteListError', payload: list });
    }
  }
}
