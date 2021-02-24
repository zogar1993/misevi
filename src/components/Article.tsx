import styled from "styled-components"
import { SEPARATION } from 'components/css/Dimensions'

const Article = styled.article`
  box-sizing: border-box;
  flex-grow: 1;
  flex-shrink: 1;
  height: 100vh;

  padding: ${SEPARATION};
  padding-top: calc(${SEPARATION} * 2);

  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: lightgray;
  }

  ::-webkit-scrollbar-thumb {
    background: darkgrey;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: grey;
  }
`
export default Article
