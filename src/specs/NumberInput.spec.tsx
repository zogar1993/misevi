import React from "react"
import { fireEvent, render, RenderResult } from '@testing-library/react'
import {anyNumber, instance, mock, reset, verify} from "ts-mockito"
import Field from 'components/Field'

describe("Number Field should", () => {
  let screen: RenderResult
    let actionsMock = mock<{ onBlur: (value: number) => void }>()
    let actions = instance(actionsMock)

    beforeEach(() => {
        reset(actionsMock)
    })

    it("have value set when no min or max are set", async () => {
        await given_a_number_input_with({value: VALID_VALUE})
        await then_value_should_be(VALID_VALUE)
        await then_on_blur_should_not_have_been_called()
    })

    it("have value set when between the boundaries of min and max", async () => {
        await given_a_number_input_with({min: MIN, max: MAX, value: VALID_VALUE})
        await then_value_should_be(VALID_VALUE)
        await then_on_blur_should_not_have_been_called()
    })

    it("have min value when value is less than min", async () => {
        await given_a_number_input_with({min: MIN, value: VALUE_BELOW_MIN})
        await then_input_should_have_semantic_min_of(MIN)
        await then_value_should_be(MIN)
        await then_on_blur_should_not_have_been_called()
    })

    it("have max value when value is less than max", async () => {
        await given_a_number_input_with({max: MAX, value: VALUE_ABOVE_MAX})
        await then_input_should_have_semantic_max_of(MAX)
        await then_value_should_be(MAX)
        await then_on_blur_should_not_have_been_called()
    })

    it("have min value when the user lowers the value below the min and looses focus", async () => {
        await given_a_number_input_with({min: MIN, value: VALID_VALUE})
        await when_user_changes_the_value_to(VALUE_BELOW_MIN)
        await when_input_looses_focus()
        await then_value_should_be(MIN)
        await then_on_blur_should_have_been_called_once_with(MIN)
    })

    it("have max value when the user highers the value over the max and looses focus", async () => {
        await given_a_number_input_with({max: MAX, value: VALID_VALUE})
        await when_user_changes_the_value_to(VALUE_ABOVE_MAX)
        await when_input_looses_focus()
        await then_value_should_be(MAX)
        await then_on_blur_should_have_been_called_once_with(MAX)
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

    async function given_a_number_input_with({value, max, min}: { value?: number, min?: number, max?: number }) {
        screen = render(
            <Field
                type="number"
                value={value}
                min={min}
                max={max}
                onBlur={actions.onBlur}
            />)
    }

    async function when_user_changes_the_value_to(value: number) {
        const input = getInput()
        fireEvent.change(input, {target: {value: value}})
    }

    async function when_input_looses_focus() {
        const input = getInput()
        fireEvent.focusOut(input)
    }

    async function then_input_should_have_semantic_min_of(value: number) {
        const input = getInput()
        expect(input.min).toEqual(value.toString())
    }

    async function then_input_should_have_semantic_max_of(value: number) {
        const input = getInput()
        expect(input.max).toEqual(value.toString())
    }

    async function then_value_should_be(value: number) {
        expect(getInput().value).toEqual(value.toString())
    }

    async function then_on_blur_should_not_have_been_called() {
        verify(actionsMock.onBlur(anyNumber())).never()
    }

    async function then_on_blur_should_have_been_called_once_with(value: number) {
        verify(actionsMock.onBlur(value)).once()
    }

    const getInput = () => screen.getByRole("textbox") as HTMLInputElement
})

const MIN = 28
const MAX = 55
const VALID_VALUE = 42
const ANOTHER_VALID_VALUE = 43
const VALUE_ABOVE_MAX = 60
const VALUE_BELOW_MIN = 25
