import {cssFromProps} from "css_helpers/inner_helpers"

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
    [key in keyof typeof PositionKeys]?: string
}
