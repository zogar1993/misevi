import React from 'react'
import styled from 'styled-components'
import { SKELETON_ANIMATION_CSS } from './css/Skeleton'
import { NoStyleInput } from './inner_components/NoStyleInput'
import theme from './theme/Theme'
import useUniqueId from './uuid/uuid'

export type CheckButtonProps = {
  checked?: boolean
  disabled?: boolean
  onChange?: (value: boolean) => void
  text?: string
}

export default function CheckButton({
  checked,
  disabled,
  onChange,
  text,
  ...props
}: CheckButtonProps) {
  const uuid = useUniqueId()

  const id = text ? `${text}-${uuid}` : uuid
  const loading = checked === undefined

  return (
    <Container disabled={disabled}>
      <Label checked={!!checked} $loading={loading} htmlFor={id}>
        {text}
      </Label>
      <InvisibleCheckboxElement
        {...props}
        id={id}
        type='checkbox'
        checked={!!checked}
        disabled={disabled || loading}
        $loading={loading}
        onChange={(e: any) => {
          onChange?.(!checked)
          e.stopPropagation()
        }}
      />
    </Container>
  )
}

const Container = styled.div<{ disabled?: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ disabled }) => (disabled ? 'opacity: 0.4' : '')};
  ${({ disabled }) => (disabled ? 'cursor: not-allowed' : '')};
`

const InvisibleCheckboxElement = styled(NoStyleInput)<{ $loading?: boolean }>`
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;

  ${({ onChange }) => (onChange === undefined ? 'cursor: default' : '')};
  ${({ disabled }) => (disabled ? 'cursor: not-allowed' : '')};
  ${({ $loading }) => ($loading ? 'cursor: wait' : '')};
`

const Label = styled.label<{ checked: boolean; $loading: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 5px 5px 5px 8px;
  border: 1px solid ${theme.colors.border};
  background-color: ${({ checked }) =>
    checked ? theme.colors.checked.primary : theme.colors.primary};

  font-family: ${theme.fonts.handwritten};
  font-size: 16px;

  width: 100%;
  height: ${theme.sizes.input.height};
  border-radius: ${theme.borders.radius};

  ${({ $loading }) => ($loading ? SKELETON_ANIMATION_CSS : '')};
`
