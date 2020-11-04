export const cssFromProps = (props: any, attributes: Array<string>) => {
    return attributes.filter(key => props[key]).map(key => `${key}: ${props[key]};`).join("\n")
}