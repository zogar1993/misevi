import React from 'react'
import NumberInput, { NumberInputProps } from './NumberInput'
import styled from 'styled-components'

const CircularNumberInput = styled(NumberInput).attrs(() => ({ type: 'number' }))<NumberInputProps>`
  text-align: center;
  width: 50px;
  height: 50px;
  font-size: 20px;
  border-radius: 50%;
  padding-left: 0;
  padding-right: 0;
`
export default CircularNumberInput
