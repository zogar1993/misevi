import styled from "styled-components"
import {NoStyleInput} from "components/inner_components/NoStyleInput"
import React from "react"

type DotZeroProps = {
  tentative: number | null
  value: number | undefined
  setTentative: (value: number | null) => void
  onChange: undefined | ((value: number) => void)
}

export default function DotZero({ tentative, setTentative, onChange, value }: DotZeroProps) {
  return (
    <DotZeroContainer>
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
    </DotZeroContainer>
  )
}

const DotZeroContainer = styled.div`
  width: 14px;
  height: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  left: -14px;
  position: absolute;
`

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
