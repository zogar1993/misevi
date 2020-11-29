import styled from 'styled-components'

export const NoStyleSelect = styled.select`
  appearance: none;
  outline: none;
  box-shadow: none;
  border: none;

  ::-webkit-inner-spin-button{
      -webkit-appearance: none;
      margin: 0;
  }

  ::-webkit-outer-spin-button{
      -webkit-appearance: none;
      margin: 0;
  }
`
