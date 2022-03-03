import styled from 'styled-components'
import React, { HTMLAttributes } from 'react'
import { NoStyleButton } from './inner_components/NoStyleButton'

export default function ImageButton({
  src,
  name,
  width,
  height,
  visible,
  ...props
}: {
  src: any
  name: string
  width: string
  height: string
  visible?: boolean
} & HTMLAttributes<HTMLButtonElement>) {
  return (
    <Button {...props} title={name} $visible={visible}>
      <Img src={src} alt={name} width={width} height={height} />
    </Button>
  )
}

const Img = styled.img<{ width: string; height: string }>`
  :hover {
    transform: scale(1.2);
  }
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`
const Button = styled(NoStyleButton)<{ $visible?: boolean }>`
  ${({ $visible }) => ($visible === false ? 'display: none' : '')};
`
