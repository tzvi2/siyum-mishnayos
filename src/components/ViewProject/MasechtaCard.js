import React, {useState, useEffect} from 'react'
import styles from '../../css/ViewProject.module.css'
import {useDBcontext} from '../../contexts/DBcontext'


function MasechtaCard(props) {

    const {signUp, currentId, setCompleteStatus} = useDBcontext()
    
    const [learner, setLearner] = useState("")
    const [nameSwitch, setNameSwitch] = useState(false)
    const [signingUp, setSigningUp] = useState(false)
    //const [signedUp, setSignedUp] = useState(false)
    const [checked, setChecked] = useState(false)
    const [seconds, setSeconds] = useState(4)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (learner == "") {
            e.target.value = "Enter name"
            return console.log("inv")
        }
        try {
            await signUp(currentId, props.seder, props.masechta, learner)
            setSigningUp(!signingUp)
            setNameSwitch(!nameSwitch)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCheckBoxClick = async (e) => {
        e.preventDefault()
        console.log(e.target.checked)
        try {
            await setCompleteStatus(currentId, props.seder, props.masechta, e.target.checked)
            //setChecked(!checked)
        } catch (error) {
            console.log(error)
        }  
    }
    
    return (
        <div className={styles.masechtaCard}>
            <p>{props.masechta}</p>
            <div className={styles.masechtaInfo}>
            {!signingUp && props.learner !== null && <>
            <textarea wrap="off" readOnly className={styles.status} 
                value={nameSwitch ? props.learner : props.complete ? "complete" : "in progress"}
                onClick={() => setNameSwitch(!nameSwitch)}>
            </textarea>
            </>}

            {!signingUp && props.learner == null && <input readOnly type="button" value="Sign up" className={styles.icon} onClick={() => setSigningUp(!signingUp)}></input>}
            {!signingUp && props.learner !== null && <input className={styles.checkbox} type="checkbox" checked={props.complete} onChange={handleCheckBoxClick} disabled={signingUp}></input>}
            </div>
            {signingUp &&  <>
                <form className={styles.masechtaForm} onSubmit={e => handleSubmit(e)}>
                    <input type="text" autoFocus={true} value={learner} onChange={e => setLearner(e.target.value)}></input>
                    <input type="submit" value="Save"></input>
                </form>
            </>}
        </div>
    )
}

export default MasechtaCard
