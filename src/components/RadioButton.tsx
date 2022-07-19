import React from 'react'
import Dot from './inner_components/Dot'
import theme from './theme/Theme'

export default function RadioButton<T>(props: RadioButtonProps<T>) {
  const { checked } = props
  return (
    <Dot
      {...props}
      onChange={(e) => props.onChange?.(e.target.value)}
      color={checked ? theme.colors.secondary : theme.colors.primary}
    />
  )
}

export type RadioButtonProps<T> = {
  onChange?: (value: T) => void
  value?: T
  checked?: boolean
  disabled?: boolean
}
