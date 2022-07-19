import React from 'react'
import NextImage, { type ImageProps as NextImageProps } from 'next/image'

import getIsStorybook from '../../../../utils/storybook/getIsStorybook/getIsStorybook'

export type ImageProps = NextImageProps

const isStorybook = getIsStorybook()
const storybookProps = {
  unoptimized: true,
  blurDataURL:
    'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAbEAADAAMBAQAAAAAAAAAAAAABAgMABAURUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8Anz9voy1dCI2mectSE5ioFCqia+KCwJ8HzGMZPqJb1oPEf//Z',
}

export default function Image(props: ImageProps) {
  return props.src ? (
    <NextImage {...props} {...(isStorybook ? storybookProps : {})} />
  ) : null
}
