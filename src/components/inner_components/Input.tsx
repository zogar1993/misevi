import styled, { css } from 'styled-components'
import theme from '../theme/Theme'
import { NoStyleInput } from './NoStyleInput'
import { SKELETON_ANIMATION_CSS } from '../css/Skeleton'
import React from 'react'

const animation = css`
   {
    from {
      font-size: 150%;
    }

    to {
      font-size: 100%;
    }
  }
`

const getAnimation = (seed?: number) => {
  if (seed === undefined) return
  if (seed === 0) return 'none'
  return seed % 2 ? 'animation1' : 'animation2'
}

export const onValueChangeAnimation = ({
  'animation-seed': seed
}: {
  'animation-seed'?: number
}) => {
  if (seed === undefined) return ''
  return css`
    animation-name: ${getAnimation(seed)};
    animation-timing-function: ease-out;
    animation-duration: 0.3s;

    @keyframes animation1 ${animation}
    @keyframes animation2 ${animation};
  `
}

const Input = styled(NoStyleInput).attrs<InputProps>(() => ({
  autoComplete: 'off'
}))<InputProps>`
  padding: 5px 5px 5px 8px;
  border: 1px solid ${theme.colors.border};
  background-color: ${theme.colors.input.background};

  font-family: ${theme.fonts.handwritten};
  font-size: 16px;

  width: 100%;
  height: 30px;
  border-radius: ${theme.borders.radius};

  -moz-appearance: textfield;

  ::placeholder {
    opacity: 0;
  }

  ${onValueChangeAnimation};

  :disabled {
    background-color: ${theme.colors.input.background};
    border: 1px solid transparent;
  }

  ${({ disabled }) => (disabled ? 'cursor: not-allowed' : '')};
  ${({ skeleton }) => (skeleton ? SKELETON_ANIMATION_CSS : '')};
`
export default Input

export type InputProps = {
  skeleton?: boolean
  'animation-seed'?: number
}
