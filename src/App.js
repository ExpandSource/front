import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/hello').then((res) => res.text().then((msg) => setMsg(msg)));
  }, []);

  return <div className='App'></div>;
}

export default App;
