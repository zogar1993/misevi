import styled from 'styled-components'
import { BORDER_RADIUS } from './css/Dimensions'
import React from 'react'
import { NoStyleButton } from './inner_components/NoStyleButton'
import theme from "components/theme/Theme"

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
  disabled?: boolean
  onClick: (e?: any) => void
  children: string
}

const ButtonElement = styled(NoStyleButton)<ButtonProps>`
  min-width: 65px;

  padding: ${padding} 8px;

  background-color: ${NOT_ACTIVE_BACKGROUND_COLOR};
  font-family: ${theme.fonts.common};
  font-size: ${fontSize};
  text-transform: uppercase;

  border-radius: ${BORDER_RADIUS};

  border-width: 1px;
  border-style: solid;

  color: ${theme.colors.text};
  border-color: ${theme.colors.text};
  background-color: ${theme.colors.primary};

  :hover:not(:disabled) {
    color: ${theme.colors.hovers.text};
    border-color: ${theme.colors.hovers.text};
    background-color: ${theme.colors.hovers.primary};
  }

  :active:not(:disabled) {
    color: ${theme.colors.actives.text};
    border-color: ${theme.colors.actives.text};
    background-color: ${theme.colors.actives.primary};
  }

  :disabled {
    color: ${theme.colors.disabled.text};
    border-color: ${theme.colors.disabled.text};
    background-color: ${theme.colors.disabled.primary};
    cursor: not-allowed;
  }
`


export const Button = (args: ButtonProps) => <ButtonElement {...args} />
export default Button
