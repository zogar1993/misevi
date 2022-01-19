import Avatar, {AvatarProps} from '../../components/Avatar'
import React, { useState } from "react";

export default function ({...args}: AvatarProps) {
  const [image, setImage] = useState<string>()
  const [thumbnail, setThumbnail] = useState<string>()
  return (
    <div>
      <Avatar {...args} onChange={(image, thumbnail) => {
        setImage(image)
        setThumbnail(thumbnail)
      }}/>
      <img src={image}/>
      <img src={thumbnail}/>
    </div>
  )
}
