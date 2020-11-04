import React, {useEffect, useState} from "react"
import Dot from "src/components/dots/Dot"
import Flex from "src/components/Flex"
import styled from "styled-components"
import Div from "src/components/Div"

export default function Dots({total, value, onChange, reversed, rows, marked = 0}: Props) {

	const [tentative, setTentative] = useState<number | null>(null)
	const [showDotZero, setShowDotZero] = useState(false)
	useEffect(() => setTentative(null), [value])
	const values = Array.from({length: total}, (_, k) => k + 1) as Array<number>

	const thereIsATentative = () => tentative !== null
	const isMarked = (current: number) => current <= value
	const isMarkedWhenTentativeIsLower = (current: number) =>
		tentative!! < value && current > tentative!! && current <= value
	const wouldBeCleared = (current: number) =>
		isMarkedWhenTentativeIsLower(current)
	const wouldBeMarked = (current: number) =>
		tentative!! > value && current > value && current <= tentative!!

	const getColorFor = (current: number) => {
		if (thereIsATentative()) {
			if (wouldBeCleared(current)) return "lightgray"
			if (wouldBeMarked(current)) return "dimgray"
		}
		return isMarked(current) ? "black" : "white"
	}
	const width = (rows ? total / rows : total) * 14 + "px"
	const height = (rows || 1) * 14 + "px"
	return (
		<Div
			position="relative"
			width={width}
			height={height}
			onMouseEnter={() => setShowDotZero(true)}
			onMouseLeave={() => setShowDotZero(false)}
			no-pointer-events={value === undefined}
		>
			<Div
				width="14px"
				height="14px"
				left={reversed ? undefined : "-14px"}
				right={reversed ? "-14px" : undefined}
				bottom={reversed ? "0px" : undefined}
				position="absolute"
				onMouseEnter={() => setShowDotZero(true)}
				onMouseLeave={() => setShowDotZero(false)}
			/>
			<Flex
				position="relative"
				overflow={showDotZero && value !== 0 ? "visible" : "hidden"}
				width="100%"
				height="100%"
				reversed={reversed}
				onMouseEnter={() => setShowDotZero(true)}
				onMouseLeave={() => setShowDotZero(false)}
				wrap
			>
				<DotZero {...{value, reversed, tentative, setTentative, onChange}}/>
				{
					values.map(current =>
						<Dot
							value={current}
							onChange={onChange}
							checked={current === value}
							color={marked > value && marked >= current ? "dodgerblue" : getColorFor(current)}
							onMouseEnter={() => setTentative(current)}
							onMouseLeave={() => setTentative(null)}
							key={current}
						/>
					)
				}
			</Flex>
		</Div>
	)
}

interface Props {
	value: number
	total: number
	onChange?: (value: number) => void
	reversed?: boolean
	rows?: number
	marked?: number
}

const DotZeroElement = styled.input<any>`
		position: absolute;
		${({reversed}) => reversed ? "right: -14px" : "left: -14px"};
		${({reversed}) => reversed ? "bottom: 0px" : ""};
		
    width: 14px;
    height: 14px;
		box-sizing: border-box;
    border: 1px solid black;
    border-radius: 50%;
    opacity: 0.9;
    cursor: pointer;
    
    :hover {
        border: 1px solid darkred;
    }
`

function DotZero({
									 reversed,
									 tentative,
									 setTentative,
									 value,
									 onChange
								 }: {
	reversed?: boolean
	tentative: number | null
	setTentative: (value: number | null) => void
	onChange?: (value: number) => void
	value: number
}) {
	return (
		<>
			<DotZeroElement
				value={0}
				checked={0 === value}
				type="radio"
				onChange={onChange && ((e: any) => {
					onChange(Number(e.target.value))
					setTentative(null)
				})}
				readOnly={onChange === undefined}
				reversed={reversed}
				onMouseEnter={() => setTentative(0)}
				onMouseLeave={() => setTentative(null)}
			/>
			<Flex
				no-pointer-events
				width="14px"
				height="14px"
				left={reversed ? undefined : "-14px"}
				right={reversed ? "-14px" : undefined}
				bottom={reversed ? "0px" : undefined}
				position="absolute"
				x-align="center"
				y-align="center"
			>
				<svg height="6px" viewBox="0 0 329.26933 329" width="6px" xmlns="http://www.w3.org/2000/svg">
					<g fill={tentative === 0 ? "darkred" : "black"}>
						<path
							d="m21.339844 329.398438c-5.460938 0-10.925782-2.089844-15.082032-6.25-8.34375-8.339844-8.34375-21.824219 0-30.164063l286.589844-286.59375c8.339844-8.339844 21.824219-8.339844 30.164063 0 8.34375 8.339844 8.34375 21.824219 0 30.164063l-286.589844 286.59375c-4.183594 4.179687-9.621094 6.25-15.082031 6.25zm0 0"/>
						<path
							d="m307.929688 329.398438c-5.460938 0-10.921876-2.089844-15.082032-6.25l-286.589844-286.59375c-8.34375-8.339844-8.34375-21.824219 0-30.164063 8.339844-8.339844 21.820313-8.339844 30.164063 0l286.589844 286.59375c8.34375 8.339844 8.34375 21.824219 0 30.164063-4.160157 4.179687-9.621094 6.25-15.082031 6.25zm0 0"/>
					</g>
				</svg>
			</Flex>
		</>
	)
}