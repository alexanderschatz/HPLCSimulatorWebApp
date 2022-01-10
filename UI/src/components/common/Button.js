import React from 'react'
import PropTypes from 'prop-types'

/**
 * Button renders a simple button.
 *
 * @param {*} { className = '', id, active, onClick, disabled = false, children }
 */
const Button = ({ className, id, active, semantic = 'primary',  type='button', outline = false, inverted = false, onClick, disabled = false, children }) => {
	let classes = 'Button btn '

	classes += inverted
		? `btn-link text-${semantic}`
		: outline ? `btn-outline-${semantic}`
			// : `btn-${semantic} text-white`
			: disabled ? `btn-${semantic} `
				: `btn-${semantic} text-white`

	classes += active ? ' active' : ' inactive'
	classes += className ? ' ' + className : ''
	return (
		<button
			type={type}
			value={id}
			className={classes}
			disabled={disabled}
			onClick={() => onClick()}
		>
			{children}
		</button>
	)
}

Button.propTypes = {
	disabled: PropTypes.bool,
	className: PropTypes.string,
	type: PropTypes.string,
	inverted: PropTypes.bool,
	semantic: PropTypes.string,
	outline: PropTypes.bool,
	id: PropTypes.number,
	active: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
	children: PropTypes.node,
}

export default Button
