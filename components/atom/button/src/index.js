import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Button from './Button'

const CLASS = 'sui-AtomButton'

const TYPES = ['primary', 'accent', 'secondary', 'tertiary']
const DESIGNS = ['solid', 'outline', 'flat']
const COLORS = [
  'primary',
  'accent',
  'neutral',
  'success',
  'alert',
  'error',
  'social-facebook',
  'social-twitter',
  'social-google',
  'social-youtube',
  'social-whatsapp',
  'social-instagram'
]
const GROUP_POSITIONS = {
  FIRST: 'first',
  MIDDLE: 'middle',
  LAST: 'last'
}
const SIZES = ['small', 'large']
const MODIFIERS = ['disabled', 'fullWidth', 'focused', 'negative', 'link']
const OWN_PROPS = [
  ...TYPES,
  ...SIZES,
  'children',
  'className',
  'color',
  'design',
  'focused',
  'fullWidth',
  'groupPosition',
  'leftIcon',
  'negative',
  'rightIcon',
  'type'
]

const createClasses = (array, sufix = '') => {
  return array.reduce(
    (res, key) => ({...res, [key]: `${CLASS}--${key}${sufix}`}),
    {}
  )
}

const CLASSES = createClasses([
  ...TYPES,
  ...DESIGNS,
  ...SIZES,
  ...MODIFIERS,
  'empty'
])
const COLOR_CLASSES = createClasses(COLORS, 'Color')

/**
 * Get props cleaning out AtomButton own props
 * @param  {Object} props
 * @return {Object}
 */
const cleanProps = props => {
  const newProps = {...props}
  OWN_PROPS.forEach(key => delete newProps[key])
  return newProps
}

/**
 * Get modifiers to apply according to props
 * @param  {Object} props
 * @return {Array<String>}
 */
const getModifiers = props => {
  return Object.keys(props).filter(
    name => props[name] && MODIFIERS.includes(name)
  )
}

const getPropsWithDefaultValues = props => {
  let {color, design, type} = props
  // if color or design are defined, use them with the passed or default value
  if (color || design) {
    color = color || 'primary'
    design = design || 'solid'
  } else {
    type = type || 'primary'
  }

  return {
    color,
    design,
    type,
    ...props
  }
}

const AtomButton = props => {
  const {
    color,
    children,
    className,
    groupPosition,
    leftIcon,
    rightIcon,
    size,
    design,
    title,
    type
  } = getPropsWithDefaultValues(props)

  const classNames = cx(
    CLASS,
    !type && COLOR_CLASSES[color],
    !type && CLASSES[design],
    type && CLASSES[type],
    groupPosition && `${CLASS}-group ${CLASS}-group--${groupPosition}`,
    size && CLASSES[size],
    getModifiers(props).map(key => CLASSES[key]),
    !children && CLASSES.empty,
    className
  )

  const newProps = cleanProps(props)

  return (
    <Button {...newProps} className={classNames} title={title}>
      <span className={`${CLASS}-inner`}>
        {leftIcon && <span className={`${CLASS}-leftIcon`}>{leftIcon}</span>}
        {leftIcon || rightIcon ? (
          <span className={`${CLASS}-text`}>{children}</span>
        ) : (
          children
        )}
        {rightIcon && <span className={`${CLASS}-rightIcon`}>{rightIcon}</span>}
      </span>
    </Button>
  )
}

AtomButton.displayName = 'AtomButton'

AtomButton.propTypes = {
  /**
   * Color of button:
   * 'primary' (default),
   * 'accent',
   * 'neutral',
   * 'success',
   * 'alert',
   * 'error',
   * 'social-facebook',
   * 'social-twitter',
   * 'social-google',
   * 'social-youtube',
   * 'social-whatsapp',
   * 'social-instagram'
   */
  color: PropTypes.oneOf(COLORS),
  /**
   * HTML element: if true, render a link. Otherwise render a button
   */
  link: PropTypes.bool,
  /**
   * URL to be added on the HTML link
   */
  href: PropTypes.string,
  /**
   * Target to be added on the HTML link
   */
  target: PropTypes.string,
  /**
   * Title to be added on button or link
   */
  title: PropTypes.string,
  /**
   * DEPRECATED. Type of button: 'primary' (default), 'accent', 'secondary', 'tertiary'
   */
  type: function(props, propName, componentName) {
    if (props[propName] !== undefined) {
      console.warn(
        `The prop ${propName} is DEPRECATED on ${componentName}. You should use now "design" and "color" props.`
      )
    }
  },
  /**
   * Design style of button: 'solid' (default), 'outline', 'flat'
   */
  design: PropTypes.oneOf(DESIGNS),
  /**
   * Group position: 'first', 'middle' (default), 'last'
   */
  groupPosition: PropTypes.oneOf(Object.values(GROUP_POSITIONS)),
  /**
   * Size of button{
   * FIRST: 'first',
   * MIDDLE: 'middle',
   * LAST: 'last'}: 'small',
   */
  size: PropTypes.oneOf(SIZES),
  /**
   * Negative: style for dark backgrounds.
   */
  negative: PropTypes.bool,
  /**
   * Modifier: state of :hover,:active, :focus
   */
  focused: PropTypes.bool,
  /**
   * Disable: faded with no interaction.
   */
  disabled: PropTypes.bool,
  /**
   * Modifier: full width (100%)
   */
  fullWidth: PropTypes.bool,
  /**
   * Icon to be added on the left of the content
   */
  leftIcon: PropTypes.node,
  /**
   * Icon to be added on the right of the content
   */
  rightIcon: PropTypes.node,
  /**
   * Content to be included in the button
   */
  children: PropTypes.node,
  /**
   * Classes to add to button
   */
  className: PropTypes.any,
  /**
   * Factory used to create navigation links
   */
  linkFactory: PropTypes.func,
  /**
   * if true, type="submit" (needed when several buttons coexist under the same form)
   */
  isSubmit: PropTypes.bool,
  /**
   * if true, type="button" (needed when several buttons coexist under the same form)
   */
  isButton: PropTypes.bool
}

export default AtomButton
export {GROUP_POSITIONS as atomButtonGroupPositions}
export {TYPES as atomButtonTypes}
export {COLORS as atomButtonColors}
