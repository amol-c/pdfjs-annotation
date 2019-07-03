import React, { useState, useEffect } from 'react';
import { getAllStudentIds, peerConnectionSubject, peerDataSubject } from './Networking/PeerNetworking';
import { Link } from "react-router-dom";

export default function Homepage({setViewingStudentId}) {
    const [ids, setIds] = useState(getAllStudentIds());
    const [needHelpMap, setNeedHelp] = useState({})

    useEffect(() => {
      const peerConnectionSubscription = peerConnectionSubject.subscribe(connections => {
        setIds(Object.keys(connections));
      })

      const peerDataSubscription = peerDataSubject.subscribe(([{type, data}, incomingPeerId])=>{
        switch (type) {
          case "helpRequest":
              setNeedHelp({...needHelpMap, [incomingPeerId]: data})
          return
        }
      })

      return () => {
        peerConnectionSubscription.unsubscribe();
        peerDataSubscription.unsubscribe();
      }

    }, []);
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
                            <td>{needHelpMap[id] ? "true": "false"}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}