import React, {useState} from "react"
import FieldUnboxed, { FieldBaseProps, FieldComboProps} from 'components/Field'

export function Template({ type, ...args }: FieldBaseProps & FieldComboProps) {
  return <Field type="combobox" {...args}/>
}

function Field(props: FieldBaseProps & FieldComboProps) {
  const [value, setValue] = useState(props.value || null)

  const onChange = (value: string|null) => {
    props.onChange && props.onChange(value)
    setValue(value)
  }

  return <FieldUnboxed {...props} value={value} onChange={onChange}/>
}

export function ComboboxStoryTypes(props: FieldBaseProps & FieldComboProps) {

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

