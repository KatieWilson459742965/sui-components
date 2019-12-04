import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import withCheckedValue from './hoc/withCheckedValue'

const BASE_CLASS = 'sui-AtomCheckbox'

const ERROR_STATES = {
  ERROR: 'error',
  SUCCESS: 'success'
}

const getErrorStateClass = errorState => {
  if (errorState) return `${BASE_CLASS}--${ERROR_STATES.ERROR}`
  if (errorState === false) return `${BASE_CLASS}--${ERROR_STATES.SUCCESS}`
  return ''
}

const AtomCheckbox = ({
  id,
  name,
  disabled,
  checked = false,
  onChange: onChangeFromProps = () => {},
  errorState,
  styledIcon: StyledIcon,
  ...props
}) => {
  const handleChange = ev => {
    const {checked, name} = ev.target
    if (!disabled) onChangeFromProps(ev, {name, value: checked})
  }

  const className = cx(BASE_CLASS, getErrorStateClass(errorState), {
    [`${BASE_CLASS}--styled`]: StyledIcon,
    'is-checked': StyledIcon && checked
  })

  return (
    <label className={className}>
      {StyledIcon && checked ? <StyledIcon /> : ''}
      <input
        type="checkbox"
        id={id}
        name={name || id}
        disabled={disabled}
        checked={checked}
        onChange={handleChange}
        {...props}
      />
    </label>
  )
}

AtomCheckbox.displayName = 'AtomCheckbox'

AtomCheckbox.propTypes = {
  /* The DOM id global attribute. */
  id: PropTypes.string.isRequired,

  /* name attribute for the input */
  name: PropTypes.string,

  /* This Boolean attribute prevents the user from interacting with the input */
  disabled: PropTypes.bool,

  /* Mark the input as selected */
  checked: PropTypes.bool,

  /* onChange callback */
  onChange: PropTypes.func,

  /* Will set a red/green border if set to true/false */
  errorState: PropTypes.bool,

  /* If you with you can change the look of checkbox using an AtomIcon */
  styledIcon: PropTypes.elementType
}

export default AtomCheckbox
export {withCheckedValue}
