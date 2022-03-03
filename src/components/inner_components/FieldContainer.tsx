import styled from 'styled-components'

const FieldContainer = styled.div<{ width?: string; area?: string }>`
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  width: ${({ width }) => width || 'auto'};
  height: 45px;
  padding-top: 15px;
`
export default FieldContainer
