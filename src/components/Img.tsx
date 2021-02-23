import styled from "styled-components"
import {dimensions, DimensionsProps} from "./css_helpers/dimensions"
import {positions, PositionsProps} from "./css_helpers/positions"
import { BORDER_RADIUS } from 'components/css/Dimensions'

const Img = styled.img<ImageProps>`
  cursor: ${props => props.onClick ? "pointer" : props.disabled ? "not-allowed" : "default"};
  visibility:${props => props.hide ? "hidden" : "visible"};
  filter: ${props => props.disabled ? "invert(20%)" : null};
  border-radius: ${({"rounded-borders": roundedBorders, circle}) => circle ? "50%" : roundedBorders ? BORDER_RADIUS : "0"};

	${dimensions};
  ${positions};
`
export default Img

export interface ImageProps extends DimensionsProps,
	PositionsProps {
	hide?: boolean
	disabled?: boolean
	"rounded-borders"?: boolean
	circle?: boolean
}
