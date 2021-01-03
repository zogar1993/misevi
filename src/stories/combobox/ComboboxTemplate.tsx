import React, {useState} from "react"
import FieldUnboxed, { FieldBaseProps, FieldComboProps} from 'components/Field'

export function Template({ type, ...args }: FieldBaseProps & FieldComboProps) {
  return <Field type="combobox" {...args}/>
}

function Field(props: FieldBaseProps & FieldComboProps) {
  const [value, setValue] = useState(props.value || null)
  return <FieldUnboxed {...props} value={value} onChange={(value: string|null) => setValue(value)}/>
}

export function ComboboxStoryTypes(props: FieldBaseProps & FieldComboProps) {

}

export const items = [{code: "apothecary", name: "Apothecary"},
  {code: "apostle", name: "Apostle"},
  {code: "hexer", name: "Hexer"}]

