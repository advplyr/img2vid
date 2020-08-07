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
      text: 'Caption & Watermark',
      start: 0,
      end: 6,
      style: {
        lineAlignment: 'middle center'
      }
    }
  ],
  width: 640,
  height: 420,
  output: 'examples/outputs/simple.webp',
  assOutput: 'examples/outputs/simple.ass',
  forceScale: true,
  watermark: {
    path: 'examples/exampleData/FotoshoLogo.png',
    width: 125,
    height: -1,
    x: (640 - 125 - 10),
    y: 385
  }
}
