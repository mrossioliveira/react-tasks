/* eslint-disable react/prop-types */
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/list/Home';
import Login from './pages/Login';
import { isAuthenticated } from './auth/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute path="/" exact component={() => <Home />} />
      <Route path="/login" component={() => <Login />} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
