import React, {useState, useEffect} from 'react'
import styles from '../../css/ViewProject.module.css'
import {useDBcontext} from '../../contexts/DBcontext'


function MasechtaCard(props) {

    const {signUp, currentId} = useDBcontext()
    
    const [learner, setLearner] = useState("")
    const [nameSwitch, setNameSwitch] = useState(false)
    const [signingUp, setSigningUp] = useState(false)
    const [signedUp, setSignedUp] = useState(false)
    const [seconds, setSeconds] = useState(4)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (learner == "") {
            e.target.value = "Enter name"
            return console.log("inv")
        }
        try {
            await signUp(currentId, props.seder, props.masechta, learner)
            setSignedUp(true)
        } catch (error) {
            console.log(error)
        }

        
    }

    useEffect(() => {
        if (signedUp) {
            if (seconds === 0) {
                setSignedUp(false)
                window.location.reload()
                return
            }
            setTimeout(() => {
                setSeconds(seconds - 1)
            }, 1000)
        }
    }, [signedUp, seconds])
    
    return (
        <div className={styles.masechtaCard}>
            <p>{props.masechta}</p>

            {!signingUp && <>
            {props.learner == null && !signingUp ? <button disabled={signingUp} className={styles.icon} onClick={() => setSigningUp(!signingUp)}>+</button>
             : 
            <textarea wrap="off" readOnly className={styles.status} 
                value={nameSwitch ? props.learner : props.complete ? "complete" : "in progress"}
                onClick={() => setNameSwitch(!nameSwitch)}>
            </textarea>}
            </>}

            {signingUp && !signedUp && <>
                <form className={styles.masechtaForm} onSubmit={e => handleSubmit(e)}>
                    <input type="text" autoFocus={true} value={learner} onChange={e => setLearner(e.target.value)}></input>
                    <input type="submit" value="Save"></input>
                </form>
            </>}

            {signedUp && <>
                <h5>Sign up successful. Refreshing in {seconds} seconds...</h5>
            </>}
            
            


            {/* <form className={styles.form} onSubmit={(e) => {handleSubmit(e)}}>
            {!signingUp ? 
            <input 
                className={styles.icon} 
                type="button" 
                value={props.learner == null ? "+" : nameSwitch ? props.learner : props.complete ? "completed" : "in progress"}
                onClick={() => {props.learner !== null ? setNameSwitch(!nameSwitch) : setSigningUp(true)}} 
                >
            </input>
            :
            <input 
                className={styles.nameField} 
                type="text" 
                value={learner}
                onChange={e => setLearner(e.target.value)}
                >
            </input>}
            </form> */}
        </div>
    )
}

export default MasechtaCard
