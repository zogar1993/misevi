import React from 'react'
import styled from 'styled-components'
import { BORDER_RADIUS } from './css/Dimensions'
import Button from './Button'
import theme from './theme/Theme'

export default function Tabs(props: TabsProps) {
  const { items, selected, onChange, columns } = props
  return (
    <Grid columns={columns} role="tablist">
      {
        items.map((item, index) =>
          <ButtonItem
            key={item.code}
            onClick={() => onChange(item.code)}
            active={selected === item.code}
            has-buttons-top={columns === undefined ? false : index >= columns}
            has-buttons-right={columns === undefined ? index < items.length - 1 : index % columns !== columns - 1}
            has-buttons-bottom={columns === undefined ? false : index <= items.length - columns - 1}
            has-buttons-left={columns === undefined ? index > 0 : index % columns !== 0}
            z-index={items.length - index}
            role="tab"
          >
            {item.name}
          </ButtonItem>
        )
      }
    </Grid>
  )
}

export type TabsProps = {
  items: Array<Item>
  selected: string
  onChange: (code: string) => void

  columns?: number
}

type Item = {
  name: string
  code: string
}

const SIDE_PADDING = '8px'
const VERTICAL_PADDING = '4px'
const ACTIVE_BACKGROUND_COLOR = '#EAEAEA'
const NOT_ACTIVE_BACKGROUND_COLOR = 'white'

const backGroundColor = ({ active }: Props) =>
  active ? ACTIVE_BACKGROUND_COLOR : NOT_ACTIVE_BACKGROUND_COLOR

const ButtonItem = styled(Button)<Props>`
  border: 1px solid darkgray;
  min-width: 65px;
  position: relative;

  padding-left: ${SIDE_PADDING};
  padding-right: ${SIDE_PADDING};
  padding-top: calc(${VERTICAL_PADDING} + ${({ active }) => active ? '1px' : '0px'});
  padding-bottom: calc(${VERTICAL_PADDING} - ${({ active }) => active ? '1px' : '0px'});

  background-color: ${backGroundColor};
  color: black;
  font-weight: bold;
  font-family: ${theme.fonts.option};
  text-transform: capitalize;

  border-bottom-style: ${props => props['has-buttons-bottom'] ? 'none' : 'solid'};
  border-right-style: ${props => props['has-buttons-right'] ? 'none' : 'solid'};

  border-top-left-radius: ${props => props['has-buttons-top'] || props['has-buttons-left'] ? 0 : BORDER_RADIUS};
  border-top-right-radius: ${props => props['has-buttons-top'] || props['has-buttons-right'] ? 0 : BORDER_RADIUS};
  border-bottom-left-radius: ${props => props['has-buttons-bottom'] || props['has-buttons-left'] ? 0 : BORDER_RADIUS};
  border-bottom-right-radius: ${props => props['has-buttons-bottom'] || props['has-buttons-right'] ? 0 : BORDER_RADIUS};
`

const Grid = styled.div<{columns?: number}>`
  display: ${({columns}) => columns ? "grid" : "flex" };
  ${({columns}) => columns ? `grid-template-columns: repeat(${columns}, 1fr)` : ""};
`

interface Props {
  active?: boolean
  font?: string

  vertical?: boolean
  role?: string

  'has-buttons-top'?: boolean
  'has-buttons-right'?: boolean
  'has-buttons-bottom'?: boolean
  'has-buttons-left'?: boolean
}
