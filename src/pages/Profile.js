import React from 'react';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const history = useHistory();

  const onSignOut = () => {
    localStorage.clear();
    history.push('/login');
  };

  return (
    <>
      <h2>Profile</h2>
      <button onClick={onSignOut}>Sign out</button>
    </>
  );
};

export default Profile;
