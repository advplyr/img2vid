exports.input = {
  slides: [
    {
      path: 'examples/exampleData/countdown.mp4',
      duration: 7.175,
      isVideo: true,
      transition: {
        type: 'wipeleft',
        duration: 1.5
      }
    },
    {
      path: 'examples/exampleData/mouse.jpg',
      duration: 3,
      // zoomPan: {
      //   endTime: 4,
      //   startTime: 2,
      //   xEnd: 0,
      //   yEnd: 0,
      //   xStart: 0,
      //   yStart: 0,
      //   zoomStart: 1,
      //   zoomEnd: 2,
      //   jitterFactor: 4
      // },
      transition: {
        type: 'wipeup',
        duration: 1.5
      }
    },
    {
      path: 'examples/exampleData/scene.mp4',
      duration: 7.315,
      isVideo: true,
      transition: {
        type: 'wipeleft',
        duration: 2
      }
    },
    {
      path: 'examples/exampleData/scene.mp4',
      duration: 7.315,
      isVideo: true,
      transition: {
        type: 'wipeleft',
        duration: 2
      }
    }
  ],
  captions: [
    {
      text: 'color,border,shadow',
      start: 0,
      end: 5,
      style: {
        fontSize: 30,
        pos: [350, 100],
        color: '#FF0000',
        borderSize: 4,
        borderColor: '#0000FF',
        shadow: 6,
        shadowColor: '#000000',
        shadowAlpha: '40',
        italics: 1
      }
    }
  ],
  width: 640,
  height: 420,
  output: 'examples/outputs/video.mp4',
  assOutput: 'examples/outputs/video.ass',
  forceScale: true,
  // duration: 24.805,
  watermark: {
    path: 'examples/exampleData/FotoshoLogo.png',
    width: 125,
    height: -1,
    x: (640 - 125 - 10),
    y: 385,
    alpha: 0.75
  }
}
