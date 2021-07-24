import React from "react"
import MainUnboxed, {MainProps, ScreenItem} from "components/main/Main"
import logo from './img/logo.png'
import prayer from './img/prayer.png'
import wicca from './img/wicca.png'
import book from './img/book.png'
import monster from './img/monster.png'
import talent from './img/talent.png'
import home from './img/home.png'
import businessman from './img/businessman.png'
import dwarf from './img/dwarf.png'
import hat from './img/magic-hat.png'
import child from './img/child.png'
import wand from './img/wand.png'
import { createMemoryHistory } from 'history'

const history = createMemoryHistory()
export const Template = (args: MainProps) => (
  <Main {...args} screens={screens} history={history} logo={logo} />
)

function Main(args: MainProps) {
  return (
    <MainUnboxed
      {...args}
    />
  )
}

const screens: Array<ScreenItem> = [
  { path: '/', component: () => <span>Home</span>, name: "Home", icon: home },
  {path: "characters", component:  () => <span>Characters</span>, name: "Characters", icon: child},
  {path: "talents", component:  () => <span>Talents</span>, name: "Talents", icon: talent},
  {path: "ancestries", component:  () => <span>Ancestries</span>, name: "Ancestries", icon: dwarf},
  {
    name: "Magic",
    icon: wand,
    items: [
      {
        path: '/magic/generalists',
        component: () => <span>Generalist</span>,
        name: "Generalist",
        icon: hat
      },
      {
        path: '/magic/arcanas',
        component: () => <span>Arcanas</span>,
        name: "Arcanas",
        icon: book
      },
      {
        path: '/magic/prayers',
        component: () => <span>Prayers</span>,
        name: "Prayers",
        icon: prayer
      },
      {
        path: '/magic/covenants',
        component: () => <span>Covenants</span>,
        name: "Covenants",
        icon: wicca
      }
    ]
  },
  {path: "creatures", component:  () => <span>Creatures</span>, name: "Creatures", icon: monster},
  {path: "professions", component:  () => <span>Professions</span>, name: "Professions", icon: businessman}
]



