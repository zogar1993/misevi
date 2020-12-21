export const cssFromProps = (props: any, attributes: readonly string[]) => {
  return attributes.filter(key => props[key]).map(key => `${key}: ${props[key]};`).join("\n")
}
