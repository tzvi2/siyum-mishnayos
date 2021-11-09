import React, {useState, useEffect} from 'react'
import styles from '../css/NewProjectForm.module.css'
import ViewProject from '../components/ViewProject'
import CreateProject from './NewProjectForm/CreateProject'
import ReviewProject from './NewProjectForm/ReviewProject'
import {db} from '../firebaseConfig'
import {doc, setDoc, collection, addDoc} from 'firebase/firestore'
import {shas} from '../shas'
import {Route, Routes, Link, useHistory} from 'react-router-dom'
import { useDBcontext } from '../contexts/DBcontext'



let selectedSedarim = ["Zeraim"]

function NewProjectForm() {
    
    const [title, setTitle] = useState("")
    const [titleError, setTitleError] = useState(false)
    const [timePeriod, setTimePeriod] = useState("1 week")
    const [stage, setStage] = useState(1)
    const [sedarim, setSedarim] = useState([shas[0]])
    
    const {currentProject, saveProject, setCurrentProject, currentId, setCurrentId, currentProjectLink} = useDBcontext()
    
    const newProject = {
        title: title,
        timePeriod: timePeriod,
        sedarim: sedarim
    }

    function handleSederChange(e) {

        let seder = e.target.value

        if (selectedSedarim.includes(seder)) {
            selectedSedarim.splice(selectedSedarim.indexOf(seder), 1)
            
        } else {
            selectedSedarim.push(seder)
        }

        for (let obj of shas) {
            if (obj.hasOwnProperty(seder)) {
                if (sedarim.includes(obj)) {
                    setSedarim(sedarim.filter(elem => elem !== obj))
                    //console.log('sedarim had selected seder, its been removed')
                } else {
                    setSedarim([...sedarim, obj])
                    //console.log("sedarim didn't have the selected seder, its been added")
                }
            }
        }
    }

    useEffect(() => {
        //console.log('sedarim:', sedarim)
    }, [sedarim])

    useEffect(() => {
        //console.log('stage: ',stage, sedarim)
        //console.log('stage: ', stage, "newProject: ", newProject)
    }, [stage])

    const addProject = async (e) => {
        e.preventDefault()
        if (!title) {
            setTitleError(true)
            return
        }

        try {
            await saveProject(newProject)
            //localStorage.setItem('currentProjID', newDoc)
            //const newDoc = await addDoc(collection(db, "projects"), newProject)
            //console.log("new document id: ", newDoc.id)
            //console.log('newproject', newProject)
            //setCurrentId(newDoc.id)
            setCurrentProject(newProject)
            setStage(stage + 1)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={e => addProject(e)}>
            {stage === 1 &&<>
            <h4>Create Project</h4>
            {titleError && <p className={styles.error}>Please enter a title.</p>}
            <label>
                Title:
                <input type="text" value={title} onChange={e => {setTitle(e.target.value); setTitleError(false)}}></input>
            </label>

            <label>
                Time Period:
                <select value={timePeriod} onChange={e => setTimePeriod(e.target.value)}>
                    <option value="1 week">1 Week</option>
                    <option value="1 month">1 Month</option>
                    <option value="1 year">1 Year</option>
                </select>
            </label>

            <label>
                Sedarim:
                <select className={styles.sedarimDropdown} multiple={true} value={selectedSedarim} onChange={e => handleSederChange(e)}>
                    <option value="Zeraim">Zeraim</option>
                    <option value="Moed">Moed</option>
                    <option value="Nashim">Nashim</option>
                    <option value="Nezikin">Nezikin</option>
                    <option value="Kadshim">Kadshim</option>
                    <option value="Taharos">Taharos</option>
                </select>
            </label>
            
            <input className={`${styles.dark} ${styles.full}`} readOnly type="button" value="Next" onClick={() => {if(!title) {setTitleError(true); return} setStage(stage + 1)}}></input>
            </>}

            {stage === 2 &&
            <>
            <h4>Confirm Project</h4>
            <label>Title: <input readOnly value={title}></input></label>
            <label>Time Period: <input readOnly value={timePeriod}></input></label>
            <label>Sedarim: <ul>{selectedSedarim.map((seder, i) => (
                <li key={i}>{seder}</li>
            ))}</ul></label>

            <div className={styles.row}>
                <input className={`${styles.light} ${styles.half}`} type="button" value="Back" onClick={() => setStage(stage - 1)}></input>
                <input className={`${styles.dark} ${styles.half}`} type="submit" value="Save"></input>
            </div>
            </>}

            {stage === 3 &&
            <>
            <h4>Your project was created.</h4>
            <label>Title: {title}</label>
            <label>Time Period: {timePeriod}</label>
            <label>Sedarim: </label>
            {selectedSedarim.map((seder, i) => (
                <label className={styles.sedarimList} key={i}>{seder}</label>
            ))}
            <p>Your link: {currentProjectLink}</p>
            
            {/* <div className={styles.row}> */}
                <Link className={styles.soloBtn} to="/viewproject"><input className={styles.viewBtn} type="button" value="View"></input></Link>
            {/* </div> */}
            
            
            </>}
        </form>
    )
}

export default NewProjectForm
