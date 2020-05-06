import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = React.createContext({ value: 'hey!' });

export const AuthProvider = (props) => {
  const [auth, setAuth] = useState({
    isAuth: false,
    token: null,
    user: {
      username: 'mrossioliveira',
      email: 'murilo.rossi.oliveira@gmail.com',
    },
  });

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {props.children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.array,
};
