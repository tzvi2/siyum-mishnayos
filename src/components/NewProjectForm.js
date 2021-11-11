import React, {useState, useEffect, useRef} from 'react'
import styles from '../css/NewProjectForm.module.css'
import ViewProject from '../components/ViewProject'
import CreateProject from './NewProjectForm/CreateProject'
import ReviewProject from './NewProjectForm/ReviewProject'
import Confirmation from './NewProjectForm/Confirmation'
import {db} from '../firebaseConfig'
import Header from '../components/Header'
import {doc, setDoc, collection, addDoc} from 'firebase/firestore'
import {shas} from '../shas'
import {Route, Routes, Link, useHistory} from 'react-router-dom'
import { useDBcontext } from '../contexts/DBcontext'
import QRCode from 'qrcode.react'


let selectedSedarim = ["Zeraim"]

function NewProjectForm() {

    console.log("NewProjectForm")
    
    const [title, setTitle] = useState("")
    const [timePeriod, setTimePeriod] = useState("1 week")
    const [stage, setStage] = useState(1)

    const {saveProject, getProject, setCurrentId, saveProjectLink, setCurrentProjectLink, setCurrentProject, currentProjectLink, sedarim, currentId, currentProject} = useDBcontext()
    
    const newProject = {
        title: title,
        timePeriod: timePeriod,
        sedarim: sedarim,
    }

    const addProject = async (e) => {
        e.preventDefault()
    
        try {
            const newProj = await saveProject(newProject)
            console.log('newProj', newProj)
            setCurrentProject(newProj)
            setStage(stage + 1)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        
        <div className="App">
            <Header />
            <form onSubmit={e => addProject(e)}>

                {stage === 1 &&
                <CreateProject
                    title={title}
                    setTitle={setTitle}
                    timePeriod={timePeriod}
                    setTimePeriod={setTimePeriod}
                    stage={stage}
                    setStage={setStage}
                    newProject={newProject}
                    selectedSedarim={selectedSedarim}
                />}
    
                {stage === 2 &&
                <ReviewProject 
                    title={title}
                    timePeriod={timePeriod}
                    selectedSedarim={selectedSedarim}
                    stage={stage}
                    setStage={setStage}
                />}

                {stage === 3 &&
                <Confirmation 
                    selectedSedarim={selectedSedarim}
                />}
            </form>
        </div>
        
    )
}

export default NewProjectForm
