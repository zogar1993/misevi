import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import { ButtonInfo, ComboBoxItem } from '../components/inner_components/ComboBox'
import Field from 'components/Field'

describe('ComboBox should', () => {
  let screen: RenderResult
  let _options: Array<ComboBoxItem> | undefined
  let _value: string | null | undefined
  let _onChange: (() => void) | undefined
  let _buttons: Array<ButtonInfo> | undefined
  let _unclearable: boolean | undefined

  beforeEach(() => {
    _options = []
    _value = undefined
    _onChange = () => {}
    _buttons = undefined
    _unclearable = undefined
  })

  describe('while a value is set but no onChange handler is set', () => {
    beforeEach(async () => {
      await the_options_are([AN_OPTION])
      await the_value_is(AN_OPTION.code)
      await the_onChange_is(undefined)
      await the_combobox_is_rendered()
    })

    it('hide the clear button', async () => {
      await the_clear_button_should_not_show()
    })
  })

  describe('while a value is set', () => {
    beforeEach(async () => {
      await the_options_are([AN_OPTION])
      await the_value_is(AN_OPTION.code)
      await the_onChange_is(IRRELEVANT_FUNCTION)
      await the_combobox_is_rendered()
    })

    it('display name when its matching value is set', async () => {
      await the_select_should_display(AN_OPTION.name)
    })

    it('be enabled', async () => {
      await the_select_should_be_enabled()
    })

    it('hide the clear button', async () => {
      await the_buttons_should_be_hidden()
    })

    it('show the clear button when cursor enters the select', async () => {
      await the_cursor_enters_the_combobox()

      await the_clear_button_should_be_visible()
    })

    it('hide the clear button when cursor leaves the select', async () => {
      await the_cursor_enters_the_combobox()
      await the_cursor_leaves_the_combobox()

      await the_clear_button_should_be_hidden()
    })
  })

  describe('while null value is set', () => {
    beforeEach(async () => {
      await the_options_are(IRRELEVANT_OPTIONS)
      await the_onChange_is(IRRELEVANT_FUNCTION)
      await the_value_is(null)
      await the_combobox_is_rendered()
    })

    it('be empty', async () => {
      await the_select_should_display('')
    })

    it('be enabled', async () => {
      await the_select_should_be_enabled()
    })

    it('hide the clear button', async () => {
      await the_clear_button_should_be_hidden()
    })

    it('hide the clear button even when mouse enters the select', async () => {
      await the_cursor_enters_the_combobox()

      await the_clear_button_should_be_hidden()
    })
  })

  describe('while undefined value is set', () => {
    beforeEach(async () => {
      await the_options_are(IRRELEVANT_OPTIONS)
      await the_onChange_is(() => {})
      await the_value_is(undefined)
      await the_combobox_is_rendered()
    })

    it('be empty', async () => {
      await the_select_should_display('')
    })

    it('be disabled', async () => {
      await the_select_should_be_disabled()
    })

    it('hide the clear button', async () => {
      await the_clear_button_should_be_hidden()
    })

    it('hide the clear button even when mouse enters the select', async () => {
      await the_cursor_enters_the_combobox()

      await the_clear_button_should_be_hidden()
    })
  })

  describe('while undefined options are set', () => {
    beforeEach(async () => {
      await the_options_are(undefined)
      await the_onChange_is(() => {})
      await the_value_is(IRRELEVANT_VALUE)
      await the_combobox_is_rendered()
    })

    it('be empty', async () => {
      await the_select_should_display('')
    })

    it('be disabled', async () => {
      await the_select_should_be_disabled()
    })

    it('hide the clear button', async () => {
      await the_clear_button_should_be_hidden()
    })

    it('hide the clear button even when mouse enters the select', async () => {
      await the_cursor_enters_the_combobox()

      await the_clear_button_should_be_hidden()
    })
  })

  describe('while empty options are set', () => {
    beforeEach(async () => {
      await the_options_are([])
      await the_onChange_is(() => {})
      await the_value_is(null)
      await the_combobox_is_rendered()
    })

    it('be disabled', async () => {
      await the_select_should_be_disabled()
    })
  })

  describe('while there is a custom button set', () => {
    const aCustomButton = {
      src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
      name: 'do_something',
      onClick: () => {}
    }
    beforeEach(async () => {
      await there_are_custom_buttons([aCustomButton])
      await the_options_are(IRRELEVANT_OPTIONS)
      await the_value_is(IRRELEVANT_OPTIONS[0].code)
      await the_combobox_is_rendered()
    })

    it('show the custom button when combobox is hovered', async () => {
      await the_cursor_enters_the_combobox()
      await the_custom_button_should_be_visible(aCustomButton.name)
    })

    it('hide the custom button when combobox is not hovered', async () => {
      await the_custom_button_should_be_hidden(aCustomButton.name)
    })
  })

  describe('while is unclearable', () => {
    beforeEach(async () => {
      await the_combobox_is_unclearable()
      await the_options_are(IRRELEVANT_OPTIONS)
      await the_value_is(IRRELEVANT_OPTIONS[0].code)
      await the_combobox_is_rendered()
    })

    it('not show the clear button when hovered', async () => {
      await the_cursor_enters_the_combobox()
      await the_clear_button_should_not_show()
    })

    async function the_combobox_is_unclearable() {
      _unclearable = true
    }
  })

  describe('while value is not in options', () => {
    beforeEach(async () => {
      await the_options_are(IRRELEVANT_OPTIONS)
      await the_value_is(AN_OPTION.code)
      await the_combobox_is_rendered()
    })

    it('not show the clear button when hovered', async () => {
      await the_select_should_display(AN_OPTION.code)
    })
  })

  async function the_options_are(options: Array<ComboBoxItem> | undefined) {
    _options = options
  }

  async function the_value_is(value?: string | null) {
    _value = value
  }

  async function the_onChange_is(onChange: (() => void) | undefined) {
    _onChange = onChange
  }

  async function there_are_custom_buttons(buttons: Array<ButtonInfo>) {
    _buttons = buttons
  }

  async function the_combobox_is_rendered() {
    screen = render(
      <Field
        label={A_LABEL}
        type='combobox'
        options={_options}
        value={_value}
        onChange={_onChange}
        buttons={_buttons}
        unclearable={_unclearable}
      />
    )
  }

  async function the_select_should_display(value: string) {
    const select = await getCombobox()
    expect(select).toHaveDisplayValue(value)
  }

  async function the_select_should_be_disabled() {
    const select = await getCombobox()
    expect(select).toBeDisabled()
  }

  async function the_cursor_enters_the_combobox() {
    const container = getComboBoxContainer()
    fireEvent.mouseEnter(container)
  }

  async function the_cursor_leaves_the_combobox() {
    const container = getComboBoxContainer()
    fireEvent.mouseLeave(container)
  }

  async function the_select_should_be_enabled() {
    const select = await getCombobox()
    expect(select).toBeEnabled()
  }

  async function the_custom_button_should_be_hidden(title: string) {
    const button = getButtonOfTitle(title)
    await waitFor(async () => expect(button).not.toBeVisible())
  }

  async function the_custom_button_should_be_visible(title: string) {
    const button = getButtonOfTitle(title)
    await waitFor(async () => expect(button).toBeVisible())
  }

  async function the_clear_button_should_be_hidden() {
    const button = queryClearButton()
    expect(button).not.toBeVisible()
  }

  async function the_clear_button_should_not_show() {
    const button = queryClearButton()
    expect(button).toBeNull()
  }

  async function the_clear_button_should_be_visible() {
    const button = queryClearButton()
    expect(button).toBeVisible()
  }

  async function the_buttons_should_be_hidden() {
    const buttonContainer = await getButtonsContainer()
    expect(buttonContainer).not.toBeVisible()
  }

  const getButtonsContainer = async () => getClearButton().parentElement
  const getComboBoxContainer = () => screen.getByRole('combobox').parentElement!
  const getCombobox = async () => screen.findByRole('combobox')
  const queryClearButton = () => screen.queryByTitle('clear')
  const getClearButton = () => screen.getByTitle('clear')
  const getButtonOfTitle = (title: string) => screen.getByTitle(title)
})

const IRRELEVANT_OPTIONS = [
  { code: 'irrelevant_1', name: 'Irrelevant 1' },
  { code: 'irrelevant_2', name: 'Irrelevant 2' }
]

const IRRELEVANT_VALUE = 'irrelevant'

const IRRELEVANT_FUNCTION = () => {}

const AN_OPTION = {
  code: 'an_option',
  name: 'An Option'
}

const A_LABEL = 'a_label'
