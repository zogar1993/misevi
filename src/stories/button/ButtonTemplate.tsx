import Button, {ButtonProps} from "components/Button"
import React from "react"

export default function Template({...args}: ButtonProps) {
  return <Button {...args}>{args.children}</Button>
}
