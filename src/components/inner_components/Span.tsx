import styled from "styled-components"
import theme from "components/theme/Theme"


const fontSize = ({size}: Props) => {
  if (size === "small") return "12px"
  if (size === "large") return "16px"
  return "14px"
}

const Span = styled.span<Props>`
  font-family: ${({handwritten}) => handwritten ? theme.fonts.handwritten : theme.fonts.typewriter};
  font-size: ${fontSize};
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
