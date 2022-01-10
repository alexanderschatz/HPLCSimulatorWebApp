import React from 'react'
import PropTypes from 'prop-types'
import './Modal.scss'

const Modal = ({ active, className, children }) => {
  let additionalClasses = className ? ' ' + className : ''
  let activeClass = active ? ' show' : ''
  return (
    <div className={'Modal' + additionalClasses}>
      <div className={'modal' + activeClass} role='dialog' aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            {children}
          </div>
        </div>
      </div>
      <div className={'modal-backdrop' + activeClass} />
    </div>
  )
}

Modal.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
}

export default Modal
