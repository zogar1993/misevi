import React from 'react'
import styled from 'styled-components'
import { BORDER_RADIUS, SEPARATION } from './css/Dimensions'
import Flex from './Flex'

export default function TagInput({ name, values, onAdd, onDelete }: Props) {
  //{values.map(x => <Tag><Centerer>{x}</Centerer></Tag>)}
  return (
    <Flex>
      <Label>{name}:</Label>
    </Flex>
  )
}

type Props = {
  name: string
  values: Array<string>
  onAdd?: (value: string) => void
  onDelete?: (value: string) => void
}

const Label = styled.label`
  height: 18px;
  font-size: 16px;
  color: black;
`

const Tag = styled.span`
  font-size: 12px;
  height: 16px;
  border: 1px solid lightgray;
  border-radius: ${BORDER_RADIUS};
  padding: 3px 5px 3px 5px;
  margin-left: ${SEPARATION};
`

