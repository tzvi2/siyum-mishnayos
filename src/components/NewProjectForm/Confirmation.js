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
            <QRCode className={`${styles.formRow} ${styles.centered}`} value={currentProject.link} />
            
            <div className={`${styles.formRow} ${styles.bottom}`}>
                <Link className={styles.viewBtn} to={`/viewproject/${currentId}`}>View your project</Link> 
            </div>
            
        </div>  
        </>
    )
}

export default Confirmation
