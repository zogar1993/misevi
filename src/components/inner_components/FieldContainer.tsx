import styled from 'styled-components'
import { INPUT_HEIGHT } from '../css/Dimensions'

const FieldContainer = styled.div<{ width?: string, area?: string }>`
  position: relative;
  box-sizing: border-box;
  width: ${({width}) => width || 'auto'};
  height: ${INPUT_HEIGHT};
  display: flex;
  flex-direction: column;
  padding-top: 15px;

  ${({area}) => area ? `grid-area: ${area}` : ''};
`
export default FieldContainer
