import React from 'react'
import styles from '../css/Mishna.module.css'
import {Link} from 'react-router-dom'

function Mishna() {
    return (
        <div className={styles.mishna}>
          <div className={styles.book1}>
            <span>
              &#1502;&#1488;&#1497;&#1502;&#1514;&#1497;
              <hr className="line"></hr>
              <hr className="line"></hr>
              <hr className="line"></hr>
              <hr className="line"></hr>
            </span>
          </div>
          <div className={styles.book2}>
            <span>
              &#1502;&#1488;&#1497;&#1502;&#1514;&#1497;
              <hr className="line"></hr>
              <hr className="line"></hr>
              <hr className="line"></hr>
              <hr className="line"></hr>
            </span>
          </div>
          </div>
    )
}

export default Mishna
