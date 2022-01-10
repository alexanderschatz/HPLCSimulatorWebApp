import React from 'react'
import PropTypes from 'prop-types'

const ModalFooter = ({ children }) => {
    return (
        <div className='modal-footer border-top-0'>
            {children}
        </div>
    )
}

ModalFooter.propTypes = {
    children: PropTypes.node,
}

export default ModalFooter
