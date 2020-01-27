import React from 'react';

import './Spinner.css';
import spinner from './spinner.gif';

const Spinner = props => {
  return (
    <div className={props.spinnerContClassName}>
      <img src={spinner} className={props.spinnerImgClassName} alt="loading"/>
    </div>
  )
}

export default Spinner
