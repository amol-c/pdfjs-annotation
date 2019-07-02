import React from 'react';
import { getAllStudentIds } from './Networking/PeerNetworking';

export default function Homepage() {
    const ids = getAllStudentIds();
    return (
        <table className="studentTable">
            <thead>
                <tr>
                    <td>Student</td>
                    <td>Needs help</td>
                </tr>
            </thead>
            <tbody>
                {ids.map(id => {
                    return (
                        <tr onClick={() => {
                            const params = new URLSearchParams(window.location.search);
                            params.set('viewingStudentId', id);
                            window.location.replace(`/?${params.toString()}`)
                        }}>
                            <td>{id}</td>
                            <td />
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}