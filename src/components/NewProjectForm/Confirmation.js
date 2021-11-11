import React from 'react'
import styles from '../../css/NewProjectForm.module.css'
import {Link} from 'react-router-dom'
import QRCode from 'qrcode.react'
import {useDBcontext} from '../../contexts/DBcontext'

function Confirmation(props) {
    const {currentProject, currentProjectLink, currentId} = useDBcontext()
    return (
        <>
        <div className={styles.formSection}>  
            <label className={styles.formRow}>Title: <input className={styles.info} readOnly value={props.title}></input></label>
            <label className={styles.formRow}>Time Period: <input className={styles.info} readOnly value={props.timePeriod}></input></label>
            <label className={styles.formRow}>Sedarim: 
                <textarea className={styles.info} readOnly
                    value={props.selectedSedarim.join(" ")}>
                </textarea>
            </label>

            <label className={styles.formRow}>Your project's shareable QR code:</label>
            <QRCode value={currentProject.link} />
        
            <Link className={styles.soloBtn} to={`/viewproject/${currentId}`}><input className={styles.viewBtn} type="button" value="View"></input></Link>
        </div>  
        </>
    )
}

export default Confirmation
