import React from 'react'
import Dot from './inner_components/Dot'

export default function RadioButton<T>(props: RadioButtonProps<T>) {
  return <Dot {...props} onChange={(e) => props.onChange?.(e.target.value)} />
}

export type RadioButtonProps<T> = {
  onChange?: (value: T) => void
  value?: T
  checked?: boolean
  disabled?: boolean
}
