import React from 'react';

const Modal = ({ modalForm, modalType, closeModal, handleAddNewTask, handleEditTask, formData }) => {
  return (
    <div className="modal show">
      <div className="modal-content">
        <div className='modal-header'>
          <div>{modalType === 'add' ? 'Add New Task' : 'Edit Task'}</div>
          <button type='button' className="close-modal" onClick={closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 40 40">
              <path fill="#98ccfd" d="M20,38.5C9.799,38.5,1.5,30.201,1.5,20S9.799,1.5,20,1.5S38.5,9.799,38.5,20S30.201,38.5,20,38.5z"></path><path fill="#4788c7" d="M20,2c9.925,0,18,8.075,18,18s-8.075,18-18,18S2,29.925,2,20S10.075,2,20,2 M20,1 C9.507,1,1,9.507,1,20s8.507,19,19,19s19-8.507,19-19S30.493,1,20,1L20,1z"></path><path fill="#fff" d="M18.5 10H21.5V30H18.5z" transform="rotate(-134.999 20 20)"></path><path fill="#fff" d="M18.5 10H21.5V30H18.5z" transform="rotate(-45.001 20 20)"></path><g><path fill="#fff" d="M28.132 13.99L26.01 11.868 20 17.879 13.99 11.868 11.868 13.99 17.879 20 11.868 26.01 13.99 28.132 20 22.121 26.01 28.132 28.132 26.01 22.121 20z"></path></g>
            </svg>
          </button>
        </div>
        <div className='modal-body'>
          {modalForm}
        </div>
        <div className='modal-footer'>
          <button type='button' className='button-close' onClick={closeModal}>
            close
          </button>
          <button type='submit' className='button-add' onClick={modalType === 'add' ? handleAddNewTask : () => handleEditTask(formData)}>
            {modalType === 'add' ? 'Add Task' : 'Edit Task'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;