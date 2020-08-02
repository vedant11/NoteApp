import React, { useEffect, useState } from 'react';

function NotePad(props) {
    const [msg, setmsg] = useState('');
    const username = props.username;
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
            <textarea id="currNote" name="w3review" rows="4" cols="50" value={msg} />
        </div >
    );
}

export default NotePad;
