import React from 'react'
import PropTypes from 'prop-types'

const ModalHeader = ({ onCancel, children }) => {
    return (
        <div className='modal-header pb-0'>
            {children}
            <button data-dismiss='modal' className='close' type='button' onClick={onCancel}>
                <span aria-hidden='true'>×</span>
                <span className='sr-only'>Close</span>
            </button>
        </div>
  )
}

ModalHeader.propTypes = {
    onCancel: PropTypes.func.isRequired,
    children: PropTypes.node,
}

export default ModalHeader
