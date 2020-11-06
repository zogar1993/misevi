import styled from "styled-components"
import Dot from "@/components/dots/Dot"

const RadioButton = styled<any>(Dot)`
    background-color: ${props => props.filled ? "black" : "white"};
`
export default RadioButton