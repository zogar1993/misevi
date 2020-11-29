import styled from "styled-components"
import {dimensions, DimensionsProps} from "components/css_helpers/dimensions"
import React from "react"
import {margins, MarginsProps} from "components/css_helpers/margins"
import { NoStyleButton } from 'components/inner_components/NoStyleButton'

export default function ImageButton({src, name, width, height, "margin-right": marginRight, onClick, visible}: {
  src?: any
  name: string
  width: string
  height: string
  "margin-right"?: string//TODO use autogenerators
  onClick?: () => void
  visible?: boolean
}) {
  return (
    <Button
      title={name}
      $visible={visible}
      onClick={onClick}
      margin-right={marginRight}
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
