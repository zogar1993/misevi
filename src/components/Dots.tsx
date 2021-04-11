import React, { useCallback, useEffect, useState } from 'react'
import Dot from './inner_components/Dot'
import Flex from './Flex'
import styled from 'styled-components'
import Div from './inner_components/Div'
import { NoStyleInput } from './inner_components/NoStyleInput'

export default function Dots({ total, value, onChange, reversed, rows = 1, coloring }: DotsProps) {
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

  const width = (total / rows) * 14 + 'px'
  const height = rows * 14 + 'px'
  return (
    <Div
      position="relative"
      width={width}
      height={height}
      no-pointer-events={value === undefined}
    >
      <DotZero
        value={value}
        tentative={tentative}
        setTentative={setTentative}
        onChange={onChange}
        reversed={reversed}
      />
      <Flex
        position="relative"
        width="100%"
        height="100%"
        reversed={reversed}
        wrap
        margin-bottom="1px"
      >
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
      </Flex>
    </Div>
  )
}

export interface DotsProps {
  value: number
  total: number
  onChange?: (value: number) => void
  reversed?: boolean
  rows?: number
  coloring?: (props: { number: number, value: number }) => string
}

const DotZeroElement = styled(NoStyleInput)<{ visible: boolean }>`
  width: 14px;
  height: 14px;
  border: 1px ${({ visible }) => visible ? 'solid' : 'hidden'} black;
  ${({ disabled }) => disabled ? 'display: none;' : ''}
  border-radius: 50%;
  cursor: pointer;

  :hover {
    border: 1px solid darkred;
  }
`

const Svg = styled.svg.attrs(_ => ({
  height: '6px',
  width: '6px',
  viewBox: '0 0 329.26933 329',
  xmlns: 'http://www.w3.org/2000/svg'
}))<{ visible: boolean }>`
  ${({ visible }) => visible ? '' : 'visibility: hidden;'};
  pointer-events: none;
  position: absolute;
`

function IconX({ tentative }: { tentative: number | null }) {
  return (
    <Svg visible={tentative !== null}>
      <g fill={tentative === 0 ? 'darkred' : 'black'}>
        <path
          d="m21.339844 329.398438c-5.460938 0-10.925782-2.089844-15.082032-6.25-8.34375-8.339844-8.34375-21.824219 0-30.164063l286.589844-286.59375c8.339844-8.339844 21.824219-8.339844 30.164063 0 8.34375 8.339844 8.34375 21.824219 0 30.164063l-286.589844 286.59375c-4.183594 4.179687-9.621094 6.25-15.082031 6.25zm0 0" />
        <path
          d="m307.929688 329.398438c-5.460938 0-10.921876-2.089844-15.082032-6.25l-286.589844-286.59375c-8.34375-8.339844-8.34375-21.824219 0-30.164063 8.339844-8.339844 21.820313-8.339844 30.164063 0l286.589844 286.59375c8.34375 8.339844 8.34375 21.824219 0 30.164063-4.160157 4.179687-9.621094 6.25-15.082031 6.25zm0 0" />
      </g>
    </Svg>
  )
}

type DotZeroProps = {
  reversed: boolean | undefined
  tentative: number | null
  value: number | undefined
  setTentative: (value: number | null) => void
  onChange: undefined | ((value: number) => void)
}

function DotZero({ reversed, tentative, setTentative, onChange, value }: DotZeroProps) {
  return (
    <Flex
      width="14px"
      height="14px"
      left={reversed ? undefined : '-14px'}
      right={reversed ? '-14px' : undefined}
      bottom={reversed ? '0px' : undefined}
      position="absolute"
      x-align="center"
      y-align="center"
    >
      <IconX tentative={tentative} />
      <DotZeroElement
        value={0}
        checked={0 === value}
        type="radio"
        onChange={onChange && ((e: any) => {
          onChange(Number(e.target.value))
          setTentative(null)
        })}
        disabled={onChange === undefined}
        onMouseEnter={() => setTentative(0)}
        onMouseLeave={() => setTentative(null)}
        visible={tentative !== null}
      />
    </Flex>
  )
}
