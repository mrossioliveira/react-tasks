import axios from 'axios';
import TOKEN from '../token';

export default class AuthService {
  async signIn(username, password) {
    try {
      const headers = { Authorization: 'Bearer ' + TOKEN };
      const URL = `http://localhost:3000/auth/signin`;
      return await axios.post(URL, { username, password }, { headers });
    } catch (error) {
      if (error.message.indexOf('401') > 0) {
        throw new Error('Invalid Credentials');
      }
      throw error;
    }
  }
}
