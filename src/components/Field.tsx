import React, {useCallback, useEffect, useState} from "react"
import FieldLabel from "./inner_components/FieldLabel"
import FieldContainer from "./inner_components/FieldContainer"
import NumberInput from "./NumberInput"
import TextInput from "./inner_components/TextInput"
import ComboBox, {ButtonInfo, ComboBoxItem} from "./inner_components/ComboBox"

export default function Field(props: FieldProps) {
  const {label, width, value} = props
	const [isPlaceholder, setIsPlaceholder] = useState<boolean>(false)
  const onTextChange = useCallback((focus: boolean, text: string) => {
    setIsPlaceholder(!focus && text.trim() === '')
  }, [])
	useEffect(() => {
		setIsPlaceholder(value === "" || value === null)
	}, [value])
	const id = props.id || label
	return (
		<FieldContainer width={width}>
			<FieldLabel as-placeholder={isPlaceholder} htmlFor={id}>{label}</FieldLabel>
			{
				props.type === "number" ?
					<NumberInput
						id={id}
						value={props.value}
						onBlur={props.onBlur}
						min={props.min}
						max={props.max}
					/>
					: props.type === "combobox" ?
					<ComboBox
						id={id}
						value={props.value}
						options={props.options}
						onChange={props.onChange}
            onFocusChange={onTextChange}
						buttons={props.buttons}
					/>
					:
					<TextInput
						id={id}
						placeholder={label}
						value={props.value}
						onBlur={props.onBlur}
						onFocusChange={onTextChange}
					/>
			}
		</FieldContainer>
	)
}

export type FieldProps = FieldTextProps | FieldNumberProps | FieldComboProps

type FieldBaseProps = {
  id?: string
  label: string
  width?: string
}

export type FieldTextProps = {
  type?: "text"
  value?: string
  onBlur?: (value: string) => void
} & FieldBaseProps

export type FieldNumberProps = {
  type: "number"
  value?: number
  onBlur?: (value: number) => void
  min?: number
  max?: number
} & FieldBaseProps

export type FieldComboProps = {
  type: "combobox"
  value?: string | null
  options: Array<ComboBoxItem>
  onChange?: (value: string | null) => void
  buttons?: Array<ButtonInfo>
} & FieldBaseProps
