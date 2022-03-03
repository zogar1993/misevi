import React, { ChangeEvent } from 'react'
import styled from 'styled-components'
import Resizer from 'react-image-file-resizer'
import bandit from './icons/bandit.png'
import transparent from './icons/transparent-pixel.png'
import { SKELETON_ANIMATION_CSS } from './css/Skeleton'
import theme from './theme/Theme'

export default function Avatar({
  onChange,
  src,
  alt,
  area,
  width = '143px',
  height = '143px',
  resizes = [],
  disabled
}: AvatarProps) {
  const showSkeleton = src === undefined
  const isDisabled = showSkeleton || disabled
  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) =>
    await changeDisplayedImage(e, onChange, resizes)
  return (
    <Label width={width} height={height} area={area}>
      <Input type='file' onChange={handleOnChange} disabled={isDisabled} />
      <Image
        src={getImage(src)}
        alt={alt}
        width={width}
        height={height}
        skeleton={showSkeleton}
        disabled={isDisabled}
      />
    </Label>
  )
}

async function changeDisplayedImage(
  e: ChangeEvent<HTMLInputElement>,
  onChange: Required<AvatarProps>['onChange'],
  resizes: Required<AvatarProps>['resizes']
) {
  if (!e.target.files) return
  const file = e.target.files[0]
  const image = await createResizedImage(file, resizes)
  onChange(image.original, image.resizes)
}

async function encode(file: File): Promise<string> {
  const promise = new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (ev) => resolve(ev.target!.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
  return await promise
}

async function createResizedImage(file: File, resizes: Required<AvatarProps>['resizes']) {
  const result = await Promise.all([
    encode(file),
    ...resizes.map((resize) => resizeImage(file, resize))
  ])
  return { original: result[0], resizes: result.splice(1) }
}

function getImage(url: string | null | undefined): string {
  if (url === undefined) return transparent
  if (url === null) return bandit
  if (url.trim().length === 0) return bandit
  return url
}

const resizeImage = (file: Blob, resize: number): Promise<string> =>
  new Promise((resolve) =>
    Resizer.imageFileResizer(file, resize, resize, 'JPEG', 100, 0, resolve as any, 'base64', 70, 70)
  )

export type AvatarProps = {
  onChange: (base64: string, customs: Array<string>) => void
  src?: string | null
  alt: string
  width?: string
  height?: string
  area?: string
  resizes?: Array<number>
  disabled?: boolean
}

const Image = styled.img<{
  width?: string
  height?: string
  skeleton: boolean
  disabled?: boolean
}>`
  border-radius: ${theme.borders.radius};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  object-fit: scale-down;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  ${({ skeleton }) => (skeleton ? SKELETON_ANIMATION_CSS : '')};
`

const Input = styled.input`
  display: none;
`

const Label = styled.label<{ width?: string; height?: string; area?: string }>`
  all: unset;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  ${({ area }) => (area ? `grid-area: ${area}` : '')};
`
