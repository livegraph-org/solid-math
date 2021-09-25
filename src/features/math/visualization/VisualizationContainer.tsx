import React, { useEffect, useState } from 'react'
import Visualization from './Visualization'
import {
  highlight,
  select,
  selectHighlighted,
  selectSelected,
  selectSelectedNodeDependencies,
} from '../mathSlice'
import Simulation from './simulation'
import { SimulationGraph, SimulationLink } from './simulation/types'
import { Matrix, Vector } from './types'
import numeric from 'numeric'
import Statement from '../Statement'
import Search from '../../search/Search'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectPrunedGraph } from '../mathSlice'
import InfoContainer from '../InfoContainer'
import {
  basicGrid,
  nodeRadius,
  transform,
  transformGrid,
  transformLayout,
} from './helpers/transform'

const VisualizationContainer: React.FC = props => {
  const prunedGraph = useAppSelector(selectPrunedGraph)
  const highlightedNode = useAppSelector(selectHighlighted)
  const selectedNode = useAppSelector(selectSelected)
  const selectedNodeDependencies = useAppSelector(
    selectSelectedNodeDependencies,
  )
  const dispatch = useAppDispatch()

  const [simulation] = useState(new Simulation())
  const [layout, setLayout] = useState<SimulationGraph>({
    nodes: [],
    links: [],
  })
  // transformation matrix
  const [matrix, setMatrix] = useState<Matrix>([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ])

  // initialize simulation
  useEffect(() => {
    let lastUpdate = Date.now() - 20
    simulation.start({
      nodes: [],
      links: [],
      onTick: ({ nodes, links }) => {
        const now = Date.now()
        if (now > lastUpdate + 20) {
          setLayout({ nodes: [...nodes], links: [...links] })
          lastUpdate = now
        }
      },
    })
    return () => {
      simulation.stop()
    }
  }, [simulation])

  // when graph changes, update simulation
  useEffect(() => {
    const nodes = Object.values(prunedGraph).map(node => ({
      label: node.label.en,
      x: Math.random() * 400,
      y: Math.random() * 400,
      r: nodeRadius(node),
      uri: node.uri,
    }))

    const links: SimulationLink[] = Object.values(prunedGraph).reduce(
      (links, { uri: source, dependencies }) => {
        Object.keys(dependencies).forEach(target =>
          links.push({ source, target }),
        )
        return links
      },
      [] as SimulationLink[],
    )

    simulation.update({ nodes, links })
  }, [prunedGraph, simulation])

  const handleTransform = (matrix: Matrix): void => {
    setMatrix(prevMatrix => numeric.dot(matrix, prevMatrix) as Matrix)
  }

  const withNode = (action: (uri: string) => unknown) => {
    return (position: Vector): void => {
      // first transform to local coordinates
      const [x, y] = transform(numeric.inv(matrix), position)
      // then find the node in simulation
      action(simulation.selectNode({ x, y })?.uri)
    }
  }

  const handleHover = withNode(uri => dispatch(highlight(uri)))
  const handleSelect = withNode(uri => dispatch(select(uri)))

  // transform layout to TransformedLayout
  const transformedLayout = transformLayout(
    matrix,
    layout,
    highlightedNode,
    selectedNode,
    selectedNodeDependencies,
  )

  const grid = transformGrid(matrix, basicGrid)

  return (
    <>
      <Visualization
        graph={transformedLayout}
        grid={grid}
        onTransform={handleTransform}
        onHover={handleHover}
        onSelectNode={handleSelect}
        {...props}
      />

      {
        // @TODO maybe move this stuff out, it's more of a Layout component
      }
      <InfoContainer>{selectedNode ? <Statement /> : <Search />}</InfoContainer>
    </>
  )
}

export default VisualizationContainer
