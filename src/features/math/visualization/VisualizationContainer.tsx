import numeric from 'numeric'
import React, { useCallback, useState } from 'react'
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
import useSimulation from './useSimulation'
import Visualization from './Visualization'

const VisualizationContainer: React.FC = props => {
  const [prunedGraph, cycles] = useAppSelector(selectPrunedGraphAndCycles)
  const highlightedNode = useAppSelector(selectHighlighted)
  const selectedNode = useAppSelector(selectSelected)
  const selectedNodeDependencies = useAppSelector(
    selectSelectedNodeDependencies,
  )
  const dispatch = useAppDispatch()

  const { simulation, layout } = useSimulation(prunedGraph)

  // transformation matrix
  const [matrix, setMatrix] = useState<Matrix>([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ])

  const handleTransform = useCallback((matrix: Matrix): void => {
    setMatrix(prevMatrix => numeric.dot(matrix, prevMatrix) as Matrix)
  }, [])

  const withNode = (action: (uri: string) => unknown) => {
    return (position: Vector): void => {
      // first transform to local coordinates
      const [x, y] = transform(numeric.inv(matrix), position)
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
    matrix,
    layout,
    highlightedNode,
    selectedNode,
    selectedNodeDependencies,
    cycles,
  )

  const grid = transformGrid(matrix, basicGrid)

  return (
    <Visualization
      graph={transformedLayout}
      grid={grid}
      onTransform={handleTransform}
      onHover={handleHover}
      onSelectNode={handleSelect}
      {...props}
    />
  )
}

export default VisualizationContainer
