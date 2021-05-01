import { useTheme, toVarsCss, toVarNames } from 'components/theme/Theme'

describe('useTheme should', () => {
  const THEME = 'dark'

  it('set theme on body data attribute', async () => {
    when_set_theme(THEME)
    then_theme_is_on_body_data_attribute(THEME)
  })

  function when_set_theme(theme: string) {
    useTheme(theme)
  }

  function then_theme_is_on_body_data_attribute(theme: string) {
    expect(document.body.getAttribute('data-theme')).toBe(theme)
  }
})

describe('toVarNames should', () => {
  it('parse a shallow theme', async () => {
    const names = toVarNames(SHALLOW_THEME)

    expect(names.first).toEqual('var(--first)')
    expect(names.second).toEqual('var(--second)')
    expect(names.third).toEqual('var(--third)')
  })

  it('parse a deep theme', async () => {
    const names = toVarNames(DEEP_THEME)

    expect(names.first.second.third).toEqual('var(--first-second-third)')
  })
})

describe('toVarsCss should', () => {
  it('parse a shallow theme', async () => {
    const css = toVarsCss(SHALLOW_THEME)

    expect(css).toEqual(
      `--first: ${SHALLOW_THEME.first};\n--second: ${SHALLOW_THEME.second};\n--third: ${SHALLOW_THEME.third};`
    )
  })

  it('parse a deep theme', async () => {
    const css = toVarsCss(DEEP_THEME)
    expect(css).toEqual(`--first-second-third: ${DEEP_THEME.first.second.third};`)
  })
})

const SHALLOW_THEME = {
  first: 'Urd',
  second: 'Verdandi',
  third: 'Skuld'
}

const DEEP_THEME = { first: { second: { third: 'Mimir' } } }
