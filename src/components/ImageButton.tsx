import styled from "styled-components"
import {dimensions, DimensionsProps} from "./css_helpers/dimensions"
import React from "react"
import {margins, MarginsProps} from "./css_helpers/margins"
import { NoStyleButton } from './inner_components/NoStyleButton'

export default function ImageButton({src, name, width, height, onClick, visible, ...props}: {
  src?: any
  name: string
  width: string
  height: string
  onClick?: () => void
  visible?: boolean
} & MarginsProps & any) {//TODO implement onPointerEvents
  return (
    <Button
      {...props}
      title={name}
      $visible={visible}
      onClick={onClick}
    >
      <Img
        src={src}
        alt={name}
        width={width}
        height={height}
      />
    </Button>
  )
}

const Img = styled.img<DimensionsProps>`
	:hover {
		transform: scale(1.2);
	}
  ${dimensions};
`
const Button = styled(NoStyleButton)<{ $visible?: boolean } & MarginsProps>`
  ${({$visible}) => $visible === false ? "display: none" : ""};
  ${margins};
`
