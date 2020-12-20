import styled from "styled-components"
import { HANDWRITTEN_FONT } from 'components/css/Fonts'

const Span = styled.span<Props>`
  font-family: ${({handwritten}) => handwritten ? `${HANDWRITTEN_FONT}, ` : ""}Times, serif;
  font-size: ${props => fontSize(props)};
  font-weight: ${({ bold }) => bold ? "bold" : "normal"};
  color: ${({ color }) => color || "black"};
`
export default Span

interface Props {
  size?: "small" | "medium" | "large"
  bold?: boolean
  color?: string
  handwritten?: boolean
}

const fontSize = ({size}: Props) => {
  if (size === "small") return "12px"
  if (size === "large") return "16px"
  return "14px"
}
