import React from 'react'
import Header from './Header'
import styles from '../css/About.module.css'

function About() {
    return (
        <>
        <Header />
        <div className={styles.container}>
            <h3>Siyum Mishnayos allows you to quickly set up a mishnayos project.</h3>
        </div>
        <div className={styles.flexColumn}>
            <p className={styles.left}>Step 1: Choose a title, duration, and sedarim for your project.</p>
            <p className={styles.middle}>Step 2: Save your project and recieve a QR code.</p>
            <p className={styles.right}>Step 3: Easily share your project so others can sign up to learn.</p>
        </div>
        </>
    )
}

export default About
