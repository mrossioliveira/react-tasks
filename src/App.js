import React from 'react';
import Home from './list/Home';

import { AuthProvider } from './auth/AuthContext';

import './fontAwesome';

function App() {
  return (
    <AuthProvider>
      <Home></Home>
    </AuthProvider>
  );
}

export default App;
