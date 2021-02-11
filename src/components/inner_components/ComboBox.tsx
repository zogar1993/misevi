import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { BORDER_RADIUS, SEPARATION } from '../css/Dimensions'
import Flex from '../Flex'
import ImageButton from '../ImageButton'
import close from '../icons/close.svg'
import { HANDWRITTEN_FONT } from '../css/Fonts'
import Input from './Input'

export default function ComboBox(props: ComboBoxProps) {
  const { value, options, onChange, onFocusChange, width, buttons, id } = props
  const [text, setText] = useState('')
  const [error, setError] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [focused, setFocused] = useState(false)
  const [highlighted, setHighlighted] = useState<ComboBoxItem | null>(null)
  const [dropdown, setDropdown] = useState<Array<ComboBoxItem> | null>(null)
  const refInput = useRef<HTMLInputElement>(null)
  const refOptions = useRef<HTMLOListElement>(null)
  const showSkeleton = value === undefined
  const isNotLoading = value !== undefined
  const open = !!dropdown && dropdown.length > 0

  const findOptionByText = useCallback(() => {
    const trimmed = text.trim()
    if (trimmed === '') return NULL_OPTION
    return options.find(x => insensitiveCompare(trimmed, x.name))
  }, [text, options])

  const setTextFromValue = useCallback(() => {
    if (value) {
      const option = options.find(x => x.code === value)
      setText(option ? option.name : '')
    } else
      setText('')
  }, [value, options])

  const updateDropdown = useCallback((text: string) => {
    const visibleOptions = options.filter(x => insensitiveIncludes(x.name, text))
    setDropdown(visibleOptions)
  }, [options])

  const updateText = useCallback((text: string) => {
    setText(text)
    updateDropdown(text)
  }, [updateDropdown])

  const updateOption = useCallback((option: ComboBoxItem|typeof NULL_OPTION) => {
    if (option.code !== value)
      onChange && onChange(option.code)
    else
      updateText(option.name)
  }, [value, onChange, updateText])

  const handleOnKeyDown = useCallback((e: any) => {
    function isInDropdown(highlighted: ComboBoxItem|null): highlighted is ComboBoxItem {
      return !!(highlighted && dropdown?.includes(highlighted))
    }
    switch (e.key) {
      case 'ArrowUp': {
        if (dropdown === null) return
        const index = isInDropdown(highlighted) ? dropdown.indexOf(highlighted) - 1 : dropdown.length - 1
        if (index >= 0) {
          setHighlighted(dropdown[index])
          scrollToItemOfIndex(index, refOptions.current!)
        }
        e.preventDefault()
        break
      }
      case 'ArrowDown': {
        if (dropdown === null) return
        const index = isInDropdown(highlighted) ? dropdown.indexOf(highlighted) + 1 : 0
        if (index < dropdown.length) {
          setHighlighted(dropdown[index])
          scrollToItemOfIndex(index, refOptions.current!)
        }
        e.preventDefault()
        break
      }
      case 'Tab': {
        const option = findOptionByText()
        if (option) updateOption(option)
        break
      }
      case 'Enter':
        if (isInDropdown(highlighted)) {
          updateOption(highlighted)
          refInput.current?.blur()
          e.preventDefault()
        }
        break
      case 'Escape':
        if (isInDropdown(highlighted))
          setHighlighted(null)
        else {
          setTextFromValue()
          refInput.current?.blur()
        }
        e.preventDefault()
        break
    }
  }, [dropdown, highlighted, setTextFromValue, findOptionByText])

  const onLoseFocus = useCallback(() => {
    onFocusChange(false, text)
    setDropdown(null)
    setHighlighted(null)
    setFocused(false)
  }, [onFocusChange, text])

  //text
  useEffect(() => {
    setTextFromValue()
  }, [setTextFromValue])

  //error
  useEffect(() => {
    if (focused) {
      if (error) setError(false)
    } else {
      const option = findOptionByText()
      setError(option === undefined)
    }
  }, [focused, error, findOptionByText])

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
          setFocused(true)
          onFocusChange(true, text)
        }}
        onKeyDown={handleOnKeyDown}
        readOnly={onChange === undefined}
        skeleton={showSkeleton}
        error={error}
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
              onMouseDown={() => updateOption(item)}
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
            onPointerDown={(e: any) => {
              updateOption(NULL_OPTION)
              refInput.current?.blur()
              e.preventDefault()
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
  onFocusChange: (focus: boolean, text: string) => void
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
    background-color: powderblue;
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
  ${({visible}) => visible === false ? "visibility: hidden" : ""};
  //TODO this should not be needed, bu without this tests break
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

function insensitiveIncludes(text: string, sub: string) {
  const caps = sub.toUpperCase()
  return text.toUpperCase().includes(caps)
}

const NULL_OPTION = {name: '', code: null}
