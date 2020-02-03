import React from 'react';

function CheckBox(props){
    return(
        <div className='CheckBox'>
          {
          props.countriesLabels.length !== 0
          ?
          <div>
          <form className="getCountry"  onSubmit={props.handleSubmit}>

            {props.countriesLabels.map((c , index) => {
              return (
                <div key={index}>
                  <label>{c}</label>
                  <input type='checkbox'
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
