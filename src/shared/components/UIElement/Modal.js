import React from 'react';
import ReactDom from 'react-dom';

import './Modal.css';


const Modal = props => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
        <header className={`modal__header ${props.headerClass}`}>
            <h2>{props.header}</h2>
        </header>
        <form onSubmit={props.onCreatePlayer}>
            <div className={`modal__content ${props.contentClass}`}>
                {props.children}
            </div>
            <footer className={`modal__footer ${props.footerClass}`}>
                {props.footer}
            </footer>
        </form>
    </div>
  )

  return ReactDom.createPortal(content , document.getElementById('modal-hook'))
}

export default Modal
