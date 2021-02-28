import { cssFromProps } from './inner_helpers'

export const POSITIONS = Object.freeze([
  'position',
  'top',
  'right',
  'bottom',
  'left'
])

export const positions = (props: PositionsProps) => `
    ${cssFromProps(props, POSITIONS)}
`

export type PositionsProps = {
  position?: string
  top?: string
  right?: string
  bottom?: string
  left?: string
}
