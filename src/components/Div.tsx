import styled from "styled-components"
import {dimensions, DimensionsProps} from "css_helpers/dimensions"
import {positions, PositionsProps} from "css_helpers/positions"

const Div = styled.div<DimensionsProps &
	PositionsProps &
	{ "no-pointer-events"?: boolean }>`
	${props => props["no-pointer-events"] ? "pointer-events:none" : ""};

	${dimensions}
	${positions}
`
export default Div
