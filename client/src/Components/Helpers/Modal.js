import React, { useState } from 'react';
import {RxCross1} from 'react-icons/rx';
import './Modal.scss'; // Import your CSS for styling

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={closeModal}>
          <RxCross1/>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
