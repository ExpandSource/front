import React from 'react';
import { useState } from 'react';

function Home() {
  const [message, setMessage] = useState(null);

  const callApi = () => {
    const url = 'http://localhost:8080/api/hello';
    fetch(url)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.error(e));
  };

  return (
    <div>
      <button onClick={callApi}>서버에서 값 가져오기</button>
    </div>
  );
}

export default Home;
