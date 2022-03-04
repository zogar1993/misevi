import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Z_INDEX_LEVEL } from '../css/ZIndexes'
import ImageButton from '../ImageButton'
import close from '../icons/close.svg'
import theme from '../theme/Theme'
import Input from './Input'

export default function ComboBox<T extends ComboboxValidCode = string>(
  props: InternalCombBoxProps<T>
) {
  const { value, options, onChange, onFocusChange, buttons, id, disabled, unclearable } = props
  const [text, setText] = useState('')
  const [error, setError] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [focused, setFocused] = useState(false)
  const [active, setActive] = useState<ComboBoxItem<T> | null>(null)
  const [dropdown, setDropdown] = useState<Array<ComboBoxItem<T>> | null>(null)
  const refTextbox = useRef<HTMLInputElement>(null)
  const refListbox = useRef<HTMLDataListElement>(null)
  const isLoading = value === undefined || options === undefined
  const isNotLoading = !isLoading
  const expanded = !!dropdown && dropdown.length > 0
  const popupId = `${id}-popup`
  const activeId = active ? `${id}-option-${active.code}` : undefined

  const getOptions = useCallback(() => options || [], [options])

  const findOptionByText = useCallback(() => {
    const trimmed = text.trim()
    if (trimmed === '') return NULL_OPTION
    return getOptions().find((x) => insensitiveCompare(trimmed, x.name))
  }, [text, getOptions])

  const isError = useCallback(() => {
    return findOptionByText() === undefined
  }, [text, findOptionByText])

  const setTextFromValue = useCallback(() => {
    if (value !== null && value !== undefined) {
      const option = getOptions().find((x) => x.code === value)
      setText(option ? option.name : value.toString())
    } else setText('')
  }, [value, getOptions])

  const updateDropdown = useCallback(
    (text: string) => {
      const visibleOptions = getOptions().filter((x) => insensitiveIncludes(x.name, text))
      setDropdown(visibleOptions)
    },
    [getOptions]
  )

  const updateText = useCallback(
    (text: string) => {
      setText(text)
      updateDropdown(text)
    },
    [updateDropdown]
  )

  const updateOption = useCallback(
    (option: ComboBoxItem<T> | typeof NULL_OPTION) => {
      if (option.code !== value) onChange && onChange(option.code)
      else updateText(option.name)
    },
    [value, onChange, updateText]
  )

  const handleOnKeyDown = useCallback(
    (e: any) => {
      function isInDropdown(highlighted: ComboBoxItem<T> | null): highlighted is ComboBoxItem<T> {
        return !!(highlighted && dropdown?.includes(highlighted))
      }

      switch (e.key) {
        case 'ArrowUp': {
          if (dropdown === null) return
          const index = isInDropdown(active) ? dropdown.indexOf(active) - 1 : dropdown.length - 1
          if (index >= 0) {
            setActive(dropdown[index])
            scrollToItemOfIndex(index, refListbox.current!)
          }
          e.preventDefault()
          break
        }
        case 'ArrowDown': {
          if (dropdown === null) return
          const index = isInDropdown(active) ? dropdown.indexOf(active) + 1 : 0
          if (index < dropdown.length) {
            setActive(dropdown[index])
            scrollToItemOfIndex(index, refListbox.current!)
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
          if (isInDropdown(active)) {
            updateOption(active)
            refTextbox.current!.blur()
            e.preventDefault()
          }
          break
        case 'Escape':
          if (isInDropdown(active)) setActive(null)
          else {
            setTextFromValue()
            refTextbox.current!.blur()
          }
          e.preventDefault()
          break
      }
    },
    [dropdown, active, setTextFromValue, findOptionByText]
  )

  const onLoseFocus = useCallback(() => {
  console.log("fome")
    onFocusChange && onFocusChange(false, text)
    setDropdown(null)
    setActive(null)
    setFocused(false)
    if (isError()) setText(value ? value.toString() : '')
  }, [onFocusChange, text, isError, value])

  //text
  useLayoutEffect(() => {
    setTextFromValue()
  }, [setTextFromValue])

  //error
  useLayoutEffect(() => {
    if (focused) setError(false)
    else setError(isError())
  }, [focused, error, isError])

  return (
    <ComboBoxContainer
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      role='combobox'
      aria-expanded={expanded}
    >
      <TextInput
        id={id}
        ref={refTextbox}
        value={options === undefined ? '' : text}
        disabled={disabled || isLoading || options?.length === 0}
        onChange={(e) => updateText(e.target.value)}
        onBlur={onLoseFocus}
        onFocus={() => {
          refTextbox.current!.select()
          updateDropdown('')
          setFocused(true)
          onFocusChange && onFocusChange(true, text)
        }}
        onKeyDown={handleOnKeyDown}
        readOnly={onChange === undefined}
        skeleton={isLoading}
        error={error}
        type='text'
        aria-controls={popupId}
        aria-autocomplete='list'
        aria-activedescendant={activeId}
      />
      {dropdown && dropdown.length > 0 && (
        <Listbox open={expanded} ref={refListbox} id={popupId}>
          {' '}
          {dropdown.map((item) => (
            <Option
              id={`${id}-option-${item.code}`}
              key={item.code}
              onMouseDown={(e: any) => {
                //This prevents dropdown from disappearing before click happens.
                e.preventDefault()
              }}
              onClick={(e: any) => {
                updateOption(item)
                refTextbox.current!.blur()
                e.preventDefault()
              }}
              active={item === active}
            >
              {item.name}
            </Option>
          ))}
        </Listbox>
      )}
      <ButtonsContainer visible={hovering && isNotLoading && !disabled}>
        {buttons === undefined
          ? null
          : buttons.map((x) => <ComboboxImageButton key={x.name} props={props} {...x} />)}
        {onChange && !unclearable && (
          <ImageButton
            src={close}
            name='clear'
            width='12px'
            height='12px'
            onPointerDown={(e: any) => {
              updateOption(NULL_OPTION)
              refTextbox.current!.blur()
              e.stopPropagation()
            }}
            visible={text !== ''}
          />
        )}
      </ButtonsContainer>
    </ComboBoxContainer>
  )
}

export type ComboBoxProps<T extends ComboboxValidCode = string> = {
  value: T | null | undefined
  options: Readonly<Array<ComboBoxItem<T>>> | undefined
  buttons?: ReadonlyArray<ButtonInfo<T>>
  disabled?: boolean
  unclearable?: boolean
  onChange?: (value: T | null) => void
}

export type InternalCombBoxProps<T extends ComboboxValidCode = string> = {
  id?: string
  onFocusChange?: (focus: boolean, text: string) => void
} & ComboBoxProps<T>

export type ButtonInfo<T extends ComboboxValidCode = string> = {
  name: string
  src: string
  onClick: (props: ComboBoxProps<T>) => void
}

export type ComboBoxItem<T extends ComboboxValidCode = string> = {
  name: string
  code: T
  from?: number
  to?: number
}

function ComboboxImageButton<T extends ComboboxValidCode = string>({
  name,
  src,
  onClick,
  props
}: ButtonInfo<T> & { props: ComboBoxProps<T> }) {
  return (
    <ImageButton src={src} name={name} width='18px' height='18px' onClick={() => onClick(props)} />
  )
}

const OPTION_HEIGHT = 23
const MAX_OPTION_AMOUNT = 5
const BORDER_WIDTH = 1

const Listbox = styled.datalist<{ open: boolean }>`
  display: ${({ open }) => (open ? 'block' : 'none')};
  margin: 0;
  padding: 0;
  border-radius: ${theme.borders.radius};
  position: absolute;
  top: 30px;
  border: ${BORDER_WIDTH}px solid ${theme.colors.border};
  list-style: none;
  background-color: ${theme.colors.input.background};
  width: 100%;
  transition: 0.2s;
  max-height: calc(${OPTION_HEIGHT}px * ${MAX_OPTION_AMOUNT} + ${BORDER_WIDTH}px * 2);
  overflow-y: auto;
  overflow-x: hidden;
  z-index: ${Z_INDEX_LEVEL.DROPDOWN};
  scroll-behavior: smooth;
`

const Option = styled.option<{ active: boolean }>`
  font-family: ${theme.fonts.handwritten};
  height: ${OPTION_HEIGHT}px;
  font-size: 13px;
  padding: 1px 5px 3px 8px;
  border-radius: ${theme.borders.radius};
  border: 1px solid ${({ active }) => (active ? theme.colors.hovers.border : 'transparent')};

  :hover {
    background-color: ${theme.colors.combobox.active_option};
  }

  transition: background-color 0.2s;
`

const ComboBoxContainer = styled.div<{ $width?: string }>`
  display: flex;
  align-items: center;
  position: relative;
`

const ButtonsContainer = styled.div<{ visible: boolean }>`
  position: absolute;
  right: 9px;
  align-content: center;
  align-items: center;
  ${({ visible }) => (visible === false ? 'visibility: hidden' : '')};
  gap: ${theme.spacing.separation};
`

const TextInput = styled(Input)<{ error: boolean }>`
  ${({ error }) => (error ? `border: 1px solid ${theme.colors.error2}` : '')};
`

function scrollToItemOfIndex(index: number, element: HTMLElement) {
  const scroll = element.scrollTop
  if (index * OPTION_HEIGHT < scroll) element.scrollTop = index * OPTION_HEIGHT
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

const NULL_OPTION = { name: '', code: null }

export type ComboboxValidCode = string | number
//TODO P4 add clipping
