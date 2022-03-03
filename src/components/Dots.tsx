import React, { useCallback, useEffect, useState } from 'react'
import Dot from './inner_components/Dot'
import styled from 'styled-components'
import DotZero from './inner_components/DotZero'
import theme from './theme/Theme'

export interface DotsProps {
  value: number
  total: number
  onChange?: (value: number) => void
  rows?: number
  coloring?: (props: { number: number; value: number }) => string | undefined
  disabled?: boolean
}

export default function Dots({
  total,
  value,
  onChange,
  rows = 1,
  coloring,
  disabled,
  ...props
}: DotsProps) {
  const [tentative, setTentative] = useState<number | null>(null)
  useEffect(() => setTentative(null), [value])
  const values = Array.from({ length: total }, (_, k) => k + 1) as Array<number>

  const getColorFor = useCallback(
    (current: number) => {
      const isMarked = (current: number) => current <= value
      if (tentative !== null) {
        const wouldBeCleared = (current: number) =>
          tentative < value && current > tentative && current <= value
        const wouldBeMarked = (current: number) =>
          tentative > value && current > value && current <= tentative

        if (wouldBeCleared(current)) return theme.colors.dots.to_be_cleared
        if (wouldBeMarked(current)) return theme.colors.dots.to_be_marked
        return isMarked(current) ? theme.colors.secondary : theme.colors.primary
      }

      const color = coloring && coloring({ number: current, value: value })
      if (color) return color

      return isMarked(current) ? theme.colors.secondary : theme.colors.primary
    },
    [value, tentative, coloring]
  )

  const width = Math.ceil(total / rows) * 14 + 'px'
  const height = rows * 14 + 'px'
  return (
    <DotsGroup {...props} width={width} height={height} role='radiogroup'>
      <DotZero
        value={value}
        tentative={tentative}
        setTentative={setTentative}
        onChange={onChange}
        disabled={disabled}
      />
      {values.map((current) => (
        <Dot
          value={current}
          aria-label={current}
          onChange={onChange}
          checked={value === undefined ? undefined : current === value}
          color={getColorFor(current)}
          onMouseEnter={() => setTentative(current)}
          onMouseLeave={() => setTentative(null)}
          key={current}
          disabled={disabled}
        />
      ))}
    </DotsGroup>
  )
}

const DotsGroup = styled.div<{
  width?: string
  height?: string
}>`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  margin-bottom: 1px;
  ${({ height }) => (height ? `height: ${height}` : '')};
  ${({ width }) => (width ? `width: ${width}` : '')};
`

//TODO P1 make accessible with a spinbutton role and some magic
//TODO P1 remove dist types from build
