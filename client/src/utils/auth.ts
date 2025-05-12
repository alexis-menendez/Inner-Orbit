// client/src/utils/auth.ts

// Get the token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// Get the parsed user object from localStorage
export const getUserFromStorage = (): any | null => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

// Check if user is logged in
export const isLoggedIn = (): boolean => {
  return !!getToken() && !!getUserFromStorage();
};

// Log in user (save to localStorage)
export const loginUser = (user: any, token: string): void => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
};

// Log out user (clear localStorage)
export const logoutUser = (): void => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};
