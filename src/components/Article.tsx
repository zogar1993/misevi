import styled from 'styled-components'
import { SEPARATION } from './css/Dimensions'

const Article = styled.article`
  flex-grow: 1;
  flex-shrink: 1;
  height: 100vh;

  padding: ${SEPARATION};
  padding-top: calc(${SEPARATION} * 2);

  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
`
export default Article
