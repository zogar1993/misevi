import React, {useCallback, useEffect, useState} from 'react'
import Input, {InputProps} from 'src/components/Input'

export default function NumberInput(props: NumberInputProps) {
    const {value, onBlur, min, max, disabled} = props
    const [current, setCurrent] = useState<number>()

    const handleOnChange = useCallback((e: any) => {
        setCurrent(Number(e.target.value))
    }, [])

    const handleOnBlur = useCallback(() => {
        if (current === undefined) return
        let newValue = keepWithinBoundaries(current, min, max)
        if (value !== newValue) {
            setCurrent(newValue)
            if (onBlur) onBlur(newValue)
        }
    }, [value, min, max, onBlur, current])

    useEffect(() => {
        if (value === undefined) return
        setCurrent(keepWithinBoundaries(value, min, max))
    }, [value, min, max])

    const showSkeleton = value === undefined

    return (
        <Input
            {...props}
            value={current || ''}
            min={min}
            max={max}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            type="number"
            disabled={disabled || showSkeleton}
            skeleton={showSkeleton}
        />
    )
}

export interface NumberInputProps extends InputProps {
    id?: string
    min?: number
    max?: number
    value?: number
    onBlur?: (value: number) => void
    disabled?: boolean
}

export const keepWithinBoundaries = (value: number, min?: number, max?: number) => {
    if (min && value < min) return min
    if (max && value > max) return max
    return value
}
