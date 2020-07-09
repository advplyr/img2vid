exports.input = {
  slides: [
    {
      path: 'examples/exampleData/squirrel.jpg',
      duration: 3,
      transition: {
        type: 'wipeleft',
        duration: 1
      }
    },
    {
      path: 'examples/exampleData/cassettes.jpg',
      duration: 3,
      zoomPan: {
        endTime: 2.5,
        startTime: 1,
        xEnd: 0.335,
        yEnd: 0.335,
        xStart: 0,
        yStart: 0,
        zoomStart: 1,
        zoomEnd: 6,
        jitterFactor: 4
      }
    },
    {
      path: 'examples/exampleData/cassettes.jpg',
      duration: 3,
      zoomPan: {
        endTime: 2,
        startTime: 0,
        xEnd: 0.66,
        yEnd: 0.66,
        xStart: 0.335,
        yStart: 0.335,
        zoomStart: 6,
        zoomEnd: 6
      }
    }
  ],
  captions: [
    {
      text: 'Squirrel',
      start: 0,
      end: 3,
      style: {
        // position: [10, 10],
        move: [25, 300, 320, 300],
        fontSize: 50,
        fontName: 'Arial',
        color: '#FFFFFF',
        borderSize: 2,
        borderColor: '#000000',
        bold: true,
        lineAlignment: 'top center',
        fade: [500, 1000]
      }
    },
    {
      text: 'Cool Cassettes!',
      start: 2.5,
      end: 8,
      style: {
        move: [0, 0, 320, 180, 0, 2000],
        fontSize: 40,
        fontName: 'Arial',
        color: '#000000',
        bold: true,
        lineAlignment: 'middle center',
        fade: [0, 500],
        animate: `0,2000,0.5,\\frz720`,
        shadow: 3,
        shadowColor: '#FFFFFF',
        shadowAlpha: '44'
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
  output: 'examples/outputs/basic.webp',
  assOutput: 'examples/outputs/basic.ass'
}