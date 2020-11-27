import {cssFromProps} from "components/css_helpers/inner_helpers"

export enum PaddingsKeys {
  padding,
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-left"
}

export const paddings = (props: PaddingsProps) => `
  box-sizing: border-box;
  ${cssFromProps(props, Object.keys(PaddingsKeys))}
`

export type PaddingsProps = {
  [key in keyof typeof PaddingsKeys]?: string
}
