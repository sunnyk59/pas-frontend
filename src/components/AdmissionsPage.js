import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

const AdmissionsPage = () => {
    const [admissions, setAdmissions] = useState([]);
    const [newAdmission, setNewAdmission] = useState({ urNo: '', doctor: '', procedure: '' });

    useEffect(() => {
        const fetchAdmissions = async () => {
            try {
                const response = await axiosInstance.get('/admissions');
                setAdmissions(response.data);
            } catch (error) {
                console.error('Error fetching admissions:', error);
            }
        };
        fetchAdmissions();
    }, []);

    const handleAddAdmission = async () => {
        try {
            await axiosInstance.post('/admissions', newAdmission);
            setAdmissions([...admissions, newAdmission]);
            setNewAdmission({ urNo: '', doctor: '', procedure: '' }); // Reset form
        } catch (error) {
            console.error('Error adding admission:', error);
        }
    };

    return (
        <div className="container">
            <h1>Admissions</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleAddAdmission(); }}>
                <input
                    type="number"
                    placeholder="Patient UR No"
                    value={newAdmission.urNo}
                    onChange={(e) => setNewAdmission({ ...newAdmission, urNo: e.target.value })}
                    required
                />
                <select
                    value={newAdmission.doctor}
                    onChange={(e) => setNewAdmission({ ...newAdmission, doctor: e.target.value })}
                    required
                >
                    <option value="">Select Doctor</option>
                    {/* Add options for doctors here */}
                </select>
                <select
                    value={newAdmission.procedure}
                    onChange={(e) => setNewAdmission({ ...newAdmission, procedure: e.target.value })}
                    required
                >
                    <option value="">Select Procedure</option>
                    {/* Add options for procedures here */}
                </select>
                <button type="submit">Add Admission</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Admission ID</th>
                        <th>Patient UR No</th>
                        <th>Doctor</th>
                        <th>Procedure</th>
                    </tr>
                </thead>
                <tbody>
                    {admissions.map((admission) => (
                        <tr key={admission.admissionId}>
                            <td>{admission.admissionId}</td>
                            <td>{admission.urNo}</td>
                            <td>{admission.doctor}</td>
                            <td>{admission.procedure}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdmissionsPage;
