import React from "react"
import Text, { TextProps } from 'components/Text'

export default function Template({ ...args }: TextProps) {
  return <Text {...args}>{args.children}</Text>
}
