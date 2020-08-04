import { getRMS } from '../../analyser.utility'

export function drawFrequencyGraph(
  analyser: AnalyserNode,
  canvas: HTMLCanvasElement
) {
  const ctx = canvas.getContext('2d')
  const dataArray = new Uint8Array(analyser.fftSize)
  function updateFrequencyGraphLoop() {
    if (!ctx) return
    requestAnimationFrame(updateFrequencyGraphLoop)
    analyser.getByteFrequencyData(dataArray)
    const canvasRect = canvas.getBoundingClientRect()
    canvas.width = canvasRect.width
    canvas.height = canvasRect.height
    updateFrequencyGraph(ctx, canvasRect.width, canvasRect.height, dataArray)
  }
  updateFrequencyGraphLoop()
}
function updateFrequencyGraph(
  canvasCtx: CanvasRenderingContext2D,
  WIDTH: number,
  HEIGHT: number,
  dataArray: Uint8Array
) {
  const bufferLength = dataArray.length
  canvasCtx.fillStyle = 'rgb(200, 200, 200)'
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)

  let barHeight = (getRMS(dataArray) * HEIGHT) / 256
  let barWidth = 10
  WIDTH = WIDTH - 10
  canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)'
  canvasCtx.fillRect(0, HEIGHT - barHeight, barWidth, barHeight)

  let x = barWidth
  barWidth = (WIDTH - barWidth) / bufferLength
  for (let i = 0; i < bufferLength; i++) {
    barHeight = (dataArray[i] * HEIGHT) / 256

    canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)'
    canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight)

    x += barWidth + 1
  }
}
