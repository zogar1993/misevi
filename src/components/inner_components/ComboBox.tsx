import React, {useCallback, useState} from "react"
import styled from "styled-components"
import {BORDER_RADIUS, SEPARATION} from "components/css/Dimensions"
import {SKELETON_ANIMATION_INFO} from "components/css/Skeleton"
import Flex from "components/Flex"
import ImageButton from "components/ImageButton"
import close from "../icons/close.svg"

export default function ComboBox(props: ComboBoxProps) {
	const {value, options, onChange, width, font, buttons} = props
	const [hovering, setHovering] = useState(false)
	const onMouseEnter = useCallback(() => setHovering(true), [])
	const onMouseLeave = useCallback(() => setHovering(false), [])
	const showSkeleton = value === undefined
	const isNotLoading = value !== undefined

	return (
		<ComboBoxContainer
			$width={width}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<Select
				value={value || ""}
				onChange={onChange && ((e: any) => onChange(e.target.value))}
				font={font}
				disabled={showSkeleton}
				skeleton={showSkeleton}
			>
				<Option disabled hidden value={""}/>
				{showSkeleton ? null :
					options.map(item =>
						<Option key={item.code} value={item.code} font={font}>
							{item.name}
						</Option>
					)
				}
			</Select>
			<Flex
        style={{position: "absolute", right: "9px"}}
				y-align="center"

				visible={hovering && isNotLoading}
			>
				{buttons === undefined ? null :
					buttons.map((x) =>
						<ComboboxImageButton
							key={x.name}
							props={props}
							{...x}
						/>)
				}
				{onChange === undefined ? null :
					<ImageButton
						src={close}
						name="clear"
						width="12px"
						height="12px"
						onClick={() => onChange(null)}
						visible={value !== null}
					/>
				}
			</Flex>
		</ComboBoxContainer>
	)
}

export type ComboBoxProps = {
	id?: string
	value: string | null | undefined
	options: Array<ComboBoxItem>
	onChange?: (value: string | null) => void
	buttons?: Array<ButtonInfo>
	width?: string
	font?: string
}

export type ButtonInfo = {
	name: string
	src: string
	onClick: (props: ComboBoxProps) => void
}

export type ComboBoxItem = {
	name: string
	code: string
	from?: number
	to?: number
}

const Select = styled.select<any>`
    font-family: ${({font}) => font ? `${font}, ` : ""}Times, serif;
    font-size: 16px;
    background-color: whitesmoke;
    padding: 5px 5px 5px 8px;
    border-radius: ${BORDER_RADIUS};
    border: 1px solid lightgrey;
    width: 100%;
    height: 30px;

    :hover {
        border: 1px solid dodgerblue;
    }

    ${props => props.skeleton ? SKELETON_ANIMATION_INFO : ""};
    :disabled {
        background-color: whitesmoke;
        border: 1px solid transparent;
    }
`

const Option = styled.option<any>`
    font-family: ${({font}) => font ? `${font}, ` : ""}Times, serif;
    font-size: 16px;
    background-color: whitesmoke;
    padding: 5px 5px 5px 8px;
    border-radius: ${BORDER_RADIUS};
    border: 1px solid lightgray;
    width: ${props => props.width || "100%"};
`

const ComboBoxContainer = styled.div<any>`
	display: flex;
	align-items: center;
	position: relative;
	${({$width}) => $width ? `width: ${$width}` : ""};
`

function ComboboxImageButton({name, src, onClick, props}:
															 ButtonInfo & { props: ComboBoxProps }) {
	return (
		<ImageButton
			src={src}
			name={name}
			width="18px"
			height="18px"
			onClick={() => onClick(props)}
			margin-right={SEPARATION}
		/>
	)
}
