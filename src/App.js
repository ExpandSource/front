import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/hello')
      .then((res) => res.text())
      .then((message) => setMsg(message));
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>{msg}</p>
      </header>
    </div>
  );
}

export default App;
