// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import PatientPage from './components/PatientPage';
import AdmissionsPage from './components/AdmissionsPage';

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/patients">Patients</Link></li>
                        <li><Link to="/admissions">Admissions</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/patients" element={<PatientPage />} />
                    <Route path="/admissions" element={<AdmissionsPage />} />
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
