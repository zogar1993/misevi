import styled from 'styled-components'
import { BORDER_RADIUS } from './css/Dimensions'
import React from 'react'
import { NoStyleButton } from './inner_components/NoStyleButton'

const NOT_ACTIVE_BACKGROUND_COLOR = 'white'

const fontSize = ({ size }: ButtonProps) => {
  if (size === 'small') return '12px'
  if (size === 'large') return '16px'
  return '14px'
}

const padding = ({ size }: ButtonProps) => {
  if (size === 'small') return '2px'
  if (size === 'large') return '8px'
  return '4px'
}

export type ButtonProps = {
  size?: 'small' | 'medium' | 'large'
  onClick: (e?: any) => void
}

const ButtonElement = styled(NoStyleButton)<ButtonProps>`
  box-sizing: border-box;
  border: 1px solid darkgray;
  min-width: 65px;

  padding: ${padding} 8px;

  background-color: ${NOT_ACTIVE_BACKGROUND_COLOR};
  color: black;
  font-weight: bold;
  font-family: Almendra, Times, serif;
  font-size: ${fontSize};

  border-radius: ${BORDER_RADIUS};
`
export const Button = (args: ButtonProps & { children: any }) => <ButtonElement {...args} />
export default Button
