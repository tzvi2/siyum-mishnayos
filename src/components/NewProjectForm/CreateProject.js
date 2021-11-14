import React, {useState, useEffect} from 'react'
import styles from '../../css/NewProjectForm.module.css'
import {useDBcontext} from '../../contexts/DBcontext'
import {shas} from '../../shas'
import Select from 'react-select'


//let selectedSedarim = ["Zeraim"]

function CreateProject(props) {

    const mql = window.matchMedia("screen and (max-width: 700px")
    const [mobile, setMobile] = useState(mql.matches)
    //const [selected, setSelected] = useState(["Zeraim"])
    const [showSedarimList, setShowSedarimList] = useState(false)
    const [titleError, setTitleError] = useState(false)
    const [sederError, setSederError] = useState(false)
    
    const {sedarim, setSedarim} = useDBcontext()
    useEffect(() => {
        const handleScreenResize = () => setMobile(mql.matches)
        mql.addEventListener('change', handleScreenResize)
        //console.log(mql.matches)
        return () => {
            mql.removeEventListener('change', handleScreenResize)
        }
    }, [mql])

    
    // useEffect(() => {
    //     console.log(selected)
    // }, [selected])

    function handleSederChange(e, seder) {

        setSederError(false)

        if (sedarim[seder]) {
            // if (Object.keys(sedarim).length === 1) {
            //     return
            // }
            delete sedarim[seder]

        } else {
            sedarim[seder] = shas[seder]
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
                <input className={styles.dropdown} type="button" onClick={() => setShowSedarimList(!showSedarimList)} value={"Select..." }></input>
            </div>
            {showSedarimList && 
                <div className={styles.sederList}>
                    <label className={styles.seder}>Zeraim<input onChange={e => handleSederChange(e, "Zeraim")} type="checkbox" checked={sedarim["Zeraim"]}></input></label>
                    <label className={styles.seder}>Moed<input onChange={e => handleSederChange(e, "Moed")} type="checkbox" checked={sedarim["Moed"]}></input></label>
                    <label className={styles.seder}>Nashim<input onChange={e => handleSederChange(e, "Nashim")} type="checkbox" checked={sedarim["Nashim"]}></input></label>
                    <label className={styles.seder}>Nezikin<input onChange={e => handleSederChange(e, "Nezikin")} type="checkbox" checked={sedarim["Nezikin"]}></input></label>
                    <label className={styles.seder}>Kadshim<input onChange={e => handleSederChange(e, "Kadshim")} type="checkbox" checked={sedarim["Kadshim"]}></input></label>
                    <label className={styles.seder}>Taharos<input onChange={e => handleSederChange(e, "Taharos")} type="checkbox" checked={sedarim["Taharos"]}></input></label>
                </div>
            }
            
            
            <div className={styles.formRow}>
                <input className={`${styles.soloBtn}`} readOnly type="button" value="Next" onClick={() => advance()}></input>
            </div>
        </div>
        </>
    )
}

export default CreateProject
