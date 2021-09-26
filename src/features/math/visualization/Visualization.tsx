import React, { useRef, useEffect, useState } from 'react'
import { drawGrid, drawGraph } from './helpers/draw'
import classnames from 'classnames'
import { drag } from 'd3-drag'
import { zoom } from 'd3-zoom'
import { select } from 'd3-selection'
import numeric from 'numeric'
import { VisualizationGraph, Vector, Grid, Matrix } from './types'

type Props = Partial<React.CanvasHTMLAttributes<HTMLCanvasElement>> & {
  graph: VisualizationGraph
  grid: Grid
  onTransform: (matrix: Matrix) => void
  onHover: (position: Vector) => void
  onSelectNode: (position: Vector) => void
}

let old: Matrix

const Visualization: React.FC<Props> = ({
  graph,
  grid,
  onTransform,
  onHover,
  onSelectNode,
  ...props
}: Props) => {
  const canvasEl = useRef<HTMLCanvasElement>(null)
  const [{ width, height }, setVisualizationSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    if (canvasEl && canvasEl.current) {
      const context = canvasEl.current.getContext('2d')
      if (context) {
        const offset: Vector = [width / 2, height / 2]
        context.save()
        context.translate(...offset)
        context.clearRect(-offset[0], -offset[1], width, height)
        drawGrid(context, grid, width, height, offset)
        drawGraph(context, graph)
        return () => context.restore()
      }
    }
  }, [width, height, graph, canvasEl, grid])

  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasEl && canvasEl.current) {
        const size = getElementSize(canvasEl)
        setVisualizationSize(size)
      }
    }

    updateCanvasSize()
    window.addEventListener('load', updateCanvasSize)
    window.addEventListener('resize', updateCanvasSize)

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      window.removeEventListener('load', updateCanvasSize)
    }
  }, [width, height, canvasEl])

  useEffect(() => {
    if (canvasEl && canvasEl.current) {
      select(canvasEl.current).call(
        drag<HTMLCanvasElement, unknown>()
          .clickDistance(2)
          //.on('start', console.log)
          .on('drag', e => {
            onTransform([
              [1, 0, e.dx],
              [0, 1, e.dy],
              [0, 0, 1],
            ])
          }),
        //.on('end', console.log),
      )

      select(canvasEl.current).call(
        zoom<HTMLCanvasElement, unknown>()
          .clickDistance(2)
          .scaleExtent([0.05, 3])
          .on('zoom', e => {
            old = old ?? [
              [1, 0, -width / 2],
              [0, 1, -height / 2],
              [0, 0, 1],
            ]
            const { x, y, k } = e.transform

            const zoom = [
              [k, 0, x - width / 2],
              [0, k, y - height / 2],
              [0, 0, 1],
            ]

            const transform = numeric.dot(zoom, numeric.inv(old)) as Matrix
            old = zoom

            onTransform(transform)
          }),
      )
    }
  }, [canvasEl, onTransform, height, width])

  const withCanvasPosition =
    (
      func: (position: Vector) => void,
    ): React.MouseEventHandler<HTMLCanvasElement> =>
    e => {
      // https://stackoverflow.com/a/42111623
      if (canvasEl && canvasEl.current) {
        const rect = canvasEl.current.getBoundingClientRect()
        const x = e.clientX - rect.left //x position within the element.
        const y = e.clientY - rect.top //y position within the element.
        func([x - width / 2, y - height / 2])
      }
    }

  const handleMouseMove = withCanvasPosition(onHover)
  const handleClick = withCanvasPosition(onSelectNode)

  return (
    <canvas
      {...props}
      ref={canvasEl}
      onMouseMove={handleMouseMove}
      // @TODO this piece is very inefficient, we search for a nonexistent node, just to unhighlight everything; but it works
      onMouseOut={() => onHover([Infinity, Infinity])}
      width={width}
      height={height}
      className={classnames(props.className, 'has-background-dark')}
      onClick={handleClick}
    />
  )
}

export default Visualization

function getElementSize(elementRef: React.RefObject<HTMLCanvasElement>) {
  if (elementRef && elementRef.current) {
    const { clientHeight: height, clientWidth: width } = elementRef.current
    return { height, width }
  } else return { height: 0, width: 0 }
}