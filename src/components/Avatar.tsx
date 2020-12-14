import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {BORDER_RADIUS} from './css/Dimensions'
import Resizer from 'react-image-file-resizer'
import bandit from './icons/bandit.png'
import {SKELETON_ANIMATION_INFO} from './css/Skeleton'

export default function Avatar({onChange, src, alt, width = '135px', height = '135px'}: AvatarProps) {
  const [imageShowed, setImageShowed] = useState<string>('')
  useEffect(() => setImageShowed(getImage(src)), [src])
  const showSkeleton = src === undefined
  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) =>
    await changeDisplayedImage(e, setImageShowed, onChange)
  return (
    <label>
      <Input type="file" onChange={handleOnChange}/>
      <Image src={imageShowed} alt={alt} width={width} height={height} skeleton={showSkeleton}/>
    </label>
  )
}

async function changeDisplayedImage(e: React.ChangeEvent<HTMLInputElement>,
                                    setImageShowed: (value: string) => void,
                                    onChange: (base64: string, thumbnail: string) => void) {
  if (!e.target.files) return
  const file = e.target.files[0]
  const image = await createThumbnail(file)
  setImageShowed(image.thumbnail)
  onChange(image.original, image.thumbnail)
}

async function encode(file: File): Promise<string> {
  const promise = new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = ev => resolve(ev.target!.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
  return await promise
}

async function createThumbnail(file: File) {
  const originalPromise = encode(file)
  const thumbnailPromise = resizeImage(file)
  const [original, thumbnail] = await Promise.all([originalPromise, thumbnailPromise])
  return {original, thumbnail}
}

function getImage(url: string | null | undefined): string {
  if (url === undefined) return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciLz4'
  if (url === null) return bandit
  if (url.trim().length === 0) return bandit
  return url
}

const resizeImage = (file: Blob): Promise<string> => new Promise(resolve =>
  Resizer.imageFileResizer(
    file, 70, 70, 'JPEG', 100, 0,
    resolve as any, 'base64', 70, 70,
  ))

export type AvatarProps = {
  onChange: (base64: string, thumbnail: string) => void
  src?: string | null
  alt: string
  width?: string
  height?: string
}

const Image = styled.img<{ width?: string, height?: string, skeleton: boolean }>`
  border-radius: ${BORDER_RADIUS};
  width:${x => x.width};
  height:${x => x.height};
  object-fit: scale-down;
  cursor: pointer;
  border: none;
  ${x => x.skeleton ? SKELETON_ANIMATION_INFO : ''}
`

const Input = styled.input`
  display: none;
`
