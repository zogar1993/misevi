import React from "react"
import NumberInput, {NumberInputProps} from "components/NumberInput"
import styled from 'styled-components'

const CircularNumberInput = styled(NumberInput)<NumberInputProps>`
  text-align: center;
  width: 26px;
  height: 26px;
  border-radius: 50px;
  padding-left: 0;
  padding-right: 0;
`
export default CircularNumberInput
