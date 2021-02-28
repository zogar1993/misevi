import React, {ForwardedRef, forwardRef, useEffect, useState} from "react"
import Input from "./Input"

const TextInput = forwardRef(({id, placeholder, value, onBlur, onFocusChange, ...props}: InternalTextInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const [text, setText] = useState(value || '')
  useEffect(() => setText(value || ''), [value])

  const handleOnChange = (e: any) => {
    const value = e.target.value
    setText(value)
  }
  const handleOnBlur = () => {
    if (text === undefined) return
    if (onBlur === undefined) return
    if (value !== text)
      onBlur(text)
    onFocusChange(false, text)
  }

  const showSkeleton = value === undefined

  return (
    <Input
      id={id}
      value={text || ""}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      onFocus={() => onFocusChange(true, text)}
      type="text"
      disabled={showSkeleton}
      skeleton={showSkeleton}
      placeholder={placeholder}
      hide-placeholder={true}
      ref={ref}
      {...props}
    />
  )
})
export default TextInput

export type TextInputProps = {
  id?: string
  placeholder?: string
  value?: string
  onBlur?: (value: string) => void
  onFocus?: () => void
  disabled?: boolean
  readOnly?: boolean
}

export type InternalTextInputProps = {
  onFocusChange: (focus: boolean, text: string) => void
} & TextInputProps
