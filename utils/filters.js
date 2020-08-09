function getZoomPanData(zoomPan) {
  return {
    zoomStart: zoomPan.zoomStart && !isNaN(zoomPan.zoomStart) ? Number(zoomPan.zoomStart) : 1,
    zoomEnd: zoomPan.zoomEnd && !isNaN(zoomPan.zoomEnd) ? Number(zoomPan.zoomEnd) : 1,
    xStart: !isNaN(zoomPan.xStart) && zoomPan.xStart !== null ? Number(zoomPan.xStart) : 0,
    yStart: !isNaN(zoomPan.yStart) && zoomPan.yStart !== null ? Number(zoomPan.yStart) : 0,
    xEnd: !isNaN(zoomPan.xEnd) && zoomPan.xEnd !== null ? Number(zoomPan.xEnd) : 0,
    yEnd: !isNaN(zoomPan.yEnd) && zoomPan.yEnd !== null ? Number(zoomPan.yEnd) : 0,
    startTime: !isNaN(zoomPan.startTime) && zoomPan.startTime !== null ? Number(zoomPan.startTime) : 0,
    endTime: !isNaN(zoomPan.endTime) && zoomPan.endTime !== null ? Number(zoomPan.endTime) : 0,
    jitterScale: zoomPan.jitterScale === undefined ? 2 : !isNaN(zoomPan.jitterScale) ? Number(zoomPan.jitterScale) : false
  }
}

function getZoomPanFilter(zoomPan, slideDuration, width, height) {
  const { zoomStart, xStart, xEnd, yStart, yEnd, zoomEnd, startTime, endTime, jitterScale } = zoomPan

  const FPS = 25
  var EndOffset = slideDuration - endTime
  var TotalFrames = slideDuration * FPS
  var AnimFrames = TotalFrames - (startTime * FPS + EndOffset * FPS)
  var z = `if(lte(on,${startTime * FPS}),${zoomStart},if(gte(on,${endTime * FPS}),${zoomEnd},zoom+(${zoomEnd - zoomStart}/${AnimFrames})))`
  var xNormal = `iw*${xStart}+(iw/(zoom/${zoomEnd})*${xEnd - xStart})*((on-${startTime * FPS})/${AnimFrames})`
  var yNormal = `ih*${yStart}+(ih/(zoom/${zoomEnd})*${yEnd - yStart})*((on-${startTime * FPS})/${AnimFrames})`
  var x = `if(lte(on,${startTime * FPS}),(iw*${xStart}),if(gte(on,${endTime * FPS}),(iw*${xEnd}),${xNormal}))`
  var y = `if(lte(on,${startTime * FPS}),(ih*${yStart}),if(gte(on,${endTime * FPS}),(ih*${yEnd}),${yNormal}))`
  // var zoompanFilt = `scale=4000:-1,zoompan=z='${z}':x='${x}':y='${y}':d=${TotalFrames}:s=hd720`

  var jitScaleStr = ''
  if (!isNaN(jitterScale) && jitterScale !== 0) {
    var jitScaleFactor = jitterScale === undefined ? 2 : jitterScale
    jitScaleStr = `scale=${width * jitScaleFactor}:${height * jitScaleFactor},`
  }
  var zoompanFilt = `${jitScaleStr}zoompan=z='${z}':x='${x}':y='${y}':d=${TotalFrames}:s=${width}x${height}`
  return zoompanFilt
}

function getTransition(slide, i, slideStart, lastOutput, nextInput) {
  let transition = slide.transition
  if (!transition || !transition.type || transition.type === 'none') {
    transition = {
      type: 'fade',
      duration: 0
    }
  }

  let slideEnd = slideStart + slide.duration
  let type = transition.type
  let duration = isNaN(transition.duration) || transition.duration === null ? Math.min(slide.duration / 2, 1) : Number(transition.duration)
  let offset = slideEnd - duration
  if (offset < slideStart) {
    console.warn('Invalid transition duration too big', duration)
    offset = slideStart
  } else if (offset > slideEnd) {
    console.warn('Invalid transition duration too small', duration)
    offset = slideStart + Math.min((slide.duration / 2), 1)
  }

  let complexFilter = `[${lastOutput}][${nextInput}]xfade=transition=${type}:duration=${duration}:offset=${offset}[v${i + 1}]`
  return { complexFilter, transDuration: duration }
}

function generateFilters(slides, forceScale, width, height) {
  let slideStart = 0
  let lastOutputTag = ''

  const complexFilters = []

  const hasTransitions = slides.find(s => s.transition && s.transition.duration > 0)
  const hasZoomPans = slides.find(s => !!s.zoomPan)

  // ZoomPans
  if (hasZoomPans) {
    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i]
      const zoomPan = slide.zoomPan ? getZoomPanData(slide.zoomPan) : null
      if (zoomPan) {
        const zoomPanFilt = `[${i}:v]${getZoomPanFilter(zoomPan, slide.duration, width, height)},settb=AVTB[${i}zp]`
        complexFilters.push(zoomPanFilt)
      } else {
        // Workaround: When some images are scaled they cannot be xfade'ed with images that are not scaled.
        // TODO: possibly big performance hit for doing this
        // const zoomPanFilt = `[${i}]scale=-1:-1[${i}zp]`
        const zoomPanFilt = `[${i}:v]settb=AVTB,scale=${width}:${height}[${i}zp]`
        complexFilters.push(zoomPanFilt)
      }
      slide.inputTag = `${i}zp`
      lastOutputTag = slide.inputTag
    }
  } else if (forceScale) {
    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i]
      // TODO: Test performance hit of timebase
      let scaleFilt = `[${i}:v]settb=AVTB,scale=${width}:${height}[${i}s]`
      complexFilters.push(scaleFilt)
      slide.inputTag = `${i}s`
      lastOutputTag = slide.inputTag
    }
  }

  let lastTrans = 0
  let totalDuration = 0
  let lastOutput = slides[0].inputTag || '0'
  for (let i = 0; i < slides.length - 1; i++) {
    let nextInput = slides[i + 1].inputTag || String(i + 1)
    const { complexFilter, transDuration } = getTransition(slides[i], i, slideStart, lastOutput, nextInput)

    complexFilters.push(complexFilter)
    lastOutput = `v${i + 1}`
    slideStart += (slides[i].duration)
    if (slides[i].isVideo) {
      slideStart -= transDuration
    }
    if (slides.length - 2 === i) {
      lastTrans = transDuration
    }
  }
  if (slides.length > 1) {
    lastOutputTag = `v${slides.length - 1}`
  }
  totalDuration = slideStart + (slides[slides.length - 1].duration)

  return {
    totalDuration: totalDuration,
    complexFilters: complexFilters,
    lastTransitionDuration: lastTrans,
    lastOutputTag
  }
}

exports.generateFilters = generateFilters
