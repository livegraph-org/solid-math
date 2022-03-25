import { Vector, Grid, VisualizationGraph } from '../types'
import numeric from 'numeric'

type Options = Partial<CanvasRenderingContext2D>

const drawText = (
  context: CanvasRenderingContext2D,
  [x, y]: Vector,
  text: string,
  options: Options,
) => {
  context.font = '20px Arial'
  context.textBaseline = 'middle'
  context.textAlign = 'left'
  // context.fillStyle = '#fff7'
  Object.assign(context, options)
  context.fillText(text, x, y)
}

const drawCircle = (
  context: CanvasRenderingContext2D,
  [x, y]: Vector,
  radius: number,
  options: Options,
) => {
  Object.assign(context, options)
  context.beginPath()
  context.arc(x, y, radius, 0, 2 * Math.PI)
  context.fill()
}

const drawLine = (
  context: CanvasRenderingContext2D,
  start: Vector,
  end: Vector,
  options: Options,
) => {
  Object.assign(context, options)

  context.beginPath()
  context.moveTo(...start)
  context.lineTo(...end)
  context.stroke()
}

export const drawGraph = (
  context: CanvasRenderingContext2D,
  graph: VisualizationGraph,
) => {
  graph.links.forEach(link => {
    // we're counting a unit vector to make links that don't overlap nodes
    // source point
    const s = [link.source.x, link.source.y]
    // target point
    const t = [link.target.x, link.target.y]
    // vector
    const v = numeric.sub(t, s)
    // vector size
    const size = Math.sqrt(v[0] ** 2 + v[1] ** 2)
    // unit vector
    const i = numeric.div(v, size)
    drawLine(
      context,
      // links don't overlap circles
      numeric.add(s, numeric.mul(i, link.source.r)) as Vector,
      numeric.sub(t, numeric.mul(i, link.target.r)) as Vector,
      {
        strokeStyle: link.style === 'error' ? 'red' : 'white',
        lineWidth: 0.5,
      },
    )
  })

  const color = {
    accent: 'violet',
    focus: 'red',
    focus2: 'pink',
    rest: {
      node: '#fff8',
      label: '#fff4',
    },
  }

  const accented = graph.nodes.filter(({ style }) => style === 'accent')
  const focused = graph.nodes.filter(({ style }) => style === 'focus')
  const focused2 = graph.nodes.filter(({ style }) => style === 'focus2')
  const rest = graph.nodes.filter(({ style }) => !style)

  // draw all the nodes which are not special
  rest.forEach(({ x, y, r }) =>
    drawCircle(context, [x, y], r, { fillStyle: color.rest.node }),
  )

  rest.forEach(({ x, y, r, label }) =>
    drawText(context, [x + r + 5, y], label, {
      fillStyle: color.rest.label,
    }),
  )

  // draw focused nodes
  focused2.forEach(({ x, y, r }) =>
    drawCircle(context, [x, y], r, { fillStyle: color.focus2 }),
  )

  focused2.forEach(({ x, y, r, label }) =>
    drawText(context, [x + r + 5, y], label, { fillStyle: color.focus2 }),
  )

  // draw focused nodes
  focused.forEach(({ x, y, r }) =>
    drawCircle(context, [x, y], r, { fillStyle: color.focus }),
  )

  focused.forEach(({ x, y, r, label }) =>
    drawText(context, [x + r + 5, y], label, { fillStyle: color.focus }),
  )

  // draw accented nodes
  accented.forEach(({ x, y, r }) =>
    drawCircle(context, [x, y], r, { fillStyle: color.accent }),
  )

  accented.forEach(({ x, y, r, label }) =>
    drawText(context, [x + r + 5, y], label, {
      fillStyle: color.accent,
    }),
  )
}

export const drawGrid = (
  context: CanvasRenderingContext2D,
  grid: Grid,
  width: number,
  height: number,
) => {
  const strokeStyle = '#fff2'
  const min1 = 0
  const max1 = height
  const min0 = 0
  const max0 = width

  const getLineWidth = (i: number) =>
    i === 0 ? 2 : i % grid.highlight === 0 ? 1 : 0.5

  let i = 0
  while (i * grid.distance + grid.origin[0] <= max0) {
    const x = i * grid.distance + grid.origin[0]
    if (x >= min0) {
      drawLine(context, [x, min1], [x, max1], {
        strokeStyle,
        lineWidth: getLineWidth(i),
      })
    }
    i++
  }

  i = -1
  while (i * grid.distance + grid.origin[0] >= min0) {
    const x = i * grid.distance + grid.origin[0]
    if (x <= max0) {
      drawLine(context, [x, min1], [x, max1], {
        strokeStyle,
        lineWidth: getLineWidth(i),
      })
    }
    i--
  }

  i = 0
  while (i * grid.distance + grid.origin[1] <= max1) {
    const y = i * grid.distance + grid.origin[1]
    if (y >= min1) {
      drawLine(context, [min0, y], [max0, y], {
        strokeStyle,
        lineWidth: getLineWidth(i),
      })
    }
    i++
  }

  i = -1
  while (i * grid.distance + grid.origin[1] >= min1) {
    const y = i * grid.distance + grid.origin[1]
    if (y <= max1) {
      drawLine(context, [min0, y], [max0, y], {
        strokeStyle,
        lineWidth: getLineWidth(i),
      })
    }
    i--
  }
}
