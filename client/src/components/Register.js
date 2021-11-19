import React, { useState } from 'react';
import '../style/Register.css'

function Register(props) {
    const [un, setUN] = useState('');
    const [pass, setPass] = useState('');
    async function sendForm() {
        await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: un,
                password: pass
            })
        }).then(() => {
            console.log(un, pass);
            props.changeUN(un);
            props.action(true);
            console.log('set true');
        }).catch((err) => {
            console.log(err);
        })
        await fetch('/write', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: un,
                text: ''
            })
        }).then(() => {
            console.log('wrote to db notes');
        }).catch((err) => {
            console.log(err);
        });
    }
    return (
        <div color='black'>
            <input type='text' placeholder='username' style={{ height: '10px' }}
                onChange={e => setUN(e.target.value)} />
            <input type='password' placeholder='password' style={{ height: '10px' }}
                onChange={e => setPass(e.target.value)} /> <br />
            <input type='button' value='register' onClick={sendForm} />
        </div >
    );
}

export default Register;
