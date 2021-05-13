import styled from 'styled-components'
import { dimensions, DimensionsProps } from './css_helpers/dimensions'
import { SKELETON_ANIMATION_CSS } from './css/Skeleton'
import React from 'react'
import { margins, MarginsProps } from './css_helpers/margins'
import { BORDER_RADIUS, SEPARATION } from './css/Dimensions'
import {purified} from "./purifier/Purified"

const Flex = styled(purified.div)`
  display: flex;
  ${props => props['no-pointer-events'] ? 'pointer-events: none' : ''};
  ${({ delimited }) => delimited ? 'border: 1px solid lightgray' : ''};
  ${({ delimited }) => delimited ? `border-radius: ${BORDER_RADIUS}` : ''};
  ${({ area }) => area ? `grid-area: ${area}` : ''};

  overflow: ${({ overflow }) => overflow || 'visible'};
  flex-direction: ${({ vertical }) => vertical ? 'column' : 'row'};
  ${({ wrap }) => wrap ? 'flex-wrap: wrap' : ''};
  justify-content: ${({ vertical, ...props }) => align(props[vertical ? 'y-align' : 'x-align'])};
  align-content: ${({ vertical, ...props }) => align(props[vertical ? 'x-align' : 'y-align'])};
  align-items: ${({ vertical, ...props }) => align(props[vertical ? 'x-align' : 'y-align'])};
  ${({ gap }) => gap ? `gap: ${SEPARATION}` : ''};
  ${({ padded }) => padded ? `padding: ${SEPARATION}` : ''};

  ${({ skeleton }) => skeleton ? 'border-width: 0' : ''};
  ${({ skeleton }) => skeleton ? `border-radius: ${BORDER_RADIUS}` : ''};
  ${({ skeleton }) => skeleton ? SKELETON_ANIMATION_CSS : ''};

  ${dimensions};
  ${margins};
`

export default Flex

const align = (value: string | undefined) => {
  if (value === 'space-between') return 'space-between'
  if (value === 'space-evenly') return 'space-evenly'
  if (value === 'space-around') return 'space-around'

  if (value === 'top') return 'flex-start'
  if (value === 'left') return 'flex-start'
  if (value === 'center') return 'center'
  if (value === 'stretch') return 'stretch'
  if (value === 'right') return 'flex-end'
  if (value === 'bottom') return 'flex-end'

  return 'flex-start'
}

export type FlexProps = FlexPropsBase & DimensionsProps & MarginsProps
export type FlexPropsBase = {
  'y-align'?: YAlignType
  'x-align'?: XAlignType
  wrap?: boolean
  gap?: boolean
  padded?: boolean
  vertical?: boolean
  overflow?: string
  skeleton?: boolean
  'no-pointer-events'?: boolean
  area?: string
  delimited?: boolean
}

type Spaced = 'space-between' | 'space-evenly' | 'space-around'
export type YAlignType = 'top' | 'center' | 'stretch' | 'bottom' | Spaced
export type XAlignType = 'left' | 'center' | 'stretch' | 'right' | Spaced
