import MultiInput, {MultiInputProps} from "components/MultiInput"
import React from "react"

export default function (args: MultiInputProps) {
  return(
    <MultiInput
      {...args}
      components={[
        {type: "combobox", options: () => [{name: "fome", code: "wea"}]},
        {type: "text"}
        ]}
      items={[[ "wea", "xuxa"], ["wea", "raja"]]}
    />
  )
}
