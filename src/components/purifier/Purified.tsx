import styled, {StyledComponent} from "styled-components"
import React from "react"
import {FlexProps} from "../Flex"

const ignored: Array<string> = ['wrap', 'x-align', 'y-align', 'width', 'height', 'overflow']

const removeHtmlProperties = <W extends object>(
  Element: StyledComponent<any | React.ComponentType<any>, any, W>, ignored: Array<string>
) => (({ ...props }: W & React.HTMLAttributes<HTMLElement>) => {
  const args = props as any
  ignored.forEach((name: any) => delete args[name])
  return <Element {...args}>{args.children}</Element>
})

const Div = styled.div``
const PurifiedDiv = styled(removeHtmlProperties<FlexProps>(Div, ignored))``

export const purified = {div: PurifiedDiv}
