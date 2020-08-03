import React, {
  createContext,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import videojs, { VideoJsPlayer } from 'video.js'
import 'videojs-markers'
import { DocketType } from '../../types/qna.types'
import { setupAnalyser } from './analyser.utility'
import { captureScreenshotFromPlayer } from './screenshot.utility'

declare module 'video.js' {
  export interface VideoJsPlayer {
    // markers(options: any): void
    markers: VideoJsMarkerPlugin
  }
  export interface VideoJsMarkerPlugin {
    add(newMarkers: any): void
    destroy(): void
    getMarkers(): void
    next(): void
    prev(): void
    remove(indexArray: any): void
    removeAll(): void
    reset(newMarkers: any): void
    updateTime(force: any): void
  }
}

type Setter<T> = React.Dispatch<React.SetStateAction<T>>
export type VideoContextValueType = {
  videoUrl: string
  setCurrentVideoRef: Setter<HTMLVideoElement | null>
  updateMarkers: (time: number[]) => void
  player?: VideoJsPlayer | null
  getScreenshot: () => DocketType | null
  audioContext?: AudioContext
  analyserWaveForm?: AnalyserNode
  analyserFrequency?: AnalyserNode
}
const defaultValue: VideoContextValueType = {
  videoUrl: '',
  setCurrentVideoRef: () => {},
  updateMarkers: () => {},
  getScreenshot: () => null,
}
const VideoContext = createContext<VideoContextValueType>(defaultValue)

export const VideoContextProvider: FC<{ videoUrl: string }> = ({
  children,
  videoUrl,
}) => {
  const [
    currentVideoRef,
    setCurrentVideoRef,
  ] = useState<HTMLVideoElement | null>(null)
  const [player, setPlayer] = useState<VideoJsPlayer | null>(null)
  const [audioContext, setAudioContext] = useState<AudioContext>()
  const [analyserWaveForm, setAnalyserWaveform] = useState<AnalyserNode>()
  const [analyserFrequency, setAnalyserFrequency] = useState<AnalyserNode>()
  const [gallery, setGallery] = useState<DocketType[]>([])
  const updateMarkers = useCallback(
    (time: number[]) => {
      if (!player || !player.markers) return undefined
      time.sort()
      const newMarkers = time.map((t) => ({
        time: t,
        text: 'Recorded',
      }))
      player.markers.reset(newMarkers)
    },
    [player]
  )

  const getScreenshot = useCallback(() => {
    return captureScreenshotFromPlayer(player)
  }, [player])

  useEffect(() => {
    /**
     * Set up the player, whenever underlying video elements changes
     * Setup the Audio Analyser, only when the video has started playing
     */
    if (currentVideoRef === null) return
    const videoJsPlayer = videojs(currentVideoRef, {
      autoplay: false,
      controls: true,
      sources: [
        {
          src: videoUrl,
          type: 'video/mp4',
        },
      ],
    })
    videoJsPlayer.one('play', () => {
      const configuredAnalyser = setupAnalyser(currentVideoRef)
      setAudioContext(configuredAnalyser.audioContext)
      setAnalyserWaveform(configuredAnalyser.analyser2048)
      setAnalyserFrequency(configuredAnalyser.analyser256)
    })
    const x: any = videoJsPlayer
    if (typeof x.markers === 'function') {
      x.markers({
        markers: [],
        markerStyle: {
          width: '8px',
          'background-color': '#ff4d4f',
        },
      })
    }
    setPlayer(videoJsPlayer)
    return () => {
      setPlayer((prev) => {
        if (prev) {
          prev.dispose()
        }
        return null
      })
    }
  }, [currentVideoRef, videoUrl])

  const value: VideoContextValueType = useMemo(
    (): VideoContextValueType => ({
      videoUrl,
      player,
      updateMarkers,
      setCurrentVideoRef,
      getScreenshot,
      audioContext,
      analyserWaveForm,
      analyserFrequency,
    }),
    [
      analyserFrequency,
      analyserWaveForm,
      audioContext,
      getScreenshot,
      player,
      updateMarkers,
      videoUrl,
    ]
  )

  return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
}

export default VideoContext
