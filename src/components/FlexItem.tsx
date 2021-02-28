import styled from 'styled-components'

const FlexItem = styled.div<Props>`
  height: ${({ height }) => height || 'auto'};
  flex-grow: ${({ grow }) => grow || 0};
  flex-shrink: ${({ shrink }) => shrink || 0};
`
export default FlexItem
type Props = {
  height?: string
  grow?: number
  shrink?: number
}
