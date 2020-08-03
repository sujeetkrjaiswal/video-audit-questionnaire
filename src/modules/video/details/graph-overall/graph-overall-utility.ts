import { VideoJsPlayer } from 'video.js'
import { getRMS, getRMSForNums } from '../../analyser.utility'

export type OverallGraphData = {
  time: number
  rms: number
}

export async function getOverallData(videoId: string): Promise<number[]> {
  const res = await fetch(
    `/video-audit-questionnaire/api/audio-stats.json?videoId=${videoId}`
  )
  const resJson: OverallGraphData[] = await res.json()
  return groupItems(resJson)
}

function groupItems(dataArr: OverallGraphData[]): number[] {
  const processed: number[] = []
  let currentTime = 0
  let currentValues: number[] = []
  for (let i = 0; i < dataArr.length; i++) {
    if (typeof dataArr[i].rms !== 'number') continue
    const timeInt = Math.floor(dataArr[i].time)
    if (timeInt === currentTime) {
      currentValues.push(dataArr[i].rms)
    } else {
      processed.push(getRMSForNums(currentValues))
      currentTime = timeInt
      currentValues = [dataArr[i].rms]
    }
  }
  return processed
}

export function drawOverallGraph(
  dataArray: number[],
  canvas: HTMLCanvasElement,
  player?: VideoJsPlayer
) {
  let ctx = canvas.getContext('2d')
  function updateWaveformLoop() {
    if (!ctx || !player) return
    requestAnimationFrame(updateWaveformLoop)
    const canvasRect = canvas.getBoundingClientRect()
    updateWaveform(ctx, canvasRect.width, canvasRect.height, dataArray, player)
  }
  updateWaveformLoop()
  return function cancel() {
    ctx = null
  }
}

function updateWaveform(
  canvasCtx: CanvasRenderingContext2D,
  WIDTH: number,
  HEIGHT: number,
  dataArray: number[],
  player: VideoJsPlayer
) {
  const currentTime = Math.floor(player.currentTime() || 0)
  canvasCtx.fillStyle = 'rgb(200, 200, 200)'
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)

  canvasCtx.lineWidth = 1
  canvasCtx.strokeStyle = 'rgb(0, 0, 0)'

  canvasCtx.beginPath()
  const sliceWidth = WIDTH / dataArray.length
  let x = 0
  canvasCtx.moveTo(x, dataArray[0])
  for (let i = 0; i < dataArray.length; i += 1) {
    let y = (dataArray[i] * HEIGHT) / 100
    canvasCtx.lineTo(x, y)
    x += sliceWidth
  }
  canvasCtx.stroke()
  // to show current time
  canvasCtx.fillStyle = '#1890ffc7'
  canvasCtx.fillRect(currentTime * sliceWidth, 0, 1, HEIGHT)
}
