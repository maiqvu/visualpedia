import React from 'react'
import styles from './SelectIndicator.module.css';

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
          return <li key={ind} className={styles.item} onClick={props.handleSubmit} data-indicator={res[1]}>{res[0]}</li>;
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
