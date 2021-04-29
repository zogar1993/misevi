import styled, { StyledComponent } from 'styled-components'
import { DIMENSIONS, dimensions, DimensionsProps } from './css_helpers/dimensions'
import { SKELETON_ANIMATION_CSS } from './css/Skeleton'
import React from 'react'
import { POSITIONS, positions, PositionsProps } from './css_helpers/positions'
import { margins, MARGINS, MarginsProps } from './css_helpers/margins'
import { BORDER_RADIUS, SEPARATION } from './css/Dimensions'

const ignored: Array<string> = ['wrap', 'x-align', 'y-align']

const removeHtmlProperties = <W extends object>(
  Element: StyledComponent<any | React.ComponentType<any>, any, W>, ignored: Array<string>
) => (({ ...props }: W & React.HTMLAttributes<HTMLElement>) => {
  const args = props as any
  ignored.forEach((name: any) => delete args[name])
  DIMENSIONS.forEach((name: string) => delete args[name])
  MARGINS.forEach((name: string) => delete args[name])
  POSITIONS.forEach((name: string) => delete args[name])
  return <Element {...args}>{args.children}</Element>
})

//TODO apply black magic to other components.
//TODO add reversed logic
const Div = styled.div``
const Flex = styled(removeHtmlProperties<FlexProps>(Div, ignored))<FlexProps>`
  display: flex;
  ${props => props['no-pointer-events'] ? 'pointer-events: none' : ''};
  ${({ visible }) => visible === false ? 'visibility: hidden' : ''};
  ${({ delimited }) => delimited ? 'border: 1px solid lightgray' : ''};
  ${({ delimited }) => delimited ? `border-radius: ${BORDER_RADIUS}` : ''};
  ${({ area }) => area ? `grid-area: ${area}` : ''};

  overflow: ${({ overflow }) => overflow || 'visible'};
  flex-direction: ${({ vertical, reversed }) => `${vertical ? 'column' : 'row'}${reversed ? '-reverse' : ''}`};
  ${({ wrap }) => wrap ? 'flex-wrap: wrap' : ''};
  justify-content: ${({ vertical, ...props }) => align(props[vertical ? 'y-align' : 'x-align'])};
  align-content: ${({ vertical, ...props }) => align(props[vertical ? 'x-align' : 'y-align'])};
  align-items: ${({ vertical, ...props }) => align(props[vertical ? 'x-align' : 'y-align'])};
  ${({ gap }) => gap ? `gap: ${SEPARATION}` : ''};
  ${({ padded }) => padded ? `padding: ${SEPARATION}` : ''};

  ${({ skeleton }) => skeleton ? 'border-width: 0' : ''};
  ${({ skeleton }) => skeleton ? 'background-color: whitesmoke' : ''};
  ${({ skeleton }) => skeleton ? SKELETON_ANIMATION_CSS : ''};

  ${dimensions};
  ${margins};
  ${positions};
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

export type FlexProps = FlexPropsBase & DimensionsProps & MarginsProps & PositionsProps
export type FlexPropsBase = {
  'y-align'?: YAlignType
  'x-align'?: XAlignType
  reversed?: boolean
  wrap?: boolean
  gap?: boolean
  padded?: boolean
  vertical?: boolean
  overflow?: string
  skeleton?: boolean
  visible?: boolean
  'no-pointer-events'?: boolean
  area?: string
  delimited?: boolean
}

type Spaced = 'space-between' | 'space-evenly' | 'space-around'
export type YAlignType = 'top' | 'center' | 'stretch' | 'bottom' | Spaced
export type XAlignType = 'left' | 'center' | 'stretch' | 'right' | Spaced
