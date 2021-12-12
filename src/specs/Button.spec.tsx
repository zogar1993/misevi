import React from "react"
import {render, RenderResult} from "@testing-library/react"
import Button from "components/Button"
import userEvents from "@testing-library/user-event"
import {anything, instance, mock, reset, verify} from "ts-mockito"

const {click} = userEvents

describe("Button should", () => {
  let screen: RenderResult
  let actionsMock = mock<{ onClick: (e: any) => void }>()
  let actions = instance(actionsMock)

  beforeEach(() => {
    reset(actionsMock)
  })

  it("call onClick when clicked", async () => {
    await given_a_button_is_rendered()
    await when_the_button_is_clicked()
    await then_onClick_is_called()
  })

  async function given_a_button_is_rendered() {
    screen = render(<Button onClick={actions.onClick}>{TEXT}</Button>)
  }

  async function when_the_button_is_clicked() {
    click(getButton())
  }

  async function then_onClick_is_called() {
    verify(actionsMock.onClick(anything())).once()
  }

  const getButton = () => screen.getByRole("button", {name: TEXT})
})

const TEXT = "Text"
