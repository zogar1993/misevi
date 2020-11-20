import React from "react"
import Field, {FieldBaseProps, FieldProps, FieldTextProps} from "components/Field"

export function Template(args: FieldProps) {
  return <Field {...args}/>
}

export function TextFieldStoryTypes(props: FieldBaseProps & FieldTextProps) {

}

