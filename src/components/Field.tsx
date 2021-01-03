import React, {useCallback, useEffect, useState} from "react"
import FieldLabel from "components/inner_components/FieldLabel"
import FieldContainer from "components/inner_components/FieldContainer"
import NumberInput from "components/NumberInput"
import TextInput from "components/inner_components/TextInput"
import ComboBox, {ButtonInfo, ComboBoxItem} from "components/inner_components/ComboBox"

export default function Field(props: FieldProps) {
  const {label, width, value} = props
	const [isPlaceholder, setIsPlaceholder] = useState<boolean>(false)
  const onChange = useCallback((value: string) => {
    setIsPlaceholder(value === "" || value === null)
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
						buttons={props.buttons}
					/>
					:
					<TextInput
						id={id}
						placeholder={label}
						value={props.value}
						onBlur={props.onBlur}
						onChange={onChange}
					/>
			}
		</FieldContainer>
	)
}

export type FieldProps = FieldBaseProps & (FieldTextProps | FieldNumberProps | FieldComboProps)

export type FieldBaseProps = {
  id?: string
  label: string
  width?: string
}

export type FieldTextProps = {
  type?: "text"
  value?: string
  onBlur?: (value: string | null) => void
}

export type FieldNumberProps = {
  type: "number"
  value?: number
  onBlur?: (value: number) => void
  min?: number
  max?: number
}

export type FieldComboProps = {
  type: "combobox"
  value: string | null | undefined
  options: Array<ComboBoxItem>
  onChange?: (value: string | null) => void
  buttons?: Array<ButtonInfo>
}
