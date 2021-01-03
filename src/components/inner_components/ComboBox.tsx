import React, {createRef, useCallback, useEffect, useRef, useState} from "react"
import styled from 'styled-components'
import { BORDER_RADIUS, SEPARATION } from 'components/css/Dimensions'
import Flex from 'components/Flex'
import ImageButton from 'components/ImageButton'
import close from '../icons/close.svg'
import { HANDWRITTEN_FONT } from 'components/css/Fonts'
import TextInput from "components/inner_components/TextInput"
import Input from "components/inner_components/Input"

export default function ComboBox(props: ComboBoxProps) {
  const { value, options, onChange, width, buttons, id } = props
  const [hovering, setHovering] = useState(false)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLInputElement>(null)
  const showSkeleton = value === undefined
  const isNotLoading = value !== undefined
  const [text, setText] = useState('')
  const [visibleOptions, setVisibleOptions] = useState<Array<ComboBoxItem>>([])
  useEffect(() => {
    if (value) {
      const option = options.find(x => x.code === value)
      if (option !== undefined)
        setText(option.name)
    } else
      setText('')
  }, [value])

  useEffect(() => {
    const loweredText = text.toLowerCase()
    const visibleOptions = options
      .filter(x => x.name.toLowerCase().includes(loweredText))
    setVisibleOptions(visibleOptions)
  }, [text, options, value])

  //TODO fix tests for this

  return (
    <ComboBoxContainer $width={width} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      <Input
        id={id}
        ref={ref}
        value={text}
        disabled={showSkeleton}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => {
          const loweredText = text.toLowerCase()
          const option = options.find(x => x.name.toLowerCase() === loweredText)
          if (option && option.code !== value)
            onChange && onChange(option.code)
        }}
        onFocus={() => {
          ref.current?.select()
          setOpen(true)
        }}
        readOnly={onChange === undefined}
        skeleton={showSkeleton}
        type="text"
      />
      <Options open={open && visibleOptions.length > 0} width={width}>
        {showSkeleton ? null :
          visibleOptions.map((item) => (
            <Option
              key={item.code}
              onClick={() => {
                onChange!(item.code)
                setOpen(false)
              }}
            >
              {item.name}
            </Option>
          ))
        }
      </Options>
      <ButtonsContainer
        y-align='center'
        visible={hovering && isNotLoading}
      >
        {buttons === undefined ? null :
          buttons.map((x) => <ComboboxImageButton key={x.name} props={props} {...x} />)
        }
        {onChange === undefined ? null :
          <ImageButton
            src={close}
            name='clear'
            width='12px'
            height='12px'
            onClick={() => {
              onChange(null)
              setOpen(false)
              ref.current?.blur()
            }}
            visible={value !== null}
          />
        }
      </ButtonsContainer>
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

const Options = styled.ul<{open: boolean, width?: string}>`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border-radius: ${BORDER_RADIUS};
  position: absolute;
  top: 30px;
  border: 1px solid lightgray;
  list-style: none;
  background-color: whitesmoke;
  width: ${({width}) => width || '100%'};
  ${({open}) => open ? '' : 'display: none'};
`

const Option = styled.li`
  font-family: ${HANDWRITTEN_FONT}, Times, serif;
  font-size: 13px;
  padding: 3px 5px 3px 8px;
  border-radius: ${BORDER_RADIUS};
  :hover {
    background-color: dodgerblue;
  }
`

const ComboBoxContainer = styled.div<any>`
  display: flex;
  align-items: center;
  position: relative;
  ${({ $width }) => ($width ? `width: ${$width}` : '')};
`

const ButtonsContainer = styled(Flex)`
  position: absolute;
  right: 9px;
`

function ComboboxImageButton({ name, src, onClick, props }: ButtonInfo & { props: ComboBoxProps }) {
  return (
    <ImageButton
      src={src}
      name={name}
      width='18px'
      height='18px'
      onClick={() => onClick(props)}
      margin-right={SEPARATION}
    />
  )
}
