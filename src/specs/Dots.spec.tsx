import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import { instance, mock, reset, verify } from "ts-mockito";
import Dots from '../components/Dots'

describe('Dots should', () => {
  let actionsMock = mock<{ onChange: (value: number) => void }>()
  let actions = instance(actionsMock)

  beforeEach(() => {
    reset(actionsMock)
  })

  it('have value set', async () => {
    await given_dots_render({ value: 2 })

    const selected = getDot(2)

    expect(selected).toBeChecked()
  })

  it('call onChange with value when a dot is clicked ', async () => {
    await given_dots_render()

    const selected = getDot(2)
    fireEvent.click(selected)

    verify(actionsMock.onChange(2)).once()
  })

  it('call onChange with value when the x is clicked ', async () => {
    await given_dots_render({value: 2})

    const selected = getDot(0)
    fireEvent.click(selected)

    verify(actionsMock.onChange(0)).once()
  })

  async function given_dots_render({ value }: { value?: number } = {}) {
    render(<Dots total={5} value={value || 0} onChange={actions.onChange} />)
  }

  const getDot = (value: number) =>
    screen.getByRole('radio', { name: value.toString() }) as HTMLInputElement
})
