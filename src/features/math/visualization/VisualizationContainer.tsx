import classnames from 'classnames'
import numeric from 'numeric'
import React, { useCallback, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  highlight,
  select,
  selectHighlighted,
  selectPrunedGraphAndCycles,
  selectSelected,
  selectSelectedNodeDependencies,
} from '../mathSlice'
import {
  basicGrid,
  transform,
  transformGrid,
  transformLayout,
} from './helpers/transform'
import { Matrix, Vector } from './types'
import useFullSize from './useFullSize'
import useSimulation from './useSimulation'
import useVisualization from './useVisualization'

const VisualizationContainer: React.FC<
  Partial<React.HTMLAttributes<HTMLElement>>
> = props => {
  const [prunedGraph, cycles] = useAppSelector(selectPrunedGraphAndCycles)
  const highlightedNode = useAppSelector(selectHighlighted)
  const selectedNode = useAppSelector(selectSelected)
  const selectedNodeDependencies = useAppSelector(
    selectSelectedNodeDependencies,
  )
  const dispatch = useAppDispatch()

  const { simulation, layout } = useSimulation(prunedGraph)

  const canvasEl = useRef<HTMLCanvasElement>(null)
  const { width, height } = useFullSize(canvasEl)

  // transformation matrix
  const [matrix, setMatrix] = useState<Matrix>([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ])

  const transformedMatrix = numeric.dot(matrix, [
    [1, 0, width / 2],
    [0, 1, height / 2],
    [0, 0, 1],
  ]) as Matrix

  const handleTransform = useCallback((matrix: Matrix): void => {
    setMatrix(matrix)
  }, [])

  const withNode = (action: (uri: string) => unknown) => {
    return (position: Vector): void => {
      // first transform to local coordinates
      const [x, y] = transform(numeric.inv(transformedMatrix), position)
      // then find the node in simulation
      action(simulation.selectNode({ x, y })?.uri)
    }
  }

  const handleHover = withNode(
    // limit the amount of highlight actions
    // fire only when there is a uri change
    uri => highlightedNode !== uri && dispatch(highlight(uri)),
  )
  const handleSelect = withNode(
    uri => selectedNode !== uri && dispatch(select(uri)),
  )

  // transform layout to TransformedLayout
  const transformedLayout = transformLayout(
    transformedMatrix,
    layout,
    highlightedNode,
    selectedNode,
    selectedNodeDependencies,
    cycles,
  )

  const grid = transformGrid(transformedMatrix, basicGrid)

  const withCanvasPosition = useVisualization({
    graph: transformedLayout,
    grid,
    onTransform: handleTransform,
    canvasRef: canvasEl,
    width,
    height,
  })

  const handleMouseMove = withCanvasPosition(handleHover)
  const handleClick = withCanvasPosition(handleSelect)

  return (
    <canvas
      {...props}
      ref={canvasEl}
      onMouseMove={handleMouseMove}
      // @TODO this piece is very inefficient, we search for a nonexistent node, just to unhighlight everything; but it works
      onMouseOut={() => handleHover([Infinity, Infinity])}
      width={width}
      height={height}
      className={classnames(props.className, 'has-background-dark')}
      onClick={handleClick}
    />
  )
}

export default VisualizationContainer
