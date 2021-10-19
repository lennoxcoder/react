import React from 'react';

export default function Logout() {

    localStorage.removeItem("data");

    return (
        <div>
            You are logged out.
        </div>
    )
}