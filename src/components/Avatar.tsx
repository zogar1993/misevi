import React from 'react'
import styled from 'styled-components'
import {BORDER_RADIUS} from './css/Dimensions'
import bandit from './icons/bandit.png'
import {SKELETON_ANIMATION_INFO} from './css/Skeleton'

export default function Avatar({onChange, src, alt, width = '135px', height = '135px'}: AvatarProps) {
  const handleOnChange = (e: any) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64 = reader.result as string
      onChange(base64)
    }
  }
  const showSkeleton = src === undefined
  return (
    <label>
      <Input type="file" onChange={handleOnChange}/>
      <Image src={getImage(src)} alt={alt} width={width} height={height} skeleton={showSkeleton}/>
    </label>
  )
}

function getImage(url: string | null | undefined): string | undefined {
  if (url === undefined) return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciLz4'
  if (url === null) return bandit
  if (url.trim().length === 0) return bandit
  return url
}

export type AvatarProps = {
  onChange: (base64: string) => void
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
