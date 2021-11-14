import React from 'react'
import styles from '../css/Mishna.module.css'
import {Link} from 'react-router-dom'

function Mishna() {
    return (
        <div className={styles.mishna}>
          <div className={styles.book1}>
            <div>
              &#1502;&#1488;&#1497;&#1502;&#1514;&#1497;
              <hr className="line"></hr>
              <hr className="line"></hr>
              <hr className="line"></hr>
              <hr className="line"></hr>
            </div>
          </div>
          <div className={styles.book2}>
            <div>
              &#1502;&#1488;&#1497;&#1502;&#1514;&#1497;
              <hr className="line"></hr>
              <hr className="line"></hr>
              <hr className="line"></hr>
              <hr className="line"></hr>
            </div>
          </div>
          </div>
    )
}

export default Mishna
