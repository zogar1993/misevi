import React, { useCallback, useEffect, useState } from 'react'
import Dot from './inner_components/Dot'
import styled from 'styled-components'
import DotZero from "./inner_components/DotZero"

export interface DotsProps {
  value: number
  total: number
  onChange?: (value: number) => void
  rows?: number
  coloring?: (props: { number: number, value: number }) => string | undefined
}

export default function Dots({ total, value, onChange, rows = 1, coloring }: DotsProps) {
  const [tentative, setTentative] = useState<number | null>(null)
  useEffect(() => setTentative(null), [value])
  const values = Array.from({ length: total }, (_, k) => k + 1) as Array<number>

  const getColorFor = useCallback((current: number) => {
    const isMarked = (current: number) => current <= value
    if (tentative !== null) {
      const wouldBeCleared = (current: number) =>
        tentative < value && current > tentative && current <= value
      const wouldBeMarked = (current: number) =>
        tentative > value && current > value && current <= tentative

      if (wouldBeCleared(current)) return 'lightgray'
      if (wouldBeMarked(current)) return 'dimgray'
      return isMarked(current) ? 'black' : 'white'
    }

    const color = coloring && coloring({ number: current, value: value })
    if (color) return color

    return isMarked(current) ? 'black' : 'white'
  }, [value, tentative, coloring])

  const width = Math.ceil(total / rows) * 14 + 'px'
  const height = rows * 14 + 'px'
  return (
    <DotsContainer
      width={width}
      height={height}
      no-pointer-events={value === undefined}
    >
      <DotZero
        value={value}
        tentative={tentative}
        setTentative={setTentative}
        onChange={onChange}
      />
      {
        values.map(current =>
          <Dot
            value={current}
            onChange={onChange}
            checked={current === value}
            color={getColorFor(current)}
            onMouseEnter={() => setTentative(current)}
            onMouseLeave={() => setTentative(null)}
            key={current}
          />
        )
      }
    </DotsContainer>
  )
}

const DotsContainer = styled.div<{ 'no-pointer-events'?: boolean, width?: string, height?: string }>`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  margin-bottom: 1px;
  ${props => props['no-pointer-events'] ? 'pointer-events: none' : ''};
  ${({height}) => height ? `height: ${height}` : ''};
  ${({width}) => width ? `width: ${width}` : ''};
`
