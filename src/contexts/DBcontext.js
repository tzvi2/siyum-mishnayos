import React, {useState, useEffect, useContext} from "react";
import {db} from '../firebaseConfig'
import {getDoc, doc, addDoc, collection, updateDoc, serverTimestamp, onSnapshot} from 'firebase/firestore'
import {useParams} from 'react-router-dom'



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

    const saveProject = async (proj) => {  
        const newDocToSave = await addDoc(collection(db, "projects"), {
            ...proj,
            createdAt: serverTimestamp()
        })
        setCurrentId(newDocToSave.id)
        await updateDoc(newDocToSave, {
            "link" : `${window.location.origin}/viewproject/${newDocToSave.id}`
        })
        const savedNewDoc = await getDoc(newDocToSave)
        if (savedNewDoc.exists()) {
            return savedNewDoc.data()
        } else {
            return console.log("error getting new saved doc")
        }
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
        setSedarim,
        currentProject,
        setCurrentProject,
        setProject,
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