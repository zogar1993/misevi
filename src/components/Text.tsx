import React, {ReactNode} from "react"
import Flex, {XAlignType, YAlignType} from "./Flex"
import {DimensionsProps} from "./css_helpers/dimensions"
import Span, { TextSize } from './inner_components/Span'
import styled from "styled-components"
import {BORDER_RADIUS} from "./css/Dimensions"

export default function Text({children, tooltip, bold, handwritten, size, mode, ...props}: TextProps) {
  return (
    <Container {...props} skeleton={children === undefined}>
      <Span
        color={mode ? color(mode) : props.color}
        title={tooltip}
        bold={bold}
        handwritten={handwritten}
        size={size}
      >
        {children}
      </Span>
    </Container>
  )
}

function color(mode: TextMode): string {
  if (mode === "positive") return "green"
  if (mode === "negative") return "red"
  return "black"
}

const Container = styled(Flex)`
  border-radius: ${BORDER_RADIUS};
`

export type TextProps = {
  children: ReactNode
  font?: string
  size?: TextSize
  bold?: boolean
  color?: string//TODO Should not let set color
  "x-align"?: XAlignType
  "y-align"?: YAlignType
  bordered?: boolean
  tooltip?: string
  mode?: TextMode
  handwritten?: boolean
} & DimensionsProps

type TextMode = "default" | "positive" | "negative"
