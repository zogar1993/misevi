import React, {ReactNode, useState} from "react"
import styled from "styled-components"
import {useHistory} from "react-router-dom"
import {NoStyleButton} from "components/inner_components/NoStyleButton"
import theme from "components/theme/Theme"

const FOOTER_HEIGHT = "0px"
const OUTER_Z_INDEX = 1

export type MainProps = {
  logo: any
  screens: Array<RouterItem>
}

export default function Main({screens, ...props}: MainProps) {
  const menu = screens.filter(x => isMenuItem(x)) as Array<MenuItem>
  return <SideBar {...props} menu={menu} expanded={true}/>
}

type SideBarProps = {
  logo: any
  menu: Array<MenuItem>
}

function SideBar({
                   expanded = true,
                   logo,
                   menu
                 }: SideBarProps & { expanded: boolean }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const pathParts = location.href.split("/").map((x) => x.split("?")[0])

  return (
    <SideBarElement expanded={expanded}>
      <SideBarOverflowHider>
        <Logo src={logo} alt='logo' open={expanded}/>
        <ItemsContainer>
          {menu.map((item) => (
            <Item key={item.name} {...{item, expanded, openMenu, setOpenMenu, pathParts}} />
          ))}
        </ItemsContainer>
      </SideBarOverflowHider>
    </SideBarElement>
  )
}

function Item({item, expanded, openMenu, setOpenMenu, pathParts}: ItemsProps) {
  const history = useHistory()
  const selected = isSelected(item, pathParts) || hasSelectedChild(item, pathParts)
  const isOpen = openMenu === item.name


  return (
    <ItemContainer open={isOpen || selected}>
      <ItemButton
        open={isOpen}
        onClick={() => {
          if (isOpen) setOpenMenu(null)
          else if (isItemBranch(item)) setOpenMenu(item.name)
          else if (history.location.pathname !== `/${item.path}`) history.push(`/${item.path}`)
        }}
      >
        <ItemButtonMainBand>
          <ItemIcon icon={item.icon} selected={selected}/>
          <ItemName selected={selected}>{item.name}</ItemName>
          {isItemBranch(item) && !selected ? (
            <DropdownIcon icon={isOpen ? "ic_keyboard_arrow_up" : "ic_keyboard_arrow_down"}/>
          ) : null}
        </ItemButtonMainBand>
      </ItemButton>
      {isItemBranch(item) ? (
        <SubItems items={item.items} expanded={expanded} pathParts={pathParts} show={isOpen || selected}/>
      ) : null}
    </ItemContainer>
  )
}

function isSelected(item: MenuItem, pathParts: Array<string>) {
  return Boolean(isItemLeaf(item) && pathParts.includes(item.path))
}

function hasSelectedChild(item: MenuItem, pathParts: Array<string>) {
  return Boolean(isItemBranch(item) && item.items.some((x) => pathParts.includes(x.path)))
}

function SubItems({items, expanded, show, pathParts}: SubItemsProps) {
  return (
    <SubItemsContainer show={show} amount={items.length}>
      {items.map((item) => (
        <SubItem item={item} key={item.name} expanded={expanded} selected={isSelected(item, pathParts)}/>
      ))}
    </SubItemsContainer>
  )
}

function SubItem({item, expanded, selected}: SubItemProps) {
  //TODO Clean up
  return (
    <SubItemContainer expanded={expanded}>
      <MiniSubItemName selected={selected}>
        {item.name[0] + item.name[1]}
      </MiniSubItemName>
      <SubItemName selected={selected}>{item.name}</SubItemName>
    </SubItemContainer>
  )
}

type SubItemsProps = {
  items: Array<ItemLeaf>
  expanded: boolean
  show: boolean
  pathParts: Array<string>
}

type SubItemProps = {
  item: ItemLeaf
  expanded: boolean
  selected: boolean
}

type ItemsProps = {
  item: MenuItem
  expanded: boolean
  openMenu: string | null
  setOpenMenu: (value: string | null) => void
  pathParts: Array<string>
}

const WIDTH_EXTENDED = "190px"
const WIDTH_COLLAPSED = "40px"

const SideBarOverflowHider = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    display: none;
    appearance: none;
    width: 6px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: rgba(255, 255, 255, 0.5) 0 0 1px;
  }
`

const Logo = styled.img<{ open: boolean }>`
  width: ${({open}) => (open ? WIDTH_EXTENDED : WIDTH_COLLAPSED)};
  height: 60px;
`

export function isItemBranch(item: RouterItem): item is ItemBranch {
  return item.hasOwnProperty("items")
}

export function isItemLeaf(item: RouterItem): item is ItemLeaf {
  return item.hasOwnProperty("path")
}

export function isMenuItem(item: RouterItem): item is MenuItem {
  return item.hasOwnProperty("name")
}

const SideBarElement = styled.div<{ expanded: boolean }>`
  user-select: none;
  position: sticky;
  height: calc(100vh - ${FOOTER_HEIGHT});
  width: ${({expanded}) => (expanded ? WIDTH_EXTENDED : WIDTH_COLLAPSED)};
  background-color: ${theme.colors.menu_background};
  transition: width 0.4s;

  box-shadow: rgba(0, 0, 0, 0.6) 0 1px 20px;

  z-index: ${OUTER_Z_INDEX + 1};
`

const ItemContainer = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${({open}) => (open ? theme.colors.menu_items : "transparent")};
  border-bottom: ${theme.colors.menu_hover} solid 0.5px;
  overflow: hidden;
`

const ITEM_LEFT_PADDING = "10px"
const ItemButton = styled(NoStyleButton)<{ open: boolean }>`

  display: flex;
  flex-direction: column;
  background-color: ${({open}) => (open ? theme.colors.menu_items : theme.colors.menu_background)};

  padding-left: ${ITEM_LEFT_PADDING};

  cursor: pointer;
  transition: 0.4s ease-out;
  z-index: 1;

  :hover {
    background-color: ${theme.colors.menu_hover};
  }
`

const ItemButtonMainBand = styled.div`
  height: 44px;

  display: flex;
  align-items: center;
`

const ItemName = styled.span<{ selected: boolean }>`
  font-family: ${theme.fonts.option};
  font-size: 18px;
  text-align: left;
  margin-left: ${WIDTH_COLLAPSED};
  width: calc(${WIDTH_EXTENDED} - ${WIDTH_COLLAPSED});
  color: ${({selected}) => (selected ? theme.colors.primary : theme.colors.text)};
`

//TODO add implementation
const Icon = styled.div<{ icon: any }>`
`

const ItemIcon = styled(Icon).attrs<{ selected: boolean }>(({selected}) => ({
  color: selected ? theme.colors.primary : theme.colors.text
}))<{ selected: boolean }>`
  position: absolute;
  margin-right: 10px;
`

const SUB_ITEM_HEIGHT = "-37px"

const SubItemsContainer = styled.div<{ show: boolean; amount: number }>`
  display: flex;
  flex-direction: column;
  margin-top: ${({show, amount}) => (show ? "0" : `calc(${SUB_ITEM_HEIGHT} * ${amount})`)};
  transition: 0.4s ease-in-out;
`

const SubItemContainer = styled.div<{ expanded: boolean }>`
  height: ${SUB_ITEM_HEIGHT};
  width: calc(${WIDTH_COLLAPSED} + ${WIDTH_EXTENDED});

  display: flex;
  align-items: center;
  cursor: pointer;

  transform: translateX(${({expanded}) => (expanded ? `-${WIDTH_COLLAPSED}` : 0)});
  transition: 0.4s ease-out;

  :hover {
    background-color: ${theme.colors.menu_hover};
  }
`

const ItemsContainer = styled.nav`
  display: flex;
  flex-direction: column;
`

const DropdownIcon = styled(Icon)`
  position: absolute;
  left: 160px;
`

const SubItemName = styled.span<{ selected: boolean }>`
  font-family: ${theme.fonts.option};
  margin-left: 16px;
  font-size: 16px;
  color: ${({selected}) => (selected ? theme.colors.primary : theme.colors.text)};
`

const MiniSubItemName = styled.button<{ selected: boolean }>`
  font-family: ${theme.fonts.option};
  width: ${WIDTH_COLLAPSED};
  height: 37px;
  font-size: 16px;
  font-weight: normal;
  color: ${({selected}) => (selected ? theme.colors.primary : theme.colors.text)};
`

export type InvisibleItem = {
  path: string
  component: ReactNode
}

export type ItemBranch = {
  icon?: any
  name: string
  items: Array<ItemLeaf>
  activePaths?: Array<string>
}

export type ItemLeaf = {
  path: string
  component: ReactNode
  name: string
  activePaths?: Array<string>
  icon?: any
}

export type RouterItem = ItemBranch | ItemLeaf | InvisibleItem
export type MenuItem = ItemBranch | ItemLeaf
