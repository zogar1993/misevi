import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Flex, {FlexProps} from "src/components/Flex"
import styled from "styled-components"

export default {
  title: 'Form/Flex',
  component: Flex,
} as Meta;

const Template: Story<FlexProps> = ({...args}) => <Container><Flex  {...args}><Squares amount={5}/></Flex></Container>;

export const Default = Template.bind({});
Default.args = {
  width: "220px",
  height: "220px",
  wrap: true
};

export const XAlignCenter = Template.bind({});
XAlignCenter.args = {
  "x-align": "center",
  width: "220px",
  height: "220px",
  wrap: true
};

export const XAlignRight = Template.bind({});
XAlignRight.args = {
  "x-align": "right",
  width: "220px",
  height: "220px",
  wrap: true
};

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

function Squares({amount}: {amount: number}) {
  return (
    <>
      {Array.from(Array(amount).keys()).map(x => <Square key={x}/>)}
    </>
  )
}
