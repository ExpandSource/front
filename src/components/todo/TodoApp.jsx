import React, { useContext } from 'react';
import './TodoApp.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginComponent from './LoginComponent';
import WelcomeComponent from './WelcomeComponent';
import ErrorComponent from './ErrorComponent';
import ListTodosComponent from './ListTodosComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import LogoutComponent from './LogoutComponent';
import AuthProvider, { AuthContext } from './security/AuthContext';
import TodoComponent from './TodoComponent';

function AuthenticateRoute({ children }) {
  const authContext = useContext(AuthContext);
  if (authContext.isAuthenticated) {
    return children;
  }
  return <Navigate to='/' />;
}

function TodoApp() {
  return (
    <div className='TodoApp'>
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route path='/' element={<LoginComponent />} />
            <Route path='/login' element={<LoginComponent />} />

            <Route
              path='/welcome/:username'
              element={
                <AuthenticateRoute>
                  <WelcomeComponent />
                </AuthenticateRoute>
              }
            />
            <Route
              path='/todos'
              element={
                <AuthenticateRoute>
                  <ListTodosComponent />
                </AuthenticateRoute>
              }
            />
            <Route
              path='/todos/:id'
              element={
                <AuthenticateRoute>
                  <TodoComponent />
                </AuthenticateRoute>
              }
            />
            <Route
              path='/logout'
              element={
                <AuthenticateRoute>
                  <LogoutComponent />
                </AuthenticateRoute>
              }
            />

            <Route path='/*' element={<ErrorComponent />} />
          </Routes>
          <FooterComponent />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default TodoApp;
