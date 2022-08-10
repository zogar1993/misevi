import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Dot from './inner_components/Dot'
import DotZero from './inner_components/DotZero'
import { NoStyleInput } from './inner_components/NoStyleInput'
import theme from './theme/Theme'

export interface DotsProps {
  value: number
  total: number
  onChange?: (value: number) => void
  columns?: number
  coloring?: (props: { number: number; value: number }) => string | undefined
  disabled?: boolean
}

export default function Dots({
  total,
  value,
  onChange,
  columns = total,
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

  const onChangeHandler = useCallback((e: any) => onChange?.(Number(e.target.value)), [onChange])

  return (
    <DotsContainer>
      <DotsGroup {...props} columns={columns} role='radiogroup'>
        {values.map((current) => (
          <Dot
            value={current}
            aria-label={current}
            onChange={onChangeHandler}
            checked={value === undefined ? false : current === value}
            color={getColorFor(current)}
            onMouseEnter={() => setTentative(current)}
            onMouseLeave={() => setTentative(null)}
            key={current}
            disabled={disabled}
          />
        ))}
        <DotZero
          value={value}
          tentative={tentative}
          setTentative={setTentative}
          onChange={onChangeHandler}
          disabled={disabled}
        />
      </DotsGroup>
      <AccessibleSpinButton
        value={value || 0}
        min={0}
        max={total}
        onChange={onChangeHandler}
      />
    </DotsContainer>
  )
}

const DotsGroup = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, ${theme.sizes.dot.size});
  gap: ${theme.spacing.separation};
  margin-bottom: 1px;
`

const DotsContainer = styled.div`
  position: relative;
`

const AccessibleSpinButton = styled(NoStyleInput).attrs({
  type: 'number'
})`
  visibility: hidden;
  position: absolute;
`

//TODO P1 make accessible with a spinbutton role and some magic and fix tests on zweb and add for defaults
//TODO P1 remove dist types from build
//TODO P1 label can be 2 lines sometimes?
