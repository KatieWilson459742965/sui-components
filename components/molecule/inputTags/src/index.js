import React, {useState} from 'react'
import PropTypes from 'prop-types'
import AtomTag, {atomTagSizes} from '@schibstedspain/sui-atom-tag'
import AtomInput, {inputSizes} from '@s-ui/react-atom-input'
import cx from 'classnames'

const BASE_CLASS = 'sui-AtomInput'
const CLASS_TAGS = `${BASE_CLASS}--withTags`
const CLASS_TAGS_FOCUS = `${CLASS_TAGS}--focus`
const CLASS_TAGS_ERROR = `${CLASS_TAGS}--error`
const CLASS_TAGS_SUCCESS = `${CLASS_TAGS}--success`

// eslint-disable-next-line react/prop-types
const AtomTagItem = ({onClose: onCloseFromProps = () => {}, id, ...props}) => {
  const onClose = e => onCloseFromProps(e, {id})

  return <AtomTag onClose={onClose} {...props} />
}

const MoleculeInputTags = ({
  errorState,
  value,
  optionsData,
  onChangeTags,
  onChange: onChangeFromProps,
  innerRefInput,
  tagsCloseIcon,
  tags: tagsFromProps,
  ...props
}) => {
  const {size} = props
  const [focus, setFocus] = useState(false)

  const classNames = cx(CLASS_TAGS, {
    [CLASS_TAGS_FOCUS]: focus === true,
    [CLASS_TAGS_ERROR]: errorState === true,
    [CLASS_TAGS_SUCCESS]: errorState === false,
    [`${CLASS_TAGS}-${size}`]: size
  })

  const removeTag = (ev, {id: indexTag}) => {
    const {name} = ev.target
    let tags = tagsFromProps.filter((_, i) => i !== indexTag)
    if (optionsData) {
      const keys = Object.keys(optionsData)
      tags = keys.filter(key => tags.includes(optionsData[key]))
    }
    onChangeTags(ev, {name, tags})
  }

  const addTag = ev => {
    const {name} = ev.target
    ev.preventDefault()
    if (value) {
      const tags = [...tagsFromProps, value]
      onChangeTags(ev, {tags, name, value: ''})
    }
  }

  const onChange = (ev, valuesToPropagate) => {
    onChangeFromProps(ev, valuesToPropagate)
  }

  const handleFocusIn = () => setFocus(true)

  const handleFocusOut = () => setFocus(false)

  return (
    <div className={classNames}>
      {tagsFromProps.map((label, index) => (
        <AtomTagItem
          key={index}
          id={index}
          closeIcon={tagsCloseIcon}
          onClose={removeTag}
          label={label}
          size={atomTagSizes.SMALL}
          responsive
        />
      ))}
      <AtomInput
        {...props}
        value={value}
        onChange={onChange}
        onEnter={addTag}
        onFocus={handleFocusIn}
        onBlur={handleFocusOut}
        reference={innerRefInput}
        noBorder
      />
    </div>
  )
}

MoleculeInputTags.displayName = 'MoleculeInputTags'

MoleculeInputTags.propTypes = {
  /* errorState */
  errorState: PropTypes.boolean,

  /** Tag size */
  size: PropTypes.oneOf(Object.values(atomTagSizes)),

  /* close icon to be displayed on tags */
  tagsCloseIcon: PropTypes.node.isRequired,

  /* list of pairs value/text to be handled */
  optionsData: PropTypes.object,

  /* list of values displayed as tags */
  tags: PropTypes.array,

  /* value of the input */
  value: PropTypes.string,

  /* callback to be called with every update of the list of tags */
  onChangeTags: PropTypes.func,

  /* callback to be called with every update of the input value */
  onChange: PropTypes.func,

  /* object generated w/ Reacte.createRef method to get a DOM reference of internal input */
  innerRefInput: PropTypes.object
}

MoleculeInputTags.defaultProps = {
  size: inputSizes.MEDIUM,
  value: '',
  tags: [],
  onChangeTags: () => {},
  onChange: () => {}
}

export default MoleculeInputTags
export {inputSizes}
