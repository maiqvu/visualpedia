import React from 'react';
import '../App.css'

function CheckBox(props){
    return(
        <div className='CheckBox'>
          {
          props.countriesLabels.length !== 0
          ?
          <div>
            {props.countriesLabels.map((c , index) => {
              return (
                <div key={index} className="chooseCountrydiv">
                    <input className="chooseCountryInput" type='checkbox'
                    onChange={props.handleChange}
                    value={c}
                    />
                    <span className="countryLabels">
                  <label className="chooseCountryLabel">{c}</label>
                  </span>
                </div>
              ) // return
            })}

          </div>
          :
          <h1></h1>
        }
        </div>
      ) // return
}

export default CheckBox
