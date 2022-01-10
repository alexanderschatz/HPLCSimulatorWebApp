import React from 'react'
import PropTypes from 'prop-types'

/**
 * The Navbar component renders a Navbar, which functions as a header to the current column.
 * Navbar has the option to integrate a form for searching.
 *
 * @param {*} { name='', style='info', children }
 */
const Navbar = ({ className = '', name = '', style = 'info', children }) => (
	<nav className={`navbar navbar-expand fixed-top navbar-${style} bg-${style} border ${className}`}>
		<div className='col-12 row d-flex align-items-center no-gutters'>
			<div className='col-3'><h2 className='navbar-brand text-white'>{name}</h2></div>
			{children}
		</div>
	</nav>
)

Navbar.propTypes = {
	name: PropTypes.string.isRequired,
	style: PropTypes.string,
	onChange: PropTypes.func,
	children: PropTypes.node,
	className: PropTypes.string,
}

export default Navbar
