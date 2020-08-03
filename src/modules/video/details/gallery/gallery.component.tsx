import React, { FC, useContext } from 'react'
import VideoContext from '../../video.context'

const Gallery: FC<{}> = () => {
  const { getScreenshot } = useContext(VideoContext)
  return <div>Component</div>
}

export default Gallery
