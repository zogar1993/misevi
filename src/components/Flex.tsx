import styled from "styled-components"
import {DimensionKeys, dimensions, DimensionsProps} from "@/css_helpers/dimensions"
import {paddings, PaddingsProps} from "@/css_helpers/paddings"
import {border_radius, BorderRadiusProps} from "@/css_helpers/border_radius"
import {margins, MarginsProps} from "@/css_helpers/margins"
import {SKELETON_ANIMATION_INFO} from "@/css_helpers/constants"
import {positions, PositionsProps} from "@/css_helpers/positions"
import React from "react"

const ignored: Array<string> = ["wrap", "x-align", "y-align"]
const blackMagic = (Element: any, ignored: any) => (({...props}: any) => {
	ignored.forEach((name: any) => delete props[name])

	for (const name in DimensionKeys) {
		delete props[name]
	}

	return <Element {...props}>{props.children}</Element>
})

//TODO apply black magic to other components.
//TODO make black magic more generic.
//TODO type exclusive alignments for vertical and horizontal
//TODO fix the "any" issue when typed
//TODO fix the warning on html
const Div = styled.div``
const Flex = styled<any & Props>(blackMagic(Div, ignored))`
  display: flex;
  ${props => props["no-pointer-events"] ? "pointer-events:none" : ""};
  ${({visible}) => visible === false ? "visibility: hidden" : ""};
  
  overflow: ${props => props.overflow || "visible"};
  flex-direction: ${({vertical, reversed}) => `${vertical ? "column" : "row"}${reversed ? "-reverse" : ""}`};
  ${({wrap}) => wrap ? "flex-wrap: wrap" : ""};
  justify-content: ${({vertical, ...props}) => align(props[vertical ? "y-align" : "x-align"])};
  align-items: ${({vertical, ...props}) => align(props[vertical ? "x-align" : "y-align"])};
    
  border: ${({bordered}) => bordered ? "1px solid black" : "medium none color"};
  border-color: ${({skeleton}) => skeleton ? "transparent" : "black"};
  ${({skeleton}) => skeleton ? SKELETON_ANIMATION_INFO : ""};
  background-color: ${({skeleton}) => skeleton ? "whitesmoke" : "transparent"};
  
  ${dimensions};
  ${paddings};
  ${margins};
  ${border_radius};
  ${positions};
`
export default Flex

const align = (value: string | undefined) => {
	if (value === "space-between") return "space-between"
	if (value === "space-evenly") return "space-evenly"
	if (value === "space-around") return "space-around"

	if (value === "top") return "flex-start"
	if (value === "left") return "flex-start"
	if (value === "center") return "center"
	if (value === "stretch") return "stretch"
	if (value === "right") return "flex-end"
	if (value === "bottom") return "flex-end"

	return "flex-start"
}

interface Props extends DimensionsProps,
	PaddingsProps,
	BorderRadiusProps,
	MarginsProps,
	PositionsProps {
	"y-align"?: string
	"x-align"?: string
	reversed?: boolean
	wrap?: boolean
	vertical?: boolean
	overflow?: string
	bordered?: boolean
	skeleton?: boolean
	visible?: boolean
	"no-pointer-events"?: boolean
}
