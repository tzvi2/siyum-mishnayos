import React, {useState, useContext, useEffect} from 'react'
import styles from '../css/ViewProject.module.css'
import SederAccordion from '../components/ViewProject/SederAccordion'
import Header from '../components/Header'
import {shas} from '../shas'
import {useDBcontext} from '../contexts/DBcontext'
import QRCode from 'qrcode.react'
import {useHistory, useParams, Link} from 'react-router-dom'



function ViewProject() {
    
    let params = useParams()

    const {getProject, currentProject, setCurrentProject, setCurrentId, signUp, currentId, currentProjectLink} = useDBcontext()

    const checkParams = async () => {
        if (window.location.pathname != "/viewproject") {
                let id = params.projectId
                setCurrentId(id)
                try {
                    const project = await(getProject(id))
                    setCurrentProject(project)
                } catch (err) {
                    console.log('err', err)
                }
        }
    }


    useEffect(() => {
        checkParams()
    }, [])
        
    return (
        <>
        <Header />
        <div className={`${styles.banner}`}>
            <h3>{currentProject?.title}</h3>
            <h3>{currentProject?.timePeriod}</h3> 
        </div>

        <div className={styles.flexColumn}>
        {!currentProject ? <p>loading...</p> : <>    
            {Object.keys(shas).map((seder,i) => {
                if (currentProject.sedarim[seder]) {
                    let masechtosArr = []
                    Object.keys(shas[seder]).map((masechta, i) => {
                        masechtosArr.push({[masechta]: {...currentProject.sedarim[seder][masechta]}})
                    })
                    return (
                        <SederAccordion key={i} seder={seder} masechtos={masechtosArr} />
                    )
                }
            })} </>}
        </div>

        <div className={`${styles.flexColumn} ${styles.bottom}`}>
            <label className={`${styles.qrCol} ${styles.qrLabel}`}>Project QR code:</label>
            <QRCode className={styles.qrCol} value={`${window.location.origin}/viewproject/${currentId}`} />
        </div>
        </>
    )
}

export default ViewProject