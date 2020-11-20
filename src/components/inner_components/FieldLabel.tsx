import styled from "styled-components"

const FieldLabel = styled.label<Props>`
    position: absolute;
    transition-timing-function: ease-in;
    transition: 0.2s;
    transform: ${props => props["as-placeholder"] ? "" : "translateY(-115%) scale(0.8) translateX(-16%)"};
    color: ${props => props["as-placeholder"] ? "grey" : "black"};
    font-family: Times, serif;
    font-size: 16px;
    padding-left: 8px;
    margin-top: 4.5px;
    user-select: none;
`
export default FieldLabel

type Props = {
  "as-placeholder"?: boolean
}
