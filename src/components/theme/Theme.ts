import { Color } from './Color'
import { useLayoutEffect } from 'react'
// @ts-ignore
import styleInject from 'style-inject'

const light = {
  colors: {
    text: Color.Black,
    muted: Color.Gray,

    background1: Color.White,
    menu_items2: "lightgrey",
    menu_items: "whitesmoke",
    menu_background: "whitesmoke",
    menu_hover: "lightgrey",
    menu_hover2: "darkgrey",

    primary: Color.Black,
  },
  fonts: {
    handwritten: "Patrick Hand, Times, serif",
    option: "Almendra SC, Times, serif",
    title: "Almendra, Times, serif",
    typewriter: "Life Savers, Times, serif"
  },
}

const themes = { light }

// any theme could have been used, dark was chosen arbitrarily.
const theme = toVarNames(light)

// converts any nested theme object into one with the css variables as the value
function toVarNames<T>(obj: T, prefix = '-'): T {
  const vars: any = {}
  for (const [key, value] of Object.entries(obj)) {
    vars[key] = typeof value === 'object' ? toVarNames(value, `${prefix}-${key}`) : `var(${prefix}-${key})`
  }
  return vars as T
}

// converts the nested theme object into a flat object with `--path-to-value` keys
function toVars(obj: any, prefix = '-') {
  const vars: any = {}
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object') {
      const nestedVars = toVars(value, `${prefix}-${key}`)
      for (const [nestedKey, nestedValue] of Object.entries(nestedVars)) {
        vars[nestedKey] = nestedValue
      }
    } else {
      vars[`${prefix}-${key}`] = value
    }
  }
  return vars
}

type ThemeType = 'light'
const DEFAULT_THEME: ThemeType = 'light'

export function useTheme(theme: string) {
  useLayoutEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])
}

function themeToCssWithoutSelector() {
  return `
    body {
      ${themeToCss(DEFAULT_THEME)}
    }
  `
}

function themeToCssWithSelector(theme: string) {
  return `
    body[data-theme=${theme}] {
      ${themeToCss(theme)}
    }
  `
}

function themeToCss(theme: string) {
  const vars = toVars((themes as any)[theme])
  let result = ''
  for (const [key, value] of Object.entries(vars)) result += `${key}: ${value};\n`
  return result
}

styleInject(
  `
    ${themeToCssWithoutSelector()}
    ${Object.keys(themes)
      .map((theme) => themeToCssWithSelector(theme))
      .join('')}

    body {
      background: ${theme.colors.background1};
    }

    body * {
      font-family: ${theme.fonts.typewriter};
    }
  `
)

export default theme
  /*
  ::-webkit-scrollbar-thumb {
  background: ${theme.colors.border2};
}*/