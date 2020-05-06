/* eslint-disable react/prop-types */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Login from './pages/Login';

import { isAuthenticated } from './services/AuthService';
import TaskView from './components/task/TaskView';
import Home from './pages/Home';
import Profile from './pages/Profile';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: `/login`,
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const Routes = () => (
  <Router>
    <Switch>
      {/* Root with redirect logic */}
      <Route path="/" exact>
        {isAuthenticated() ? (
          <Redirect from="/" to="/tasks/default" />
        ) : (
          <Redirect from="/" to="/login" />
        )}
      </Route>

      {/* Login */}
      <Route path="/login" component={Login} />

      {/* Home routes */}
      <Home>
        <Route
          component={() => (
            <React.Fragment>
              <PrivateRoute path="/tasks/:id" component={TaskView} />
              <PrivateRoute path="/profile" key="profile" component={Profile} />
            </React.Fragment>
          )}
        />
      </Home>
    </Switch>
  </Router>
);

export default Routes;
