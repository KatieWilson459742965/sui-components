/* eslint-disable */
import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import {htmlImgProps} from './types'

const BASE_CLASS = 'sui-AtomImage'
const BASE_CLASS_FIGURE = `${BASE_CLASS}-figure`
const CLASS_PLACEHOLDER = `${BASE_CLASS_FIGURE}--placeholder`
const CLASS_SKELETON = `${BASE_CLASS_FIGURE}--skeleton`
const CLASS_IMAGE = `${BASE_CLASS}-image`
const CLASS_SPINNER = `${BASE_CLASS}-spinner`
const CLASS_ERROR = `${BASE_CLASS}-error`

const Error = (
  {className, icon: Icon, text} // eslint-disable-line react/prop-types
) => (
  <div className={className}>
    {Icon}
    <p>{text}</p>
  </div>
)

const AtomImage = ({
  placeholder,
  skeleton,
  bgStyles,
  spinner: Spinner,
  errorIcon,
  errorText,
  onError,
  onLoad,
  ...imgProps
}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const imageRef = useRef()

  const handleLoad = () => {
    setLoading(false)
    onLoad && onLoad()
  }

  useEffect(
    () => {
      const {current: img} = imageRef
      if (img && img.complete && loading) handleLoad()
    },
    [handleLoad, loading]
  )

  const classNames = cx(
    BASE_CLASS,
    `is-${loading ? 'loading' : 'loaded'}`,
    error && `is-error`
  )

  const classNamesFigure = cx(
    BASE_CLASS_FIGURE,
    placeholder && CLASS_PLACEHOLDER,
    skeleton && CLASS_SKELETON
  )

  const handleError = () => {
    setLoading(false)
    setError(true)
    onError && onError()
  }

  const figureStyles = {
    backgroundImage: `url(${placeholder || skeleton})`
  }

  const SpinnerExtended =
    Spinner &&
    React.cloneElement(Spinner, {
      className: CLASS_SPINNER
    })

  return (
    <div className={this.classNames}>
      <figure
        className={this.classNamesFigure}
        style={!error && (placeholder || skeleton) ? figureStyles : {}}
      >
        <img
          className={CLASS_IMAGE}
          onLoad={this.handleLoad}
          onError={this.handleError}
          ref={this.imageRef}
          {...imgProps}
        />
      </figure>
      {!error && loading && SpinnerExtended}
      {error && (
        <Error className={CLASS_ERROR} icon={errorIcon} text={errorText} />
      )}
    </div>
  )
}

AtomImage.displayName = 'AtomImage'
AtomImage.propTypes = {
  /** Image url or base64 */
  src: PropTypes.string.isRequired,

  /** Description of the image */
  alt: PropTypes.string.isRequired,

  /** Image displayed (blurred) while the final image is being loaded */
  placeholder: PropTypes.string,

  /** Image (wireframe, skeleton) displayed (not blurred) while the final image is being loaded */
  skeleton: PropTypes.string,

  /** Spinner (component) displayed while the final image is being loaded */
  spinner: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

  /** Icon (component) to be displayed in an Error Box when the image cannot be loaded */
  errorIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

  /** Text to be displayed in an Error Box when the image cannot be loaded */
  errorText: PropTypes.string,

  /** Function to be called when the image cannot be loaded  */
  onError: PropTypes.func,

  /** Function to be called when the image completed its loading  */
  onLoad: PropTypes.func,

  /** <img> props */
  ...htmlImgProps
}

export default AtomImage
