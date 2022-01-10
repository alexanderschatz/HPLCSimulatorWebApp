import React from 'react'
import PropTypes from 'prop-types'

import { NavLink } from 'react-router-dom'

const TabLink = ({currentTab, tab, children, path, exact=true, onClick}) => (
	<NavLink className={`nav-item nav-link  ${currentTab === tab ? 'active' : ''} `} onClick={() => onClick(tab)} exact={exact} to={path} >
		{children}
	</NavLink>
)

TabLink.propTypes = {
	currentTab: PropTypes.string.isRequired,
	tab: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	children: PropTypes.node,
	exact: PropTypes.bool,
}

export default TabLink