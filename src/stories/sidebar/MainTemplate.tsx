import React from "react"
import MainUnboxed, {MainProps, RouterItem} from "components/Main"
import logo from './img/logo.png'
import { createMemoryHistory } from 'history'

const history = createMemoryHistory()
export const Template = (args: MainProps) => (
  <Main {...args} screens={screens} logo={logo} />
)

function Main(args: MainProps) {
  return (
    <MainUnboxed
      {...args}
    />
  )
}

const screens: Array<RouterItem> = [
  { path: '/', component: <span>Home</span>, name: "Home" },
  {
    name: "Magic",
    items: [
      {
        path: '/magic/arcanas',
        component: <span>Magic Arcanas</span>,
        name: "Arcanas"
      },
      {
        path: '/magic/prayers',
        component: <span>Magic</span>,
        name: "Prayers"
      }
    ]
  },
  { path: '*', component: <span>404</span> }
]
