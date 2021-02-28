import React from "react"
import NumberInput, {NumberInputProps} from "./NumberInput"
import styled from 'styled-components'
import { InputProps } from 'components/inner_components/Input'

//TODO no me gusta que adquiera skeleton de input props
const CircularNumberInput = styled(NumberInput)<NumberInputProps & InputProps>`
  text-align: center;
  width: 26px;
  height: 26px;
  border-radius: 50px;
  padding-left: 0;
  padding-right: 0;
`
export default CircularNumberInput
