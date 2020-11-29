import React from "react"
import Field, { FieldBaseProps, FieldComboProps} from 'components/Field'

export function Template({ type, ...args }: FieldBaseProps & FieldComboProps) {
  return <Field type="combobox" {...args}/>
}

export function ComboboxStoryTypes(props: FieldBaseProps & FieldComboProps) {

}

