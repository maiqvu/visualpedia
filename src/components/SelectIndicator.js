import React from 'react'
import axios from 'axios';

function SelectionIndicator (props){

    return(
      <div className='CheckBox'>
        {
        0 !== 0
        ?
        <div>
          <form onSubmit={props.handleSubmit}>
            <input type="text"onChange={props.handleChange}/>
            <input type="submit" value="search" />
          </form>
        </div>
        :
        <h1></h1>
      }
      </div>
    ) // return

} // SelectSeach

export default SelectIndicator
