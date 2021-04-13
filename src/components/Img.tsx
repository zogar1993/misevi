import styled from 'styled-components'
import { dimensions, DimensionsProps } from './css_helpers/dimensions'
import { positions, PositionsProps } from './css_helpers/positions'
import { BORDER_RADIUS } from './css/Dimensions'

const Img = styled.img<ImageProps>`
  cursor: ${props => props.onClick ? 'pointer' : props.disabled ? 'not-allowed' : 'default'};
  visibility: ${props => props.hide ? 'hidden' : 'visible'};
  filter: ${props => props.disabled ? 'invert(20%)' : null};
  border-radius: ${({circle}) => circle ? '50%' : BORDER_RADIUS };
  ${({float}) => float ? `float: ${float}` : '' };
  ${({bordered}) => bordered ? `border: 1px lightgray solid` : '' };

  ${dimensions};
  ${positions};
`
export default Img

export type ImageProps = {
  hide?: boolean
  disabled?: boolean
  circle?: boolean
  float?: string
  bordered?: boolean
} & DimensionsProps & PositionsProps
