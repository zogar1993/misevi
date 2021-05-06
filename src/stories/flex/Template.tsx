import UnboxedFlex, {FlexProps} from "components/Flex"
import styled from "styled-components"
import React from "react"


export const FlexDistilled = (props: FlexProps) => <Flex {...props}/>

//TODO add flex storybook showing borders
export default function FlexTemplate({width, height, ...args}: FlexProps) {
  return (
    <Flex {...{width: width || "220px", height: height || "220px", wrap: true, ...args}}>
      <Squares amount={5}/>
    </Flex>
  )
}

const Square = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 30px;
	font-weight: bold;

  background-color: greenyellow;
  width: auto;
  height: auto;
  min-height: 60px;
  min-width: 60px;
  border-radius: 10px;
  border-width: 5px;
  border-color: blueviolet;
  border-style: solid;
`

function Flex(props: FlexProps) {
  return <FlexElement {...props}/>
}

const FlexElement = styled(UnboxedFlex)`
  background-color: coral;
  border-width: 1px;
  border-color: black;
  border-style: solid;
`

function Squares({amount}: { amount: number }) {
  return (
    <>
      {Array.from(Array(amount).keys()).map(x => <Square key={x}>{x + 1}</Square>)}
    </>
  )
}
