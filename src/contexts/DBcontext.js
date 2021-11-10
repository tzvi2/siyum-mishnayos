import React, {useState, useEffect, useContext} from "react";
import {db} from '../firebaseConfig'
import {setDoc, getDoc, doc, addDoc, collection, where, updateDoc, query, FieldPath} from 'firebase/firestore'
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
        const newDoc = await addDoc(collection(db, "projects"), proj)
        setCurrentId(newDoc.id)
        setCurrentProjectLink(`http://localhost:3000/viewprojects:${newDoc.id}`)
        return newDoc
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
        signUp,
        sedarim,
        currentProject,
        setCurrentProject,
        setProject
    }

    return (
        <DBcontext.Provider value={value}>
            {children}
        </DBcontext.Provider>
    )

}

export default DBprovider