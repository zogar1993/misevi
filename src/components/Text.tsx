import React, {ReactNode} from "react"
import Flex from 'components/Flex'
import { DimensionsProps } from 'components/css_helpers/dimensions'
import Span from 'components/Span'
import styled from 'styled-components'
import { BORDER_RADIUS } from 'components/css/Dimensions'

export default function Text({children, ...props}: Props) {
    return (
        <Container {...props} skeleton={children === undefined}>
            <Span {...props} title={props.tooltip}>{children}</Span>
        </Container>
    )
}

const Container = styled(Flex)`
  border-radius: ${BORDER_RADIUS};
`

interface Props extends DimensionsProps {
    children: ReactNode
    font?: string
    small?: boolean
    large?: boolean
    bold?: boolean
    color?: string
    "x-align"?: string
    "y-align"?: string
    bordered?: boolean
    tooltip?: string
}
