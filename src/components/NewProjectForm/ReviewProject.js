import React from 'react'
import styles from '../../css/NewProjectForm.module.css'


function ReviewProject(props) {
    return (
        <>
        <div className={styles.formSection} >
            <label className={styles.formRow}>Title: <input className={styles.info} readOnly value={props.title}></input></label>
            <label className={styles.formRow}>Time Period: <input className={styles.info} readOnly value={props.timePeriod}></input></label>
            <label className={styles.formRow}>Sedarim: 
                <textarea className={styles.info} readOnly
                    value={props.selectedSedarim.join(" ")}>
                </textarea>
            </label>

            <div className={styles.formRow}>
                <input className={styles.half} type="button" value="Back" onClick={() => props.setStage(props.stage - 1)}></input>
                <input className={styles.half} type="submit" value="Save"></input>
            </div>
        </div>   
        </>
    )
}

export default ReviewProject
