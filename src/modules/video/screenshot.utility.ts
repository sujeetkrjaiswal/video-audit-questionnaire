import { notification } from 'antd'
import { v4 } from 'uuid'
import { VideoJsPlayer } from 'video.js'
import { DocketType } from '../../types/qna.types'

export function captureScreenshot(video: HTMLVideoElement): string | null {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const w = video.videoWidth
  const h = video.videoHeight
  canvas.width = w
  canvas.height = h
  if (context) {
    context.fillRect(0, 0, w, h)
    context.drawImage(video, 0, 0, w, h)
    const dataUrl = canvas.toDataURL('image/jpeg')
    return dataUrl
  }
  return null
}

export function captureScreenshotFromPlayer(player: VideoJsPlayer | null) {
  const container = player?.el()
  const el = container?.querySelector('video')
  if (!el) {
    notification.error({ message: 'Could not find Video' })
    return null
  }
  if (player?.hasStarted()) {
    const url = captureScreenshot(el)
    if (url === null) {
      notification.warn({ message: 'Could not get Image Url' })
      return null
    }
    const newMedia: DocketType = {
      id: v4(),
      url,
      type: 'image/jpeg',
      title: `Screenshot at ${player?.currentTime()}`,
    }
    return newMedia
  } else {
    notification.warn({
      message: 'Can not take screenshot.',
      description: 'You can not take screenshot before video has started',
    })
  }
  return null
}
