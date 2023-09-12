import React from 'react'
import styles from '../../css/NewProjectForm.module.css'
import QRCode from 'qrcode.react'
import {useDBcontext} from '../../contexts/DBcontext'

function Confirmation(props) {
    function log () {
        console.log(`${window.location.origin}/siyum-mishnayos/viewproject/${currentId}`)
    }
    const {currentProject, sedarim, currentId} = useDBcontext()
    return (
        <>
        <div className={styles.formSection}>  
            <label className={styles.formRow}>Title: <input className={styles.info} readOnly value={currentProject.title}></input></label>
            <label className={styles.formRow}>Time Period: <input className={styles.info} readOnly value={currentProject.timePeriod}></input></label>
            <label className={styles.formRow}>Sedarim: 
                <textarea className={styles.info} readOnly
                    value={Object.keys(sedarim).join(" ")}>
                </textarea>
            </label>

            <label className={`${styles.formRow} ${styles.centered}`}>Your project's QR code:</label>
            <QRCode className={`${styles.formRow} ${styles.centered}`} value={`${window.location.origin}siyum-mishnayos/viewproject/${currentId}`} />
            
            <div className={`${styles.formRow} ${styles.bottom}`}>
                <a className={styles.viewBtn} href={`${window.location.origin}/siyum-mishnayos/viewproject/${currentId}`} onClick={() => log()}>View your project</a> 
            </div>
            
        </div>  
        </>
    )
}

export default Confirmation
