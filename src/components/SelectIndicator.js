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
        <input type="text" onChange={props.handleChange}
        placeholder="Search Indicator"
        />
      </form>
      {
        props.labels.length !== 0
        ?
      <ul className={styles.menu}>
        {props.labels.map((res, ind) => {
          // console.log(res, ind);
          return <li key={ind} onClick={props.chooseIndicator} data-indicator={res[1]} className={styles.item}>{res[0]}</li>;
        })}

      </ul>
      :
      <p></p>
      }
      </div>
      :
      <h1></h1>
    }
    </div>

  )
} // SelectSeach

export default SelectIndicator
