import React from 'react'
import RadioButton, { RadioButtonProps } from 'components/RadioButton'

export default function (args: RadioButtonProps<string>) {
  return <RadioButton {...args} onChange={() => {}} value='a_value' />
}
