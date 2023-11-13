import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function WelcomeComponent() {
  const { username } = useParams();
  const [message, setMessage] = useState(null);
  const callApiAxios = () => {
    const url = 'http://localhost:8080/hello';
    axios.get(url).then((response) => setMessage(response.data));
  };

  return (
    <div className='Welcome'>
      <h1>Welcome! {username}</h1>
      <div>
        Manage your todos - <Link to='/todos'>Go here</Link>
      </div>
      <button onClick={callApiAxios}>hello</button>
      <p>{message}</p>
    </div>
  );
}
