# img2vid [![npm version](https://badge.fury.io/js/img2vid.svg)](https://badge.fury.io/js/img2vid)

Generate videos or gifs from images. Includes captions, audio, transitions and zoompan.

<img src="https://raw.githubusercontent.com/mcoop320/img2vid/master/examples/outputs/transitions.webp" width="100%" align="center" />

## Requires

**[ffmpeg](http://ffmpeg.org)** with `--enable-libass`

## Install

```bash
npm install img2vid
```

## Example Usage

```js
var img2vid = require('img2vid')
var payload = {
  slides: [
    {
      path: 'examples/exampleData/squirrel.jpg',
      duration: 2
    },
    {
      path: 'examples/exampleData/cassettes.jpg',
      duration: 2
    },
    {
      path: 'examples/exampleData/mouse.jpg',
      duration: 2
    }
  ],
  captions: [
    {
      text: 'Img2Vid',
      start: 0,
      end: 6
    }
  ],
  width: 640,
  height: 419,
  output: 'examples/outputs/simple.webp',
  assOutput: 'examples/outputs/simple.ass',
  forceScale: true
}
img2vid.render(payload)
```


## Options
| key        | required             | default    | type     | description                                  |
|------------|----------------------|------------|----------|----------------------------------------------|
| slides     | Y                    |            | [Object] | [See Slide Options](#slide-options)          |
| captions   | N                    |            | [Object] | [See Caption Options](#caption-options)      |
| width      | Y                    | 640        | Number   | Pixels                                       |
| height     | Y                    | 480        | Number   | Pixels                                       |
| output     | Y                    | output.mp4 | String   | filepath.[mp4/gif/webp]                      |
| forceScale | N                    | false      | Boolean  | Use if input images are different sizes      |
| duration   | N                    |            | Number   | Output Duration                              |
| assOutput  | Y iff using captions | subs.ass   | String   | ASS File Output - filepath.ass               |
| hardSub    | N                    | true       | Boolean  | Render captions over output                  |
| audio      | N                    |            | String   | Path to audio file                           |
| genpalette | N                    | false      | Boolean  | Generate color palette for Gifs/Webp outputs |
| gifLoop    | N                    | true       | Boolean  | Continually loop Gifs/Webp outputs           |
| verbose    | N                    | true       | Boolean  | Show Logs                                    |


## Slide Options
| key        | required | default | type   | description                                   |
|------------|----------|---------|--------|-----------------------------------------------|
| path       | Y        |         | String | image filepath                                |
| duration   | Y        | 2       | Number | Seconds                                       |
| transition | N        |         | Object | [See Transition Options](#transition-options) |
| zoomPan    | N        |         | Object | [See ZoomPan Options](#zoompan-options)       |


## Transition Options
| key      | required | default | type   | description                                               |
|----------|----------|---------|--------|-----------------------------------------------------------|
| type     | Y        |         | String | [See Available Transitions](#available-slide-transitions) |
| duration | Y        | 1       | Number | Seconds to transition                                     |


## ZoomPan Options
| key         | required | default | type          | description                          |
|-------------|----------|---------|---------------|--------------------------------------|
| startTime   | N        | 0       | Number        | Seconds from start of slide          |
| endTime     | Y        |         | Number        | Seconds to finish ZP                 |
| zoomStart   | N        | 1       | Number        | Scale Factor to Start                |
| zoomEnd     | Y        | 1       | Number        | Scale Factor to End                  |
| xStart      | N        | 0       | Number        | Start X Position                     |
| yStart      | N        | 0       | Number        | Start Y Position                     |
| xEnd        | Y        | 0       | Number        | End X Position                       |
| yEnd        | Y        | 0       | Number        | End Y Position                       |
| jitterScale | N        | 2       | Number\|False | Temp scale image up to reduce jitter |


## Caption Options
| key        | required | default | type   | description                                 |
|------------|----------|---------|--------|---------------------------------------------|
| text       | Y        |         | String | image filepath                              |
| start      | Y        | 0       | Number | Seconds in total output                     |
| end        | Y        | 0       | Number | Seconds in total output                     |
| style      | N        |         | Object | [See Style Options](#caption-style-options) |


## Caption Style Options
| key           | alias | default  | type            | description                                                           |
|---------------|-------|----------|-----------------|-----------------------------------------------------------------------|
| fontName      | fn    | Arial    | String          | [x,y] position in pixels                                              |
| fontSize      | fs    | 28       | Number          |                                                                       |
| borderSize    | bord  | 2        | Number          |                                                                       |
| color         |       | #FFFFFF  | String          | Must be 6 char hex color                                              |
| borderColor   |       | #000000  | String          | Must be 6 char hex color                                              |
| fade          | fad   |          | [Number,Number] | [fadeIn,fadeOut] in ms                                                |
| position      | pos   |          | [Number,Number] | [x,y] in pixels                                                       |
| lineAlignment | an    | top left | String          | top,middle,bottom left,center,right                                   |
| scaleX        | fscx  | 100      | Number          | as a percentage                                                       |
| scaleY        | fscy  | 100      | Number          | as a percentage                                                       |
| animate       | t     |          | String          | [See animate string syntax](http://docs.aegisub.org/3.2/ASS_Tags/#\t) |
| move          |       |          | Number[4]       | [startX,startY,endX,endY]                                             |
| shadow        | shad  |          | Number          | depth of shadow                                                       |
| shadowColor   |       |          | String          | Must be 6 char hex color                                              |
| shadowAlpha   |       |          | String          | Must be 2 char hex alpha color                                        |
| bold          | b     | 1        | Number          | 1 or 0                                                                |

<img src="https://raw.githubusercontent.com/mcoop320/img2vid/master/examples/outputs/captions.webp" width="100%" align="center" />

## Available Slide Transitions
<a href="https://trac.ffmpeg.org/wiki/Xfade" target="_blank">View transitions types and demos</a> available from FFMPEG xfade filter.

<img src="https://raw.githubusercontent.com/mcoop320/img2vid/master/examples/outputs/basic.webp" width="100%" align="center" />