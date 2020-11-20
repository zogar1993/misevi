import Flex, {FlexProps} from "components/Flex"
import styled from "styled-components"
import React from "react"


export const FlexDistilled = (props: FlexProps) => <Flex {...props}/>

export default function FlexTemplate({...args}: FlexProps) {
  return (
    <Container>
      <Flex {...{width: '220px', height: '220px', wrap: true, ...args}}>
        <Squares amount={5}/>
      </Flex>
    </Container>
  )
}

const Square = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 30px;
	font-weight: bold;

  background-color: greenyellow;
  box-sizing: border-box;
  width: auto;
  height: auto;
  min-height: 60px;
  min-width: 60px;
  border-radius: 10px;
  border-width: 5px;
  border-color: blueviolet;
  border-style: solid;
`

const Container = styled.div`
	display: block;
  box-sizing: border-box;
  //border-radius: 10px;
  background-color: coral;
  width: 220px;
  height: 220px;
  border-width: 1px;
  border-color: black;
  border-style: solid;
`

function Squares({amount}: {amount: number}) {
  return (
    <>
      {Array.from(Array(amount).keys()).map(x => <Square key={x}>{x + 1}</Square>)}
    </>
  )
}