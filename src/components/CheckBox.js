import React from 'react';

function CheckBox(props){
    return(
        <div className='CheckBox'>

          <form className="getCountry" onSubmit={props.handleSubmit}>
            <input type="checkbox" name="arg" value="arg" onChange={props.handleChange} checked={props.arg}  />Argentina |
            <input type="checkbox" name="bra" value="bra" onChange={props.handleChange}/>Brazil |
            <input type="checkbox" name="deu" value="deu" onChange={props.handleChange}/>Germany |
            <input type="checkbox" name="jpn" value="jpn" onChange={props.handleChange}/>Japan |
            <input type="checkbox" name="sur" value="sur" onChange={props.handleChange}/>Suriname
            <input type="submit" value="Submit"  />
          </form>

        </div>
      ) // return
}

export default CheckBox
