import { useEffect, useState } from 'react'
import { Graph } from '../types'
import { nodeRadius } from './helpers/transform'
import Simulation from './simulation'
import { SimulationGraph, SimulationLink } from './simulation/types'

const useSimulation = (graph: Graph) => {
  const [simulation] = useState(new Simulation())
  const [layout, setLayout] = useState<SimulationGraph>({
    nodes: [],
    links: [],
  })

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
    const nodes = Object.values(graph).map(node => ({
      label: node.label.en,
      x: Math.random() * 400,
      y: Math.random() * 400,
      r: nodeRadius(node),
      uri: node.uri,
    }))

    const links: SimulationLink[] = Object.values(graph).reduce(
      (links, { uri: source, dependencies }) => {
        Object.keys(dependencies).forEach(target =>
          links.push({ source, target }),
        )
        return links
      },
      [] as SimulationLink[],
    )

    simulation.update({ nodes, links })
  }, [graph, simulation])

  return { simulation, layout }
}

export default useSimulation
