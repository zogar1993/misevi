import {cssFromProps} from "components/css_helpers/inner_helpers"

export enum PositionKeys {
  position,
  top,
  right,
  bottom,
  left,
}

export const positions = (props: PositionsProps) => `
    ${cssFromProps(props, Object.keys(PositionKeys))}
`

export type PositionsProps = {
  position?: string
  top?: string
  right?: string
  bottom?: string
  left?: string
}
