import React, { useState } from 'react';
import { AuthService } from '../../services/AuthService';
import { useHistory } from 'react-router-dom';

const LoginCard = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const updateUsername = (event) => {
    setUsername(event.target.value);
  };

  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const response = await new AuthService().signIn(username, password);
      if (response.status === 201) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        setLoading(false);
        history.push('/');
      }
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div className="login-card bg-dark">
      <h2>.tasks</h2>
      <div className="login-input-container">
        <input
          autoFocus
          className="transparent-input"
          placeholder="username"
          maxLength="120"
          value={username}
          onChange={updateUsername}
        />
      </div>
      <div className="login-input-container">
        <input
          type="password"
          className="transparent-input"
          placeholder="password"
          maxLength="120"
          value={password}
          onChange={updatePassword}
        />
      </div>
      <button
        disabled={username.length === 0 || password.length === 0}
        type="submit"
        className="app-button bg-primary"
        onClick={onSubmit}
      >
        {loading ? 'Loading...' : 'Sign in'}
      </button>
      {error && <div className="mt-16 color-danger">{error.message}</div>}
    </div>
  );
};

export default LoginCard;
