import React from 'react'
import styles from '../../css/NewProjectForm.module.css'
import {Link} from 'react-router-dom'
import QRCode from 'qrcode.react'
import {useDBcontext} from '../../contexts/DBcontext'

function Confirmation(props) {
    const {currentProject, currentProjectLink, currentId} = useDBcontext()
    return (
        <>
            <h4>Your project was created.</h4>
            <label>Title: {currentProject.title}</label>
            <label>Time Period: {currentProject.timePeriod}</label>
            <label>Sedarim: <input readOnly type="text" value={props.selectedSedarim}></input></label>
            
            <label>Your project link:</label>
            <textarea readOnly id="link" value={currentProject.link}></textarea>

            <label>Your project's shareable QR code:</label>
            <QRCode value={currentProject.link} />
        
            <Link className={styles.soloBtn} to={`/viewproject/${currentId}`}><input className={styles.viewBtn} type="button" value="View"></input></Link>
           
            </>
    )
}

export default Confirmation
