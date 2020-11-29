import React from "react"
import NumberInput, {NumberInputProps} from "components/NumberInput"

export default function CircularNumberInput(props: NumberInputProps) {
    return (
        <NumberInput
            {...props}
            text-align="center"
            width="26px"
            height="26px"
            border-radius="50px"
            padding-left="0px"
            padding-right="0px"
        />
    )
}
