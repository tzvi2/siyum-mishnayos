import React, {useState, useEffect} from 'react'
import styles from '../../css/ViewProject.module.css'
import MasechtaCard from './MasechtaCard'
import down_arrow from '../../images/down_arrow.png'

function SederAccordion(props) {
    const [expanded, setExpanded] = useState(false)
    
    return (
        <>
        <div className={styles.sederCard} onClick={() => setExpanded(!expanded)}>
            <label className={styles.sederName}>{props.seder}</label>
            {expanded ? <img  src={down_arrow}></img>
            : <img className={styles.up} src={down_arrow}></img>}
        </div>

        {expanded && 
        <div className={styles.masechtosColumn}>
            {props.masechtos.map((obj, i) => {
                let masechta = Object.keys(obj)[0]
                return (
                    <MasechtaCard
                        key={i}
                        masechta={masechta}
                        complete={obj[masechta].complete}
                        learner={obj[masechta].learner}
                        seder={props.seder}
                    />
                )
            })}
        </div>
        }
        </>
    )
}

export default SederAccordion
