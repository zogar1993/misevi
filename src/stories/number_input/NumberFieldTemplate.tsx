import React from "react"
import Field, { FieldNumberProps } from 'components/Field'

export default function Template({ type, ...args }: FieldNumberProps) {
  return <Field type="number" {...args}/>
}

export function NumberFieldStoryTypes(props: FieldNumberProps) {

}
