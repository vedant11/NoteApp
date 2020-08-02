import React, { useEffect, useState } from 'react';

function NotePad() {
    const [msg, setmsg] = useState('');
    var username = 'preety';
    useEffect(() => {
        fetch(`/users/${username}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
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
