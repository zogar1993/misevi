import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { queryChildOf } from 'sphinx/Sphinx'

describe('search by title', () => {
  const EXPECTED_TEXT = 'text a'
  const USELESS_TEXT = 'text b'
  const EXPECTED_TITLE = 'title a'
  const USELESS_TITLE = 'title b'

  it('retrieves only the selected tag', async () => {
    const html = render(
      <>
        <div>{USELESS_TEXT}</div>
        <div title={USELESS_TITLE}>{USELESS_TEXT}</div>
        <div title={EXPECTED_TITLE}>{EXPECTED_TEXT}</div>
      </>
    ).baseElement

    const element = queryChildOf(html, { title: EXPECTED_TITLE })

    expect(element).toHaveTextContent(EXPECTED_TEXT)
  })
})
