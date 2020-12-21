import {cssFromProps} from "components/css_helpers/inner_helpers"

export enum PositionsKeys {
  position,
  top,
  right,
  bottom,
  left,
}

export const positions = (props: PositionsProps) => `
    ${cssFromProps(props, Object.keys(PositionsKeys))}
`

export type PositionsProps = {
  position?: string
  top?: string
  right?: string
  bottom?: string
  left?: string
}
