import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Login.css'


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => {
        if (username === 'admin' && password === 'admin') {
            setIsLoggedIn(true);
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    };
    if (isLoggedIn) {
        return <Navigate to="/app" />
    }

    return (
        <html>
            <body>
                <h3 class="tituloCha">Channel Sport</h3>
                <h4 class="subtitle" >Gestion de empleados</h4>
                <div class="card text-center">
                    <div class="card-header">
                        Iniciar Sesión
                    </div>
                    <div class={"card-body"}>
                        <h4 className='user'>Usuario administrador:</h4>
                        <input type="text" onChange={e => setUsername(e.target.value)} /><br></br>
                        <br></br>
                        <h4 className='pass'>Contraseña administrador:</h4>
                        <input type="password" onChange={e => setPassword(e.target.value)} /><br></br>
                        <br></br>
                        <button class="btn btn-success" onClick={login}>Iniciar sesión</button>
                    </div>
                    <div class="card-footer text-muted">
                    </div>
                </div>
            </body>
        </html>
    );
}
export default Login;