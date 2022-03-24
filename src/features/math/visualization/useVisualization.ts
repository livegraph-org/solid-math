import { drag } from 'd3-drag'
import { select } from 'd3-selection'
import { zoom } from 'd3-zoom'
import numeric from 'numeric'
import React, { useCallback, useEffect, useRef } from 'react'
import { drawGraph, drawGrid } from './helpers/draw'
import { Grid, Matrix, Vector, VisualizationGraph } from './types'

type Props = Partial<React.CanvasHTMLAttributes<HTMLCanvasElement>> & {
  graph: VisualizationGraph
  grid: Grid
  onTransform: (matrix: Matrix) => void
  canvasRef: React.RefObject<HTMLCanvasElement>
  width: number
  height: number
}

const useVisualization = ({
  graph,
  grid,
  onTransform,
  canvasRef,
  width,
  height,
}: Props) => {
  const prevZoom = useRef<Matrix>()

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
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
  }, [width, height, graph, canvasRef, grid])

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      select(canvasRef.current).call(
        drag<HTMLCanvasElement, unknown>()
          .clickDistance(2)
          .on('start drag end', e => {
            onTransform([
              [1, 0, e.dx],
              [0, 1, e.dy],
              [0, 0, 1],
            ])
          }),
      )

      select(canvasRef.current).call(
        zoom<HTMLCanvasElement, unknown>()
          .clickDistance(2)
          .scaleExtent([0.05, 3])
          .on('zoom', e => {
            prevZoom.current = prevZoom.current ?? [
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

            const transform = numeric.dot(
              zoom,
              numeric.inv(prevZoom.current),
            ) as Matrix
            prevZoom.current = zoom

            onTransform(transform)
          }),
      )
    }
  }, [canvasRef, onTransform, height, width])

  const withCanvasPosition = useCallback(
    (
        func: (position: Vector) => void,
      ): React.MouseEventHandler<HTMLCanvasElement> =>
      e => {
        // https://stackoverflow.com/a/42111623
        if (canvasRef && canvasRef.current) {
          const rect = canvasRef.current.getBoundingClientRect()
          const x = e.clientX - rect.left //x position within the element.
          const y = e.clientY - rect.top //y position within the element.
          func([x - width / 2, y - height / 2])
        }
      },
    [width, height, canvasRef],
  )

  return withCanvasPosition
}

export default useVisualization
