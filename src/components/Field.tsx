import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import NumberInput, { NumberInputProps } from './NumberInput'
import TextInput, { TextInputProps } from './inner_components/TextInput'
import ComboBox, { ComboBoxProps, ComboboxCode } from './inner_components/ComboBox'
import theme from './theme/Theme'
import useUniqueId from './uuid/uuid'

export default function Field<T extends ComboboxCode = string>({ label, ...props }: FieldProps<T>) {
  const { value, disabled } = props
  const [isPlaceholder, setIsPlaceholder] = useState<boolean>(value === '' || value === null)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const uuid = useUniqueId()

  const onTextChange = useCallback((focus: boolean, text: string) => {
    setIsPlaceholder(!focus && text.trim() === '')
    setIsFocused(focus)
  }, [])

  useEffect(() => {
    setIsPlaceholder(value === '' || value === null)
  }, [value])

  const id = label ? `${label}-${uuid}` : uuid

  return (
    <FieldContainer>
      {props.type === 'number' ? (
        <NumberInput {...props} id={id} />
      ) : props.type === 'combobox' ? (
        <ComboBox {...props} id={id} onFocusChange={onTextChange} />
      ) : (
        <TextInput {...props} id={id} onFocusChange={onTextChange} placeholder={label} />
      )}
      <FieldLabel
        isPlaceholder={isPlaceholder}
        htmlFor={id}
        disabled={disabled}
        onMouseDown={(e) => {
          if (isFocused) e.preventDefault()
        }}
      >
        {label}
      </FieldLabel>
    </FieldContainer>
  )
}

export type FieldProps<T extends ComboboxCode = string> =
  | FieldTextProps
  | FieldNumberProps
  | FieldComboProps<T>

type FieldBaseProps = {
  label: string
}

export type FieldTextProps = { type?: 'text' } & FieldBaseProps & TextInputProps
export type FieldNumberProps = { type: 'number' } & FieldBaseProps & NumberInputProps
export type FieldComboProps<T extends ComboboxCode = string> = {
  type: 'combobox'
} & FieldBaseProps &
  ComboBoxProps<T>

const FieldContainer = styled.div<{ width?: string; area?: string }>`
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  width: ${({ width }) => width || 'auto'};
  height: ${theme.sizes.field.height};
  padding-top: 15px;
`

const FieldLabel = styled.label<{
  isPlaceholder?: boolean
  disabled?: boolean
}>`
  position: absolute;
  transition-timing-function: ease-in;
  transition: 0.2s;
  font-size: ${({ isPlaceholder }) => (isPlaceholder ? '16px' : '11px')};
  color: ${({ isPlaceholder }) => (isPlaceholder ? theme.colors.muted : theme.colors.text)};
  font-family: ${theme.fonts.common};
  top: ${({ isPlaceholder }) => (isPlaceholder ? '21px' : '2px')};
  left: 9px;
  user-select: none;
  ${({ disabled }) => (disabled ? 'pointer-events: none' : '')};
`
