export type fileInfo = {
  format: string
  audio: string
  video: string
  duration: string
  video_details: string[]
  audio_details: string[]
}

export type fileSize = {
  raw: {
    birthtime: string
  }
  size_bytes: number
  size_kb: string
  size_mb: string
  size_gb: string
}

const base = '/video-audit-questionnaire/api'

export async function getInfo(videoId: string): Promise<fileInfo> {
  const res = await fetch(`${base}/info.json?videoId=${videoId}`)
  const resJson = await res.json()
  return resJson
}

export async function getSize(videoId: string): Promise<fileSize> {
  const res = await fetch(`${base}/size.json?videoId=${videoId}`)
  const resJson = await res.json()
  return resJson
}
