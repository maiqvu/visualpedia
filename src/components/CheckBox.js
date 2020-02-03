import React from 'react';

function CheckBox(props){
    return(
        <div className='CheckBox'>
          {
          props.countriesLabels.length !== 0
          ?
          <div>
          <form className="chooseCountryForm"  onSubmit={props.handleSubmit}>

            {props.countriesLabels.map((c , index) => {
              return (
                <div key={index} className="chooseCountrydiv">
                  <label className="chooseCountryLabel">{c}</label>
                  <input className="chooseCountryInput" type='checkbox'
                  onChange={props.handleChange}
                  value={c}
                  />
                </div>
              ) // return
            })}
            <input type="submit" value="Submit"  />
          </form>
          </div>
          :
          <h1>Loading .. 2</h1>
        }
        </div>
      ) // return
}

export default CheckBox
