import {cssFromProps} from "components/css/inner_helpers"

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
  [key in keyof typeof MarginsKeys]?: string
}
