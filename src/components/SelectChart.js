import React, { Component } from 'react';

function SelectChart (props) {
  return (
    <div className='CheckBox'>
      <select onChange={props.handleChange}>
        <option value="line">Line</option>
        <option value="bar">Bar</option>
        <option value="horizontal">Horizontal Bar</option>
        <option value="radar">Radar</option>
        {/*<option value="polar">Polar</option>
        <option value="bubble">Bubble</option>
        <option value="pie">Pie</option>
        <option value="doughnut">Doughnut</option>*/}
      </select>
    </div>
  );
}

export default SelectChart;
