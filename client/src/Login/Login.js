import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Login.module.css';


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
        <div className={`card ${styles.card}`}>
            <div className={`card-header ${styles['card-header']}`}>
                Iniciar Sesión
            </div>
            <h3 className={styles.tituloCha}>Channel Sport</h3>
            <h4 className={styles.subtitle}>Gestion de empleados</h4>
            <div className="text-center">
                <div className="card-body">
                    <h4 className={styles.user}>Usuario administrador:</h4>
                    <input type="text" onChange={e => setUsername(e.target.value)} /><br></br>
                    <br></br>
                    <h4 className={styles.pass}>Contraseña administrador:</h4>
                    <input type="password" onChange={e => setPassword(e.target.value)} /><br></br>
                    <br></br>
                    <button className='btn btn-success' onClick={login}>Iniciar sesión</button>
                </div>
                <div className={styles['card-footer']}>
                </div>
            </div>
        </div>
    );
}

export default Login;