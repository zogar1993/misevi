import React from "react"
import {fireEvent, render, RenderResult} from "@testing-library/react"
import {anyNumber, instance, mock, reset, verify} from "ts-mockito"
import TextInput from "components/TextInput"

describe("Text Input should", () => {
  let screen: RenderResult
  let actionsMock = mock<{ onBlur: (value: string) => void }>()
  let actions = instance(actionsMock)

  beforeEach(() => {
      reset(actionsMock)
  })

  it("have value set", async () => {
      await given_a_number_input_with({value: VALID_VALUE})
      await then_value_should_be(VALID_VALUE)
      await then_on_blur_should_not_have_been_called()
  })

  it("have new value when the user changes the value and looses focus", async () => {
      await given_a_number_input_with({value: VALID_VALUE})
      await when_user_changes_the_value_to(ANOTHER_VALID_VALUE)
      await when_input_looses_focus()
      await then_value_should_be(ANOTHER_VALID_VALUE)
      await then_on_blur_should_have_been_called_once_with(ANOTHER_VALID_VALUE)
  })

  it("not raise onBlur event when user sets the same value and looses focus", async () => {
      await given_a_number_input_with({value: VALID_VALUE})
      await when_user_changes_the_value_to(VALID_VALUE)
      await when_input_looses_focus()
      await then_value_should_be(VALID_VALUE)
      await then_on_blur_should_not_have_been_called()
  })

  async function given_a_number_input_with({value}: { value?: string }) {
      screen = render(
          <TextInput
              value={value}
              onBlur={actions.onBlur}
          />)
  }

  async function when_user_changes_the_value_to(value: string) {
      const input = await getInput()
      fireEvent.change(input, {target: {value: value}})
  }

  async function when_input_looses_focus() {
      const input = await getInput()
      fireEvent.focusOut(input)
  }

  async function then_value_should_be(value: string) {
    expect(getInput()).toHaveValue(value)
  }

  async function then_on_blur_should_not_have_been_called() {
      verify(actionsMock.onBlur(anyNumber())).never()
  }

  async function then_on_blur_should_have_been_called_once_with(value: string) {
      verify(actionsMock.onBlur(value)).once()
  }

  const getInput = () => screen.getByRole("textbox") as HTMLInputElement
})

const VALID_VALUE = "valid_value"
const ANOTHER_VALID_VALUE = "another_valid_value"
