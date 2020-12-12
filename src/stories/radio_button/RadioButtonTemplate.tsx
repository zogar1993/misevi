import React from "react"
import RadioButton from 'components/RadioButton'
import { DotProps } from 'components/inner_components/Dot'

export default function Template({ ...args }: DotProps) {
  return <RadioButton {...args}/>
}
