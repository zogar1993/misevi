import React, {useEffect, useState} from "react"
import Input from "components/inner_components/Input"

export default function TextInput({id, name, value, onBlur, onChange, width, font}: TextInputProps) {
    const [current, setCurrent] = useState(value)
    useEffect(() => setCurrent(value), [value])

    const isEmpty = current === ""
    const handleOnChange = (e: any) => {
        const value = e.target.value
        setCurrent(value)
        if (onChange) onChange(value)
    }
    const handleOnBlur = () => {
        if (current === undefined) return
        if (onBlur === undefined) return
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
            width={width}
            font={isEmpty ? undefined : font}
            disabled={showSkeleton}
            skeleton={showSkeleton}
            placeholder={name}
            hide-placeholder={true}
            autoComplete="off"
        />
    )
}

export type TextInputProps = {
    id?: string
    name?: string
    value?: string
    onBlur?: (value: string) => void
    onChange?: (value: string) => void
    width?: string
    font?: string
}
