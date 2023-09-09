import React from 'react'
import Modal from 'react-modal'
Modal.setAppElement('body')

const CustomModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      closeTimeoutMS={200}
      onRequestClose={onClose}
      className="fixed m-auto w-8/12 h-auto bg-white rounded-lg shadow-md p-6"
      overlayClassName="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
    >
      { children }
    </Modal>
  )
}

export default CustomModal