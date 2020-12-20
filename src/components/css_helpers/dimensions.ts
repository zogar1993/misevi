import {cssFromProps} from "components/css_helpers/inner_helpers"

export enum DimensionKeys {
  width,
  height,
  "min-width",
  "min-height",
  "max-width",
  "max-height",
}

//TODO separate into height and width
export const dimensions = ({
                             "mobile-width": mobileWidth,
                             "mobile-height": mobileHeight,
                             ...props
                           }: DimensionsProps) => `
    ${cssFromProps(props, Object.keys(DimensionKeys))}
    @media (max-width: 768px) {
        ${mobileWidth ? `width: ${mobileWidth};` : ""};
        ${mobileHeight ? `height: ${mobileHeight};` : ""};
    }
`

export type DimensionsProps = CssDimensionsProps & CustomDimensionProps

type CssDimensionsProps = {
  [key in keyof typeof DimensionKeys]?: string
}

type CustomDimensionProps = {
  width?: string
  height?: string
  "min-width"?: string
  "min-height"?: string
  "max-width"?: string
  "max-height"?: string
  "mobile-width"?: string
  "mobile-height"?: string
}
