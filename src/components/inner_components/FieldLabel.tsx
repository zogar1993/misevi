import styled from 'styled-components'
import theme from 'components/theme/Theme'

const FieldLabel = styled.label<Props>`
  position: absolute;
  transition-timing-function: ease-in;
  transition: 0.2s;
  font-size: ${props => props['as-placeholder'] ? '16px' : '11px'};
  color: ${props => props['as-placeholder'] ? 'grey' : 'black'};
  font-family: ${theme.fonts.common};
  top: ${props => props['as-placeholder'] ? '21px' : '2px'};
  left: 9px;
  user-select: none;
  z-index: 2;
  ${({ disabled }) => disabled ? 'pointer-events: none' : '2px'};
`
export default FieldLabel

type Props = {
  'as-placeholder'?: boolean
  disabled?: boolean
}
