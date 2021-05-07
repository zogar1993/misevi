import Picture, {PictureProps} from "components/Picture"
import React from "react"
import bandit from './bandit.png'

export default function Template({src, ...args}: PictureProps) {
  return <Picture {...args} src={src && bandit} width="140px" height="140px"/>
}
