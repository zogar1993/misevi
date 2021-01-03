import React, {useEffect, useRef, useState} from "react"
import styled from 'styled-components'
import { BORDER_RADIUS, SEPARATION } from 'components/css/Dimensions'
import Flex from 'components/Flex'
import ImageButton from 'components/ImageButton'
import close from '../icons/close.svg'
import { HANDWRITTEN_FONT } from 'components/css/Fonts'
import Input from "components/inner_components/Input"

export default function ComboBox(props: ComboBoxProps) {
  const { value, options, onChange, onTextChange, width, buttons, id } = props
  const [hovering, setHovering] = useState(false)
  const [hoveringOptions, setHoveringOptions] = useState(false)
  const [focused, setFocused] = useState(false)
  const [isError, setIsError] = useState(false)
  const ref = useRef<HTMLInputElement>(null)
  const showSkeleton = value === undefined
  const isNotLoading = value !== undefined
  const [text, setText] = useState('')
  const [visibleOptions, setVisibleOptions] = useState<Array<ComboBoxItem>>([])
  useEffect(() => {
    if (value) {
      const option = options.find(x => x.code === value)
      if (option !== undefined)
        setText(option.name)
    } else
      setText('')
  }, [value])

  useEffect(() => {
    const loweredText = text.toLowerCase()
    const visibleOptions = options
      .filter(x => x.name.toLowerCase().includes(loweredText))
    setVisibleOptions(visibleOptions)
  }, [text, options, value])

  //TODO fix tests
  //TODO add animations
  //TODO move between options
  return (
    <ComboBoxContainer
      $width={width}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <TextInput
        id={id}
        ref={ref}
        value={text}
        disabled={showSkeleton}
        onChange={(e) => {
          const text = e.target.value
          setText(text)
          onTextChange && onTextChange(text)
        }}
        onBlur={() => {
          const loweredText = text.trim().toLowerCase()
          const option = options.find(x => x.name.toLowerCase() === loweredText)
          if (option) {
            setIsError(false)
            if (option.code !== value)
              onChange!(option.code)
          } else if (loweredText === ''){
            setIsError(false)
            if (value !== null)
              onChange!(null)
          } else
            setIsError(true)

          setFocused(false)
        }}
        onFocus={() => {
          ref.current?.select()
          setFocused(true)
        }}
        readOnly={onChange === undefined}
        skeleton={showSkeleton}
        error={isError}
        type="text"
      />
      <Options
        width={width}
        open={(focused || hoveringOptions) && visibleOptions.length > 0}
        onMouseEnter={() => setHoveringOptions(true)}
        onMouseLeave={() => setHoveringOptions(false)}
      >
        {showSkeleton ? null :
          visibleOptions.map((item) => (
            <Option
              key={item.code}
              onClick={() => {
                onChange!(item.code)
                setHoveringOptions(false)
              }}
            >
              {item.name}
            </Option>
          ))
        }
      </Options>
      <ButtonsContainer
        y-align='center'
        visible={hovering && isNotLoading}
      >
        {buttons === undefined ? null :
          buttons.map((x) => <ComboboxImageButton key={x.name} props={props} {...x} />)
        }
        {onChange === undefined ? null :
          <ImageButton
            src={close}
            name='clear'
            width='12px'
            height='12px'
            onClick={() => {
              if (value !== null)
                onChange(null)
              else {
                setText('')
                onTextChange && onTextChange('')
              }
            }}
            visible={text !== ''}
          />
        }
      </ButtonsContainer>
    </ComboBoxContainer>
  )
}

export type ComboBoxProps = {
  id?: string
  value: string | null | undefined
  options: Array<ComboBoxItem>
  onChange?: (value: string | null) => void
  onTextChange?: (value: string) => void
  buttons?: Array<ButtonInfo>
  width?: string
}

export type ButtonInfo = {
  name: string
  src: string
  onClick: (props: ComboBoxProps) => void
}

export type ComboBoxItem = {
  name: string
  code: string
  from?: number
  to?: number
}

const OPTION_HEIGHT = '23px'

const Options = styled.ul<{open: boolean, width?: string}>`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border-radius: ${BORDER_RADIUS};
  position: absolute;
  top: 30px;
  border: 1px solid lightgray;
  list-style: none;
  background-color: whitesmoke;
  width: ${({width}) => width || '100%'};
  ${({open}) => open ? '' : 'display: none'};
  transition: 0.2s;
  max-height: calc(${OPTION_HEIGHT} * 5 + 2px);
  overflow-y: auto;
  overflow-x: hidden;
`

const Option = styled.li`
  box-sizing: border-box;
  font-family: ${HANDWRITTEN_FONT}, Times, serif;
  height: 23px;
  font-size: 13px;
  padding: 3px 5px 3px 8px;
  border-radius: ${BORDER_RADIUS};
  :hover {
    background-color: dodgerblue;
  }
  transition: 0.2s;
`

const ComboBoxContainer = styled.div<{$width?: string}>`
  display: flex;
  align-items: center;
  position: relative;
  ${({ $width }) => ($width ? `width: ${$width}` : '')};
`

const ButtonsContainer = styled(Flex)`
  position: absolute;
  right: 9px;
`

const TextInput = styled(Input)<{error: boolean}>`
  ${({error}) => error ? 'border: 1px solid red' : ''};
`

function ComboboxImageButton({ name, src, onClick, props }: ButtonInfo & { props: ComboBoxProps }) {
  return (
    <ImageButton
      src={src}
      name={name}
      width='18px'
      height='18px'
      onClick={() => onClick(props)}
      margin-right={SEPARATION}
    />
  )
}
