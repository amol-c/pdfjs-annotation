import React, { useState, useEffect } from 'react';
import { getAllStudentIds, peerConnectionSubject } from './Networking/PeerNetworking';
import { Link } from "react-router-dom";

export default function Homepage({setViewingStudentId}) {
    const [ids, setIds] = useState(getAllStudentIds());
    useEffect(() => {
      peerConnectionSubject.subscribe(connections => {
        setIds(Object.keys(connections));
      })
    }, [])
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
                          setViewingStudentId(id);
                        }} key={id}>
                            <td>{id}</td>
                            <td />
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}