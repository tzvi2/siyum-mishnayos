import React, {useState} from 'react'
import styles from '../../css/NewProjectForm.module.css'
import {useDBcontext} from '../../contexts/DBcontext'
import {shas} from '../../shas'


//let selectedSedarim = ["Zeraim"]

function CreateProject(props) {

    const [titleError, setTitleError] = useState(false)

    const {sedarim} = useDBcontext()

    function handleSederChange(e) {

        let seder = e.target.value

        // if - else for UI only
        if (props.selectedSedarim.includes(seder)) {
            props.selectedSedarim.splice(props.selectedSedarim.indexOf(seder), 1)
        } else {
            props.selectedSedarim.push(seder)
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

    return (
        <>
        <h4>Create Project</h4>
            {titleError && <p className={styles.error}>Please enter a title.</p>}
            <label>
                Title:
                <input type="text" value={props.title} onChange={e => {props.setTitle(e.target.value); setTitleError(false)}}></input>
            </label>

            <label>
                Time Period:
                <select value={props.timePeriod} onChange={e => props.setTimePeriod(e.target.value)}>
                    <option value="1 week">1 Week</option>
                    <option value="1 month">1 Month</option>
                    <option value="1 year">1 Year</option>
                </select>
            </label>

            <label>
                Sedarim:
                <select className={styles.sedarimDropdown} multiple={true} value={props.selectedSedarim} onChange={e => handleSederChange(e)}>
                    <option value="Zeraim">Zeraim</option>
                    <option value="Moed">Moed</option>
                    <option value="Nashim">Nashim</option>
                    <option value="Nezikin">Nezikin</option>
                    <option value="Kadshim">Kadshim</option>
                    <option value="Taharos">Taharos</option>
                </select>
            </label>
            
            <input className={`${styles.dark} ${styles.full}`} readOnly type="button" value="Next" onClick={() => {if(!props.title) {setTitleError(true); return} props.setStage(props.stage + 1)}}></input>
            </>
    )
}

export default CreateProject
