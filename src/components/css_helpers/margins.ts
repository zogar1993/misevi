import {cssFromProps} from './inner_helpers'

export const MARGINS = Object.freeze([
  "margin",
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-left",
])

export const margins = (props: MarginsProps) => `
    ${cssFromProps(props, MARGINS)}
`
export type MarginsProps = {
  margin?: string
  "margin-top"?: string
  "margin-right"?: string
  "margin-bottom"?: string
  "margin-left"?: string
}
