import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import AtomValidationText, {
  AtomValidationTextTypes
} from '@s-ui/react-atom-validation-text'
import AtomLabel, {AtomLabelTypes} from '@s-ui/react-atom-label'
import AtomHelpText from '@s-ui/react-atom-help-text'

const BASE_CLASS = 'sui-MoleculeField'
const CLASS_INLINE = `${BASE_CLASS}--inline`
const CLASS_INLINE_REVERSE = `${CLASS_INLINE}-reverse`
const CLASS_CONTAINER = `${BASE_CLASS}-inputContainer`

const MoleculeField = ({
  inline,
  reverse,
  errorText,
  successText,
  label,
  useContrastLabel,
  helpText,
  name,
  onClickLabel,
  children
}) => {
  const className = cx(
    BASE_CLASS,
    inline && CLASS_INLINE,
    inline && reverse && CLASS_INLINE_REVERSE
  )
  let statusValidationText, typeValidationLabel, typeValidationText

  if (useContrastLabel) {
    typeValidationLabel = AtomLabelTypes.CONTRAST
  }

  if (errorText) {
    statusValidationText = errorText
    typeValidationLabel = AtomLabelTypes.ERROR
    typeValidationText = AtomValidationTextTypes.ERROR
  }

  if (successText) {
    statusValidationText = successText
    typeValidationLabel = AtomLabelTypes.SUCCESS
    typeValidationText = AtomValidationTextTypes.SUCCESS
  }

  return (
    <div className={className}>
      <AtomLabel
        type={typeValidationLabel}
        name={name}
        text={label}
        onClick={onClickLabel}
      />
      <div className={CLASS_CONTAINER}>
        {children}
        {(successText || errorText) && (
          <AtomValidationText
            type={typeValidationText}
            text={statusValidationText}
          />
        )}
        {helpText && <AtomHelpText text={helpText} />}
      </div>
    </div>
  )
}

MoleculeField.displayName = 'MoleculeField'

MoleculeField.propTypes = {
  /** children */
  children: PropTypes.any,

  /** Text to be displayed as label of the textarea */
  label: PropTypes.string.isRequired,

  /** If true it will set the label type to 'CONTRAST' */
  useContrastLabel: PropTypes.bool,

  /** used as for attribute. Must be the same as the input element id */
  name: PropTypes.string.isRequired,

  /** Success message to display when success state  */
  successText: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  /** Error message to display when error state  */
  errorText: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  /** Help Text to display */
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  /** Boolean to decide if elements should be set inline */
  inline: PropTypes.bool,

  /** Boolean to decide if elements should be set inline but input first */
  reverse: PropTypes.bool,

  /** Boolean to decide if elements should be set inline */
  onClickLabel: PropTypes.func
}

export default MoleculeField
