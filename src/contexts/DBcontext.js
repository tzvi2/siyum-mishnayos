import React, {useState, useEffect, useContext} from "react";
import {db} from '../firebaseConfig'
import {setDoc, getDoc, doc, addDoc, collection, where, updateDoc, query, FieldPath, Timestamp, serverTimestamp} from 'firebase/firestore'
import {shas} from '../shas'
import {useParams} from 'react-router-dom'


const DBcontext = React.createContext()

export function useDBcontext() {
    return useContext(DBcontext)
}

export function DBprovider({children}) {

    console.log('DBProvider')

    let params = useParams()

    const [currentProject, setCurrentProject] = useState(null)
    const [currentId, setCurrentId] = useState("")
    const [currentProjectLink, setCurrentProjectLink] = useState("")

    let sedarim = {Zeraim: shas.Zeraim}

    

    const saveProject = async (proj) => {  
        console.log('saving project, newProject', proj)
        const newDocToSave = await addDoc(collection(db, "projects"), {
            ...proj,
            createdAt: serverTimestamp()
        })
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
        const projRef = doc(db, "projects", id)
        const update = await updateDoc(projRef, {
            "link" : `http://localhost:3000/viewprojects:${id}`
        })
        return update
    }

    const getProject = async (id) => {
        if (id == "") {
            return {}
        }
        console.log("id",id)
        console.log(typeof(id))
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
        const updating = await updateDoc(projRef, updateObj)
        return updating
    }

    const setProject = async () => {
        const proj = await getProject(currentId)
        setCurrentProject(proj)
        return proj
    }

    // useEffect(() => {
    //     setProject()
    // }, [currentId])


    useEffect(() => {
        console.log('type of currProj', typeof(currentProject))
        console.log('currProj' ,currentProject)
        //console.log('currProj sedarim' ,currentProject.sedarim)
    }, [currentProject])
    
    const value = {
        currentId,
        setCurrentId,
        saveProject,
        getProject,
        currentProjectLink,
        setCurrentProjectLink,
        signUp,
        sedarim,
        currentProject,
        setCurrentProject,
        setProject,
        saveProjectLink,
        getProject
    }

    return (
        <DBcontext.Provider value={value}>
            {children}
        </DBcontext.Provider>
    )

}

export default DBprovider