import React  from 'react'
import ComboBox, { ComboBoxItem } from 'components/inner_components/ComboBox'
import TextInput from 'components/inner_components/TextInput'
import Flex from 'components/Flex'

export type MultiInputProps = {
  components: Array<MultiInputComboBox | {type: "text"}>,
  items: Array<Array<string>>
}

export type MultiInputComboBox = {
  type: "combobox", options: Array<ComboBoxItem> | (() => Array<ComboBoxItem>)
}

export default function MultiInput({components, items}: MultiInputProps) {
  const values = items.map((x, i) => <MultiInputRow key={i} item={x} components={components}/>)
  const empty = <MultiInputRow components={components} item={[]}/>
  return (
    <Flex gap vertical>
      {[...values, empty]}
    </Flex>
  )
}

function MultiInputRow({ components, item }: {components: Array<MultiInputComboBox | {type: "text"}>, item: Array<string|null>}){
  return (
    <Flex gap>
      {components.map((x, i) => <Component component={x} item={item[i] || null} key={i}/>)}
    </Flex>
  )
}

function Component({ component, item }: {component: MultiInputComboBox | {type: "text"}, item: string|null}){
  if (component.type === "combobox") {
    const opt = component.options
    const options = Array.isArray(opt) ? opt :opt()
    return <ComboBox value={item} options={options} />
  }

  if (component.type === "text") {
    return <TextInput value={item || ""}/>
  }

  return null
}
