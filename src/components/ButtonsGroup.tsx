import React from "react"
import styled from 'styled-components'
import { BORDER_RADIUS } from 'components/css/Dimensions'
import { dimensions, DimensionsProps } from 'components/css_helpers/dimensions'
import Flex from 'components/Flex'

export default function ButtonsGroup(props: ButtonsGroupProps) {
	const {items, selected, onChange, small, large, bold, font, width, columns} = props
	return (
		<Flex
			wrap
			x-align={props["x-align"]}
			y-align={props["y-align"]}
			width={width}
			padding-right={MARGIN_FOR_SHADOW}
			padding-bottom={MARGIN_FOR_SHADOW}
			border-top-right-radius={`calc(${BORDER_RADIUS} + ${MARGIN_FOR_SHADOW} + 1px)`}
			border-bottom-left-radius={`calc(${BORDER_RADIUS} + ${MARGIN_FOR_SHADOW} + 1px)`}
		>
			{
				items.map((item, index) =>
					<Button
						key={item.code}
						onClick={() => onChange(item.code)}
						active={selected === item.code}
						width={columns ? `calc((100% - ${MARGIN_FOR_SHADOW}) / ${columns})` : undefined}
						font={font}
						has-buttons-top={columns === undefined ? false : index >= columns}
						has-buttons-right={columns === undefined ? index < items.length - 1 : index % columns !== columns - 1}
						has-buttons-bottom={columns === undefined ? false : index <= items.length - columns - 1}
						has-buttons-left={columns === undefined ? index > 0 : index % columns !== 0}
						z-index={items.length - index}
						small={small}
						large={large}
						bold={bold}
					>
						{item.name}
					</Button>
				)
			}
		</Flex>
	)
}

type ButtonsGroupProps = {
	items: Array<Item>
	selected: string
	onChange: (code: string) => void

	columns?: number
	"x-align"?: string
	"y-align"?: string
	width?: string

	small?: boolean
	large?: boolean
	bold?: boolean
	italic?: boolean
	font?: string
}

type Item = {
	name: string
	code: string
}

const SIDE_PADDING = "8px"
const ACTIVE_BACKGROUND_COLOR = "#EAEAEA"
const NOT_ACTIVE_BACKGROUND_COLOR = "white"
export const MARGIN_FOR_SHADOW = "2px"

const backGroundColor = ({active}: Props) =>
  active ? ACTIVE_BACKGROUND_COLOR : NOT_ACTIVE_BACKGROUND_COLOR

const fontSize = ({small, large}: Props) => {
  if (small) return "12px"
  if (large) return "16px"
  return "14px"
}

const padding = ({small, large}: Props) => {
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
                }: Props) => {
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

const Button = styled.button<Props>`
  box-sizing: border-box;
  border: 1px solid darkgray;
  min-width: 65px;
  position: relative;
  z-index: ${props => props["z-index"] || 0};


  padding-left: ${SIDE_PADDING};
  padding-right: ${SIDE_PADDING};
  padding-top: calc(${padding} + ${({active}) => active ? "1px" : "0px"});
  padding-bottom: calc(${padding} - ${({active}) => active ? "1px" : "0px"});

  background-color: ${backGroundColor};
  color: black;
  font-weight: ${({bold}) => bold ? "bold" : "normal"};
  font-style: ${({italic}) => italic ? "italic" : "normal"};
  font-family: ${({font}) => font ? `${font}, ` : ""}Times, serif;
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

  ${dimensions};
`

interface Props extends DimensionsProps {
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
}
