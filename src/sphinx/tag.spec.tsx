import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { queryChildOf } from 'sphinx/Sphinx'

describe('search by tag', () => {
  const EXPECTED_TEXT = 'text a'
  const GARBAGE_TEXT = 'text b'

  it('retrieves only the selected tag', async () => {
    const html = render(
      <>
        <span>{EXPECTED_TEXT}</span>
        <label>{GARBAGE_TEXT}</label>
      </>
    ).baseElement

    const element = queryChildOf(html, { tag: 'span' })

    expect(element).toHaveTextContent(EXPECTED_TEXT)
  })
})
