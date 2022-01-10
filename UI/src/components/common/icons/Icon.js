import React from 'react'
import Icons from './icons.svg'
import PropTypes from 'prop-types'
import './Icon.scss'

const Icon = ({ name, className, title }) => {
  if (name === undefined || name === '') name = 'fallback'
  let classes = className ? ' ' + className : ''

  return (
    <svg className={'Icon icon-' + name + classes} title={title ? title : 'icon-' + name}>
      <use xlinkHref={`${Icons}#icon-${name}`} />
    </svg>
  )
}

Icon.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
}

export default Icon
