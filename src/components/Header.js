import React from 'react'
import {Link} from 'react-router-dom'
import styles from '../css/Header.module.css'


function Header() {
    return (
      <div className={styles.header}>
        <Link to="/"><h1>Siyum Mishnayos</h1></Link>  
     </div>
  )
}

export default Header
