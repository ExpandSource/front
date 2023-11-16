import { createContext, useContext, useState } from 'react';

import { apiClient } from '../api/ApiClient';
import {
  executeBasicAutheticationService,
  executeJwtAutheticationService,
} from '../api/AuthenticationApiService';

export const AuthContext = createContext();

//export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [username, setUsername] = useState(null);

  const [token, setToken] = useState(null);

  // 인터셉터
  async function login(username, password) {
    try {
      const response = await executeJwtAutheticationService(username, password);
      if (response.status === 200) {
        const jwtToken = 'Bearer ' + response.data.token;

        setIsAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);

        // 인터셉터 등록! 한번 등록된 인터셉터는 모든 요청에 공유
        apiClient.interceptors.request.use((config) => {
          console.log('intercepting and adding a token');
          config.headers.Authorization = jwtToken;
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

/*
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
  */
