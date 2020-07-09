var fs = require("fs")
const assTagRenderer = require('./assTagRenderer')

const defaultStyle = [
  'Arial',
  '28',
  '&H00FFFFFF',
  '&H00000000', // Secondary Color
  '&H00000000', // Outline Color
  '&H80000000', // Back Color
  '-1', // Bold
  '0', // Italic
  '0', // Underline
  '0', // StrikeOut
  '100', // ScaleX
  '100', // ScaleY
  '0.00', // Spacing
  '0.00', // Angle
  '1', // BorderStyle
  '2.00', // Outline
  '0.00', // Shadow
  '7', // Alignment
  '0', // MarginL
  '0', // MarginR
  '0', // MarginV
  '0' // Encoding
]

const defaultFile = `[Script Info]
Title: Img2Vid Subtitles
ScriptType: v4.00+
Collisions: Normal
PlayResY: {{height}}
PlayResX: {{width}}
Timer: 100,0000

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: t1, ${defaultStyle.join(',')}

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text`

function generateLineTags(tags) {
  let tagLine = ''
  for (const key in tags) {
    const lineTagStr = assTagRenderer.renderTag(key, tags[key])
    tagLine += lineTagStr
  }
  return tagLine
}

function formatSlideCaptions(slides) {
  const captions = []
  let totalSlideTime = 0
  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i]
    const slideDuration = slide.duration || 5
    if (slide.caption) {
      const caption = slide.caption
      const captionDelay = caption.delay || 0
      const captionDuration = slide.caption.duration || (slideDuration - captionDelay)
      const slideStart = totalSlideTime + captionDelay
      const slideEnd = slideStart + captionDuration
      captions.push({
        start: slideStart,
        end: slideEnd,
        text: caption.text,
        style: caption.style || null
      })
    }
    totalSlideTime += slideDuration
  }
  return captions
}

String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var ms = this - sec_num
  var ms_num = parseInt(ms * 100, 10)
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  // if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  if (ms_num < 10) ms_num = "0" + ms_num
  return hours + ':' + minutes + ':' + seconds + "." + ms_num;
}

function generate(width, height, output, captions) {
  const assFileContent = defaultFile.replace('{{width}}', width).replace('{{height}}', height)
  let subBoy = ''
  captions.forEach((cap) => {
    const tags = generateLineTags(cap.style)
    let dialogue = `\nDialogue: 0,${String(cap.start).toHHMMSS()},${String(cap.end).toHHMMSS()},t1,CAP,0000,0000,0000,,{${tags}}${cap.text}`
    subBoy += dialogue
  })
  const fullFile = assFileContent + subBoy
  fs.writeFileSync(output, fullFile)
  return true
}

module.exports.generate = generate