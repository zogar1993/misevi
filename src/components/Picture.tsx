import React from 'react'
import styled from 'styled-components'
import { dimensions, DimensionsProps } from './css_helpers/dimensions'
import { positions, PositionsProps } from './css_helpers/positions'
import { BORDER_RADIUS } from './css/Dimensions'
import { SKELETON_ANIMATION_CSS } from 'components/css/Skeleton'

export default function Picture(props: PictureProps) {
  return props.src ? <Img {...props}/> : <SkeletonDiv {...props}/>
}

const Img = styled.img<PictureProps>`
  cursor: ${({onClick, disabled}) => onClick ? 'pointer' : disabled ? 'not-allowed' : 'default'};
  visibility: ${({hide}) => hide ? 'hidden' : 'visible'};
  filter: ${({disabled}) => disabled ? 'invert(20%)' : ''};
  border-radius: ${({circle}) => circle ? '50%' : BORDER_RADIUS };
  ${({float}) => float ? `float: ${float}` : '' };
  ${({bordered}) => bordered ? `border: 1px lightgray solid` : '' };

  ${dimensions};
  ${positions};
`

const SkeletonDiv = styled.div<PictureProps>`
  border-radius: ${BORDER_RADIUS};
  ${({float}) => float ? `float: ${float}` : '' };
  ${SKELETON_ANIMATION_CSS}
  ${dimensions};
`

//TODO check if null or undefined or true or false is a valid value instead of ''
//TODO check if img can be set artificially to preserve semantic meaning
export type PictureProps = {
  hide?: boolean
  disabled?: boolean
  circle?: boolean
  float?: string
  bordered?: boolean
  src?: string
  alt?: string
} & DimensionsProps & PositionsProps
