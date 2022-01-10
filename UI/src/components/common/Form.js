import React from 'react'
import PropTypes from 'prop-types'

/**
 * The Form component renders a search-form.
 *
 * @param {*} { placeholder, onChange }
 */
const Form = ({ value, placeholder, onChange, type = 'number', className = '', disabled = false, isValid, invalidText }) => {
	let isValidClass = isValid === undefined ? '' : isValid === true ? ' is-valid' : ' is-invalid'
	return (
		<form className='w-100'>
			<input
				className={'form-control mr-sm-2 ' + className + isValidClass}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				aria-label='Hubname'
				disabled={disabled}
			/>
			<div className='invalid-feedback'>
				{invalidText}
			</div>
		</form>
	)
}

Form.propTypes = {
	placeholder: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	className: PropTypes.string,
	value: PropTypes.string,
	disabled: PropTypes.bool,
	type: PropTypes.string,
	isValid: PropTypes.bool,
	invalidText: PropTypes.string,
}

export default Form
