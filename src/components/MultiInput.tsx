import React, { useCallback } from 'react'
import ComboBox, { ComboBoxItem, ComboBoxProps } from 'components/inner_components/ComboBox'
import TextInput from 'components/inner_components/TextInput'
import Flex from 'components/Flex'

export type MultiInputProps<T extends string> = {
  components: Array<MultiInputComboBox | {type: "text"}>,
  items: Array<Record<T, string>>
  onChange: (items: Array<Record<T, string> | {T: string}>) => void
}

type MultiInputComboBox = Omit<ComboBoxProps, "options"> & {
  options: Array<ComboBoxItem> | (() => Array<ComboBoxItem>),
  type: "combobox"
}

export default function MultiInput<T extends string>({components, items, ...props}: MultiInputProps<T>) {
  const onChange = useCallback((i: number, [key, value]: [T, string]) => {
    /*const result = items[i]
    if (result === undefined) props.onChange([...items, { [key]: value }])
    if (record[2])
    const results = [...items]*/
  }, [items, props.onChange])
  const values = items.map((x, i) => <MultiInputRow key={i} item={x} components={components}/>)
  const empty = <MultiInputRow components={components} item={{}}/>
  return (
    <Flex gap vertical>
      {[...values, empty]}
    </Flex>
  )
}

function MultiInputRow({ components, item }: {components: Array<MultiInputComboBox | {type: "text"}>, item: Record<string, string|null>}){
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


