import styled from 'styled-components'
import { INPUT_HEIGHT } from '../css/Dimensions'

const FieldContainer = styled.div<{ width?: string; area?: string }>`
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  width: ${({ width }) => width || 'auto'};
  height: ${INPUT_HEIGHT};
  padding-top: 15px;
`
export default FieldContainer
