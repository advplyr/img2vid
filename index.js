const ffmpeg = require('fluent-ffmpeg')
const assgen = require('./utils/generateAssFile')
const filters = require('./utils/filters')

function renderVideo(vid, output, verbose) {
  return new Promise((resolve, reject) => {
    vid.on('start', (cmd) => {
      if (verbose) console.log('FFMPEG Command: ' + cmd)
    })
    vid.on('end', () => {
      resolve()
    })
    vid.on('error', (error) => {
      reject(error)
    })
    vid.save(output)
  })
}

async function generate(input) {
  const audioFile = input.audio
  const slides = input.slides
  const duration = input.duration
  const captions = input.captions
  const output = input.output || 'output.mp4'
  const assFile = input.assOutput || 'subs.ass'
  const videoWidth = input.width || 640
  const videoHeight = input.height || 480
  const forceScale = !!input.forceScale
  const videoCodec = input.videoCodec || 'libx264'
  const genpalette = !!input.genpalette
  const gifLoop = input.gifLoop === undefined ? true : !!input.gifLoop
  const otherOutputOptions = input.otherOutputOptions || null
  const hardSub = input.hardSub === undefined || !!input.hardSub
  const verbose = input.verbose === undefined || !!input.verbose
  const watermark = input.watermark || false

  const startTime = Date.now()

  const isImageOutput = output.endsWith('.gif') || output.endsWith('.webp')
  const hasCaptions = captions && captions.length > 0

  if (hasCaptions && assFile) {
    if (!assgen.generate(videoWidth, videoHeight, assFile, captions)) {
      console.log('Failed to gen ass file')
      return false
    }
  }

  const vid = ffmpeg()
  let numSlides = slides.length

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i]
    if (!slide.duration || isNaN(slide.duration)) {
      slide.duration = 1
    } else {
      slide.duration = Number(slide.duration)
    }
  }

  let { totalDuration, complexFilters, lastTransitionDuration, lastOutputTag } = filters.generateFilters(slides, forceScale, videoWidth, videoHeight)

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i]
    vid.input(slide.path)
    const inputOptions = ['-loop 1']
    if (i === slides.length - 1) {
      inputOptions.push('-t ' + (slide.duration + lastTransitionDuration))
    }
    vid.inputOptions(inputOptions)
  }

  let _scale = ''
  if (input.width && input.height) {
    _scale = `,scale=${input.width}:${input.height}`
  }
  let inputTag = lastOutputTag ? `[${lastOutputTag}]` : ''
  let scaleFormatFilter = `${inputTag}format=yuv420p${_scale}[v]`
  let lastOutput = 'v'
  complexFilters.push(scaleFormatFilter)

  // Color Palette gen for gif
  if (genpalette && isImageOutput) {
    complexFilters.push('[v]split[a][b]')
    complexFilters.push('[a]palettegen[p]')
    complexFilters.push('[b][p]paletteuse[vp]')
    lastOutput = 'vp'
  }

  // Scale and overlay watermark
  let watermarkAdded = false
  if (watermark && watermark.path) {
    vid.input(watermark.path)
    const indexOfWatermark = numSlides
    const width = watermark.width && !isNaN(watermark.width) ? watermark.width : 100
    const height = watermark.height && !isNaN(watermark.height) ? watermark.height : -1
    const x = watermark.x && !isNaN(watermark.x) ? watermark.x : 10
    const y = watermark.y && !isNaN(watermark.y) ? watermark.y : 10
    complexFilters.push(`[${indexOfWatermark}]scale=${width}:${height}[watermark]`)
    complexFilters.push(`[${lastOutput}][watermark]overlay=${x}:${y}[vw]`)
    lastOutput = 'vw'
    watermarkAdded = true
  }

  // Audio Input
  if (audioFile && !isImageOutput) {
    vid.input(audioFile)
    vid.audioCodec('aac')
    vid.audioBitrate('192k')
  }

  // Subtitle Filter
  if (hasCaptions && assFile && hardSub) {
    let subtitleFilt = `[${lastOutput}]ass=${assFile}[vf]`
    complexFilters.push(subtitleFilt)
    lastOutput = 'vf'
  }

  vid.complexFilter(complexFilters)

  if (!isImageOutput) { // Only add vcodec for videos
    vid.videoCodec(videoCodec)
  }

  const outputOptions = []
  outputOptions.push(`-map [${lastOutput}]`)

  if (audioFile && !isImageOutput) {
    const audioIndexOffset = watermarkAdded ? 1 : 0
    const audioIndex = numSlides + audioIndexOffset
    outputOptions.push(`-map ${audioIndex}:a`)
  }
  let videoDuration = Number(duration) || totalDuration
  outputOptions.push('-t ' + videoDuration)
  outputOptions.push('-y')
  if (isImageOutput) {
    outputOptions.push('-loop ' + (gifLoop ? 0 : 1))
  }

  if (otherOutputOptions && Object.prototype.toString.call(otherOutputOptions) === "[object String]") {
    outputOptions.push(otherOutputOptions)
  } else if (otherOutputOptions && otherOutputOptions.length) {
    outputOptions.push(...otherOutputOptions)
  }
  vid.outputOptions(outputOptions)

  let success = true
  try {
    await renderVideo(vid, output, verbose)
  } catch (error) {
    console.error('Failed to render', error)
    success = false
  }
  const renderDur = Date.now() - startTime
  if (verbose) console.log('Render Time: ' + (renderDur / 1000).toFixed(2) + 's')
  return success
}
exports.render = generate