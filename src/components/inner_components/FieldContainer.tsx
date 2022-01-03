import styled from 'styled-components'
import { INPUT_HEIGHT } from '../css/Dimensions'

const FieldContainer = styled.div<{ width?: string, area?: string }>`
  position: relative;
  width: ${({width}) => width || 'auto'};
  height: ${INPUT_HEIGHT};
  display: flex;
  flex-direction: column;
  padding-top: 15px;
`
export default FieldContainer
