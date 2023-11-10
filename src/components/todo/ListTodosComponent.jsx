import React from 'react';

export default function ListTodosComponent() {
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
        <table className='table'>
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
