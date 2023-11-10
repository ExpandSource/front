import React, { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './security/AuthContext';

export default function LoginComponent() {
  const [username, setUsername] = useState('testuser');
  const [password, setPassword] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const authContext = useContext(AuthContext);
  const { login } = authContext;
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    // hardcording
    if (login(username, password)) {
      //      setShowSuccessMessage(true);
      //      setShowErrorMessage(false);
      navigate(`/welcome/${username}`);
    } else {
      //setShowSuccessMessage(false);
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
      <h1>Time to Login</h1>
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
