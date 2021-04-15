import React from "react"
import Dots, {DotsProps} from "components/Dots"

export default function (args: DotsProps) {
  return <Dots {...args}/>
}
const RANKS = 3
export function coloring({number, value}: {number: number, value: number}) {
  if (number <= RANKS && number > value) return "palegreen"
  if (number > RANKS && number <= value) return "#f44336"
}
