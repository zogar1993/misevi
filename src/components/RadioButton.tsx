import styled from "styled-components"
import Dot from "./inner_components/Dot"

const RadioButton = styled(Dot)`
    background-color: ${({checked}) => checked ? "black" : "white"};
`
export default RadioButton
