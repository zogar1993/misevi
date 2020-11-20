import {cssFromProps} from "components/css/inner_helpers"

export enum BorderRadiusKeys {
  "border-radius",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-bottom-left-radius",
  "border-bottom-right-radius"
}

export const border_radius = (props: BorderRadiusProps) => `
    ${cssFromProps(props, Object.keys(BorderRadiusKeys))}
`

export type BorderRadiusProps = {
  [key in keyof typeof BorderRadiusKeys]?: string
}
