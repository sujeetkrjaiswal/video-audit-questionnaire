import { Alert } from 'antd'
import React, { FC, useContext, useEffect, useRef } from 'react'
import VideoContext from '../../video.context'
import { drawWaveForm } from './graph-waveform.utility'
import styles from '../details.module.scss'

const GraphWaveForm: FC<{}> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { analyserWaveForm } = useContext(VideoContext)
  useEffect(() => {
    if (canvasRef.current !== null && analyserWaveForm) {
      return drawWaveForm(analyserWaveForm, canvasRef.current)
    }
  }, [analyserWaveForm])
  if (!analyserWaveForm)
    return (
      <Alert
        type="warning"
        message="Not Available"
        description="Make sure the video is playing."
      />
    )
  return <canvas ref={canvasRef} className={styles.graph} />
}

export default GraphWaveForm
