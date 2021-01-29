import {cssFromProps} from './inner_helpers'

export const WIDTHS = Object.freeze([
  "width",
  "min-width",
  "max-width",
])

export const widths = ({
                             "mobile-width": mobileWidth,
                             ...props
                           }: WidthsProps) => `
    ${cssFromProps(props, WIDTHS)}
    @media (max-width: 768px) {
        ${mobileWidth ? `width: ${mobileWidth};` : ""};
    }
`

export type WidthsProps = {
  width?: string
  "min-width"?: string
  "max-width"?: string
  "mobile-width"?: string
}
