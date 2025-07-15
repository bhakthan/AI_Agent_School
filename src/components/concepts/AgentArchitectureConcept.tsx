import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Brain, Gear, Clock, Memory, ArrowsClockwise, Play, Pause, Stop, Archive } from "@phosphor-icons/react"

interface AgentArchitectureConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

export default function AgentArchitectureConcept({ onMarkComplete, onNavigateToNext }: AgentArchitectureConceptProps) {
  const tabs = [
    {
      id: 'architecture',
      title: 'Agent Architecture',
      description: 'Understanding the core components of AI agent systems',
      icon: <Brain className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gear className="w-5 h-5" />
                Agent Architecture Components
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                AI agents consist of several interconnected components that work together to enable autonomous behavior. 
                Understanding these components is crucial for designing effective agent systems.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🧠 Reasoning Engine</h4>
                  <p className="text-sm text-muted-foreground">
                    The core LLM that processes information, makes decisions, and generates responses
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">📝 Memory System</h4>
                  <p className="text-sm text-muted-foreground">
                    Stores context, experiences, and learned patterns for future use
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔧 Tool Interface</h4>
                  <p className="text-sm text-muted-foreground">
                    Connects agents to external systems, APIs, and data sources
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🎯 Goal Manager</h4>
                  <p className="text-sm text-muted-foreground">
                    Tracks objectives, plans actions, and monitors progress
                  </p>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-semibold mb-3">Key Architectural Principles:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span><strong>Modularity:</strong> Components can be independently developed and tested</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>Extensibility:</strong> New capabilities can be added without core changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                    <span><strong>Observability:</strong> All components provide monitoring and debugging hooks</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Azure AI Agent Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm">{`// Basic Agent Architecture in Azure AI SDK
class AzureAIAgent {
  constructor(config) {
    this.reasoning = new OpenAIService(config.model)
    this.memory = new ConversationMemory()
    this.tools = new ToolRegistry()
    this.goals = new GoalManager()
  }

  async process(input) {
    // 1. Load context from memory
    const context = await this.memory.getContext()
    
    // 2. Reason about the input
    const reasoning = await this.reasoning.process(input, context)
    
    // 3. Plan actions if needed
    const plan = await this.goals.createPlan(reasoning)
    
    // 4. Execute actions using tools
    const results = await this.tools.execute(plan)
    
    // 5. Update memory with new information
    await this.memory.store(input, reasoning, results)
    
    return results
  }
}`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'lifecycle',
      title: 'Agent Lifecycle',
      description: 'Understanding how agents are created, managed, and terminated',
      icon: <Clock className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowsClockwise className="w-5 h-5" />
                Agent Lifecycle Stages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Lifecycle Progress</span>
                <Progress value={100} className="w-32" />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Birth & Initialization
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Agent is created with initial configuration, capabilities, and goals
                    </p>
                    <div className="mt-2">
                      <Badge variant="outline">Configuration</Badge>
                      <Badge variant="outline" className="ml-2">Capability Loading</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20">
                    <span className="text-green-600 dark:text-green-400 font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold flex items-center gap-2">
                      <Gear className="w-4 h-4" />
                      Active Execution
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Agent processes tasks, learns from interactions, and adapts behavior
                    </p>
                    <div className="mt-2">
                      <Badge variant="outline">Task Processing</Badge>
                      <Badge variant="outline" className="ml-2">Learning</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
                    <span className="text-yellow-600 dark:text-yellow-400 font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold flex items-center gap-2">
                      <Pause className="w-4 h-4" />
                      Hibernation
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Agent pauses execution while preserving state for future resumption
                    </p>
                    <div className="mt-2">
                      <Badge variant="outline">State Preservation</Badge>
                      <Badge variant="outline" className="ml-2">Resource Release</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20">
                    <span className="text-red-600 dark:text-red-400 font-semibold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold flex items-center gap-2">
                      <Stop className="w-4 h-4" />
                      Termination
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Agent completes final tasks, saves state, and releases resources
                    </p>
                    <div className="mt-2">
                      <Badge variant="outline">Cleanup</Badge>
                      <Badge variant="outline" className="ml-2">State Archival</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Memory className="w-5 h-5" />
                State Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Proper state management is crucial for agent reliability and performance. 
                  Agents must maintain consistency across lifecycle transitions.
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <pre className="text-sm">{`// Agent State Management Example
class AgentStateManager {
  async saveState(agentId, state) {
    return await this.storage.save({
      agentId,
      timestamp: Date.now(),
      memory: state.memory,
      goals: state.goals,
      capabilities: state.capabilities,
      metrics: state.metrics
    })
  }

  async loadState(agentId) {
    const state = await this.storage.load(agentId)
    return {
      memory: new ConversationMemory(state.memory),
      goals: new GoalManager(state.goals),
      capabilities: new CapabilityRegistry(state.capabilities),
      metrics: new MetricsCollector(state.metrics)
    }
  }
}`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'decision-making',
      title: 'Decision Making',
      description: 'How agents process information and make decisions',
      icon: <Brain className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agent Decision Making Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Agent decision making involves perceiving the environment, reasoning about options, 
                and selecting appropriate actions based on goals and constraints.
              </p>
              
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-semibold mb-3">Decision Making Framework:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span><strong>Perception:</strong> Gather and interpret relevant information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>Analysis:</strong> Evaluate options against goals and constraints</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                    <span><strong>Selection:</strong> Choose the best action based on reasoning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span>
                    <span><strong>Execution:</strong> Implement the selected action</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2"></span>
                    <span><strong>Reflection:</strong> Evaluate outcomes and learn</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ]

  return (
    <ConceptLayout
      conceptId="agent-architecture"
      title="Agent Architecture & Lifecycle"
      description="Understanding the fundamental building blocks and lifecycle of AI agents"
      tabs={tabs}
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}
