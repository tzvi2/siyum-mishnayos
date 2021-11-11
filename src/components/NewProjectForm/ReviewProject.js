import React from 'react'
import styles from '../../css/NewProjectForm.module.css'


function ReviewProject(props) {
    return (
        <>
            <h4>Review Project</h4>
            <label>Title: <input readOnly value={props.title}></input></label>
            <label>Time Period: <input readOnly value={props.timePeriod}></input></label>
            <label>Sedarim: <ul>{props.selectedSedarim.map((seder, i) => (
                <li key={i}>{seder}</li>
            ))}</ul></label>

            <div className={styles.row}>
                <input className={`${styles.light} ${styles.half}`} type="button" value="Back" onClick={() => props.setStage(props.stage - 1)}></input>
                <input className={`${styles.dark} ${styles.half}`} type="submit" value="Save"></input>
            </div>
            </>
    )
}

export default ReviewProject
