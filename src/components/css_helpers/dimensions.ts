import { heights, HEIGHTS, HeightsProps } from 'components/css_helpers/heights'
import { widths, WIDTHS, WidthsProps } from 'components/css_helpers/widths'

export const DIMENSIONS = Object.freeze([...WIDTHS, ...HEIGHTS])

export const dimensions = (props: DimensionsProps) => `
    ${widths(props)}
    ${heights(props)}
`

export type DimensionsProps = WidthsProps & HeightsProps
