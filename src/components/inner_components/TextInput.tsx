import React, {ForwardedRef, forwardRef, useEffect, useState} from "react"
import Input from "components/inner_components/Input"

const TextInput = forwardRef(({id, placeholder, value, onBlur, onChange, ...props}: TextInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const [current, setCurrent] = useState(value)
  useEffect(() => setCurrent(value), [value])

  const handleOnChange = (e: any) => {
    const value = e.target.value
    setCurrent(value)
    if (onChange) onChange(value)
  }
  const handleOnBlur = () => {
    if (current === undefined) return
    if (onBlur === undefined) return
    alert(value !== current)
    if (value !== current)
      onBlur(current)
  }

  const showSkeleton = value === undefined

  return (
    <Input
      id={id}
      value={current || ""}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
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
  onChange?: (value: string) => void
  onFocus?: () => void
  disabled?: boolean
  readOnly?: boolean
}
