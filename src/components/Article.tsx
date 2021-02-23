import styled from "styled-components"
import {SEPARATION} from "web_components/constants"

const Article = styled.article`
  box-sizing: border-box;
  width: 100%;
  height: 100%;

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