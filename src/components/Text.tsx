import React, {ReactNode} from "react"
import Flex, { XAlignType, YAlignType } from 'components/Flex'
import { DimensionsProps } from 'components/css_helpers/dimensions'
import Span from 'components/inner_components/Span'
import styled from 'styled-components'
import { BORDER_RADIUS } from 'components/css/Dimensions'

export default function Text({children, tooltip, ...props}: Props) {
    return (
        <Container {...props} skeleton={children === undefined}>
            <Span {...props} title={tooltip}>{children}</Span>
        </Container>
    )
}

const Container = styled(Flex)`
  border-radius: ${BORDER_RADIUS};
`

interface Props extends DimensionsProps {
  children: ReactNode
  font?: string
  size?: "small" | "medium" | "large"
  bold?: boolean
  color?: string
  "x-align"?: XAlignType
  "y-align"?: YAlignType
  bordered?: boolean
  tooltip?: string
}
