import React from 'react';
import './TodoApp.css';
import { useState } from 'react';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom';

function TodoApp() {
  return (
    <div className='TodoApp'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginComponent />} />
          <Route path='/login' element={<LoginComponent />} />
          <Route path='/welcome/:username' element={<WelcomeComponent />} />
          <Route path='/todos' element={<ListTodosComponent />} />
          <Route path='/*' element={<ErrorComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default TodoApp;

function LoginComponent() {
  const [username, setUsername] = useState('testuser');
  const [password, setPassword] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const navigate = useNavigate();

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
      navigate(`/welcome/${username}`);
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

function WelcomeComponent() {
  const { username } = useParams();

  return (
    <div className='Welcome'>
      <h1>Welcome! {username}</h1>
      <div>
        Manage your todos - <Link to='/todos'>Go here</Link>
      </div>
    </div>
  );
}

function ErrorComponent() {
  return (
    <div className='ErrorComponent'>
      <h1>404</h1>
      <div>404 not found.</div>
    </div>
  );
}

function ListTodosComponent() {
  const today = new Date();
  const targetDate = new Date(
    today.getFullYear() + 12,
    today.getMonth(),
    today.getDate()
  );
  const todos = [
    { id: 1, description: 'learn AWS', done: false, targetDate: targetDate },
    { id: 2, description: 'learn Java', done: false, targetDate: targetDate },
    { id: 3, description: 'learn Spring', done: false, targetDate: targetDate },
  ];
  return (
    <div className='ListTodosComponent'>
      <h1>What To Do?</h1>
      <div>
        <table>
          <thead>
            <tr>
              <td>id</td>
              <td>description</td>
              <td>Done</td>
              <td>targetDate</td>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                <td>{todo.targetDate.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
