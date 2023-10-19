import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import App from './App';

function Main() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/app" element={<App />} />
                <Route path="*" element={<Login />} /> {/* Redirige cualquier otra ruta al login */}
            </Routes>
        </Router>
    );
}

export default Main;