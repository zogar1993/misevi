import React, {useState} from "react"
import FieldUnboxed, { FieldComboProps} from 'components/Field'

export function Template({ type, ...args }: FieldComboProps) {
  return <Field type="combobox" {...args}/>
}

function Field(props: FieldComboProps) {
  const [value, setValue] = useState(props.value)

  const onChange = (value: string|null) => {
    props.onChange && props.onChange(value)
    setValue(value)
  }

  return <FieldUnboxed {...props} value={value} onChange={onChange}/>
}

export function ComboboxStoryTypes(props: FieldComboProps) {

}

export const items = [
  {code: "apothecary", name: "Apothecary"},
  {code: "apostle", name: "Apostle"},
  {code: "hexer", name: "Hexer"}
]

export const long_items = [
  {code: "apothecary", name: "Apothecary"},
  {code: "apostle", name: "Apostle"},
  {code: "hexer", name: "Hexer"},
  {code: "satire", name: "Satire"},
  {code: "seer", name: "Seer"},
  {code: "trapper", name: "Trapper"},
  {code: "zoroastrian", name: "Zoroastrian"}
]

