import styled from 'styled-components'
import Avatar, { AvatarProps } from '../../components/Avatar'
import React, { useState } from 'react'

export default function ({ ...args }: AvatarProps) {
  const [image, setImage] = useState<string>()
  const [resizes, setResizes] = useState<Array<string>>([])
  return (
    <div>
      <Avatar
        {...args}
        onChange={(image, thumbnail) => {
          setImage(image)
          setResizes(thumbnail)
        }}
        resizes={RESIZES.map(x => x*2)}
      />
      {resizes.map((resize, i) => {
        const size = RESIZES[i]
        return (
          <Container key={`${size}`}>
            {size}x{size}
            <HorizontalContainer>
              <Image src={resize} alt={`${size}`} size={size} />
              <Image src={image} alt={`original at ${size}`} size={size} />
            </HorizontalContainer>
          </Container>
        )
      })}
      {image && (
        <Container>
          Original
          <img src={image} alt='original' />
        </Container>
      )}
    </div>
  )
}

const RESIZES = [70, 143]

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const HorizontalContainer = styled.div`
  display: flex;
  gap: 8px;
`

const Image = styled.img<{ size: number }>`
  width: ${(x) => x.size}px;
  height: ${(x) => x.size}px;
`
