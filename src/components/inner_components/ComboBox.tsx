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
//TODO add selectedd siplay for option
export default function ComboBox(props: ComboBoxProps) {
  const { value, options, onChange, onTextChange, width, buttons, id } = props
  const [text, setText] = useState('')
  const [focused, setFocused] = useState(false)
  const [isError, setIsError] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [highlighted, setHighlighted] = useState<ComboBoxItem | null>(null)
  const [visibleOptions, setVisibleOptions] = useState<Array<ComboBoxItem>>([])
  const refInput = useRef<HTMLInputElement>(null)
  const refOptions = useRef<HTMLOListElement>(null)
  const showSkeleton = value === undefined
  const isNotLoading = value !== undefined
  const open = focused && options.length > 0

  //TODO Not needed now, look check at setText usages to see if this is better.
  //const changeText = useCallback((text: string) => {
  //  setText(text)
  //  onTextChange && onTextChange(text)
  //}, [onTextChange])

  const findOptionByText = useCallback(() => {
    return options.find(x => insensitiveCompare(text, x.name))
  }, [text, options])

  const setOption = useCallback((option: ComboBoxItem) => {
    if (option.code !== value)
      onChange && onChange(option.code)
    else
      setText(option.name)
  }, [value, onChange])

  const onLoseFocus = useCallback(() => {
    const option = findOptionByText()
    if (option) {
      setOption(option)
    } else if (text.trim() === '') {
      if (value !== null)
        onChange && onChange(null)
    }

    setFocused(false)
  }, [value, text, onChange, setOption, findOptionByText])

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

  //search
  useEffect(() => {
    const visibleOptions = options.filter(x => insensitiveCompare(text, x.name))
    setVisibleOptions(visibleOptions)
  }, [text, options, value])

  //error
  useEffect(() => {
    if (!focused) {
      if (text === '')
        setIsError(false)
      else
        setIsError(findOptionByText() === undefined)
    }
  }, [text, focused, findOptionByText])

  //key presses
  useEffect(() => {
    if (open) {
      const handleOnKeyDown = (e: any) => {
        switch (e.key) {
          case 'ArrowUp': {
            const index = highlighted ? visibleOptions.indexOf(highlighted) - 1 : visibleOptions.length - 1
            if (index >= 0) {
              setHighlighted(visibleOptions[index])
              scrollToItemOfIndex(index, refOptions.current!)
            }
            e.preventDefault()
            break
          }
          case 'ArrowDown': {
            const index = highlighted ? visibleOptions.indexOf(highlighted) + 1 : 0
            if (index < visibleOptions.length) {
              setHighlighted(visibleOptions[index])
              scrollToItemOfIndex(index, refOptions.current!)
            }
            e.preventDefault()
            break
          }
          case 'Enter':
            if (highlighted) {
              onChange && onChange(highlighted.code)
              setHighlighted(null)
              refOptions.current?.blur()
              e.preventDefault()
            }
            break
          case 'Escape':
            if (highlighted) setHighlighted(null)
            else refOptions.current?.blur()
            e.preventDefault()
            break
        }
      }
      document.body.addEventListener('keydown', handleOnKeyDown)
      return () => document.body.removeEventListener('keydown', handleOnKeyDown)
    } else {
      setHighlighted(null)
    }
  }, [open, visibleOptions, onChange, highlighted])

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
        onChange={(e) => {
          const text = e.target.value
          setText(text)
          onTextChange && onTextChange(text)
        }}
        onBlur={onLoseFocus}
        onFocus={() => {
          refInput.current?.select()
          setFocused(true)
        }}
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
          options.map((item) => (
            <Option
              key={item.code}
              onMouseDown={() => setOption(item)}
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
