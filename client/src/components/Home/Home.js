import React from 'react';

/* style */
import './home.css';

export default function Home() {
        return (
            <div className='homeList'>
                <h1>Home</h1>
                <p>This application is designed to view the list items and create new ones.</p>
                <p><span>Products</span> - view existing list of items.</p>
                <p><span>Create product</span> - create a new item (required to have an account).</p>
                <p><span>Login</span> - registration or login to your account.</p>
            </div>
        );
}