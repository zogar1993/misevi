import styled, { StyledComponent } from 'styled-components'
import {DimensionKeys, dimensions, DimensionsProps} from "components/css_helpers/dimensions"
import {SKELETON_ANIMATION_INFO} from "components/css/Skeleton"
import React from "react"
import { paddings, PaddingsKeys, PaddingsProps } from 'components/css_helpers/paddings'
import { PositionsKeys, positions, PositionsProps } from 'components/css_helpers/positions'
import { margins, MarginsKeys, MarginsProps } from 'components/css_helpers/margins'
import { Flex } from 'index'

const ignored: Array<string> = ["wrap", "x-align", "y-align"]

const removeHtmlProperties =
  <
    T extends StyledComponent<U, any, W>,
    U extends string | React.ComponentType<any>,
    W extends object,
  >(Element: T, ignored: Array<string>) => (({...props}: W & React.HTMLAttributes<HTMLElement>) => {
  const args = props as any
  ignored.forEach((name: any) => delete args[name])
  Object.keys(DimensionKeys).forEach((name: string) => delete args[name])
  Object.keys(PaddingsKeys).forEach((name: string) => delete args[name])
  Object.keys(MarginsKeys).forEach((name: string) => delete args[name])
  Object.keys(PositionsKeys).forEach((name: string) => delete args[name])
  return <Element {...args}>{args.children}</Element>
})

//TODO apply black magic to other components.
//TODO add reversed logic
const Div = styled.div``
const RealFlex = styled(removeHtmlProperties(Div, ignored))<FlexProps>`
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
  "y-align"?: YAlignType
  "x-align"?: XAlignType
  reversed?: boolean
  wrap?: boolean
  vertical?: boolean
  overflow?: string
  skeleton?: boolean
  visible?: boolean
  "no-pointer-events"?: boolean
}

type Spaced = "space-between" | "space-evenly" | "space-around"
export type YAlignType = "top" | "center" | "stretch" | "bottom" | Spaced
export type XAlignType = "left" | "center" | "stretch" | "right" | Spaced
