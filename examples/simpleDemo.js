exports.input = {
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
      end: 6,
      style: {
        lineAlignment: 'bottom right'
      }
    }
  ],
  width: 640,
  height: 419,
  output: 'examples/outputs/simple.webp',
  assOutput: 'examples/outputs/simple.ass',
  forceScale: true
}
