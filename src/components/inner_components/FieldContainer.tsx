import styled from 'styled-components'
import { INPUT_HEIGHT } from '../css/Dimensions'

const FieldContainer = styled.div<any>`
  position: relative;
  box-sizing: border-box;
  width: ${props => props.width || 'auto'};
  height: ${INPUT_HEIGHT};
  display: flex;
  flex-direction: column;
  padding-top: 15px;
`
export default FieldContainer
