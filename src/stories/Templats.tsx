import React from 'react'
import Button from "components/Button"

export const Template = ({text, ...args}: any) => <Button {...args}>{text}</Button>
