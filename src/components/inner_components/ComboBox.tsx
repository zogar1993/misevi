import React, { Props, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { BORDER_RADIUS, SEPARATION } from '../css/Dimensions'
import Flex from '../Flex'
import ImageButton from '../ImageButton'
import close from '../icons/close.svg'
import { HANDWRITTEN_FONT } from '../css/Fonts'
import Input from "./Input"

//TODO add animations
export default function ComboBox(props: ComboBoxProps) {
  const { value, options, onChange, onTextChange, width, buttons, id } = props
  const [hovering, setHovering] = useState(false)
  const [focused, setFocused] = useState(false)
  const [isError, setIsError] = useState(false)
  const [text, setText] = useState('')
  const [visibleOptions, setVisibleOptions] = useState<Array<ComboBoxItem>>([])
  const ref = useRef<HTMLInputElement>(null)
  const showSkeleton = value === undefined
  const isNotLoading = value !== undefined

  //text
  useEffect(() => {
    if (value) {
      const option = options.find(x => x.code === value)
      if (option !== undefined)
        setText(option.name)
    } else
      setText('')
  }, [value])

  //search
  useEffect(() => {
    const loweredText = text.toLowerCase()
    const visibleOptions = options
      .filter(x => x.name.toLowerCase().includes(loweredText))
    setVisibleOptions(visibleOptions)
  }, [text, options, value])

  //error
  useEffect(() => {
    if (!focused) {
      if (text === '') {
        setIsError(false)
      } else {
        const option = options.find(x => x.name === text)
        setIsError(option === undefined)
      }
    }
  }, [text, focused, options])

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
        onBlur={() => onLoseFocus({text, setText, setFocused, ...props})}
        onFocus={() => {
          ref.current?.select()
          setFocused(true)
        }}
        readOnly={onChange === undefined}
        skeleton={showSkeleton}
        error={isError}
        type="text"
        role="combobox"
      />
      <OptionsPopup
        {...props}
        focused={focused}
        options={visibleOptions}
        setText={setText}
      />
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
              if (value !== null) {
                onChange(null)
              } else {
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

const onLoseFocus = (
  {text, value, options, onChange, setText, setFocused}:
    ComboBoxProps & {text: string, setText: (text: string) => void, setFocused: (value: boolean) => void}) => {
  const loweredText = text.trim().toLowerCase()
  const option = options.find(x => x.name.toLowerCase() === loweredText)
  if (option) {
    if (option.code !== value)
      onChange!(option.code)
    else
      setText(option.name)
  } else if (loweredText === '') {
    if (value !== null)
      onChange!(null)
  }

  setFocused(false)
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

function OptionsPopup(
  {width, value, onChange, focused, options, setText}:
    ComboBoxProps & {options: Array<ComboBoxItem>, focused: boolean, setText: (text: string) => void}) {
  const [highlighted, setHighlighted] = useState<ComboBoxItem | null>(null)
  const [hoveringOptions, setHoveringOptions] = useState(false)
  const open = (focused || hoveringOptions) && options.length > 0
  const ref = useRef<HTMLOListElement>(null)

  //key presses
  useEffect(() => {
    if (open) {
      const handleOnKeyDown = (e: any) => {
        switch (e.key) {
          case "ArrowUp": {
            const index = highlighted ? options.indexOf(highlighted) - 1 : options.length - 1
            if (index >= 0) {
              setHighlighted(options[index])
              scrollToItemOfIndex(index, ref.current!)
            }
            e.preventDefault()
            break
          }
          case "ArrowDown": {
            const index = highlighted ? options.indexOf(highlighted) + 1 : 0
            if (index < options.length) {
              setHighlighted(options[index])
              scrollToItemOfIndex(index, ref.current!)
            }
            e.preventDefault()
            break
          }
          case "Enter":
            if (highlighted) {
              onChange && onChange(highlighted.code)
              e.preventDefault()
            }
            break
          case "Escape":
            //setHighlighted(null)
            //e.preventDefault()
            break
        }
      }
      document.body.addEventListener("keydown", handleOnKeyDown)
      return () => document.body.removeEventListener("keydown", handleOnKeyDown)
    } else {
      setHighlighted(null)
    }
  }, [open, options, onChange, highlighted])

  return (
    <Options
      width={width}
      open={open}
      onMouseEnter={() => setHoveringOptions(true)}
      onMouseLeave={() => setHoveringOptions(false)}
      ref={ref}
    >
      {
        options.map((item) => (
          <Option
            key={item.code}
            onClick={() => {
              if (item.code !== value)
                onChange!(item.code)
              else
                setText(item.name)
              setHoveringOptions(false)
            }}
            highlighted={item === highlighted}
          >
            {item.name}
          </Option>
        ))
      }
    </Options>
  )
}

function scrollToItemOfIndex(index: number, element: HTMLElement) {
  const scroll = element.scrollTop
  if (index * OPTION_HEIGHT < scroll)
    element.scrollTop = index * OPTION_HEIGHT
  else {
    const upperVisibleIndex = index + 1 - MAX_OPTION_AMOUNT
    if (upperVisibleIndex * OPTION_HEIGHT > scroll)
      element.scrollTop = upperVisibleIndex * OPTION_HEIGHT
  }
}

const OPTION_HEIGHT = 23
const MAX_OPTION_AMOUNT = 5
const BORDER_WIDTH = 1

const Options = styled.ol<{open: boolean, width?: string}>`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border-radius: ${BORDER_RADIUS};
  position: absolute;
  top: 30px;
  border: ${BORDER_WIDTH}px solid lightgray;
  list-style: none;
  background-color: whitesmoke;
  width: ${({width}) => width || '100%'};
  ${({open}) => open ? '' : 'display: none'};
  transition: 0.2s;
  max-height: calc(${OPTION_HEIGHT}px * ${MAX_OPTION_AMOUNT} + ${BORDER_WIDTH}px * 2);
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 20;
  scroll-behavior: smooth;
`

const Option = styled.li<{highlighted: boolean}>`
  box-sizing: border-box;
  font-family: ${HANDWRITTEN_FONT}, Times, serif;
  height: ${OPTION_HEIGHT}px;
  font-size: 13px;
  padding: 3px 5px 3px 8px;
  border-radius: ${BORDER_RADIUS};
  ${({highlighted}) => highlighted ? 'background-color: dodgerblue' : ''};
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
  transition: 0.4s ease-in;//TODO HACK THAT PREVENTS RED FROM SHOWING
`
