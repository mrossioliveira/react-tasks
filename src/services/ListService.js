import api from './Api';

export default class ListService {
  async find() {
    try {
      // const headers = { Authorization: 'Bearer ' + getToken() };
      const URL = '/lists';
      const response = await api.get(URL);
      return response.data;
    } catch (error) {
      console.error(error);
      this.dispatch({});
    }
  }

  async create(title, dispatch) {
    try {
      const URL = `/lists`;
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

      const URL = `/lists/${list.id}`;
      api.delete(URL);
    } catch (error) {
      console.log(error);
      // rollback changes
      dispatch({ type: 'deleteListError', payload: list });
    }
  }

  async update(list, dispatch) {
    try {
      // optimistic update
      dispatch({ type: 'updateList', payload: list });

      const URL = `/lists/${list.id}`;
      api.patch(URL, { title: list.title });
    } catch (error) {
      console.log(error);
      // rollback changes
      dispatch({ type: 'updateListError', payload: list });
    }
  }
}
