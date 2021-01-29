import React, {ReactNode} from "react"
import Flex, { XAlignType, YAlignType } from 'components/Flex'
import { DimensionsProps } from 'components/css_helpers/dimensions'
import Span from 'components/inner_components/Span'
import styled from 'styled-components'
import { BORDER_RADIUS } from 'components/css/Dimensions'

export default function Text({children, tooltip, mode, ...props}: TextProps) {
    return (
        <Container {...props} skeleton={children === undefined}>
            <Span {...props} color={mode ? color(mode) : props.color} title={tooltip}>{children}</Span>
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
  size?: "small" | "medium" | "large"
  bold?: boolean
  color?: string//TODO Should not let set color
  "x-align"?: XAlignType
  "y-align"?: YAlignType
  bordered?: boolean
  tooltip?: string
  mode?: TextMode
} & DimensionsProps

type TextMode =  "default" | "positive" | "negative"
