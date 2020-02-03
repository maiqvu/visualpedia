import React from 'react';

function CheckBox(props){
    return(
        <div className='CheckBox'>

          <form className="getCountry" onSubmit={props.handleSubmit}>
            <input type="checkbox" name="arg" value="Argentina" onChange={props.handleChange} checked={props.arg}/>Argentina |
            <input type="checkbox" name="bra" value="Brazil" onChange={props.handleChange}/>Brazil |
            <input type="checkbox" name="chl" value="Chile" onChange={props.handleChange}/>Chile |
            <input type="checkbox" name="sur" value="Suriname" onChange={props.handleChange}/>Suriname |
            <input type="checkbox" name="ecu" value="Ecuador" onChange={props.handleChange}/>Ecuador
            <input type="submit" value="Submit"  />
          </form>

        </div>
      ) // return
}

export default CheckBox
