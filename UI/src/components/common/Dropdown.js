import React from 'react'
import PropTypes from 'prop-types'

import './Dropdown.scss'
import Icon from '../common/icons/Icon'

const Dropdown = ({ property, value, options, isValid, onChange, className, disabled=false, callToActionMsg='' }) => {
    let isValidClass = isValid === undefined ? '' : isValid === true ? ' is-valid' : ' is-invalid'
    let additionalClasses = className ? ' ' + className : ''
    return (    
      <div className={'Dropdown form-group mb-0 ' + property + additionalClasses}>
        <select className={'form-control' + isValidClass} value={value} onChange={onChange} disabled={disabled}>
          {callToActionMsg !== '' ? <option value={''} disabled={false}>{callToActionMsg}</option> : null}
          {options.map(option => <option key={option.value} value={option.value} disabled={option.disabled}>{option.name}</option>)}
        </select>
        <Icon name={'check-arrow-down'}/>
      </div>
    )
}

Dropdown.propTypes = {
  property: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  
  callToActionMsg: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  isValid: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default Dropdown
