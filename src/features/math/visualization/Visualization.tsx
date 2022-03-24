import classnames from 'classnames'
import React, { useRef } from 'react'
import { Grid, Matrix, Vector, VisualizationGraph } from './types'
import useFullSize from './useFullSize'
import useVisualization from './useVisualization'

type Props = Partial<React.CanvasHTMLAttributes<HTMLCanvasElement>> & {
  graph: VisualizationGraph
  grid: Grid
  onTransform: (matrix: Matrix) => void
  onHover: (position: Vector) => void
  onSelectNode: (position: Vector) => void
}

const Visualization: React.FC<Props> = ({
  graph,
  grid,
  onTransform,
  onHover,
  onSelectNode,
  ...props
}: Props) => {
  const canvasEl = useRef<HTMLCanvasElement>(null)
  const { width, height } = useFullSize(canvasEl)

  const withCanvasPosition = useVisualization({
    graph,
    grid,
    onTransform,
    canvasRef: canvasEl,
    width,
    height,
  })

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
