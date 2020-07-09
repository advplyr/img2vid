exports.input = {
  slides: [
    {
      path: 'examples/exampleData/squirrel.jpg',
      duration: 5
    }
  ],
  captions: [
    {
      text: 'No Styles',
      start: 0,
      end: 5
    },
    {
      text: 'lineAlignment: middle center',
      start: 0,
      end: 5,
      style: {
        lineAlignment: 'middle center'
      }
    },
    {
      text: 'lineAlignment: top right',
      start: 0,
      end: 5,
      style: {
        lineAlignment: 'top right'
      }
    },
    {
      text: 'pos: [50,100]',
      start: 0,
      end: 5,
      style: {
        pos: [50, 100]
      }
    },
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
    },
    {
      text: 'move: [0, 375, 200, 300]',
      start: 0,
      end: 5,
      style: {
        move: [0, 375, 200, 300],
        lineAlignment: 'bottom left'
      }
    },
    {
      text: 'fade: [1000,2000]',
      start: 0,
      end: 5,
      style: {
        lineAlignment: 'bottom center',
        fade: [1000, 2000]
      }
    },
    {
      text: 'Img2Vid',
      start: 0,
      end: 5,
      style: {
        fontSize: 18,
        lineAlignment: 'bottom right'
      }
    }
  ],
  width: 640,
  height: 419,
  output: 'examples/outputs/captions.webp',
  assOutput: 'examples/outputs/captions.ass'
}