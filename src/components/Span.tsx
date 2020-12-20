import styled from "styled-components"
import { HANDWRITTEN_FONT } from 'components/css/Fonts'

const Span = styled.span<Props>`
  font-family: ${HANDWRITTEN_FONT}, Times, serif;
  font-size: ${props => size(props)};
  font-weight: ${({ bold }) => bold ? "bold" : "normal"};
  color: ${({ color }) => color || "black"};
`
export default Span

interface Props {
  small?: boolean
  large?: boolean
  bold?: boolean
  color?: string
}

function size(props: Props): string {
    if (props.large) return "20px"
    if (props.small) return "11px"
    return "14px"
}
