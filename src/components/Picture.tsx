import React from 'react'
import styled from 'styled-components'
import { dimensions, DimensionsProps } from './css_helpers/dimensions'
import { SKELETON_ANIMATION_CSS } from 'components/css/Skeleton'
import transparent from './icons/transparent-pixel.png'
import theme from './theme/Theme'

export default function Picture({ src, ...props }: PictureProps) {
  return <Img {...props} skeleton={src === undefined} src={src || transparent} />
}

const Img = styled.img<PictureProps & { skeleton: boolean }>`
  cursor: ${({ onClick, disabled }) =>
    onClick ? 'pointer' : disabled ? 'not-allowed' : 'default'};
  visibility: ${({ hide }) => (hide ? 'hidden' : 'visible')};
  filter: ${({ disabled }) => (disabled ? 'invert(20%)' : '')};
  border-radius: ${({ circle }) => (circle ? '50%' : theme.borders.radius)};
  ${({ float }) => (float ? `float: ${float}` : '')};
  ${({ bordered }) => (bordered ? `border: 1px lightgray solid` : '')}; //TODO apply theme
  ${({ skeleton }) => (skeleton ? SKELETON_ANIMATION_CSS : '')};

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
