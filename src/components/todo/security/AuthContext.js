import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

//export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [username, setUsername] = useState(null);


  function login(username, password) {
    if (username === 'testuser' && password === '1234') {
      setIsAuthenticated(true);
      setUsername(username);
      return true;
    } else {
      setIsAuthenticated(false);
      return false;
    }
  }

  // function login(username, password) {
  //   if (username === 'testuser' && password === '1234') {
  //     setIsAuthenticated(true);
  //     setUsername(username);
  //     return true;
  //   } else {
  //     setIsAuthenticated(false);
  //     return false;
  //   }
  // }

  function logout() {
    setIsAuthenticated(false);
    setUsername(null);
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  );
}
