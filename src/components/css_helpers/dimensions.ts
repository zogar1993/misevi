import { heights, HeightsProps } from 'components/css_helpers/heights'
import { widths, WidthsProps } from 'components/css_helpers/widths'

export const dimensions = (props: DimensionsProps) => `
    ${widths(props)}
    ${heights(props)}
`

export type DimensionsProps = WidthsProps & HeightsProps
