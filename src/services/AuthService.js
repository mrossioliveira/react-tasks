import api from './Api';
import * as jwt from 'jsonwebtoken';

export const getToken = () => localStorage.getItem('accessToken');

export const isAuthenticated = () => {
  const token = localStorage.getItem('accessToken');

  if (token === null || token === undefined) {
    return false;
  }

  if (!isExpired(token)) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    return true;
  }

  return false;
};

const isExpired = (token) => {
  const decodedToken = jwt.decode(token);
  return decodedToken.exp < Math.floor(Date.now() / 1000);
};
export class AuthService {
  async signIn(username, password) {
    try {
      const URL = `/auth/signin`;
      return await api.post(URL, { username, password });
    } catch (error) {
      if (error.message.indexOf('401') > 0) {
        throw new Error('Invalid Credentials');
      }
      throw error;
    }
  }

  async signUp(username, email, password) {
    try {
      const URL = `/auth/signup`;
      return await api.post(URL, { username, email, password });
    } catch (error) {
      if (error.message.indexOf('409') > 0) {
        throw new Error('Username/email already exists.');
      }
      throw error;
    }
  }
}
