import React from 'react'
import ComboBox, { ComboboxCode, ComboBoxProps } from './inner_components/ComboBox'

export default function CheckComboBox<T extends ComboboxCode = string>(props: ComboBoxProps<T>) {
  return <ComboBox {...props} highlightSelected={true} />
}
