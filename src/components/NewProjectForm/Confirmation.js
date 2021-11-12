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
            <label className={styles.formRow}>Title: <input className={styles.info} readOnly value={currentProject.title}></input></label>
            <label className={styles.formRow}>Time Period: <input className={styles.info} readOnly value={currentProject.timePeriod}></input></label>
            <label className={styles.formRow}>Sedarim: 
                <textarea className={styles.info} readOnly
                    value={`${props.selectedSedarim.join(" ")}`}>
                </textarea>
            </label>

            <label className={`${styles.formRow} ${styles.centered}`}>Your project's QR code:</label>
            <QRCode className={`${styles.formRow} ${styles.centered}`} value={`${window.location.origin}/viewproject/${currentId}`} />
            
            <div className={`${styles.formRow} ${styles.bottom}`}>
                <a className={styles.viewBtn} href={`${window.location.origin}/viewproject/${currentId}`}>View your project</a> 
            </div>
            
        </div>  
        </>
    )
}

export default Confirmation
