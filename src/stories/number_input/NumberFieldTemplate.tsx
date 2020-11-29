import React from "react"
import Field, { FieldBaseProps, FieldNumberProps } from 'components/Field'

export default function Template({ type, ...args }: FieldBaseProps & FieldNumberProps) {
  return <Field type="number" {...args}/>
}

export function NumberFieldStoryTypes(props: FieldBaseProps & FieldNumberProps) {

}
