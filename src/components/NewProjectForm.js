import React, {useState, useEffect, useRef} from 'react'
import styles from '../css/NewProjectForm.module.css'
import CreateProject from './NewProjectForm/CreateProject'
import ReviewProject from './NewProjectForm/ReviewProject'
import Confirmation from './NewProjectForm/Confirmation'
import Header from '../components/Header'
import { useDBcontext } from '../contexts/DBcontext'

function NewProjectForm() {
    
    const [title, setTitle] = useState("")
    const [timePeriod, setTimePeriod] = useState("1 week")
    const [stage, setStage] = useState(1)

    const {saveProject, setCurrentProject, sedarim} = useDBcontext()
    
    const newProject = {
        title: title,
        timePeriod: timePeriod,
        sedarim: sedarim,
    }

    const addProject = async (e) => {
        e.preventDefault()
    
        try {
            const newProj = await saveProject(newProject)
            setCurrentProject(newProj)
            setStage(stage + 1)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="App">
            <Header />
            <div className="container">
            <form className={styles.projectForm} onSubmit={e => addProject(e)}>

                {stage === 1 && <>
                <h2>Create Project</h2>
                <CreateProject
                    title={title}
                    setTitle={setTitle}
                    timePeriod={timePeriod}
                    setTimePeriod={setTimePeriod}
                    stage={stage}
                    setStage={setStage}
                    newProject={newProject}
                />
                </>}
    
                {stage === 2 && <>
                <h2>Review Project</h2>
                <ReviewProject 
                    title={title}
                    timePeriod={timePeriod}
                    stage={stage}
                    setStage={setStage}
                />
                </>}

                {stage === 3 && <>
                <h2>Your project was created.</h2>
                <Confirmation />
                </>}
            </form>
            </div>
        </div>
        
    )
}

export default NewProjectForm
