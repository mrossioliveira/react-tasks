export const isAuthenticated = () => {
  const token = localStorage.getItem('accessToken');

  if (token === null || token === undefined) {
    return false;
  }
  return true;
};
