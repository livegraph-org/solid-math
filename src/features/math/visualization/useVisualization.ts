import { select } from 'd3-selection'
import { zoom } from 'd3-zoom'
import React, { useCallback, useEffect } from 'react'
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
  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        context.save()
        context.clearRect(0, 0, width, height)
        drawGrid(context, grid, width, height)
        drawGraph(context, graph)
        return () => context.restore()
      }
    }
  }, [width, height, graph, canvasRef, grid])

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      select(canvasRef.current).call(
        zoom<HTMLCanvasElement, unknown>()
          .clickDistance(2)
          .scaleExtent([0.05, 3])
          .on('zoom', e => {
            const { x, y, k } = e.transform

            const zoom = [
              [k, 0, x],
              [0, k, y],
              [0, 0, 1],
            ]

            onTransform(zoom)
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

          func([x, y])
        }
      },
    [canvasRef],
  )

  return withCanvasPosition
}

export default useVisualization
