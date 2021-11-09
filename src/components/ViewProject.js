import React, {useState, useContext, useEffect} from 'react'
import styles from '../css/ViewProject.module.css'
import SederAccordion from '../components/ViewProject/SederAccordion'
import {shas} from '../shas'
import {useDBcontext} from '../contexts/DBcontext'
import {useHistory, useParams, Link} from 'react-router-dom'



function ViewProject() {
    
    let params = useParams()

    const {currentProject, getProject, setCurrentProject, setCurrentId, signUp, currentId} = useDBcontext()

    const checkParams = async () => {
        if (window.location.pathname != "/viewproject") {
            let id = params.projectId
            setCurrentId(id)
            try {
                const project = await(getProject(id))
                console.log('retrieved project' , project)
                setCurrentProject(project)
            } catch (err) {
                console.log('err', err)
            }
        }
    }

    useEffect(() => {
        checkParams()
        //console.log('currentId', currentId)
    }, [])
    

    return (
        <>
        
        <div className={styles.container}>
            <Link to="/"><h1>Siyum Mishnayos</h1></Link>
            <h2>Title: Shteig</h2>
            <h2>Duration: 1 month</h2> 
        </div>
        <div className={styles.container}>
            {currentProject?.sedarim.map((elem, i) => {
                let newMasechtos = []
                let masechtos = [] // elem -> {Zeraim: {brachos: {complete: false, learner: null}}}
                for (let seder in elem) { 
                    //console.log('elem[seder]', elem[seder])
                    //console.log('typeof(elem[seder])', typeof(elem[seder]))
                    for (let [masechta, data] of Object.entries(elem[seder])) {
                        //console.log("masechta, data", masechta, data)
                        masechtos.push({masechta,data})
                    }
                    //for (let masechta in elem[seder]) {
                        //console.log('masechta', masechta)
                        //let e = elem[seder].entries()
                        //newMasechtos.push(elem[seder][masechta])
                        //console.log('complete', elem[seder][masechta].complete)
                        //console.log('learner', elem[seder][masechta].learner)
                       // masechtos.push(masechta)
                        
                    //}
                    //console.log('new masech',newMasechtos)
                    //console.log('masechtos',masechtos)
                    return (
                        <SederAccordion key={i} seder={seder} masechtos={masechtos}/>
                    )
                }
            })}
        </div>
        </>
    )
}

export default ViewProject
