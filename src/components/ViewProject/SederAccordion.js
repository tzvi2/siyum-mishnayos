import React, {useState, useEffect} from 'react'
import styles from '../../css/ViewProject.module.css'
import MasechtaCard from './MasechtaCard'
import down_arrow from '../../images/down_arrow.png'

function SederAccordion(props) {
    const [expanded, setExpanded] = useState(true)
    //console.log('props.masechtos',props.masechtos)
    return (
        <>
        <div className={styles.sederCard} onClick={() => setExpanded(!expanded)}>
            <label>{props.seder}</label>
            {expanded ? <img className={styles.up} src={down_arrow}></img>
            : <img src={down_arrow}></img>}
            
        </div>
        {expanded && <>
        <div className={styles.masechtaSection}>
            {props.masechtos.map((masechta, i) => {
                return (
                    <MasechtaCard
                        key={i}
                        masechta={masechta.masechta}
                        complete={masechta.data.complete}
                        learner={masechta.data.learner}
                        seder={props.seder}
                    />
                )
            })}
        </div></>}
        </>
    )
}

export default SederAccordion
