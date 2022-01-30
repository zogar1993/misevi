import React, { useCallback, useEffect, useState } from 'react'
import Input from './inner_components/Input'

export default function NumberInput(props: InternalNumberInputProps) {
  const { value, onBlur, min, max, disabled } = props
  const [current, setCurrent] = useState<number | undefined>(
    keepWithinBoundariesOrUndefined(value, min, max)
  )

  const handleOnChange = useCallback((e: any) => {
    setCurrent(Number(e.target.value))
  }, [])

  const handleOnBlur = useCallback(() => {
    if (current === undefined) return
    let bounded = keepWithinBoundaries(current, min, max)
    if (value === bounded) return
    setCurrent(bounded)
    if (onBlur) onBlur(bounded)
  }, [value, min, max, onBlur, current])

  useEffect(() => {
    if (value === undefined) return
    setCurrent(keepWithinBoundaries(value, min, max))
  }, [value, min, max])

  const showSkeleton = value === undefined

  return (
    <Input
      {...props}
      value={current === undefined ? '' : current}
      min={min}
      max={max}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      disabled={disabled || showSkeleton}
      skeleton={showSkeleton}
    />
  )
}

export type NumberInputProps = {
  min?: number
  max?: number
  value?: number
  onBlur?: (value: number) => void
  disabled?: boolean
}

export type InternalNumberInputProps = {
  id?: string
} & NumberInputProps

const keepWithinBoundariesOrUndefined = (value?: number, min?: number, max?: number) => {
  return value === undefined ? undefined : keepWithinBoundaries(value, min, max)
}

const keepWithinBoundaries = (value: number, min?: number, max?: number) => {
  if (typeof min === 'number' && value < min) return min
  if (typeof max === 'number' && value > max) return max
  return value
}
