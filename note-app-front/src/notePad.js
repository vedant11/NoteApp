import React, { useEffect, useState } from 'react';

function NotePad() {
    const [msg, setmsg] = useState('');
    useEffect(() => {
        fetch('/users', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'preety' })
        })
            .then(res => res.json())
            .then(user => setmsg(user));
    })
    return (
        <div color='black'>
            hello your msg: <br />{msg}
        </div >
    );
}

export default NotePad;
