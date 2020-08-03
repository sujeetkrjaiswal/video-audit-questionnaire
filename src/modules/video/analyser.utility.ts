export function setupAnalyser(currentVideoRef: HTMLVideoElement) {
  const audioContext = new AudioContext()
  const source = audioContext.createMediaElementSource(currentVideoRef)
  const analyser2048 = audioContext.createAnalyser()
  const analyser256 = audioContext.createAnalyser()
  analyser256.fftSize = 256
  source.connect(analyser2048)
  analyser2048.connect(analyser256)
  analyser256.connect(audioContext.destination)
  return { audioContext, analyser2048, analyser256 }
}

export function getRMS(dataArr: Uint8Array) {
  const sqSum = dataArr.reduce((agg, data) => {
    return agg + data * data
  }, 0)
  return Math.sqrt(sqSum / dataArr.length)
}

export function getRMSForNums(dataArr: number[]) {
  const sqSum = dataArr.reduce((agg, data) => {
    return agg + data * data
  }, 0)
  return Math.sqrt(sqSum / dataArr.length)
}
