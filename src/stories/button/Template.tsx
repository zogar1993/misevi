import Button, {ButtonProps} from "components/Button"
import React from "react"

export default function ({text, ...args}: ButtonProps & { text: string }) {
  return <Button {...args}>{text}</Button>
}
