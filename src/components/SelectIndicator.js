import React from 'react'
import styles from './SelectIndicator.module.css'

function SelectIndicator(props) {

  return (
    <div className='CheckBox'>
      {
      props.countriesLabels.length !== 0
      ?
      <div>
      <form onSubmit={props.handleSubmit}>
        <input type="text" onChange={props.handleChange} />
      </form>
      <ul className={styles.menu}>
        {props.labels.map((res, ind) => {
          // console.log(res, ind);
          return <li key={ind} onClick={props.chooseIndicator} value={res[1]} className={styles.item}>{res[0]}</li>;
        })}
      </ul>
      </div>
      :
      <h1></h1>
    }
    </div>

  )
} // SelectSeach

export default SelectIndicator
