import styled from "styled-components"
import {DimensionKeys, dimensions, DimensionsProps} from "components/css_helpers/dimensions"
import {SKELETON_ANIMATION_INFO} from "components/css/Skeleton"
import React from "react"
import { paddings, PaddingsProps } from 'components/css_helpers/paddings'
import { positions, PositionsProps } from 'components/css_helpers/positions'
import { margins, MarginsProps } from 'components/css_helpers/margins'

const ignored: Array<string> = ["wrap", "x-align", "y-align"]
const blackMagic = (Element: any, ignored: any) => (({...props}: any) => {
  ignored.forEach((name: any) => delete props[name])
  Object.keys(DimensionKeys).forEach((name: string) => delete props[name])
  return <Element {...props}>{props.children}</Element>
})

//TODO apply black magic to other components.
//TODO make black magic more generic.
//TODO add reversed logic
const Div = styled.div``
const RealFlex = styled(blackMagic(Div, ignored))<FlexProps>`
  display: flex;
  ${props => props["no-pointer-events"] ? "pointer-events: none" : ""};
  ${({visible}) => visible === false ? "visibility: hidden" : ""};

  overflow: ${({ overflow }) => overflow || "visible"};
  flex-direction: ${({vertical, reversed}) => `${vertical ? "column" : "row"}${reversed ? "-reverse" : ""}`};
  ${({wrap}) => wrap ? "flex-wrap: wrap" : ""};
  justify-content: ${({vertical, ...props}) => align(props[vertical ? "y-align" : "x-align"])};
  align-content: ${({vertical, ...props}) => align(props[vertical ? "x-align" : "y-align"])};
  align-items: ${({vertical, ...props}) => align(props[vertical ? "x-align" : "y-align"])};

  border-color: ${({skeleton}) => skeleton ? "transparent" : "black"};
  ${({skeleton}) => skeleton ? SKELETON_ANIMATION_INFO : ""};
  background-color: ${({skeleton}) => skeleton ? "whitesmoke" : "transparent"};

  ${dimensions};
  ${paddings};
  ${margins};
  ${positions};
`

export default RealFlex

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

export type  FlexProps = FlexPropsBase & DimensionsProps & PaddingsProps &
  MarginsProps & PositionsProps
export type FlexPropsBase = {
  "y-align"?: "top" | "center" | "stretch" | "bottom" | Spaced
  "x-align"?: "left" | "center" | "stretch" | "right" | Spaced
  reversed?: boolean
  wrap?: boolean
  vertical?: boolean
  overflow?: string
  skeleton?: boolean
  visible?: boolean
  "no-pointer-events"?: boolean
}

type Spaced = "space-between" | "space-evenly" | "space-around"
