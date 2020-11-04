import React from "react"
import Button, {MARGIN_FOR_SHADOW} from "misevi/button/Button"
import Flex from "web_components/display/Flex"
import {BORDER_RADIUS} from "web_components/constants"

export default function ButtonsGroup(props: Props) {
    const {items, selected, onChange, small, large, bold, font, width, columns} = props
    return (
        <Flex
            x-align={props["x-align"]}
            y-align={props["y-align"]}
            width={width}
            overflow="hidden"
            padding-right={MARGIN_FOR_SHADOW}
            padding-bottom={MARGIN_FOR_SHADOW}
            border-top-right-radius={`calc(${BORDER_RADIUS} + ${MARGIN_FOR_SHADOW} + 1px)`}
            border-bottom-left-radius={`calc(${BORDER_RADIUS} + ${MARGIN_FOR_SHADOW} + 1px)`}
        >
            {
                items.map((item, index) =>
                    <Button
                        key={item.code}
                        onClick={() => onChange(item.code)}
                        active={selected === item.code}
                        width={columns ? `calc((100% - ${MARGIN_FOR_SHADOW}) / ${columns})` : undefined}
                        font={font}
                        has-buttons-top={columns === undefined ? false : index >= columns}
                        has-buttons-right={columns === undefined ? index < items.length - 1 : index % columns !== columns - 1}
                        has-buttons-bottom={columns === undefined ? false : index <= items.length - columns - 1}
                        has-buttons-left={columns === undefined ? index > 0 : index % columns !== 0}
                        z-index={items.length - index}
                        small={small}
                        large={large}
                        bold={bold}
                    >
                        {item.name}
                    </Button>
                )
            }
        </Flex>
    )
}

type Props = {
    items: Array<Item>
    selected: string
    onChange: (code: string) => void

    columns?: number
    "x-align"?: string
    "y-align"?: string
    width?: string

    small?: boolean
    large?: boolean
    bold?: boolean
    italic?: boolean
    font?: string
}

type Item = {
    name: string
    code: string
}