import React, {useState, useEffect, useRef} from 'react'
import styles from '../css/NewProjectForm.module.css'
import ViewProject from '../components/ViewProject'
import CreateProject from './NewProjectForm/CreateProject'
import ReviewProject from './NewProjectForm/ReviewProject'
import {db} from '../firebaseConfig'
import {doc, setDoc, collection, addDoc} from 'firebase/firestore'
import {shas} from '../shas'
import {Route, Routes, Link, useHistory} from 'react-router-dom'
import { useDBcontext } from '../contexts/DBcontext'
import QRCode from 'qrcode.react'
import qrcode from 'qrcode.react'



let selectedSedarim = ["Zeraim"]

function NewProjectForm() {

    console.log("NewProjectForm")
    
    const [title, setTitle] = useState("")
    const [titleError, setTitleError] = useState(false)
    const [timePeriod, setTimePeriod] = useState("1 week")
    const [stage, setStage] = useState(1)

    //const qrRef = useRef(null)

    //const [sedarim, setSedarim] = useState({Zeraim: shas.Zeraim})
    //let sedarim = {Zeraim: shas.Zeraim}
    
    const {saveProject, setCurrentProject, currentProjectLink, sedarim, currentId} = useDBcontext()
    
    const newProject = {
        title: title,
        timePeriod: timePeriod,
        sedarim: sedarim,
        link: currentProjectLink
    }

    function handleSederChange(e) {

        let seder = e.target.value

        // if - else for UI only
        if (selectedSedarim.includes(seder)) {
            selectedSedarim.splice(selectedSedarim.indexOf(seder), 1)
        } else {
            selectedSedarim.push(seder)
        }

        // (newProject.)sedarim should remain an object.
        
        // if - else to update sedarim object based on selected seders
        if (sedarim[seder]) {
            delete sedarim[seder]
            //console.log('deleted from sedarim', sedarim)
        } else {
            sedarim[seder] = shas[seder]
            //console.log('added to sedarim', sedarim)
        }
    }

    const addProject = async (e) => {
        e.preventDefault()
        if (!title) {
            setTitleError(true)
            return
        }

        
        // console.log('qrcoderef.current', qrRef.current)
        // newProject.QRcode = qrRef.current

        try {
            //console.log('currPro', currentProject)
            await saveProject(newProject)
            setCurrentProject(newProject)
            setStage(stage + 1)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.container}>
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
            <label>Sedarim: <input readOnly type="text" value={selectedSedarim}></input></label>
            
            <label>Your project link:</label>
            <textarea readOnly id="link" value={`${currentProjectLink}`}></textarea>

            <label>Your project's shareable QR code:</label>
            <QRCode value={currentProjectLink} />
        
            <Link className={styles.soloBtn} to={`/viewproject/${currentId}`}><input className={styles.viewBtn} type="button" value="View"></input></Link>
           
            </>}
        </form>
        </div>
    )
}

export default NewProjectForm
