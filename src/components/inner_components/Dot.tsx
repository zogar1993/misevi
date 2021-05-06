import styled from 'styled-components'
import React from 'react'
import { NoStyleInput } from './NoStyleInput'
import { SKELETON_ANIMATION_CSS } from '../css/Skeleton'

export default function Dot({ onChange, checked, ...props }: DotProps) {
  const showSkeleton = checked === undefined
  return (
    <DotElement
      {...props}
      checked={checked === true}
      skeleton={showSkeleton}
      disabled={showSkeleton}
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
}

const DotElement = styled(NoStyleInput).attrs(() => ({
  type: 'radio'
}))<DotProps & { skeleton: boolean }>`
  width: 14px;
  height: 14px;
  border: 1px solid black;
  border-radius: 50%;
  background-color: ${({ color }) => color || 'black'};
  :hover {
      border: 1px solid dodgerblue;
  }
  ${({ skeleton }) => skeleton ? SKELETON_ANIMATION_CSS : ''};

  :disabled {
    border: 1px solid transparent;
  }
`
