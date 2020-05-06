/* eslint-disable react/prop-types */
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

  const onFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await new AuthService().signIn(username, password);
      if (response.status === 201) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        setLoading(false);
        const next = history.location.state
          ? history.location.state.from
          : undefined;
        if (next) {
          history.push(next);
        } else {
          history.push('/tasks/default');
        }
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
      <form onSubmit={(event) => onFormSubmit(event)}>
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
          disabled={username.length < 8 || password.length < 8}
          type="submit"
          className="app-button bg-primary"
        >
          {loading ? 'Loading...' : 'Sign in'}
        </button>
        {error && <div className="mt-16 color-danger">{error.message}</div>}
      </form>
    </div>
  );
};

export default LoginCard;
