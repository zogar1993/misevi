import React, { useCallback, useEffect, useState } from 'react'
import Dot from './inner_components/Dot'
import Flex from './Flex'
import styled from 'styled-components'
import Div from './inner_components/Div'
import { NoStyleInput } from './inner_components/NoStyleInput'

export default function Dots({ total, value, onChange, reversed, rows, advances = 0 }: DotsProps) {
  const [tentative, setTentative] = useState<number | null>(null)
  useEffect(() => setTentative(null), [value])
  const values = Array.from({ length: total }, (_, k) => k + 1) as Array<number>

  const thereIsATentative = useCallback(() => tentative !== null, [tentative])
  const isMarked = useCallback((current: number) => current <= value, [value])
  const isAdvance = useCallback((current: number) => current <= advances, [advances])
  const isMarkedWhenTentativeIsLower = useCallback((current: number) =>
    tentative!! < value && current > tentative!! && current <= value
    , [tentative, value])
  const wouldBeCleared = useCallback((current: number) =>
      isMarkedWhenTentativeIsLower(current)
    , [isMarkedWhenTentativeIsLower])
  const wouldBeMarked = useCallback((current: number) =>
    tentative!! > value && current > value && current <= tentative!!
    , [tentative, value])

  const getColorFor = useCallback((current: number) => {
    if (thereIsATentative()) {
      if (wouldBeCleared(current)) return 'lightgray'
      if (wouldBeMarked(current)) return 'dimgray'
    }

    if (isAdvance(current))
      return isMarked(current) ? 'black' : 'palegreen'
    return isMarked(current) ? 'darkred' : 'white'
  }, [thereIsATentative, wouldBeCleared, wouldBeMarked, isMarked])

  const width = (rows ? total / rows : total) * 14 + 'px'
  const height = (rows || 1) * 14 + 'px'
  return (
    <Div
      position="relative"
      width={width}
      height={height}
      no-pointer-events={value === undefined}
    >
      <Div
        width="14px"
        height="14px"
        left={reversed ? undefined : '-14px'}
        right={reversed ? '-14px' : undefined}
        bottom={reversed ? '0px' : undefined}
        position="absolute"
      >
        <IconX tentative={tentative} />
        <DotZero
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
      </Div>
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
  advances?: number
}

const DotZero = styled(NoStyleInput)<{visible: boolean}>`
  width: 14px;
  height: 14px;
  border: 1px ${({ visible }) => visible ? "solid" : "hidden"} black;
  ${({ disabled }) => disabled ? "display: none;" : ""}
  border-radius: 50%;
  cursor: pointer;

  :hover {
    border: 1px solid darkred;
  }
`

function IconX({ tentative }: { tentative: number | null }) {
  return (
    <Flex
      visible={tentative !== null}
      no-pointer-events
      width="14px"
      height="14px"
      position="absolute"
      x-align="center"
      y-align="center"
    >
      <svg height="6px" viewBox="0 0 329.26933 329" width="6px" xmlns="http://www.w3.org/2000/svg">
        <g fill={tentative === 0 ? 'darkred' : 'black'}>
          <path
            d="m21.339844 329.398438c-5.460938 0-10.925782-2.089844-15.082032-6.25-8.34375-8.339844-8.34375-21.824219 0-30.164063l286.589844-286.59375c8.339844-8.339844 21.824219-8.339844 30.164063 0 8.34375 8.339844 8.34375 21.824219 0 30.164063l-286.589844 286.59375c-4.183594 4.179687-9.621094 6.25-15.082031 6.25zm0 0" />
          <path
            d="m307.929688 329.398438c-5.460938 0-10.921876-2.089844-15.082032-6.25l-286.589844-286.59375c-8.34375-8.339844-8.34375-21.824219 0-30.164063 8.339844-8.339844 21.820313-8.339844 30.164063 0l286.589844 286.59375c8.34375 8.339844 8.34375 21.824219 0 30.164063-4.160157 4.179687-9.621094 6.25-15.082031 6.25zm0 0" />
        </g>
      </svg>
    </Flex>
  )
}
