import styled from 'styled-components'
import { INPUT_HEIGHT } from '../css/Dimensions'
import {purified} from "../purifier/Purified"

const FieldContainer = styled(purified.div)<{ width?: string, area?: string }>`
  position: relative;
  width: ${({width}) => width || 'auto'};
  height: ${INPUT_HEIGHT};
  display: flex;
  flex-direction: column;
  padding-top: 15px;

  ${({area}) => area ? `grid-area: ${area}` : ''};
`
export default FieldContainer
