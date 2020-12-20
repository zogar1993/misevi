import {cssFromProps} from "components/css_helpers/inner_helpers"

export enum MarginsKeys {
  margin,
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-left",
}

export const margins = (props: MarginsProps) => `
    ${cssFromProps(props, Object.keys(MarginsKeys))}
`
export type MarginsProps = {
  margin?: string
  "margin-top"?: string
  "margin-right"?: string
  "margin-bottom"?: string
  "margin-left"?: string
}
