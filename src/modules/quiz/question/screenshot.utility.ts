export function getScreenshot(video: HTMLVideoElement): string | null {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const w = video.videoWidth
  const h = video.videoHeight
  canvas.width = w
  canvas.height = h
  if (context) {
    context.fillRect(0, 0, w, h)
    context.drawImage(video, 0, 0, w, h)
    const dataUrl = canvas.toDataURL()
    console.log(dataUrl)
    console.log(canvas, video)
    canvas.toBlob(function (blob) {
      console.log('blob', blob)
    })
    return dataUrl
  }
  return null
}
