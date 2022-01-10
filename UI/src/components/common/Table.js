import React from 'react'
import PropTypes from 'prop-types'

const Table = ({ children }) => (
	<table className='table table-hover border border-top-0 bg-white '>
		{children}
	</table>
)

Table.propTypes = {
	children: PropTypes.node,
}

export default Table