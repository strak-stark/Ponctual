import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import { storageRef, db } from "../../../../../../scripts/services/firebase";
import loader from '../../../../../../assets/loaderClassMenu.gif'

const ClassMenu = (props) => {
    const [usersData, setUsersData] = useState([
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
        { displayName: `nom prenom`, photoUrl: null },
    ])
    const [loading, setLoading] = useState(true)
    const [noStuds, setNoStuds] = useState(false)
    useEffect(() => {
        if (loading) {
            db.collection("classes").doc(props.rowData.uid).get().then(function (doc) {
                const { eleves } = doc.data()
                if (eleves.length === 0) setNoStuds(true)
                eleves.forEach(eleve => {
                    db.collection("users").doc(eleve).get().then(function (doc) {
                        if (doc.exists) {
                            if (doc.data().profilepic.length > 0) {
                                const profilePicRef = storageRef.child(`${eleve}/profile_31x31.jpg`);
                                profilePicRef.getDownloadURL().then((url) => {
                                    setUsersData(oldArray => [...oldArray, { displayName: `${doc.data().prenom} ${doc.data().nom}`, photoUrl: url }])
                                }).catch(function (error) {
                                });
                            } else { 
                                setUsersData(oldArray => [...oldArray, { displayName: `${doc.data().prenom} ${doc.data().nom}`, photoUrl: null }])
                            }
                        }
                    }).catch(function (error) {
                        console.log("Error getting document:", error);
                    });
                });
            })
            setLoading(false)
        }
    }, [])
    return (
        <>
        {/* || noStuds */}
            {loading  ? <div className="loader"><p>Aucun élève.</p></div> : usersData.map((user, i) => {
                const { displayName, photoUrl } = user;
                return <div key={i} style={{ margin: 10 }}><Tooltip title={displayName} ><Avatar alt={displayName} src={photoUrl} /></Tooltip></div>
            })}
        </>

    )
}
export default ClassMenu;