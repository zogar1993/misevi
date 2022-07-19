import styled from 'styled-components'
import React from 'react'
import theme from '../theme/Theme'
import { NoStyleInput } from './NoStyleInput'
import { SKELETON_ANIMATION_CSS } from '../css/Skeleton'

export default function Dot<T>({ onChange, checked, disabled, ...props }: DotProps) {
  const showSkeleton = checked === undefined
  return (
    <DotElement
      {...props}
      checked={checked === true}
      skeleton={showSkeleton}
      disabled={showSkeleton || disabled}
      onChange={onChange}
      readOnly={onChange === undefined}
    />
  )
}

export type DotProps = {
  color?: string
  onChange?: (e: any) => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  value?: any
  checked?: boolean
  disabled?: boolean
}

const DotElement = styled(NoStyleInput).attrs(() => ({
  type: 'radio'
}))<DotProps & { skeleton: boolean }>`
  width: ${theme.sizes.dot.size};
  height: ${theme.sizes.dot.size};
  border: 1px solid ${theme.colors.secondary};
  border-radius: 50%;
  background-color: ${({ color }) => color || theme.colors.secondary};
  :hover {
    border: 1px solid ${theme.colors.hovers.border};
  }

  :disabled {
    border: 1px solid ${theme.colors.disabled.border};
    cursor: not-allowed;
    ${({ skeleton }) => (skeleton ? SKELETON_ANIMATION_CSS : '')};
    ${({ skeleton }) => (skeleton ? 'border-width: 0' : '')};
  }
`
