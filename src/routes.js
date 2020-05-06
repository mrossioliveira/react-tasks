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

// const HomeRoutes = () => (
//   <Router>
//     <Switch>
//       <Route />
//     </Switch>
//   </Router>
// );

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Home>
        <Route
          component={() => (
            <React.Fragment>
              <PrivateRoute path="/tasks/:id" component={TaskView} />
              <Route
                path="/profile"
                render={() => <h1>This is the profile</h1>}
              />
            </React.Fragment>
          )}
        />
      </Home>
    </Switch>
  </Router>
);

export default Routes;
