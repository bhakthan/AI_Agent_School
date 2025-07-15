import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Graph, Eye, Code, Sparkle } from "@phosphor-icons/react"
import CustomizableFlowDemo from "../visualization/CustomizableFlowDemo"
import PatternDemoReactFlow from "../interactive-demos/PatternDemoReactFlow"
import AlgorithmVisualizer from "../visualization/AlgorithmVisualizer"
import ComparisonTimelineVisualizer from "../visualization/ComparisonTimelineVisualizer"
import { parallelizationPattern, chainOfThoughtPattern } from "@/lib/data/patterns"

interface FlowVisualizationConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

export default function FlowVisualizationConcept({ onMarkComplete, onNavigateToNext }: FlowVisualizationConceptProps) {
  const tabs = [
    {
      id: 'fundamentals',
      title: 'Visualization Basics',
      description: 'Understanding agent flow visualization concepts',
      icon: <Eye className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          {/* Visualization Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Graph className="w-5 h-5" />
                What is Flow Visualization?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Flow visualization provides a graphical representation of how agents interact, 
                communicate, and process information. It helps developers understand complex 
                agent systems by showing the flow of data, decisions, and actions.
              </p>
              
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-semibold mb-3">Benefits of Flow Visualization:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span><strong>Debugging:</strong> Identify bottlenecks and issues in agent workflows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>Optimization:</strong> Visualize performance metrics and optimization opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                    <span><strong>Documentation:</strong> Create clear documentation of system behavior</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span>
                    <span><strong>Monitoring:</strong> Real-time insights into system performance</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Visualization Types */}
          <Card>
            <CardHeader>
              <CardTitle>Types of Flow Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Sequence Diagrams</h4>
                  <p className="text-sm text-muted-foreground">
                    Show the chronological order of agent interactions
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Network Graphs</h4>
                  <p className="text-sm text-muted-foreground">
                    Display agents as nodes and communications as edges
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">State Machines</h4>
                  <p className="text-sm text-muted-foreground">
                    Visualize agent states and transitions
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Process Flows</h4>
                  <p className="text-sm text-muted-foreground">
                    Show decision trees and process workflows
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Interactive Flow Demo</CardTitle>
              <CardDescription>
                Explore interactive agent flow visualization with real-time updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CustomizableFlowDemo />
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'architecture',
      title: 'Visualization Architecture',
      description: 'Technical aspects of building flow visualizations',
      icon: <Graph className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          {/* Architecture Components */}
          <Card>
            <CardHeader>
              <CardTitle>Visualization Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-border rounded-md p-3">
                  <h5 className="font-medium text-primary mb-2">Data Collection</h5>
                  <p className="text-sm text-muted-foreground">
                    Gather agent interaction data and performance metrics
                  </p>
                </div>
                <div className="border border-border rounded-md p-3">
                  <h5 className="font-medium text-primary mb-2">Data Processing</h5>
                  <p className="text-sm text-muted-foreground">
                    Transform raw data into visualization-friendly formats
                  </p>
                </div>
                <div className="border border-border rounded-md p-3">
                  <h5 className="font-medium text-primary mb-2">Rendering Engine</h5>
                  <p className="text-sm text-muted-foreground">
                    Generate interactive visualizations from processed data
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pattern Flow Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Agent Pattern Flow Visualization</CardTitle>
              <CardDescription>
                Visualize complex agent patterns with interactive controls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PatternDemoReactFlow patternData={parallelizationPattern} />
            </CardContent>
          </Card>

          {/* Visualization Libraries */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Visualization Libraries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    React Flow
                  </h4>
                  <p className="text-sm mb-2">
                    Highly customizable library for building node-based editors and interactive diagrams
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">Interactive</Badge>
                    <Badge variant="outline" className="text-xs">Customizable</Badge>
                    <Badge variant="outline" className="text-xs">Real-time</Badge>
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    D3.js
                  </h4>
                  <p className="text-sm mb-2">
                    Powerful data visualization library for creating complex, animated charts
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">Flexible</Badge>
                    <Badge variant="outline" className="text-xs">Animated</Badge>
                    <Badge variant="outline" className="text-xs">Data-driven</Badge>
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                    Cytoscape.js
                  </h4>
                  <p className="text-sm mb-2">
                    Graph theory library for network visualization and analysis
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">Networks</Badge>
                    <Badge variant="outline" className="text-xs">Layout algorithms</Badge>
                    <Badge variant="outline" className="text-xs">Interactive</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'implementation',
      title: 'Building Visualizations',
      description: 'Implement flow visualizations for your agents',
      icon: <Code className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          {/* Implementation Guide */}
          <Card>
            <CardHeader>
              <CardTitle>Implementation Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">1</Badge>
                  <div>
                    <h4 className="font-semibold">Set Up Data Collection</h4>
                    <p className="text-sm text-muted-foreground">
                      Implement logging and monitoring to capture agent interactions
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">2</Badge>
                  <div>
                    <h4 className="font-semibold">Choose Visualization Library</h4>
                    <p className="text-sm text-muted-foreground">
                      Select appropriate library based on your visualization needs
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">3</Badge>
                  <div>
                    <h4 className="font-semibold">Create Data Pipeline</h4>
                    <p className="text-sm text-muted-foreground">
                      Build pipeline to transform raw data into visualization format
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">4</Badge>
                  <div>
                    <h4 className="font-semibold">Build Interactive UI</h4>
                    <p className="text-sm text-muted-foreground">
                      Create user interface with controls for filtering and navigation
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Algorithm Visualization */}
          <Card>
            <CardHeader>
              <CardTitle>Algorithm Step Visualization</CardTitle>
              <CardDescription>
                Step-by-step visualization of algorithm execution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AlgorithmVisualizer
                steps={[
                  {
                    id: 'init',
                    name: 'Initialize',
                    description: 'Set up initial state and variables',
                    code: 'const agents = []; const tasks = [];'
                  },
                  {
                    id: 'discover',
                    name: 'Discover Agents',
                    description: 'Find available agents in the network',
                    code: 'const availableAgents = await discoverAgents();'
                  },
                  {
                    id: 'assign',
                    name: 'Assign Tasks',
                    description: 'Distribute tasks among available agents',
                    code: 'await assignTasks(availableAgents, tasks);'
                  },
                  {
                    id: 'execute',
                    name: 'Execute',
                    description: 'Agents execute their assigned tasks',
                    code: 'const results = await executeInParallel();'
                  },
                  {
                    id: 'aggregate',
                    name: 'Aggregate Results',
                    description: 'Combine results from all agents',
                    code: 'return aggregateResults(results);'
                  }
                ]}
                title="Agent Task Distribution Algorithm"
                description="Visualize how tasks are distributed among agents"
                autoPlay={false}
                speed={1}
              />
            </CardContent>
          </Card>

          {/* Code Example */}
          <Card>
            <CardHeader>
              <CardTitle>React Flow Example</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-background p-3 rounded border overflow-x-auto">
{`import ReactFlow, { useNodesState, useEdgesState } from 'reactflow';

const FlowVisualization = ({ agentData }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Transform agent data into nodes and edges
  useEffect(() => {
    const flowNodes = agentData.agents.map(agent => ({
      id: agent.id,
      position: agent.position,
      data: { label: agent.name, status: agent.status },
      type: 'agentNode'
    }));

    const flowEdges = agentData.communications.map(comm => ({
      id: comm.id,
      source: comm.from,
      target: comm.to,
      label: comm.message,
      animated: comm.active
    }));

    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [agentData]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    />
  );
};`}
              </pre>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'advanced',
      title: 'Advanced Visualization',
      description: 'Advanced techniques for complex visualizations',
      icon: <Sparkle className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          {/* Advanced Techniques */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced Visualization Techniques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Real-time Updates</h4>
                  <p className="text-sm text-muted-foreground">
                    Stream live data to update visualizations in real-time
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">3D Visualization</h4>
                  <p className="text-sm text-muted-foreground">
                    Create immersive 3D representations of agent networks
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Time Series Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Visualize how agent behaviors change over time
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Interactive Filtering</h4>
                  <p className="text-sm text-muted-foreground">
                    Allow users to filter and explore different aspects of data
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Timeline Visualization */}
          <Card>
            <CardHeader>
              <CardTitle>Pattern Comparison Timeline</CardTitle>
              <CardDescription>
                Compare different agent patterns with advanced timeline visualization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ComparisonTimelineVisualizer
                patterns={[parallelizationPattern, chainOfThoughtPattern]}
                onSimulate={() => {}}
                onReset={() => {}}
                isSimulating={false}
              />
            </CardContent>
          </Card>

          {/* Performance Optimization */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                    Common Performance Issues
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Large datasets causing rendering slowdowns</li>
                    <li>• Excessive re-renders on data updates</li>
                    <li>• Memory leaks from event listeners</li>
                    <li>• Inefficient layout calculations</li>
                  </ul>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    Optimization Strategies
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Implement virtual scrolling for large datasets</li>
                    <li>• Use memoization to prevent unnecessary re-renders</li>
                    <li>• Implement data sampling for real-time visualizations</li>
                    <li>• Use Web Workers for heavy computations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ]

  return (
    <ConceptLayout
      conceptId="flow-visualization"
      title="Flow Visualization"
      description="Learn how to create interactive visualizations of agent flows and interactions"
      tabs={tabs}
      nextConcept={{
        id: 'data-visualization',
        title: 'Data Visualization',
        description: 'Advanced data visualization techniques'
      }}
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}
