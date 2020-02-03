import React from 'react';

function CheckBox(props){
    return(
        <div className='CheckBox'>

          <form className="getCountry" onSubmit={props.handleSubmit}>
            <input type="checkbox" name="arg" value={props.countriesLabels[0]} onChange={props.handleChange} checked={props.arg}/>{props.countriesLabels[0]} |
            <input type="checkbox" name="bra" value={props.countriesLabels[1]} onChange={props.handleChange}/>{props.countriesLabels[1]} |
            <input type="checkbox" name="chl" value={props.countriesLabels[2]} onChange={props.handleChange}/>{props.countriesLabels[2]} |
            <input type="checkbox" name="sur" value={props.countriesLabels[3]} onChange={props.handleChange}/>{props.countriesLabels[3]} |
            <input type="checkbox" name="ecu" value={props.countriesLabels[4]} onChange={props.handleChange}/>{props.countriesLabels[4]}
            <input type="submit" value="Submit"  />
          </form>

        </div>
      ) // return
}

export default CheckBox
