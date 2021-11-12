import React, {useState, useContext, useEffect} from 'react'
import styles from '../css/ViewProject.module.css'
import SederAccordion from '../components/ViewProject/SederAccordion'
import Header from '../components/Header'
import {shas} from '../shas'
import {useDBcontext} from '../contexts/DBcontext'
import QRCode from 'qrcode.react'
import {useHistory, useParams, Link} from 'react-router-dom'



function ViewProject() {
    console.log("ViewProject" )
    
    let params = useParams()

    const {getProject, currentProject, setCurrentProject, setCurrentId, signUp, currentId, currentProjectLink} = useDBcontext()

    const sederStrs = []
    const masechtaObjs = []

    const checkParams = async () => {
        if (window.location.pathname != "/viewproject") {
            // if (localStorage.getItem("current ID")) {
            //     try {
            //         const project = await(getProject(localStorage.getItem("current ID")))
            //         setCurrentProject(project)
            //     } catch (error) {
            //         console.log('errrerer', error)
            //     }
            // } else {
                let id = params.projectId
                setCurrentId(id)
                // localStorage.removeItem("current ID")
                // localStorage.setItem("current ID", id)
                try {
                    const project = await(getProject(id))
                    setCurrentProject(project)
                } catch (err) {
                    console.log('err', err)
                }
            //} 
        }
    }


    useEffect(() => {
        checkParams()
    }, [])
        
    return (
        <>
        <Header />
        <div className={`${styles.flexColumn} ${styles.banner}`}>
            <h2>{currentProject?.title}</h2>
            <h2>{currentProject?.timePeriod}</h2> 
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