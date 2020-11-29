import styled from "styled-components"
import React from "react"
import { NoStyleInput } from 'components/inner_components/NoStyleInput'

export default function Dot({onChange, ...props}: DotProps) {
  return (
    <DotElement
      {...props}
      type="radio"
      onChange={onChange && ((e: any) => onChange(Number(e.target.value)))}
      readOnly={onChange === undefined}
    />
  )
}

type DotProps = {
  color?: string
  onChange?: (value: number) => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  value?: number
  checked?: boolean
}

const DotElement = styled(NoStyleInput)<DotProps>`
    width: 14px;
    height: 14px;
		box-sizing: border-box;
    border: 1px solid black;
    border-radius: 50%;
    background-color: ${({color}) => color || "black"};
    opacity: 0.9;
    :hover {
        border: 1px solid dodgerblue;
    }
`
