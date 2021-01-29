import styled from "styled-components"
import {BORDER_RADIUS} from "../css/Dimensions"
import {NoStyleInput} from "./NoStyleInput"
import {SKELETON_ANIMATION_INFO} from "../css/Skeleton"
import {HANDWRITTEN_FONT, FONT_SIZE} from "../css/Fonts"
import React from "react"

const animation = "{ from {font-size:150%} to {font-size:100%} }"

const getAnimation = (seed?: number) => {
  if (seed === undefined) return
  if (seed === 0) return "none"
  return seed % 2 ? "animation1" : "animation2"
}

export const onValueChangeAnimation = ({"animation-seed": seed}: { "animation-seed"?: number }) => {
  if (seed === undefined) return ""
  return `
        animation-name: ${getAnimation(seed)};
        animation-timing-function: ease-out;
        animation-duration: 0.3s;

        @keyframes animation1 ${animation}
        @keyframes animation2 ${animation}
    `
}

const Input =  styled(NoStyleInput).attrs<InputProps>(() => ({
    autoComplete: "off"
}))<InputProps>`
    padding: 5px 5px 5px 8px;
    border: 1px solid lightgray;
    background-color: whitesmoke;

    font-family: ${HANDWRITTEN_FONT}, Times, serif;
    font-size: ${FONT_SIZE};

    width: 100%;
    height: 30px;
    border-radius: ${BORDER_RADIUS};

    ${({"text-align": align}) => align ? `text-align: ${align};` : ""};
    -moz-appearance: textfield;

    ::placeholder {
        opacity: 0;
    }

    ${onValueChangeAnimation};

    ${({skeleton}) => skeleton ? SKELETON_ANIMATION_INFO : ""};
    :disabled {
        background-color: whitesmoke;
        border: 1px solid transparent;
    }
`
export default Input

export type InputProps = {
  skeleton?: boolean
  "animation-seed"?: number
  "text-align"?: "center"
}
