import React from 'react'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import { anyNumber, instance, mock, reset, verify } from 'ts-mockito'
import Field  from 'components/Field'

describe('Text Input should', () => {
  let screen: RenderResult
  let actionsMock = mock<{ onBlur: (value: string) => void, onChange: (value: string) => void }>()
  let actions = instance(actionsMock)

  beforeEach(() => {
    reset(actionsMock)
  })

  it('have value set', async () => {
    await given_a_text_input_with({ value: VALID_VALUE })
    await then_value_should_be(VALID_VALUE)
    await then_on_blur_should_not_have_been_called()
  })

  it('have new value when the user changes the value and looses focus', async () => {
    await given_a_text_input_with({ value: VALID_VALUE })
    await when_user_changes_the_value_to(ANOTHER_VALID_VALUE)
    await when_input_looses_focus()
    await then_value_should_be(ANOTHER_VALID_VALUE)
    await then_on_blur_should_have_been_called_once_with(ANOTHER_VALID_VALUE)
  })

  it('not raise onBlur event when user sets the same value and looses focus', async () => {
    await given_a_text_input_with({ value: VALID_VALUE })
    await when_user_changes_the_value_to(VALID_VALUE)
    await when_input_looses_focus()
    await then_value_should_be(VALID_VALUE)
    await then_on_blur_should_not_have_been_called()
  })

  it('should have its name as a placeholder on its input', async () => {
    const label = 'Profession'
    given_a_text_input_with({label})
    await then_the_input_should_have_a_placeholder_with_text(label)
  })

  it('should have an input of type \'text\' with an associated label', async () => {
    given_a_text_input()
    await then_it_should_have_an_input_of_type_text()
    await then_a_label_should_be_linked_with_the_input()
  })

  it('should have a label with text', async () => {
    const label = 'Profession'
    given_a_text_input_with({label})
    await then_the_label_should_have_a_text_of(label)
  })

  async function when_user_changes_the_value_to(value: string) {
    const input = await getTextbox()
    fireEvent.change(input, { target: { value: value } })
  }

  async function when_input_looses_focus() {
    const input = await getTextbox()
    fireEvent.focusOut(input)
  }

  async function then_value_should_be(value: string) {
    expect(getTextbox()).toHaveValue(value)
  }

  async function then_on_blur_should_not_have_been_called() {
    verify(actionsMock.onBlur(anyNumber())).never()
  }

  async function then_on_blur_should_have_been_called_once_with(value: string) {
    verify(actionsMock.onBlur(value)).once()
  }


  it('should show value as text in the input', async () => {
    const value = 'Baker'
    given_a_text_input_with({value})
    await then_the_input_should_have_a_value_of(value)
  })

  function given_a_text_input_with({
                                     label = A_LABEL,
                                     value = ''
                                   }: { label?: string, value?: string }) {
    screen = render(
      <Field
        label={label}
        value={value}
        onBlur={actions.onBlur}
      />//TODO add onChange
    )
  }
  function given_a_text_input() {
    given_a_text_input_with({})
  }

  async function then_the_input_should_have_a_placeholder_with_text(placeholder: string) {
    const textbox = getTextbox()
    expect(textbox).toHaveAttribute('placeholder', placeholder)
  }

  async function then_a_label_should_be_linked_with_the_input() {
    screen.getByLabelText(A_LABEL)
  }

  async function then_the_label_should_have_a_text_of(text: string) {
    const label = screen.getByText(text)
    expect(label.tagName).toBe("LABEL")
  }

  async function then_the_input_should_have_a_value_of(text: string) {
    const textbox = getTextbox()
    expect(textbox).toHaveValue(text)
  }

  async function then_it_should_have_an_input_of_type_text() {
    const textbox = getTextbox()
    expect(textbox).toHaveAttribute('type', 'text')
  }

  const getTextbox = () => screen.getByRole('textbox') as HTMLInputElement
})

const A_LABEL = 'a_label'
const VALID_VALUE = 'valid_value'
const ANOTHER_VALID_VALUE = 'another_valid_value'
