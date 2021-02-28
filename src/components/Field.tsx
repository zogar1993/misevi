import React, { useCallback, useEffect, useState } from 'react'
import FieldLabel from './inner_components/FieldLabel'
import FieldContainer from './inner_components/FieldContainer'
import NumberInput, { NumberInputProps } from './NumberInput'
import TextInput, { TextInputProps } from './inner_components/TextInput'
import ComboBox, { ComboBoxProps } from './inner_components/ComboBox'

export default function Field({ label, width, ...props }: FieldProps) {
  const { value, disabled } = props
  const [isPlaceholder, setIsPlaceholder] = useState<boolean>(false)
  const onTextChange = useCallback((focus: boolean, text: string) => {
    setIsPlaceholder(!focus && text.trim() === '')
  }, [])
  useEffect(() => {
    setIsPlaceholder(value === '' || value === null)
  }, [value])
  const id = props.id || label

  return (
    <FieldContainer width={width}>
      <FieldLabel as-placeholder={isPlaceholder} htmlFor={id} disabled={disabled}>{label}</FieldLabel>
      {
        props.type === 'number' ? <NumberInput {...props} id={id} /> :
          props.type === 'combobox' ? <ComboBox {...props} id={id} onFocusChange={onTextChange} /> :
            <TextInput {...props} id={id} onFocusChange={onTextChange} placeholder={label} />
      }
    </FieldContainer>
  )
}

export type FieldProps = FieldTextProps | FieldNumberProps | FieldComboProps

type FieldBaseProps = {
  label: string
  width?: string
}

export type FieldTextProps = { type?: 'text' } & FieldBaseProps & TextInputProps
export type FieldNumberProps = { type: 'number' } & FieldBaseProps & NumberInputProps
export type FieldComboProps = { type: 'combobox' } & FieldBaseProps & ComboBoxProps
