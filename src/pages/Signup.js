import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import './Signup.css';
import api from '../services/Api';

const SignUp = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const updateUsername = (event) => {
    setUsername(event.target.value);
  };

  const updateEmail = (event) => {
    setEmail(event.target.value);
  };

  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await new AuthService().signUp(
        username,
        email,
        password
      );
      if (response.status === 201) {
        // auto login
        const loginResponse = await new AuthService().signIn(
          username,
          password
        );
        if (loginResponse.status === 201) {
          localStorage.setItem('accessToken', loginResponse.data.accessToken);
          localStorage.setItem('refreshToken', loginResponse.data.refreshToken);
          localStorage.setItem('username', loginResponse.data.username);
          api.defaults.headers.Authorization = `Bearer ${loginResponse.data.accessToken}`;
          setLoading(false);
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
    <div className="login-container bg-darker">
      <div className="signup-card bg-dark">
        <h2>.sign up!</h2>
        <form onSubmit={(event) => onFormSubmit(event)}>
          <div className="signup-input-container">
            <input
              autoFocus
              className="transparent-input"
              placeholder="username"
              maxLength="120"
              value={username}
              onChange={updateUsername}
            />
          </div>
          <div className="signup-input-container">
            <input
              className="transparent-input"
              placeholder="email"
              maxLength="120"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className="signup-input-container">
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
            {loading ? 'Loading...' : 'Sign up'}
          </button>
          {error && <div className="mt-16 color-danger">{error.message}</div>}
        </form>
      </div>
      <p>
        Already have an account?&nbsp;
        <span
          className="login-signup-link"
          onClick={() => history.push('/login')}
        >
          Sign up!
        </span>
      </p>
    </div>
  );
};

export default SignUp;
