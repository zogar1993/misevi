import React, { useState } from 'react'
import styled from 'styled-components'
import { Route, Router, Switch, useHistory } from 'react-router-dom'
import { NoStyleButton } from 'components/inner_components/NoStyleButton'
import theme from 'components/theme/Theme'
import * as H from 'history'
import Article from 'components/Article'
import Flex from 'components/Flex'

const FOOTER_HEIGHT = '0px'
const OUTER_Z_INDEX = 1

export type MainProps = {
  logo: any
  screens: Array<ScreenItem>
  provider: any
  history: H.History
}

export default function Main({ screens, history, provider, ...props }: MainProps) {
  const menu = screens.filter(isMenuItem)
  const routes = (screens.filter(isItemBranch).flatMap(x => x.items) as Array<RouteOnlyItem>)
    .concat(screens.filter(isItemRoutable))

  return (
    <Router history={history}>
      <Flex width="100%" height="100%">
        <SideBar {...props} menu={menu} />
        <Article>
          <Switch>
            {
              routes.map(({ path, component: Component }) =>
                <Route exact={path !== '*'} path={`/${path}`} key={path} component={
                  (props: any) => <Component provider={provider} {...props.match.params} />
                } />)
            }
          </Switch>
        </Article>
      </Flex>
    </Router>
  )
}

type SideBarProps = {
  logo: any
  menu: Array<MenuItem>
}

function SideBar({ logo, menu }: SideBarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(true)

  const pathParts = location.href.split('/').map((x) => x.split('?')[0])

  return (
    <SideBarElement expanded={expanded}>
      <SideBarOverflowHider>
        <Logo src={logo} alt='logo' open={expanded} onClick={() => setExpanded(expanded => !expanded)} />
        <ItemsContainer>
          {menu.map((item) => (
            <Item key={item.name} {...{ item, expanded, openMenu, setOpenMenu, pathParts }} />
          ))}
        </ItemsContainer>
      </SideBarOverflowHider>
    </SideBarElement>
  )
}

function Item({ item, expanded, openMenu, setOpenMenu, pathParts }: ItemsProps) {
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
          else redirectTo(item, history)
        }}
      >
        <Icon src={item.icon} alt={item.name} selected={selected} />
        <ItemName selected={selected}>{item.name}</ItemName>
        {isItemBranch(item) && !selected ? <DropdownIcon open={isOpen} /> : null}
      </ItemButton>
      {isItemBranch(item) ? (
        <SubItems items={item.items} expanded={expanded} pathParts={pathParts} show={isOpen || selected} />
      ) : null}
    </ItemContainer>
  )
}

function isSelected(item: MenuItem, pathParts: Array<string>) {
  return Boolean(isItemRoutable(item) && pathParts.includes(item.path))
}

function hasSelectedChild(item: MenuItem, pathParts: Array<string>) {
  return Boolean(isItemBranch(item) && item.items.some((x) => pathParts.includes(x.path)))
}

function SubItems({ items, expanded, show, pathParts }: SubItemsProps) {
  const history = useHistory()

  return (
    <SubItemsContainer show={show} amount={items.length}>
      {items.map((item) => {
          const selected = isSelected(item, pathParts)
          return (
            <SubItemButton
              key={item.name}
              expanded={expanded}
              onClick={() => { redirectTo(item, history)}}
            >
              <Icon src={item.icon} alt={item.name} selected={selected} />
              <SubItemName selected={selected}>{item.name}</SubItemName>
            </SubItemButton>
          )
        }
      )}
    </SubItemsContainer>
  )
}

function redirectTo(item: LeafItem, history: H.History) {
  const clean = item.path.split('/').filter(x => !x.includes(':')).join('/')
  if (!history.location.pathname.includes(`/${clean})`)) history.push(`/${clean}`)
}

type SubItemsProps = {
  items: Array<LeafItem>
  expanded: boolean
  show: boolean
  pathParts: Array<string>
}

type ItemsProps = {
  item: MenuItem
  expanded: boolean
  openMenu: string | null
  setOpenMenu: (value: string | null) => void
  pathParts: Array<string>
}

const WIDTH_EXTENDED = '190px'
const WIDTH_COLLAPSED = '48px'

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
  width: ${WIDTH_EXTENDED};
  min-height: 40px;
  overflow-x: hidden;

  border-bottom: ${theme.colors.menu.border} solid 1px;
`

export function isItemBranch(item: ScreenItem): item is BranchItem {
  return item.hasOwnProperty('items')
}

export function isItemRoutable(item: ScreenItem): item is RouteOnlyItem {
  return item.hasOwnProperty('path')
}

export function isMenuItem(item: ScreenItem): item is MenuItem {
  return item.hasOwnProperty('name')
}

const SideBarElement = styled.div<{ expanded: boolean }>`
  user-select: none;
  position: sticky;
  height: calc(100vh - ${FOOTER_HEIGHT});
  width: ${({ expanded }) => (expanded ? WIDTH_EXTENDED : WIDTH_COLLAPSED)};
  background-color: ${theme.colors.menu.background};
  transition: width 0.4s;
  border-right: ${theme.colors.menu.border} solid 1px;
  box-sizing: content-box;

  z-index: ${OUTER_Z_INDEX + 1};
`

const ItemContainer = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${({ open }) => (open ? theme.colors.menu.open_item : 'transparent')};
  border-bottom: ${theme.colors.menu.border} solid 1px;
  overflow: hidden;
`

const ItemButton = styled(NoStyleButton)<{ open: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${({ open }) => (open ? theme.colors.menu.open_item : theme.colors.menu.background)};

  cursor: pointer;
  transition: 0.4s ease-out;
  z-index: 1;

  :hover {
    background-color: ${theme.colors.menu.focus};
  }

  height: 44px;
`

const ItemName = styled.span<{ selected: boolean }>`
  font-family: ${theme.fonts.option};
  font-size: 18px;
  text-align: left;
  margin-left: 2px;
  width: calc(${WIDTH_EXTENDED} - ${WIDTH_COLLAPSED});
  color: ${({ selected }) => (selected ? theme.colors.primary : theme.colors.text)};
`


const Icon = styled.img<{ selected: boolean }>`
  width: 32px;
  height: 32px;
  margin: 0 8px;
`

const SUB_ITEM_HEIGHT = '37px'

const SubItemsContainer = styled.div<{ show: boolean; amount: number }>`
  display: flex;
  flex-direction: column;
  margin-top: ${({ show, amount }) => (show ? '0' : `calc(-${SUB_ITEM_HEIGHT} * ${amount})`)};
  transition: 0.4s ease-in-out;
`

const SubItemButton = styled(NoStyleButton)<{ expanded: boolean }>`
  height: ${SUB_ITEM_HEIGHT};
  width: calc(${WIDTH_COLLAPSED} + ${WIDTH_EXTENDED});

  display: flex;
  align-items: center;
  cursor: pointer;

  transform: translateX(${({ expanded }) => (expanded ? `-${WIDTH_COLLAPSED}` : 0)});
  transition: 0.4s ease-out;

  :hover {
    background-color: ${theme.colors.menu.focus};
  }
`

const ItemsContainer = styled.nav`
  display: flex;
  flex-direction: column;
`

const DropdownIcon = styled.div<{ open: boolean }>`
  width: 12px;
  height: 12px;
  border: ${theme.colors.primary} solid 2px;
  border-left: 0;
  border-top: 0;
  transform: translateY(${({ open }) => open ? 0 : '-50%'}) rotate(${({ open }) => open ? 225 : 45}deg);

  position: absolute;
  left: 160px;
`

const SubItemName = styled.span<{ selected: boolean }>`
  font-family: ${theme.fonts.option};
  margin-left: 16px;
  font-size: 16px;
  color: ${({ selected }) => (selected ? theme.colors.primary : theme.colors.text)};
`

export type RouteOnlyItem = {
  path: string
  component: () => JSX.Element
}

export type BranchItem = {
  icon: any
  name: string
  items: Array<LeafItem>
  activePaths?: Array<string>
}

export type LeafItem = {
  name: string
  activePaths?: Array<string>
  icon: any
} & RouteOnlyItem

export type ScreenItem = BranchItem | LeafItem | RouteOnlyItem
export type MenuItem = BranchItem | LeafItem
