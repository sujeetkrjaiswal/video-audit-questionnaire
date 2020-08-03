import { Alert } from 'antd'
import React, { FC, useContext, useEffect, useRef } from 'react'
import VideoContext from '../../video.context'
import { drawFrequencyGraph } from './graph-frequency.utility'
import styles from '../details.module.scss'
const GraphFrequency: FC<{}> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { analyserFrequency } = useContext(VideoContext)
  useEffect(() => {
    if (canvasRef.current && analyserFrequency) {
      return drawFrequencyGraph(analyserFrequency, canvasRef.current)
    }
  }, [analyserFrequency])
  if (!analyserFrequency)
    return (
      <Alert
        type="warning"
        message="Not Available"
        description="Make sure the video is playing."
      />
    )
  return <canvas ref={canvasRef} className={styles.graph} />
}

export default GraphFrequency
