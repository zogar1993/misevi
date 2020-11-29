import styled from 'styled-components'

export const NoStyleSelect = styled.select`
  box-sizing: border-box;
  appearance: none;
  outline: none;
  box-shadow: none;
  border: 0;
  margin: 0;
  padding: 0;
  line-height: 20px;
  overflow: visible;

  ::-webkit-inner-spin-button{
      -webkit-appearance: none;
      margin: 0;
  }

  ::-webkit-outer-spin-button{
      -webkit-appearance: none;
      margin: 0;
  }
`
