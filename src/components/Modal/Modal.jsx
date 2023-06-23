import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types'


const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ closeModal, children }) => {
  
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
          closeModal();
      }
  }
  window.addEventListener('keydown', handleKeyDown);
return () => {
  window.removeEventListener('keydown', handleKeyDown);
}
}, [closeModal]);

const handleBackdropClick = e => {
  if (e.currentTarget === e.target) {
      closeModal();
  }
}


return createPortal(
  <div className={css.Overlay} onClick={handleBackdropClick}>
    <div className={css.Modal}>{children}</div>
  </div>,
  modalRoot
);
}

  

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
}