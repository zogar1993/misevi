import { cssFromProps } from './inner_helpers'

export const PADDINGS = Object.freeze([
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left'
])

export const paddings = (props: PaddingsProps) => `
  box-sizing: border-box;
  ${cssFromProps(props, PADDINGS)}
`

export type PaddingsProps = {
  padding?: string
  'padding-top'?: string
  'padding-right'?: string
  'padding-bottom'?: string
  'padding-left'?: string
}
