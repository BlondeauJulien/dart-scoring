import React from 'react';

import './PageErrorMessage.css';

const PageErrorMessage = props => {
  const {title} = props
  return (
    <div className="page-error">
      <h2 className="page-error__title">{title}</h2>
      <div className="page-error__btn-cont">
        {props.children}
      </div>
    </div>
  )
}

export default PageErrorMessage
