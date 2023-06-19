import React from 'react';
import './Modal.css';

function Modal({ titleModal, btnTxt, isOpen, onClose, children }) {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="overlay" onClick={handleOverlayClick}>
          <div className="modal">
            <h2 className="modal-content">{titleModal}</h2>
            {children}
            <button onClick={onClose} className="btn btn-close">
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;