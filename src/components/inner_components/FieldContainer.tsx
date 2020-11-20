import styled from "styled-components"
import {INPUT_HEIGHT} from "components/css/Dimensions"

const FieldContainer = styled.div<any>`
    position: relative;
    box-sizing: border-box;
    padding-top: 14px;
    width: ${props => props.width || "auto"};
    height: ${INPUT_HEIGHT};
`
export default FieldContainer
