import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { anything, instance, mock, reset, verify } from 'ts-mockito'
import CheckButton from '../components/CheckButton'
import RadioButton from '../components/RadioButton'

describe('CheckButton should', () => {
  let actionsMock = mock<{ onChange: (value: any) => void }>()
  let actions = instance(actionsMock)

  beforeEach(() => {
    reset(actionsMock)
  })

  it('be correctly checked', async () => {
    await given_check_button_render({ checked: true, text: BUTTON_TEXT })

    const radio = getCheckButton(BUTTON_TEXT)

    expect(radio).toBeChecked()
  })

  it('be correctly not checked', async () => {
    await given_check_button_render({ checked: false, text: BUTTON_TEXT })

    const radio = getCheckButton(BUTTON_TEXT)

    expect(radio).not.toBeChecked()
  })

  it('call onChange with true when it was not checked and is clicked', async () => {
    await given_check_button_render({ checked: false, text: BUTTON_TEXT })

    const radio = getCheckButton(BUTTON_TEXT)
    fireEvent.click(radio)

    verify(actionsMock.onChange(true)).once()
  })

  it('call onChange with false when it was checked and is clicked', async () => {
    await given_check_button_render({ checked: true, text: BUTTON_TEXT })

    const radio = getCheckButton(BUTTON_TEXT)
    fireEvent.click(radio)

    verify(actionsMock.onChange(false)).once()
  })

  it('is disabled when checked is undefined', async () => {
    await given_check_button_render({ checked: undefined, text: BUTTON_TEXT })

    const radio = getCheckButton(BUTTON_TEXT)

    expect(radio).toBeDisabled()
  })

  async function given_check_button_render(
    { checked, text }: { checked?: boolean; text?: string } = { checked: false }
  ) {
    render(<CheckButton checked={checked} onChange={actions.onChange} text={text} />)
  }

  const getCheckButton = (name: string) =>
    screen.getByRole('checkbox', { name }) as HTMLInputElement
})

const BUTTON_TEXT = 'radio_button_label'
