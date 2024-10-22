import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

const PatientPage = () => {
    const [patients, setPatients] = useState([]);
    const [newPatient, setNewPatient] = useState({ urNo: '', name: '', age: '' });

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axiosInstance.get('/patients');
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };
        fetchPatients();
    }, []);

    const handleAddPatient = async () => {
        try {
            await axiosInstance.post('/patients', newPatient);
            setPatients([...patients, newPatient]);
            setNewPatient({ urNo: '', name: '', age: '' }); // Reset form
        } catch (error) {
            console.error('Error adding patient:', error);
        }
    };

    return (
        <div className="container">
            <h1>Patients</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleAddPatient(); }}>
                <input
                    type="number"
                    placeholder="UR No"
                    value={newPatient.urNo}
                    onChange={(e) => setNewPatient({ ...newPatient, urNo: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                    required
                />
                <button type="submit">Add Patient</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>UR No</th>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.urNo}>
                            <td>{patient.urNo}</td>
                            <td>{patient.name}</td>
                            <td>{patient.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PatientPage;
