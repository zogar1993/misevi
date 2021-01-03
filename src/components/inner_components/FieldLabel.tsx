import styled from "styled-components"

const FieldLabel = styled.label<Props>`
  position: absolute;
  transition-timing-function: ease-in;
  transition: 0.2s;
  font-size: ${props => props["as-placeholder"] ? '16px' : "11px"};
  color: ${props => props["as-placeholder"] ? "grey" : "black"};
  font-family: Times, serif;
  top: ${props => props["as-placeholder"] ? '21px' : "2px"};
  left: 9px;
  user-select: none;
  z-index: 2;
`
export default FieldLabel

type Props = {
  "as-placeholder"?: boolean
}
