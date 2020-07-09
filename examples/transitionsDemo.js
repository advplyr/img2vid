exports.input = {
  slides: [
    {
      path: 'examples/exampleData/squirrel.jpg',
      duration: 1,
      transition: {
        type: 'wipeleft',
        duration: 1
      }
    },
    {
      path: 'examples/exampleData/cassettes.jpg',
      duration: 2,
      transition: {
        type: 'pixelize',
        duration: 1
      }
    },
    {
      path: 'examples/exampleData/mouse.jpg',
      duration: 2,
      transition: {
        type: 'fade',
        duration: 1
      }
    },
    {
      path: 'examples/exampleData/cassettes.jpg',
      duration: 2,
      transition: {
        type: 'slideup',
        duration: 1
      }
    },
    {
      path: 'examples/exampleData/squirrel.jpg',
      duration: 1
    }
  ],
  captions: [
    {
      text: 'WipeLeft',
      start: 0,
      end: 2,
      style: {
        fontSize: 40,
        lineAlignment: 'middle center'
      }
    },
    {
      text: 'Pixelize',
      start: 2,
      end: 4,
      style: {
        fontSize: 40,
        lineAlignment: 'middle center'
      }
    },
    {
      text: 'Fade',
      start: 4,
      end: 6,
      style: {
        fontSize: 40,
        lineAlignment: 'middle center'
      }
    },
    {
      text: 'SlideUp',
      start: 6,
      end: 8,
      style: {
        fontSize: 40,
        lineAlignment: 'middle center'
      }
    },
    {
      text: 'Img2Vid',
      start: 0,
      end: 9,
      style: {
        lineAlignment: 'bottom right'
      }
    }
  ],
  width: 640,
  height: 419,
  output: 'examples/outputs/transitions.webp',
  forceScale: true,
  genpalette: true,
  assOutput: 'examples/outputs/transitions.ass'
}
