import React, {useState, useContext, useEffect} from 'react'
import styles from '../css/ViewProject.module.css'
import SederAccordion from '../components/ViewProject/SederAccordion'
import Header from '../components/Header'
//import {shas} from '../shas'
import {useDBcontext} from '../contexts/DBcontext'
import QRCode from 'qrcode.react'
import {useHistory, useParams, Link} from 'react-router-dom'



function ViewProject() {
    console.log("ViewProject" )
    console.log(window.location)
    
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
                localStorage.removeItem("current ID")
                localStorage.setItem("current ID", id)
                try {
                    const project = await(getProject(id))
                    console.log('retrieved project' , project)
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
            {!currentProject ? <div>loading</div> :
            Object.keys(currentProject.sedarim).map((seder, i) => {
                let arr = []
                Object.entries(currentProject.sedarim[seder]).map(([masechta, data]) => {
                    arr.push({masechta, data})
                })
                return (
                    <SederAccordion key={i} seder={seder} masechtos={arr} />
                )
            })}
        </div>

        <div className={styles.flexColumn}>
            <label className={`${styles.qrCol} ${styles.qrLabel}`}>Project QR code:</label>
            <QRCode className={styles.qrCol} value={currentProjectLink} />
        </div>
        </>
    )
}

export default ViewProject