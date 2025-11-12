import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post('http://localhost:3001/login', {
            username: username, 
            password: password
        }).then(res => {
            console.log(res.data)
            localStorage.setItem('username', res.data.username)
            localStorage.setItem('usertype', res.data.usertype)
            alert("Login successful!")
            navigate('/guitarview')
        }).catch(err => {
            console.log(err)
            alert("Invalid username or password")
        })
    }

    return(
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h3>Guitar Management System - Login</h3>
                        </div>
                        <div class="card-body">
                            <form onSubmit={handleSubmit}>
                                <div class="mb-3">
                                    <label class="form-label">Username</label>
                                    <input 
                                        type="text"
                                        className='form-control'
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Password</label>
                                    <input 
                                        type="password"
                                        className='form-control'
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button className='btn btn-primary' type="submit">
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                    <div class="mt-3">
                        <p><strong>Test Credentials:</strong></p>
                        <p>Admin: username = admin, password = admin123</p>
                        <p>Basic User: username = basicuser, password = user123</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
