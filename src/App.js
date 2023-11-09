import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import ApiTest from './components/ApiTest';
import TodoApp from './components/todo/TodoApp';

function App() {
  return (
    <div className='App'>
      {/* <ApiTest /> */}
      <TodoApp />
    </div>
  );
}

export default App;
