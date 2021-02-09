import React, { Props, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { BORDER_RADIUS, SEPARATION } from '../css/Dimensions'
import Flex from '../Flex'
import ImageButton from '../ImageButton'
import close from '../icons/close.svg'
import { HANDWRITTEN_FONT } from '../css/Fonts'
import Input from './Input'

//TODO add animations
//TODO add text visualization of highlighted
//TODO clear with esc
//TODO select and clear with enter
//TODO add selected display for option
export default function ComboBox(props: ComboBoxProps) {
  const { value, options, onChange, onTextChange, width, buttons, id } = props
  const [text, setText] = useState('')
  const [isError, setIsError] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [highlighted, setHighlighted] = useState<ComboBoxItem | null>(null)
  const [dropdown, setDropdown] = useState<Array<ComboBoxItem>|null>(null)
  const refInput = useRef<HTMLInputElement>(null)
  const refOptions = useRef<HTMLOListElement>(null)
  const showSkeleton = value === undefined
  const isNotLoading = value !== undefined
  const open = !!dropdown && dropdown.length > 0

  const updateDropdown = useCallback((text: string) => {
    const caps = text.toUpperCase()
    const visibleOptions = options.filter(x => x.name.toUpperCase().includes(caps))
    setDropdown(visibleOptions)
  }, [options])

  const updateText = useCallback((text: string) => {
    setText(text)
    updateDropdown(text)
    onTextChange && onTextChange(text)
  }, [onTextChange, updateDropdown])

  const updateOption = useCallback((option: ComboBoxItem) => {
    if (option.code !== value)
      onChange && onChange(option.code)
    else
      updateText(option.name)
  }, [value, onChange, updateText])

  const findOptionByText = useCallback(() => {
    return options.find(x => insensitiveCompare(text, x.name))
  }, [text, options])

  const onLoseFocus = useCallback(() => {
    const option = highlighted || findOptionByText()
    if (option) {
      updateOption(option)
    } else if (text.trim() === '') {
      if (value !== null)
        onChange && onChange(null)
    }

    if (text.trim() === '')
      setIsError(false)
    else
      setIsError(option === null)

    setDropdown(null)
    setHighlighted(null)
  }, [value, text, dropdown, highlighted, onChange, updateOption, findOptionByText])

  const handleOnKeyDown = useCallback((e: any) => {
    switch (e.key) {
      case 'ArrowUp': {
        if (dropdown === null) return
        const index = highlighted ? dropdown.indexOf(highlighted) - 1 : dropdown.length - 1
        if (index >= 0) {
          setHighlighted(dropdown[index])
          scrollToItemOfIndex(index, refOptions.current!)
        }
        e.preventDefault()
        break
      }
      case 'ArrowDown': {
        if (dropdown === null) return
        const index = highlighted ? dropdown.indexOf(highlighted) + 1 : 0
        if (index < dropdown.length) {
          setHighlighted(dropdown[index])
          scrollToItemOfIndex(index, refOptions.current!)
        }
        e.preventDefault()
        break
      }
      case 'Enter':
        if (highlighted) {
          refInput.current?.blur()
          e.preventDefault()
        }
        break
      case 'Escape':
        if (highlighted) setHighlighted(null)
        else refInput.current?.blur()
        e.preventDefault()
        break
    }
  }, [dropdown, highlighted])

  //text
  useEffect(() => {
    if (highlighted) {
      //TODO Check how it should work
      //setText(highlighted.name)
      //onTextChange && onTextChange(text)
    } else if (value) {
      const option = options.find(x => x.code === value)
      if (option !== undefined)
        setText(option.name)
    } else
      setText('')
  }, [value, highlighted])

  return (
    <ComboBoxContainer
      $width={width}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <TextInput
        id={id}
        ref={refInput}
        value={text}
        disabled={showSkeleton}
        onChange={(e) => updateText(e.target.value)}
        onBlur={onLoseFocus}
        onFocus={() => {
          refInput.current?.select()
          updateDropdown('')
        }}
        onKeyDown={handleOnKeyDown}
        readOnly={onChange === undefined}
        skeleton={showSkeleton}
        error={isError}
        type="text"
        role="combobox"
      />
      <Options
        width={width}
        open={open}
        ref={refOptions}
      >
        {
          dropdown && dropdown.map((item) => (
            <Option
              key={item.code}
              onMouseDown={() => refInput.current?.blur()}
              highlighted={item === highlighted}
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
              else
                updateText('')
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

const OPTION_HEIGHT = 23
const MAX_OPTION_AMOUNT = 5
const BORDER_WIDTH = 1

const Options = styled.ol<{ open: boolean, width?: string }>`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border-radius: ${BORDER_RADIUS};
  position: absolute;
  top: 30px;
  border: ${BORDER_WIDTH}px solid lightgray;
  list-style: none;
  background-color: whitesmoke;
  width: ${({ width }) => width || '100%'};
  ${({ open }) => open ? '' : 'display: none'};
  transition: 0.2s;
  max-height: calc(${OPTION_HEIGHT}px * ${MAX_OPTION_AMOUNT} + ${BORDER_WIDTH}px * 2);
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 20;
  scroll-behavior: smooth;
`

const Option = styled.li<{ highlighted: boolean }>`
  box-sizing: border-box;
  font-family: ${HANDWRITTEN_FONT}, Times, serif;
  height: ${OPTION_HEIGHT}px;
  font-size: 13px;
  padding: 1px 5px 3px 8px;
  border-radius: ${BORDER_RADIUS};
  border: 1px solid ${({ highlighted }) => highlighted ? 'dodgerblue' : 'transparent'};

  :hover {
    background-color: dodgerblue;
  }

  transition: background-color 0.2s;
`

const ComboBoxContainer = styled.div<{ $width?: string }>`
  display: flex;
  align-items: center;
  position: relative;
  ${({ $width }) => ($width ? `width: ${$width}` : '')};
`

const ButtonsContainer = styled(Flex)`
  position: absolute;
  right: 9px;
`

const TextInput = styled(Input)<{ error: boolean }>`
  ${({ error }) => error ? 'border: 1px solid red' : ''};
`

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

function insensitiveCompare(a: string, b: string) {
  return a.localeCompare(b, undefined, { sensitivity: 'base' }) === 0
}
