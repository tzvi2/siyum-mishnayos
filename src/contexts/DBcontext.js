import React, {useState, useEffect, useContext} from "react";
import {db} from '../firebaseConfig'
import {setDoc, getDoc, doc, addDoc, collection, where, updateDoc, query, FieldPath, Timestamp, serverTimestamp, onSnapshot} from 'firebase/firestore'
import {shas} from '../shas'
import {useParams} from 'react-router-dom'
import { Component } from "react";


const DBcontext = React.createContext()

export function useDBcontext() {
    return useContext(DBcontext)
}

export function DBprovider({children}) {

    

    let params = useParams()

    const [currentProject, setCurrentProject] = useState(null)
    const [currentId, setCurrentId] = useState("")
    const [currentProjectLink, setCurrentProjectLink] = useState("")

    const [sedarim, setSedarim] = useState({})
    //let sedarim = {}

    // console.log('sedarim', sedarim)

    const saveProject = async (proj) => {  
        const newDocToSave = await addDoc(collection(db, "projects"), {
            ...proj,
            createdAt: serverTimestamp()
        })
        setCurrentId(newDocToSave.id)
        const update = await updateDoc(newDocToSave, {
            "link" : `http://localhost:3000/viewprojects:${newDocToSave.id}`
        })
        const savedNewDoc = await getDoc(newDocToSave)
        if (savedNewDoc.exists()) {
            return savedNewDoc.data()
        } else {
            return console.log("error getting new saved doc")
        }
    }

    const saveProjectLink = async (id) => {
        console.log('saving project link. id:', id)
        console.log('save')
        const projRef = doc(db, "projects", id)
        const update = await updateDoc(projRef, {
            "link" : `${window.location.href}${id}`
        })
        return update
    }

    const getProject = async (id) => {
        if (id == "") {
            return {}
        }
        const docRef = doc(db, "projects", id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            return docSnap.data()
        } else {
            console.log('error getting project')
            return {}
        }
    }

    const signUp = async (projId, seder, masechta, name) => {
        const projRef = doc(db, "projects", currentId)
        let updateObj = {}
        updateObj[`sedarim.${seder}.${masechta}.learner`] = name
        await updateDoc(projRef, updateObj)
        return true
    }

    const setCompleteStatus = async (projId, seder, masechta, complete) => {
        const projRef = doc(db, "projects", projId)
        let updateObj = {}
        updateObj[`sedarim.${seder}.${masechta}.complete`] = complete
        const update = await updateDoc(projRef, updateObj)
        return true
    }

    const setProject = async () => {
        const proj = await getProject(currentId)
        setCurrentProject(proj)
        return proj
    }

    useEffect(() => {
        if (currentId) {
            const unsubscribe = onSnapshot(doc(db, "projects", currentId), (proj) => {
                setCurrentProject(proj.data())
            })
            return unsubscribe
        }
    }, [currentId])
    
    const value = {
        currentId,
        setCurrentId,
        saveProject,
        getProject,
        currentProjectLink,
        setCurrentProjectLink,
        signUp,
        sedarim,
        //setSedarim,
        currentProject,
        setCurrentProject,
        setProject,
        saveProjectLink,
        getProject,
        setCompleteStatus
    }

    return (
        <DBcontext.Provider value={value}>
            {children}
        </DBcontext.Provider>
    )

}

export default DBprovider