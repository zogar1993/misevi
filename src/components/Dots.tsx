import React, { useCallback, useEffect, useState } from 'react'
import Dot from './inner_components/Dot'
import styled from 'styled-components'
import DotZero from './inner_components/DotZero'
import { NoStyleInput } from './inner_components/NoStyleInput'
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
    <DotsContainer width={width} height={height}>
      <AccessibleSpinButton value={value} min={0} max={total} />
      <DotsGroup {...props} role='radiogroup'>
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
            checked={value === undefined ? false : current === value}
            color={getColorFor(current)}
            onMouseEnter={() => setTentative(current)}
            onMouseLeave={() => setTentative(null)}
            key={current}
            disabled={disabled}
          />
        ))}
      </DotsGroup>
    </DotsContainer>
  )
}

const DotsGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1px;
`

const DotsContainer = styled.div<{
  width?: string
  height?: string
}>`
  position: relative;
  ${({ height }) => (height ? `height: ${height}` : '')};
  ${({ width }) => (width ? `width: ${width}` : '')};
`

const AccessibleSpinButton = styled(NoStyleInput).attrs({
  type: 'number'
})`
  visibility: hidden;
`

//TODO P1 make accessible with a spinbutton role and some magic and fix tests on zweb and add for defaults
//TODO P1 remove dist types from build
//TODO P1 label can be 2 lines sometimes?
//TODO P1 themes need to be exported
