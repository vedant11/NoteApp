import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [msg, setmsg] = useState('');
  useEffect(() => {
    fetch('/users')
      .then(res => res.json())
      .then(user => setmsg(user));
  })
  return (
    <div className="App">
      hello
        your msg: { msg}
    </div >
  );
}

export default App;
