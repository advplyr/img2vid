const vertAligns = ['bottom', 'middle', 'top']
const horizAligns = ['left', 'center', 'right']

const cleanColor = (v) => {
  const col = (v.startsWith('#')) ? v.substr(1) : v
  const cvs = col.split('')
  if (cvs.length >= 6) {
    return `${cvs[4]}${cvs[5]}${cvs[2]}${cvs[3]}${cvs[0]}${cvs[1]}`
  } else {
    return col
  }
}

const tagAliases = {
  'fn': 'fontName',
  'fs': 'fontSize',
  'bord': 'borderSize',
  'borderWidth': 'borderSize',
  'pos': 'position',
  'alignment': 'lineAlignment',
  'an': 'lineAlignment',
  'b': 'bold',
  'i': 'italics',
  'u': 'underline',
  's': 'strikeout',
  'shad': 'shadow',
  'fad': 'fade',
  'fscx': 'scaleX',
  'fscy': 'scaleY',
  't': 'animate'
}

const tagRenderer = {
  'fontName': {
    tag: 'fn'
  },
  'fontSize': {
    tag: 'fs'
  },
  'borderSize': {
    tag: 'bord'
  },
  'color': {
    tag: '1c',
    rend: (v) => `&H${cleanColor(v)}&`
  },
  'borderColor': {
    tag: '3c',
    rend: (v) => `&H${cleanColor(v)}&`
  },
  'fade': {
    tag: 'fad',
    rend: (v) => '(' + v.join(',') + ')'
  },
  'position': {
    tag: 'pos',
    rend: (v) => `(${v.join(',')})`
  },
  'lineAlignment': {
    tag: 'an',
    rend: (v) => {
      const vertHoriz = v.split(' ')
      const vertIndex = vertAligns.findIndex(va => va === vertHoriz[0])
      const horizIndex = horizAligns.findIndex(ha => ha === vertHoriz[1])
      return 1 + (vertIndex * 3) + horizIndex
    }
  },
  'scaleX': {
    tag: 'fscx'
  },
  'scaleY': {
    tag: 'fscy'
  },
  'animate': {
    tag: 't',
    rend: (v) => `(${v})`
  },
  'move': {
    tag: 'move',
    rend: (v) => `(${v.join(',')})`
  },
  'shadow': {
    tag: 'shad'
  },
  'shadowColor': {
    tag: '4c',
    rend: (v) => `&H${cleanColor(v)}&`
  },
  'shadowAlpha': {
    tag: '4a',
    rend: (v) => `&H${v}&`
  },
  'bold': {
    tag: 'b',
    rend: (v) => !isNaN(v) ? Number(v) : 0
  },
  'italics': {
    tag: 'i',
    rend: v => !isNaN(v) ? Number(v) : 0
  },
  'underline': {
    tag: 'u',
    rend: v => !isNaN(v) ? Number(v) : 0
  },
  'strikeout': {
    tag: 's',
    rend: v => !isNaN(v) ? Number(v) : 0
  }
}

function renderTag(key, val) {
  if (!tagRenderer[key]) {
    if (tagAliases[key]) {
      key = tagAliases[key]
    } else {
      return ''
    }
  }
  const tag = tagRenderer[key].tag

  let renderedValue = val
  if (tagRenderer[key].rend) {
    renderedValue = tagRenderer[key].rend(val)
  }

  return '\\' + tag + renderedValue
}

module.exports.renderTag = renderTag