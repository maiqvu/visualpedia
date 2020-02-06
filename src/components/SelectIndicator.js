import React from 'react'

function SelectIndicator(props){

  return(
    <div className='CheckBox'>
      {
      props.countriesLabels.length !== 0
      ?
      <div>
      {/*<select onChange={props.handleChange}>
        <option value="AG.LND.AGRI.ZS">Agricultural land (%)</option>
        <option value="EG.FEC.RNEW.ZS">Renewable Consupstion</option>
        <option value="NY.GDP.TOTL.RT.ZS">Natural Resource Rents</option>
        <option value="NY.GDP.MKTP.CD">Gross Domestic Product</option>
      </select>*/}
      <form onSubmit={props.handleSubmit}>
        <input type="text" onChange={props.handleChange} />
        <input type="submit" value="Search" />
      </form>
      <ul>
        {props.labels.map((res, ind) => {
          return <li key={ind}>{res}</li>;
        })}
      </ul>
      </div>
      :
      <h1></h1>
    }
    </div>
  ) // return

} // SelectSeach

export default SelectIndicator
