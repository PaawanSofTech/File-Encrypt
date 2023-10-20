import React, { useState } from 'react';
import {RxCross2} from 'react-icons/rx';
import './Modal.scss'; // Import your CSS for styling

const Modal = ({ isOpen, closeModal, children, bg}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal" style={{backgroundImage: bg}}>
        <button className="close-button" onClick={closeModal}>
          <RxCross2/>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
