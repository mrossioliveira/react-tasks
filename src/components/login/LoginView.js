import React from 'react';
import LoginCard from './LoginCard';

import './LoginView.css';
import { useHistory } from 'react-router-dom';

const LoginView = () => {
  const history = useHistory();

  return (
    <div className="login-container bg-darker">
      <LoginCard />
      <br />
      <p>
        Don't have an account?&nbsp;
        <span
          className="login-signup-link"
          onClick={() => history.push('/signup')}
        >
          Sign up!
        </span>
      </p>
    </div>
  );
};

export default LoginView;
