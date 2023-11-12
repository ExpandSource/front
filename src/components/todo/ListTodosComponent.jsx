import React, { useContext, useEffect, useState } from "react";
import {
  deleteTodoApi,
  retrieveAllTodosForUsernameApi,
} from "./api/TodoApiService";
import { AuthContext } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ListTodosComponent() {
  const naviagte = useNavigate();
  const { username } = useContext(AuthContext);
  const today = new Date();
  // const targetDate = new Date(
  //   today.getFullYear() + 12,
  //   today.getMonth(),
  //   today.getDate()
  // );

  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState("");

  function refreshTodos() {
    retrieveAllTodosForUsernameApi(username)
      .then((res) => {
        //console.log(res.data);
        setTodos(res.data);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    refreshTodos();
  }, []);

  function deleteTodo(id) {
    console.log("clicked" + id);
    deleteTodoApi(username, id).then(() => {
      setMessage(`Delete of todo with ${id} successful.`);
      refreshTodos();
    });
  }

  function updateTodo(id) {
    console.log("clicked" + id);
    naviagte(`/todo/${id}`);
  }

  function addNewTOdo() {
    naviagte(`/todo/-1`);
  }

  // const todos = [
  //   { id: 1, description: 'learn AWS', done: false, targetDate: targetDate },
  //   { id: 2, description: 'learn Java', done: false, targetDate: targetDate },
  //   { id: 3, description: 'learn Spring', done: false, targetDate: targetDate },
  // ];
  return (
    <div className="ListTodosComponent">
      <h1>What To Do?</h1>
      {message && <div className="alert">{message}</div>}
      <div>
        <table className="table">
          <thead>
            <tr>
              <td>description</td>
              <td>Done</td>
              <td>targetDate</td>
              <td>Delete</td>
              <td>update</td>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                <td>{todo.targetDate.toString()}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    X
                  </button>
                </td>
                <td>
                  <button className="btn" onClick={() => updateTodo(todo.id)}>
                    update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btn btn-success m-5" onClick={addNewTOdo}>
        Add New Todo
      </div>
    </div>
  );
}
