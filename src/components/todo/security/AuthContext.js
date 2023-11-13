import { createContext, useContext, useState } from 'react';
import { executeBasicAutheticationService } from '../api/TodoApiService';
import { apiClient } from '../api/ApiClient';

export const AuthContext = createContext();

//export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [username, setUsername] = useState(null);

  const [token, setToken] = useState(null);

  async function login(username, password) {
    const baToken = 'Basic ' + window.btoa(username + ':' + password);

    try {
      const response = await executeBasicAutheticationService(baToken);
      if (response.status === 200) {
        setIsAuthenticated(true);
        setUsername(username);
        setToken(baToken);
        apiClient.interceptors.request.use((config) => {
          console.log('intercepting and adding a token');
          config.headers.Authorization = baToken;
          return config;
        });
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }
  /*
    // if (username === 'testuser' && password === '1234') {
    //   setIsAuthenticated(true);
    //   setUsername(username);
    //   return true;
    // } else {
    //   setIsAuthenticated(false);
    //   return false;
    // }
  

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
*/
  function logout() {
    setIsAuthenticated(false);
    setUsername(null);
    setToken(null);
  }
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, username, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
