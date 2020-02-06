import React from 'react'

function SelectionIndicator(props) {

  return(
    <div className='CheckBox'>
      {
        1 !== 0
        ?
        <div>
          <form onSubmit={props.handleSubmit}>
            <input type="text" onChange={props.handleChange} />
            <input type="submit" value="Search" />
          </form>
        </div>
        :
        <h1>...</h1>
      }
    <div/>
  )

} // SelectSeach

export default SelectIndicator
