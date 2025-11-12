import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Nav(){
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const usertype = localStorage.getItem('usertype');

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('usertype');
        navigate('/');
    }

    return(
        <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div class="container-fluid">
            <NavLink className="nav-brand" to="/guitarview">GUITAR SYSTEM</NavLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarColor01">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <NavLink className="nav-link" to="/guitarview" activeclassname="active">View Guitars</NavLink>
                </li>
                {usertype === 'admin' && (
                    <li class="nav-item">
                        <NavLink className="nav-link" to="/guitaradd" activeclassname="active">Add Guitar</NavLink>
                    </li>
                )}
            </ul>
            <div class="d-flex">
                <span class="navbar-text me-3">
                    Welcome, {username} ({usertype})
                </span>
                <button class="btn btn-outline-light btn-sm" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            </div>
        </div>
        </nav>
    )
}

export default Nav;
