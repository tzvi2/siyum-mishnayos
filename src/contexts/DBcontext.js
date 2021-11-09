import React, {useState, useEffect, useContext} from "react";
import {db} from '../firebaseConfig'
import {setDoc, getDoc, doc, addDoc, collection, where, updateDoc, query, FieldPath} from 'firebase/firestore'


const DBcontext = React.createContext()

export function useDBcontext() {
    return useContext(DBcontext)
}

export function DBprovider({children}) {

    const [currentProject, setCurrentProject] = useState()
    const [currentId, setCurrentId] = useState(null)
    const [currentProjectLink, setCurrentProjectLink] = useState("")

    const saveProject = async (proj) => {  
        const newDoc = await addDoc(collection(db, "projects"), proj)
        setCurrentId(newDoc.id)
        setCurrentProjectLink(`http://localhost:3000/viewprojects:${newDoc.id}`)
        return newDoc
    }

    const getProject = async (id) => {
        const docRef = doc(db, "projects", id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            return docSnap.data()
        } else {
            return console.log('error getting project')
        }
    }

    const signUp = async (projId, seder, masechta, name) => {

        const projRef = doc(db, "projects", currentId )

        let o = {}
        o[`sedarim.${seder}`] = "orange you glad"
        const u = await updateDoc(projRef, o)
        // sedarimRef.forEach((sederObj) => {
        //     console.log('sederObj' , sederObj)
        //     if (sederObj[seder]) {
        //         console.log("sederObj[seder]", sederObj[seder])
        //     }
        // })
        // let updateObj = {learner: name}
        // sedarimRef.forEach(s => {
        //     if (s[seder]) {
        //         console.log("s", s)
        //         console.log("s[seder]", s[seder])
        //         console.log("s[seder][masechta]", s[seder][masechta])
        //         console.log("s[seder][masechta].learner", s[seder][masechta].learner)
        //         //s[seder][masechta]
        //         // console.log("s")
        //         // console.log("s")
        //         //sedarimRef[s][seder][masechta].update(updateObj)
        //     }
        // })


        
    }

    useEffect(() => {
        console.log('currentProject: ',currentProject)
    }, [currentProject])

    
    let id = "KGB"
    const docRef = ""
    
    const value = {
        currentProject,
        setCurrentProject,
        currentId,
        setCurrentId,
        saveProject,
        getProject,
        currentProjectLink,
        signUp
    }

    return (
        <DBcontext.Provider value={value}>
            {children}
        </DBcontext.Provider>
    )

}

export default DBprovider