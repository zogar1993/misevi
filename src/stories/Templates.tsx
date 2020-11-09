import React from 'react'
import Button, {ButtonProps} from 'src/components/Button'
import Flex, {FlexProps} from 'src/components/Flex'
import styled from 'styled-components'
import NumberInput, {NumberInputProps} from 'src/components/NumberInput'

export const ButtonTemplate = ({text, ...args}: ButtonProps & { text: string }) =>
    <Button {...args}>{text}</Button>

export const NumberInputTemplate = (args: NumberInputProps) => <NumberInput {...args}/>

export const FlexTemplate = ({...args}: FlexProps) =>
    <Container>
        <Flex {...{width: '220px', height: '220px', wrap: true, ...args}}>
            <Squares amount={5}/>
        </Flex>
    </Container>

const Square = styled.div`
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

const Container = styled<any>(Flex)`
  box-sizing: border-box;
  //border-radius: 10px;
  background-color: coral;
  width: 220px;
  height: 220px;  
  border-width: 1px;
  border-color: black;
  border-style: solid;
`

function Squares({amount}: { amount: number }) {
    return (
        <>
            {Array.from(Array(amount).keys()).map(x => <Square key={x}/>)}
        </>
    )
}