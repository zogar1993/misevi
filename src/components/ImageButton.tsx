import styled from "styled-components"
import {dimensions, DimensionsProps} from "./css_helpers/dimensions"
import React, { HTMLAttributes } from 'react'
import {margins, MarginsProps} from "./css_helpers/margins"
import { NoStyleButton } from './inner_components/NoStyleButton'

export default function ImageButton({src, name, width, height, visible, ...props}: {
  src?: any
  name: string
  width: string
  height: string
  visible?: boolean
} & MarginsProps & HTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      {...props}
      title={name}
      $visible={visible}
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
