var fs = require("fs")
const assTagRenderer = require('./assTagRenderer')

// Original Script: RoRo
// Script Updated By: version 2.8.01
// Video Aspect Ratio: 0
// Video Zoom: 6
// Video Position: 0
// PlayDepth: 0
const defaultFile = `[Script Info]
Title: Img2Vid Subtitles
ScriptType: v4.00+
Collisions: Normal
PlayResY: {{height}}
PlayResX: {{width}}
Timer: 100,0000

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: t1, Nectar,28,&H00B4FCFC,&H00B4FCFC,&H00000008,&H80000008,-1,0,0,0,100,100,0.00,0.00,1,0.00,0.00,2,0,0,0,0
Style: t2, Nectar Regular,28,&H00B4FCFC,&H00B4FCFC,&H00000008,&H80000008,-1,0,0,0,100,100,0.00,0.00,1,1.00,2.00,2,30,30,30,0
Style: t3, Nectar Bold,28,&H00B4FCFC,&H00B4FCFC,&H00000008,&H80000008,-1,0,0,0,100,100,0.00,0.00,1,0.00,0.00,2,30,30,30,0
Style: t4, Nectar Light,28,&H00B4FCFC,&H00B4FCFC,&H00000008,&H80000008,-1,0,0,0,100,100,0.00,0.00,1,0.00,0.00,2,30,30,30,0
 
[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text`

function generateLineTags(tags) {
  let tagLine = ''
  for (const key in tags) {
    if (assTagRenderer.tagRenderer[key]) {
      const renderedTag = assTagRenderer.tagRenderer[key].rend(tags[key])
      // console.log('Got rendered tag', key, renderedTag)
      const fullBoy = '\\' + assTagRenderer.tagRenderer[key].tag + renderedTag
      // console.log('full boy', fullBoy)
      tagLine += fullBoy
    }
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
    let dialogue = `\nDialogue: 0,${String(cap.start).toHHMMSS()},${String(cap.end).toHHMMSS()},t1, NTP,0000,0000,0000,,{${tags}}${cap.text}`
    subBoy += dialogue
  })
  const fullFile = assFileContent + subBoy
  fs.writeFileSync(output, fullFile)
  return true
}

module.exports.generate = generate