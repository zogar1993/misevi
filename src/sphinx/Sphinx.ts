export function queryChildrenOf(element: Element, options: Options): Array<Element> {
  let text = options.text
  if (text) text = text.toLowerCase()
  const { tag, label, heading } = options

  const querySelector = getQuerySelector(options)
  let result = childrenOf(element, querySelector)
  if (text) result = result.filter((x) => text === (x.textContent || '').trim().toLowerCase())
  if (label)
    result = result.filter((x) => {
      const labelElement = queryChildOf(element, { tag: 'label', text: label })
      if (labelElement === null) throw Error(`Could not find a label with text '${label}'`)
      return x.getAttribute('id') === labelElement.getAttribute('for')
    })
  if (heading)
    result = result.filter((x) => {
      const headingElement = queryChildOf(x, { tag: 'h1, h2, h3, h4, h5, h6', text: heading })
      if (headingElement === null) return false
      return queryAncestorOf(headingElement, { tag: tag }) === x
    })
  return result
}

export function getChildrenOf(element: Element, options: Options): Array<Element> {
  const result = queryChildrenOf(element, options)
  if (result.length === 0)
    throw Error(`Could not find any element for selection '${JSON.stringify(options)}'`)
  return result
}

export function queryAncestorOf(element: Element, options: Options): Element | null {
  while (element.parentElement !== null) {
    element = element.parentElement
    if (element.tagName.toLowerCase() === options.tag) return element
  }
  return null
}

export function getAncestorOf(element: Element, options: Options): Element {
  const result = queryAncestorOf(element, options)
  if (result === null)
    throw Error(`Could not find any ancestor '${JSON.stringify(options)}' for selected element`)
  return result
}

export async function findChildrenOf(element: Element, options: Options): Promise<Array<Element>> {
  for (let i = 0; i < 10; i++) {
    const result = queryChildrenOf(element, options)
    if (result.length > 0) return result
    await sleep(10)
  }
  throw Error(`Could not find any element for selection '${JSON.stringify(options)}'`)
}

export async function findChildOf(element: Element, options: Options): Promise<Element> {
  return (await findChildrenOf(element, options))[0]
}

export function getChildOf(element: Element, options: Options): Element {
  const result = queryChildOf(element, options)
  if (result === null) throw Error(`No elements found for '${JSON.stringify(options)}'`)
  return result
}

export function queryChildOf(element: Element, options: Options): Element | null {
  const result = queryChildrenOf(element, options)
  if (result.length === 1) return result[0]
  if (result.length === 0) return null
  throw Error(`More than one element found for '${JSON.stringify(options)}'`)
}

function childrenOf(element: Element, querySelector: string): Array<Element> {
  return Array.from(element.querySelectorAll(`${querySelector}`))
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function getQuerySelector({ tag, title }: Options) {
  return `${tag || ''}${title ? `[title="${title}"]` : ''}`
}

export function waitFor(getValue: () => Promise<any>) {
  return {
    toEqual: async (value: any) => {
      for (let i = 0; i < 10; i++) {
        if ((await getValue()) === value) return
        await sleep(10)
      }
      throw Error(`Expected '${value}', received '${await getValue()}'`)
    }
  }
}

type Options = {
  tag?: string
  text?: string
  label?: string
  heading?: string
  title?: string
}
