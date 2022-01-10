import React from 'react'
import { screen, render, within, fireEvent, waitFor } from '@testing-library/react'
import Dots from '../components/Dots'

describe('Dots should', () => {
  beforeEach(() => {})

  it('have value set', async () => {
    render(<Dots total={5} value={2} aria-label='radiogroup label' />)
    const group = screen.getByRole('radiogroup', { name: 'radiogroup label' })
    const selected = within(group).getByRole('radio', { name: '2' })
    const otherRadios = within(group)
      .getAllByRole('radio')
      .filter((x) => x !== selected) as Array<HTMLInputElement>
    fireEvent.click(otherRadios[0])
    // expect(group).toHaveValue('3')
    await waitFor(() => expect(otherRadios[0].checked).toBeChecked())
    //otherRadios.forEach((radio) => expect(radio).not.toBeChecked())
  })

  const getDots = () => screen.getByRole('textbox') as HTMLInputElement
})
