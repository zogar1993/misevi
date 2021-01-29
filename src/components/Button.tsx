import styled from "styled-components"
import {BORDER_RADIUS} from "./css/Dimensions"
import React from "react"
import {NoStyleButton} from "./inner_components/NoStyleButton"

const SIDE_PADDING = "8px"
const NOT_ACTIVE_BACKGROUND_COLOR = "white"

const fontSize = ({size}: ButtonProps) => {
  if (size === "small") return "12px"
  if (size === "large") return "16px"
  return "14px"
}

const padding = ({size}: ButtonProps) => {
  if (size === "small") return "2px"
  if (size === "large") return "8px"
  return "4px"
}

export type ButtonProps = {
  size?: "small" | "medium" | "large"
  bold?: boolean
  italic?: boolean
  font?: string

  onClick: (e?: any) => void
}

const RealButton = styled(NoStyleButton)<ButtonProps>`
  box-sizing: border-box;
  border: 1px solid darkgray;
  min-width: 65px;

  padding-left: ${SIDE_PADDING};
  padding-right: ${SIDE_PADDING};
  padding-top: ${padding};
  padding-bottom: ${padding};

  background-color: ${NOT_ACTIVE_BACKGROUND_COLOR};
  color: black;
  font-weight: ${({bold}) => bold ? "bold" : "normal"};
  font-style: ${({italic}) => italic ? "italic" : "normal"};
  font-family: ${({font}) => font ? font + ", " : ""}Times, serif;
  font-size: ${fontSize};

  border-radius: ${BORDER_RADIUS};
`
export const Button = (args: ButtonProps & { children: any }) => <RealButton {...args} />
export default Button
