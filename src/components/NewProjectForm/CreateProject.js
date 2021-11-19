import React, {useState, useEffect} from 'react'
import styles from '../../css/NewProjectForm.module.css'
import {useDBcontext} from '../../contexts/DBcontext'
import {shas} from '../../shas'
import Select from 'react-select'


//let selectedSedarim = ["Zeraim"]

function CreateProject(props) {
    const [titleError, setTitleError] = useState(false)
    const [sederError, setSederError] = useState(false)
    const [allSelected, setAllSelected] = useState(false)
    
    const {sedarim, setSedarim} = useDBcontext()
  
    function handleSederChange(e) {

        setSederError(false)
        let seder = e.target.value
        if (sedarim[seder]) {
            let newSedarimState = sedarim
            delete newSedarimState[seder]
            setSedarim(newSedarimState)
        } else {
            let newSedarimState = sedarim
            newSedarimState[seder] = shas[seder]
            setSedarim(newSedarimState)
        }
    }

    const toggleSelectAll = () => {
        if(allSelected) {
            for (let k of Object.keys(shas)) {
                delete sedarim[k]
            }
            setAllSelected(false)
        } else {
            for (let key of Object.keys(shas)) {
                sedarim[key] = shas[key]
            }
            setAllSelected(true)
        }
    }

    const advance = () => {

        if (!props.title) {
            setTitleError(true); 
            return
        }
        for(let e in sedarim) {
            props.setStage(props.stage + 1)
            return
        }; 
        setSederError(true)
        return 

    }
    
    return (
        <>
        <div className={styles.formSection}>
            {titleError && <p className={styles.error}>Please enter a title.</p>}
            <label className={styles.formRow}>
                Title:
                <input type="text" value={props.title} onChange={e => {props.setTitle(e.target.value); setTitleError(false)}}></input>
            </label>

            <label className={styles.formRow}>
                Time Period:
                <select value={props.timePeriod} onChange={e => props.setTimePeriod(e.target.value)}>
                    <option value="1 week">1 Week</option>
                    <option value="1 month">1 Month</option>
                    <option value="1 year">1 Year</option>
                </select>
            </label>
            

            {sederError && <p className={styles.error}>Please choose at least one seder.</p>}
            <div className={styles.formRow}>
                <label htmlFor="seder_selection">Sedarim:</label>
                <input className={styles.dropdown} type="button" onClick={() => toggleSelectAll()} value={allSelected ? "deselect all" : "Select all" }></input>
            </div>
            
                <div className={styles.sederList} onChange={e => handleSederChange(e)}>
                    <label className={styles.seder}>Zeraim<input key={Math.random()} value="Zeraim" type="checkbox" defaultChecked={sedarim.Zeraim}></input></label>
                    <label className={styles.seder}>Moed<input key={Math.random()} value="Moed" type="checkbox" defaultChecked={sedarim.Moed}></input></label>
                    <label className={styles.seder}>Nashim<input key={Math.random()} value="Nashim" type="checkbox" defaultChecked={sedarim.Nashim}></input></label>
                    <label className={styles.seder}>Nezikin<input key={Math.random()} value="Nezikin" type="checkbox" defaultChecked={sedarim.Nezikin}></input></label>
                    <label className={styles.seder}>Kadshim<input key={Math.random()} value="Kadshim" type="checkbox" defaultChecked={sedarim.Kadshim}></input></label>
                    <label className={styles.seder}>Taharos<input key={Math.random()} value="Taharos" type="checkbox" defaultChecked={sedarim.Taharos}></input></label>
                </div>
            
            
            
            <div className={styles.formRow}>
                <input className={`${styles.soloBtn}`} readOnly type="button" value="Next" onClick={() => advance()}></input>
            </div>
        </div>
        </>
    )
}

export default CreateProject
