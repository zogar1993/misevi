import {cssFromProps} from './inner_helpers'

export const HEIGHTS = Object.freeze([
  "height",
  "min-height",
  "max-height",
])

export const heights = ({
                             "mobile-height": mobileHeight,
                             ...props
                           }: HeightsProps) => `
    ${cssFromProps(props, HEIGHTS)}
    @media (max-width: 768px) {
        ${mobileHeight ? `height: ${mobileHeight};` : ""};
    }
`

export type HeightsProps = {
  height?: string
  "min-height"?: string
  "max-height"?: string
  "mobile-height"?: string
}
