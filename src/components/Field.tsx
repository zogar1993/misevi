import React, { useCallback, useEffect, useState } from 'react'
import FieldLabel from './inner_components/FieldLabel'
import FieldContainer from './inner_components/FieldContainer'
import NumberInput, { NumberInputProps } from './NumberInput'
import TextInput, { TextInputProps } from './inner_components/TextInput'
import ComboBox, { ComboBoxProps } from './inner_components/ComboBox'
import useUniqueId from "./uuid/uuid";

export default function Field<T extends string = string>({ label, width, area, ...props }: FieldProps<T>) {
  const { value, disabled } = props
  const [isPlaceholder, setIsPlaceholder] = useState<boolean>(false)
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
    <FieldContainer width={width} area={area}>
      <FieldLabel
        as-placeholder={isPlaceholder}
        htmlFor={id}
        disabled={disabled}
        onMouseDown={(e) => { if(isFocused) e.preventDefault() }}
      >
        {label}
      </FieldLabel>
      {
        props.type === 'number' ? <NumberInput {...props} id={id} /> :
          props.type === 'combobox' ? <ComboBox {...props} id={id} onFocusChange={onTextChange} /> :
            <TextInput {...props} id={id} onFocusChange={onTextChange} placeholder={label} />
      }
    </FieldContainer>
  )
}

export type FieldProps<T extends string = string> = FieldTextProps | FieldNumberProps | FieldComboProps<T>

type FieldBaseProps = {
  label: string
  width?: string
  area?: string
}

export type FieldTextProps = { type?: 'text' } & FieldBaseProps & TextInputProps
export type FieldNumberProps = { type: 'number' } & FieldBaseProps & NumberInputProps
export type FieldComboProps<T extends string = string> = { type: 'combobox' } & FieldBaseProps & ComboBoxProps<T>
