import React, { Fragment } from 'react';
import ReactDom from 'react-dom';

import './Modal.css';


const Modal = props => { 
  let modalMainElement;

  const stopPropagation = e => {
      e.stopPropagation();
  }

  if(props.isForm) {
    modalMainElement = (
        <form onSubmit={props.onSubmit}>
            <div className={`modal__content ${props.contentClass}`}>
                {props.children}
            </div>
            <footer className={`modal__footer ${props.footerClass}`}>
                {props.footer}
            </footer>
        </form>
    )
  }

  if(props.isDiv) {
    modalMainElement = (
        <Fragment>
            <div className={`modal__content ${props.contentClass}`}>
                {props.children}
            </div>
            <footer className={`modal__footer ${props.footerClass}`}>
                {props.footer}
            </footer>
        </Fragment>
    )
  }

  const content = (
      <div className="modal__background" onClick={props.onClickModalBackground}>
        <div className={`modal ${props.className}`} style={props.style} onClick={stopPropagation}>
            <header className={`modal__header ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>
            {modalMainElement}
        </div>
      </div>
   
  )

  return ReactDom.createPortal(content , document.getElementById('modal-hook'))
}

export default Modal
