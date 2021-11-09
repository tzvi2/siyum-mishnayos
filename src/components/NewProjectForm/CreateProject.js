// import React, {useState, useEffect} from 'react'
// import styles from '../../css/NewProjectForm.module.css'


// function CreateProject(props) {

//     const [titleError, setTitleError] = useState(false)

//     return (
//         <>
//         {titleError && <p>Please enter a title.</p>}
//         <label>
//             Title:
//             <input type="text" value={props.title} onChange={e => {props.setTitle(e.target.value); setTitleError(false)}}></input>
//         </label>

//         <label>
//             Time Period:
//             <select value={props.timePeriod} onChange={e => props.setTimePeriod(e.target.value)}>
//                 <option value="1 week">1 Week</option>
//                 <option value="1 month">1 Month</option>
//                 <option value="1 year">1 Year</option>
//             </select>
//         </label>

//         <label>
//             Sedarim:
//             <select className={styles.sedarimDropdown} multiple={true} value={props.sedarim} onChange={e => props.handleChange(e.target.value)}>
//                 <option value="Zeraim">Zeraim</option>
//                 <option value="Moed">Moed</option>
//                 <option value="Nashim">Nashim</option>
//                 <option value="Nezikin">Nezikin</option>
//                 <option value="Kadshim">Kadshim</option>
//                 <option value="Taharos">Taharos</option>
//             </select>
//         </label>
        
//         <input className={`${styles.dark} ${styles.full}`} readOnly type="button" value="Next" onClick={() => {if(!props.title) {setTitleError(true)} props.setStage(props.stage + 1)}}></input>
//         </>
//     )
// }

// export default CreateProject
