import styled, {StyledComponent} from "styled-components"
import {BORDER_RADIUS} from "components/css/Dimensions"
import {dimensions, DimensionsProps} from "components/css_helpers/dimensions"

const SIDE_PADDING = "8px"
const ACTIVE_BACKGROUND_COLOR = "#EAEAEA"
const NOT_ACTIVE_BACKGROUND_COLOR = "white"
export const MARGIN_FOR_SHADOW = "2px"

const backGroundColor = ({active}: ButtonProps) =>
  active ? ACTIVE_BACKGROUND_COLOR : NOT_ACTIVE_BACKGROUND_COLOR

const fontSize = ({small, large}: ButtonProps) => {
  if (small) return "12px"
  if (large) return "16px"
  return "14px"
}

const padding = ({small, large}: ButtonProps) => {
  if (small) return "2px"
  if (large) return "8px"
  return "4px"
}

const shadow = ({
                  "has-buttons-top": hasButtonsTop,
                  "has-buttons-right": hasButtonsRight,
                  "has-buttons-bottom": hasButtonsBottom,
                  "has-buttons-left": hasButtonsLeft,
                  active
                }: ButtonProps) => {
  if (active) {
    const xOffset = hasButtonsLeft ? "2px" : "1px"
    const yOffset = hasButtonsTop ? "2px" : "1px"
    return `inset ${xOffset} ${yOffset} 2px lightslategray`
  } else if (!hasButtonsRight || !hasButtonsBottom) {
    const xOffset = hasButtonsRight ? 0 : "1px"
    const yOffset = hasButtonsBottom ? 0 : "1px"
    return `${xOffset} ${yOffset} 2px lightslategray`
  } else return "none"
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
  active?: boolean
  small?: boolean
  large?: boolean
  bold?: boolean
  italic?: boolean
  font?: string

  vertical?: boolean

  "has-buttons-top"?: boolean
  "has-buttons-right"?: boolean
  "has-buttons-bottom"?: boolean
  "has-buttons-left"?: boolean
  "z-index"?: number
} & DimensionsProps

const Button = styled.button<ButtonProps>`
    box-sizing: border-box;
    border: 1px solid darkgray;
    min-width: 65px;
    position:relative;
    z-index: ${props => props["z-index"] || 0};

    padding-left: ${SIDE_PADDING};
    padding-right: ${SIDE_PADDING};
    padding-top: calc(${padding} + ${({active}) => active ? "1px" : "0px"});
    padding-bottom: calc(${padding} - ${({active}) => active ? "1px" : "0px"});

    background-color: ${backGroundColor};
    color: black;
    font-weight: ${({bold}) => bold ? "bold" : "normal"};
    font-style: ${({italic}) => italic ? "italic" : "normal"};
    font-family: ${({font}) => font ? font + ", " : ""}Times, serif;
    font-size: ${fontSize};

    border-bottom-style: ${props => props["has-buttons-bottom"] ? "none" : "solid"};
    border-right-style: ${props => props["has-buttons-right"] ? "none" : "solid"};

    margin-right: ${props => props["has-buttons-right"] ? 0 : MARGIN_FOR_SHADOW};
    margin-bottom: ${props => props["has-buttons-bottom"] ? 0 : MARGIN_FOR_SHADOW};

    border-top-left-radius: ${props => props["has-buttons-top"] || props["has-buttons-left"] ? 0 : BORDER_RADIUS};
    border-top-right-radius: ${props => props["has-buttons-top"] || props["has-buttons-right"] ? 0 : BORDER_RADIUS};
    border-bottom-left-radius: ${props => props["has-buttons-bottom"] || props["has-buttons-left"] ? 0 : BORDER_RADIUS};
    border-bottom-right-radius: ${props => props["has-buttons-bottom"] || props["has-buttons-right"] ? 0 : BORDER_RADIUS};

    box-shadow: ${shadow};

    // &:hover {
    //     background-image: linear-gradient(-45deg, ${backGroundColor} 40%, darkgrey 50%, ${backGroundColor} 60%);
    //     animation: forward-shine 0.35s reverse;
    //     animation-timing-function: linear;
    //     background-size: 350% 350%;
    //     @keyframes forward-shine {
    //         from {background-position: -10%;}
    //         to {background-position: 130%;}
    //     }
    // }
    ${dimensions};
`
export default Button
