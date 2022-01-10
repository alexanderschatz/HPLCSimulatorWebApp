import React from 'react'
import PropTypes from 'prop-types'

import Icon from '../common/icons/Icon'

const SortTableHead = ({ className, onClick, sortParam, sortOrder, lastSort, children }) => (
	<th className={className} onClick={() => onClick(sortParam)} type='button'>
		{children}
		{lastSort === sortParam
			? sortOrder === -1
				? <Icon name={'check-arrow-down'} />
				: <Icon name={'check-arrow-up'} />
			: ''
		}
	</th>
)

SortTableHead.propTypes = {
	className: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	sortParam: PropTypes.string,
	sortOrder: PropTypes.number,
	lastSort: PropTypes.string,
	children: PropTypes.node,
}

export default SortTableHead