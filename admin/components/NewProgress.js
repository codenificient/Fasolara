import React from 'react'
import styles from '../styles/Progress.module.css'


function NewProgress() {
  return (
    <div className={styles.circular_progress}>
  <div className={styles.circular_progress_circle}>
    <div className={`segment segment2`}></div>
    <div className={`segment segment2`} ></div>    
    <div className={`segment segment3`}></div>
    <div className={`segment segment4`} ></div>
  </div>
  <div className={styles.circular_progress_inner}></div>
  <div className={styles.circular_progress_value}>75%</div>
</div>
  )
}

export default NewProgress