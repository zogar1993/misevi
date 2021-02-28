import styled from 'styled-components'
import { dimensions, DimensionsProps } from './css_helpers/dimensions'
import { BORDER_RADIUS, SEPARATION } from './css/Dimensions'

const Box = styled.div<Props>`
  border: 1px solid lightgray;
  border-radius: ${BORDER_RADIUS};
  padding: ${SEPARATION} calc(3 * ${SEPARATION});
  margin: ${props => props.margin || '0'};
  overflow: ${props => props.overflow || 'visible'};
  ${dimensions};
`
export default Box

interface Props extends DimensionsProps {
  margin?: string
  overflow?: string;
  cursor?: string;
  'user-select'?: string;
}
