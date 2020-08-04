import { Alert } from 'antd'
import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import VideoContext from '../../video.context'
import styles from '../details.module.scss'
import { drawOverallGraph, getOverallData } from './graph-overall-utility'

const FullAudioAnalyserGraph: FC<{}> = () => {
  const { videoUrl, player } = useContext(VideoContext)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [data, setData] = useState<number[]>()

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      if (!canvasRef.current || !data || !player) return
      const rect = canvasRef.current.getBoundingClientRect()
      const x = event.clientX - rect.left
      // const y = event.clientY - rect.top
      const time = Math.floor(x / (rect.width / data.length))
      console.log(rect.width, data.length, x)
      player.currentTime(time)
    },
    [data, player]
  )

  useEffect(() => {
    console.log('will draw graph', canvasRef.current, player, data?.length)
    if (canvasRef.current !== null && data && player) {
      return drawOverallGraph(data, canvasRef.current, player)
    }
  }, [data, player, canvasRef])

  // Fetch Data
  useEffect(() => {
    async function getData() {
      const overallGraphData = await getOverallData(videoUrl)
      setData(overallGraphData)
    }
    getData()
  }, [videoUrl])

  return <canvas ref={canvasRef} className={styles.graph} onClick={onClick} />
}

export default FullAudioAnalyserGraph
