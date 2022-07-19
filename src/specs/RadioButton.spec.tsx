import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { anything, instance, mock, reset, verify } from 'ts-mockito'
import RadioButton from '../components/RadioButton'

describe('RadioButton should', () => {
  let actionsMock = mock<{ onChange: (value: any) => void }>()
  let actions = instance(actionsMock)

  beforeEach(() => {
    reset(actionsMock)
  })

  it('be correctly checked', async () => {
    await given_radio_button_render({ checked: true })

    const radio = getRadioButton(RADIO_BUTTON_LABEL)

    expect(radio).toBeChecked()
  })

  it('be correctly not checked', async () => {
    await given_radio_button_render({ checked: false })

    const radio = getRadioButton(RADIO_BUTTON_LABEL)

    expect(radio).not.toBeChecked()
  })

  it('call onChange when it is was not checked and is clicked', async () => {
    await given_radio_button_render({ checked: false })

    const radio = getRadioButton(RADIO_BUTTON_LABEL)
    fireEvent.click(radio)

    verify(actionsMock.onChange(RADIO_BUTTON_VALUE)).once()
  })

  it('not call onChange when it is checked and is clicked', async () => {
    await given_radio_button_render({ checked: true })

    const radio = getRadioButton(RADIO_BUTTON_LABEL)
    fireEvent.click(radio)

    verify(actionsMock.onChange(anything())).never()
  })

  it('is disabled when checked is undefined', async () => {
    await given_radio_button_render({ checked: undefined })

    const radio = getRadioButton(RADIO_BUTTON_LABEL)

    expect(radio).toBeDisabled()
  })

  async function given_radio_button_render(
    { checked }: { checked: boolean | undefined } = { checked: false }
  ) {
    render(
      <RadioButton
        aria-label={RADIO_BUTTON_LABEL}
        value={RADIO_BUTTON_VALUE}
        checked={checked}
        onChange={actions.onChange}
      />
    )
  }

  const getRadioButton = (value: string) =>
    screen.getByRole('radio', { name: value }) as HTMLInputElement
})

const RADIO_BUTTON_LABEL = 'radio_button_label'
const RADIO_BUTTON_VALUE = 'radio_button_value'
