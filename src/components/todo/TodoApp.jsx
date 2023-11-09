import React from 'react';
import './TodoApp.css';
import { useState } from 'react';

function TodoApp() {
  return (
    <div className='TodoApp'>
      TodoApp
      <LoginComponent />
    </div>
  );
}

export default TodoApp;

function LoginComponent() {
  const [username, setUsername] = useState('testuser');
  const [password, setPassword] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    // hardcording
    if (username === 'testuser' && password === '1234') {
      console.log('success');
      setShowSuccessMessage(true);
      setShowErrorMessage(false);
    } else {
      console.log('failed');
      setShowSuccessMessage(false);
      setShowErrorMessage(true);
    }
  };

  function SuccessMessageComponent() {
    if (showSuccessMessage) {
      return <div className='successMessage'>Authenticated Successful</div>;
    } else {
      return null;
    }
  }

  function ErrorMessageComponent() {
    if (showErrorMessage) {
      return (
        <div className='errorMessage'>Authenticated fail. Please check.</div>
      );
    } else {
      return null;
    }
  }
  return (
    <div className='Login'>
      {showSuccessMessage && (
        <div className='successMessage'>Authenticated Successful</div>
      )}
      {showErrorMessage && (
        <div className='errorMessage'>Authenticated fail. Please check.</div>
      )}
      {/* <SuccessMessageComponent />
      <ErrorMessageComponent /> */}

      <div className='LoginForm'>
        <div>
          <label>User Name</label>
          <input
            type='text'
            name='username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button name='login' onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
}

function WelcomeComponent() {
  return <div className='Welcome'>Welcome</div>;
}
