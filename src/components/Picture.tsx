import React from 'react'
import styled from 'styled-components'
import { dimensions, DimensionsProps } from './css_helpers/dimensions'
import { BORDER_RADIUS } from './css/Dimensions'
import { SKELETON_ANIMATION_CSS } from 'components/css/Skeleton'

export default function Picture({src, ...props}: PictureProps) {
  return <Img {...props} skeleton={src === undefined} src={src || transparentPixel}/>
}

const Img = styled.img<PictureProps & {skeleton: boolean}>`
  cursor: ${({onClick, disabled}) => onClick ? 'pointer' : disabled ? 'not-allowed' : 'default'};
  visibility: ${({hide}) => hide ? 'hidden' : 'visible'};
  filter: ${({disabled}) => disabled ? 'invert(20%)' : ''};
  border-radius: ${({circle}) => circle ? '50%' : BORDER_RADIUS };
  ${({float}) => float ? `float: ${float}` : '' };
  ${({bordered}) => bordered ? `border: 1px lightgray solid` : '' };
  ${({skeleton}) => skeleton ? SKELETON_ANIMATION_CSS : '' };

  ${dimensions};
`

export type PictureProps = {
  hide?: boolean
  disabled?: boolean
  circle?: boolean
  float?: string
  bordered?: boolean
  src?: string
  alt?: string
} & DimensionsProps

const transparentPixel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
