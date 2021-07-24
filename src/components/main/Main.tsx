import React from 'react'
import styled from 'styled-components'
import { Route, Router, Switch } from 'react-router-dom'
import * as H from 'history'
import Article from '../Article'
import Menu from "./Menu"

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
    <React.StrictMode>
      <Router history={history}>
        <PageContent>
          <Menu {...props} menu={menu} />
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
        </PageContent>
      </Router>
    </React.StrictMode>
  )
}

export function isItemBranch(item: ScreenItem): item is BranchItem {
  return item.hasOwnProperty('items')
}

export function isItemRoutable(item: ScreenItem): item is RouteOnlyItem {
  return item.hasOwnProperty('path')
}

export function isMenuItem(item: ScreenItem): item is MenuItem {
  return item.hasOwnProperty('name')
}

const PageContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export type RouteOnlyItem = {
  path: string
  component: (props?: any) => JSX.Element | null
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
