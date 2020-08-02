import React, { useState } from 'react';
import NotePad from './components/NotePad';
import Register from './components/Register';
import './App.css';

function App() {
  const [un, setUN] = useState('');
  const [loggedIn, login] = useState(false);
  return (
    <div className="App">
      Your active notePad<br />
      <div style={{ padding: '30px', color: 'red', background: 'black' }}>
        {loggedIn ? <NotePad username={un} style={{ color: 'white' }} /> : 'please login'}
        {!loggedIn ? <Register action={login} changeUN={setUN} /> : <></>}
      </div>

    </div >
  );
}

export default App;
