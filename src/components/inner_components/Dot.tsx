import styled from 'styled-components'
import React from 'react'
import { NoStyleInput } from './NoStyleInput'
import { SKELETON_ANIMATION_CSS } from '../css/Skeleton'

export default function Dot({ onChange, checked, disabled, ...props }: DotProps) {
  const showSkeleton = checked === undefined
  return (
    <DotElement
      {...props}
      checked={checked === true}
      skeleton={showSkeleton}
      disabled={showSkeleton || disabled}
      onChange={onChange && ((e: any) => onChange(Number(e.target.value)))}
      readOnly={onChange === undefined}
    />
  )
}

export type DotProps = {
  color?: string
  onChange?: (value: number) => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  value?: number
  checked?: boolean
  disabled?: boolean
}

const DotElement = styled(NoStyleInput).attrs(() => ({
  type: 'radio'
}))<DotProps & { skeleton: boolean }>`
  width: 14px;
  height: 14px;
  border: 1px solid black; //TODO apply theme
  border-radius: 50%;
  background-color: ${({ color }) => color || 'black'};
  :hover {
    border: 1px solid dodgerblue; //TODO apply theme
  }

  :disabled {
    border: 1px solid grey; //TODO apply theme
    cursor: not-allowed;
  }

  ${({ skeleton }) => (skeleton ? SKELETON_ANIMATION_CSS : '')};
`
