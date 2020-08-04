import { getRMS } from '../../analyser.utility'

export function drawWaveForm(
  analyser: AnalyserNode,
  canvas: HTMLCanvasElement
) {
  let ctx = canvas.getContext('2d')
  const dataArray = new Uint8Array(analyser.fftSize)
  function updateWaveformLoop() {
    if (!ctx) return
    requestAnimationFrame(updateWaveformLoop)
    analyser.getByteTimeDomainData(dataArray)
    const canvasRect = canvas.getBoundingClientRect()
    canvas.width = canvasRect.width
    canvas.height = canvasRect.height
    updateWaveform(ctx, canvasRect.width, canvasRect.height, dataArray)
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
  dataArray: Uint8Array
) {
  const bufferLength = dataArray.length
  canvasCtx.fillStyle = 'rgb(200, 200, 200)'
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)

  canvasCtx.lineWidth = 1
  canvasCtx.strokeStyle = 'rgb(0, 0, 0)'

  canvasCtx.beginPath()

  const barHeight = (getRMS(dataArray) * HEIGHT) / 256
  const barWidth = 10
  canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)'
  canvasCtx.fillRect(0, HEIGHT - barHeight, barWidth, barHeight)

  let x = barWidth
  const sliceWidth = ((WIDTH - barWidth) * 1.0) / bufferLength

  for (let i = 0; i < bufferLength; i++) {
    let y = (dataArray[i] * HEIGHT) / 256

    if (i === 0) {
      canvasCtx.moveTo(x, y)
    } else {
      canvasCtx.lineTo(x, y)
    }

    x += sliceWidth
  }

  canvasCtx.lineTo(WIDTH, HEIGHT / 2)
  canvasCtx.stroke()
}
