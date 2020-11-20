import styled, {StyledComponent} from "styled-components"
import {BORDER_RADIUS} from "components/css/Dimensions"
import React from "react"

const SIDE_PADDING = "8px"
const NOT_ACTIVE_BACKGROUND_COLOR = "white"
export const MARGIN_FOR_SHADOW = "2px"

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

const UnstyledButton: StyledComponent<"button", ButtonProps> = styled.button`
  padding: 0;
  border: 0;
  line-height: 0;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
  outline: none;
`

export type ButtonProps = {
  size?: "small" | "medium" | "large"
  bold?: boolean
  italic?: boolean
  font?: string

  onClick: (e?: any) => void
}

const RealButton: StyledComponent<"button", any, ButtonProps> = styled(UnstyledButton)`
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

    // &:hover {
    // }
`
export const Button = (args: ButtonProps & { children: any }) => <RealButton {...args} />
export default Button
