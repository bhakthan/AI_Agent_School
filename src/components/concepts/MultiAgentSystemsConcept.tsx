import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, ArrowsIn, Handshake, Crown, Target, Network } from "@phosphor-icons/react"

interface MultiAgentSystemsConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

export default function MultiAgentSystemsConcept({ onMarkComplete, onNavigateToNext }: MultiAgentSystemsConceptProps) {
  const tabs = [
    {
      id: 'coordination',
      title: 'Coordination Mechanisms',
      description: 'How agents coordinate their actions and decisions',
      icon: <ArrowsIn className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          {/* Coordination Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowsIn className="w-5 h-5" />
                Agent Coordination Patterns
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Coordination mechanisms enable multiple agents to work together effectively, 
                avoiding conflicts and maximizing collective performance.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🎯 Consensus Algorithms</h4>
                  <p className="text-sm text-muted-foreground">
                    Mechanisms for agents to agree on decisions or shared state
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔄 Task Allocation</h4>
                  <p className="text-sm text-muted-foreground">
                    Distributing work among agents based on capabilities and availability
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">⚖️ Load Balancing</h4>
                  <p className="text-sm text-muted-foreground">
                    Distributing workload evenly across available agents
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔐 Resource Locking</h4>
                  <p className="text-sm text-muted-foreground">
                    Preventing conflicts when agents access shared resources
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm">
{`// Agent Coordination Example
class AgentCoordinator {
  async coordinateTask(task, availableAgents) {
    // 1. Analyze task requirements
    const requirements = this.analyzeTask(task)
    
    // 2. Find suitable agents
    const suitableAgents = availableAgents.filter(
      agent => this.meetsRequirements(agent, requirements)
    )
    
    // 3. Allocate task using consensus
    const allocation = await this.consensusAllocate(task, suitableAgents)
    
    // 4. Monitor execution
    return this.monitorExecution(allocation)
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'negotiation',
      title: 'Agent Negotiation',
      description: 'How agents negotiate and reach agreements',
      icon: <Handshake className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          {/* Negotiation Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Handshake className="w-5 h-5" />
                Negotiation Protocols
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Agent negotiation enables autonomous systems to reach agreements about resource 
                allocation, task distribution, and conflict resolution without human intervention.
              </p>
              
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-semibold mb-3">Common Negotiation Strategies:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span><strong>Auction-Based:</strong> Agents bid for resources or tasks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>Contract Net:</strong> Structured proposal and acceptance process</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                    <span><strong>Bargaining:</strong> Back-and-forth negotiation to reach compromise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span>
                    <span><strong>Mediation:</strong> Third-party agent facilitates agreement</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm">
{`// Auction-Based Negotiation
class AgentAuction {
  async conductAuction(task, participants) {
    // 1. Announce task and requirements
    const announcement = await this.announceTask(task)
    
    // 2. Collect bids from agents
    const bids = await this.collectBids(participants, announcement)
    
    // 3. Evaluate bids
    const evaluation = this.evaluateBids(bids, task.criteria)
    
    // 4. Select winner and notify participants
    const winner = this.selectWinner(evaluation)
    await this.notifyParticipants(winner, bids)
    
    return winner
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'emergent-behavior',
      title: 'Emergent Behavior',
      description: 'How complex behaviors emerge from simple agent interactions',
      icon: <Network className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          {/* Emergent Behavior */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="w-5 h-5" />
                Emergence in Multi-Agent Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Emergent behavior occurs when simple local interactions between agents lead to 
                complex global patterns and capabilities that weren't explicitly programmed.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🌊 Swarm Intelligence</h4>
                  <p className="text-sm text-muted-foreground">
                    Collective behavior patterns inspired by biological systems
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔄 Self-Organization</h4>
                  <p className="text-sm text-muted-foreground">
                    Agents automatically organize into efficient structures
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🎯 Collective Intelligence</h4>
                  <p className="text-sm text-muted-foreground">
                    Group problem-solving capabilities exceeding individual agents
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">📈 Adaptive Systems</h4>
                  <p className="text-sm text-muted-foreground">
                    System-wide adaptation to changing conditions
                  </p>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-semibold mb-3">Examples of Emergent Behavior:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span><strong>Flocking:</strong> Agents naturally form groups with aligned movement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>Market Dynamics:</strong> Price discovery through agent interactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                    <span><strong>Knowledge Networks:</strong> Spontaneous information sharing patterns</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'collaboration-models',
      title: 'Collaboration Models',
      description: 'Different ways agents can work together',
      icon: <Users className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          {/* Collaboration Models */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Agent Collaboration Models
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Different collaboration models suit different types of tasks and organizational structures.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20">
                    <Crown className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Hierarchical Model</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Clear command structure with supervisor and worker agents
                    </p>
                    <div className="mt-2">
                      <Badge variant="outline">Centralized Control</Badge>
                      <Badge variant="outline" className="ml-2">Clear Authority</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20">
                    <Network className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Peer-to-Peer Model</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Agents collaborate as equals without central authority
                    </p>
                    <div className="mt-2">
                      <Badge variant="outline">Decentralized</Badge>
                      <Badge variant="outline" className="ml-2">Flexible</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/20">
                    <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Market-Based Model</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Agents compete and cooperate based on economic incentives
                    </p>
                    <div className="mt-2">
                      <Badge variant="outline">Competitive</Badge>
                      <Badge variant="outline" className="ml-2">Efficient</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'autogen-framework',
      title: 'AutoGen Framework',
      description: 'Microsoft AutoGen for multi-agent conversations',
      icon: <Users className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          {/* AutoGen Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Microsoft AutoGen Framework
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                AutoGen is a framework that enables creation of LLM applications using multiple agents that can 
                converse with each other to solve tasks. It simplifies the orchestration of multi-agent workflows 
                and provides patterns for agent collaboration, making it easier to build complex AI systems.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-600">Key Features</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Conversational AI with multiple agents</li>
                    <li>• Customizable agent roles and behaviors</li>
                    <li>• Human-in-the-loop capabilities</li>
                    <li>• Integration with various LLM providers</li>
                    <li>• Code execution and validation</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-600">Use Cases</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Collaborative problem solving</li>
                    <li>• Code generation and review</li>
                    <li>• Research and analysis tasks</li>
                    <li>• Educational content creation</li>
                    <li>• Complex workflow automation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AutoGen Architecture */}
          <Card>
            <CardHeader>
              <CardTitle>AutoGen Architecture Components</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-blue-600 text-lg">Conversable Agents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">Base class for agents that can send and receive messages</p>
                    <ul className="text-xs space-y-1">
                      <li>• Message handling</li>
                      <li>• Conversation management</li>
                      <li>• Role-based behavior</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-green-600 text-lg">Assistant Agents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">AI-powered agents with LLM capabilities</p>
                    <ul className="text-xs space-y-1">
                      <li>• LLM integration</li>
                      <li>• Function calling</li>
                      <li>• Code generation</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-purple-600 text-lg">User Proxy Agents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">Agents that represent human users in conversations</p>
                    <ul className="text-xs space-y-1">
                      <li>• Human input solicitation</li>
                      <li>• Code execution</li>
                      <li>• Approval workflows</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Basic AutoGen Implementation</h4>
                <pre className="text-sm overflow-x-auto">{`import autogen

# Configure LLM
config_list = [{
    "model": "gpt-4",
    "api_key": "your_api_key"
}]

# Create assistant agent
assistant = autogen.AssistantAgent(
    name="assistant",
    llm_config={"config_list": config_list}
)

# Create user proxy agent
user_proxy = autogen.UserProxyAgent(
    name="user_proxy",
    human_input_mode="NEVER",
    code_execution_config={"work_dir": "coding"}
)

# Start conversation
user_proxy.initiate_chat(
    assistant,
    message="Help me solve this problem step by step"
)`}</pre>
              </div>
            </CardContent>
          </Card>

          {/* AutoGen vs Other Frameworks */}
          <Card>
            <CardHeader>
              <CardTitle>AutoGen vs Other Multi-Agent Frameworks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <th className="border border-gray-300 p-2 text-left">Feature</th>
                      <th className="border border-gray-300 p-2 text-center">AutoGen</th>
                      <th className="border border-gray-300 p-2 text-center">CrewAI</th>
                      <th className="border border-gray-300 p-2 text-center">LangGraph</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="border border-gray-300 p-2 font-medium">Conversation Focus</td>
                      <td className="border border-gray-300 p-2 text-center">✅ High</td>
                      <td className="border border-gray-300 p-2 text-center">🔶 Medium</td>
                      <td className="border border-gray-300 p-2 text-center">🔶 Medium</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-medium">Code Execution</td>
                      <td className="border border-gray-300 p-2 text-center">✅ Built-in</td>
                      <td className="border border-gray-300 p-2 text-center">🔶 Custom</td>
                      <td className="border border-gray-300 p-2 text-center">🔶 Custom</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-medium">Human-in-Loop</td>
                      <td className="border border-gray-300 p-2 text-center">✅ Native</td>
                      <td className="border border-gray-300 p-2 text-center">❌ Limited</td>
                      <td className="border border-gray-300 p-2 text-center">🔶 Custom</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-medium">Microsoft Integration</td>
                      <td className="border border-gray-300 p-2 text-center">✅ Excellent</td>
                      <td className="border border-gray-300 p-2 text-center">🔶 Good</td>
                      <td className="border border-gray-300 p-2 text-center">🔶 Good</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* AutoGen Conversation Patterns */}
          <Card>
            <CardHeader>
              <CardTitle>AutoGen Conversation Patterns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="border-indigo-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-indigo-600 text-lg">Two-Agent Chat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">Direct conversation between two agents</p>
                    <ul className="text-xs space-y-1">
                      <li>• Question-answer format</li>
                      <li>• Code review scenarios</li>
                      <li>• Problem-solving dialogue</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-orange-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-orange-600 text-lg">Group Chat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">Multiple agents collaborating in a group</p>
                    <ul className="text-xs space-y-1">
                      <li>• Moderated discussions</li>
                      <li>• Specialized expert agents</li>
                      <li>• Consensus building</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-teal-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-teal-600 text-lg">Sequential Chat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">Agents working in a predefined sequence</p>
                    <ul className="text-xs space-y-1">
                      <li>• Pipeline processing</li>
                      <li>• Step-by-step workflows</li>
                      <li>• Quality gates</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-pink-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-pink-600 text-lg">Nested Chat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">Hierarchical conversations with sub-groups</p>
                    <ul className="text-xs space-y-1">
                      <li>• Complex problem decomposition</li>
                      <li>• Parallel workstreams</li>
                      <li>• Result synthesis</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ]

  return (
    <ConceptLayout
      conceptId="multi-agent-systems"
      title="Multi-Agent Systems"
      description="Understanding how multiple AI agents coordinate, negotiate, and collaborate"
      tabs={tabs}
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}
