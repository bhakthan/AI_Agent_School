import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ACPProtocolStack from "./ACPProtocolStack"
import ProtocolComparison from "./ProtocolComparison"
import SimpleACPDemo from "../interactive-demos/SimpleACPDemo"
import ACPMCPComparison from "../interactive-demos/ACPMCPComparison"
import { Stack, Lightning, Rocket, Crown } from "@phosphor-icons/react"

interface ACPConceptProps {
  onMarkComplete?: () => void
}

export default function ACPConcept({ onMarkComplete }: ACPConceptProps) {
  const tabs = [
    {
      id: 'fundamentals',
      title: 'ACP Basics',
      description: 'Learn about the Agent Communication Protocol',
      icon: <Stack className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          {/* Basic Definition */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stack className="w-5 h-5" />
                What is Agent Communication Protocol (ACP)?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Agent Communication Protocol (ACP) is an advanced protocol stack that enables 
                sophisticated communication and coordination between AI agents. It builds upon 
                basic A2A communication to provide enterprise-grade features like orchestration, 
                workflow management, and advanced coordination patterns.
              </p>
              
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-semibold mb-3">Advanced Capabilities:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span><strong>Orchestration:</strong> Coordinate complex multi-agent workflows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>State Management:</strong> Track and synchronize agent states</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                    <span><strong>Fault Tolerance:</strong> Handle agent failures gracefully</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span>
                    <span><strong>Performance:</strong> Optimize for enterprise-scale deployments</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Protocol Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>ACP vs Other Protocols</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-green-700 dark:text-green-400">A2A</h4>
                  <p className="text-xs text-muted-foreground mb-2">Basic Communication</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Simple message passing</li>
                    <li>• Basic request-response</li>
                    <li>• Limited coordination</li>
                  </ul>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-400">MCP</h4>
                  <p className="text-xs text-muted-foreground mb-2">Tool Integration</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Secure tool access</li>
                    <li>• Standardized interfaces</li>
                    <li>• External resource integration</li>
                  </ul>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-400">ACP</h4>
                  <p className="text-xs text-muted-foreground mb-2">Advanced Coordination</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Workflow orchestration</li>
                    <li>• Complex state management</li>
                    <li>• Enterprise features</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Simple Demo */}
          <SimpleACPDemo />
        </div>
      )
    },
    {
      id: 'architecture',
      title: 'Protocol Stack',
      description: 'Understand the ACP protocol architecture',
      icon: <Lightning className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          {/* Protocol Stack Diagram */}
          <ACPProtocolStack />

          {/* Layer Details */}
          <Card>
            <CardHeader>
              <CardTitle>Protocol Layers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Application Layer</h4>
                  <p className="text-sm text-muted-foreground">
                    High-level agent applications and business logic
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Orchestration Layer</h4>
                  <p className="text-sm text-muted-foreground">
                    Workflow management, task coordination, and agent orchestration
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Communication Layer</h4>
                  <p className="text-sm text-muted-foreground">
                    Message routing, protocol handling, and agent discovery
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Transport Layer</h4>
                  <p className="text-sm text-muted-foreground">
                    Network communication, security, and reliability
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparison with MCP */}
          <ACPMCPComparison />
        </div>
      )
    },
    {
      id: 'implementation',
      title: 'Enterprise Integration',
      description: 'Implement ACP for enterprise-scale agent systems',
      icon: <Rocket className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          {/* Implementation Architecture */}
          <Card>
            <CardHeader>
              <CardTitle>Enterprise Implementation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Agent Registry</h4>
                  <p className="text-sm text-muted-foreground">
                    Centralized registry for agent discovery and capability management
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Orchestration Engine</h4>
                  <p className="text-sm text-muted-foreground">
                    Workflow engine that coordinates complex multi-agent processes
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Message Broker</h4>
                  <p className="text-sm text-muted-foreground">
                    High-performance message routing and delivery system
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Monitoring & Analytics</h4>
                  <p className="text-sm text-muted-foreground">
                    Real-time monitoring, logging, and performance analytics
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Implementation Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Implementation Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">1</Badge>
                  <div>
                    <h4 className="font-semibold">Design Agent Architecture</h4>
                    <p className="text-sm text-muted-foreground">
                      Plan agent roles, responsibilities, and interaction patterns
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">2</Badge>
                  <div>
                    <h4 className="font-semibold">Deploy Infrastructure</h4>
                    <p className="text-sm text-muted-foreground">
                      Set up message brokers, registries, and orchestration services
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">3</Badge>
                  <div>
                    <h4 className="font-semibold">Implement Agents</h4>
                    <p className="text-sm text-muted-foreground">
                      Build and deploy individual agents with ACP integration
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">4</Badge>
                  <div>
                    <h4 className="font-semibold">Configure Workflows</h4>
                    <p className="text-sm text-muted-foreground">
                      Define and deploy multi-agent workflows and processes
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">5</Badge>
                  <div>
                    <h4 className="font-semibold">Monitor & Optimize</h4>
                    <p className="text-sm text-muted-foreground">
                      Implement monitoring, logging, and performance optimization
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuration Example */}
          <Card>
            <CardHeader>
              <CardTitle>ACP Configuration Example</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md">
                <pre className="text-sm">
{`{
  "agents": [
    {
      "id": "orchestrator",
      "type": "supervisor",
      "capabilities": ["workflow-management", "task-delegation"],
      "endpoints": {
        "control": "https://orchestrator.example.com/acp",
        "monitoring": "https://orchestrator.example.com/metrics"
      }
    },
    {
      "id": "data-processor",
      "type": "worker",
      "capabilities": ["data-analysis", "report-generation"],
      "endpoints": {
        "processing": "https://processor.example.com/acp"
      }
    }
  ],
  "workflows": [
    {
      "id": "data-analysis-workflow",
      "steps": [
        {"agent": "data-processor", "action": "analyze"},
        {"agent": "orchestrator", "action": "review"},
        {"agent": "data-processor", "action": "generate-report"}
      ]
    }
  ]
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'advanced',
      title: 'Advanced Patterns',
      description: 'Master advanced ACP patterns and enterprise features',
      icon: <Crown className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          {/* Advanced Patterns */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced ACP Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Circuit Breaker Pattern</h4>
                  <p className="text-sm text-muted-foreground">
                    Prevent cascading failures in multi-agent systems
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Saga Pattern</h4>
                  <p className="text-sm text-muted-foreground">
                    Manage distributed transactions across multiple agents
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Event Sourcing</h4>
                  <p className="text-sm text-muted-foreground">
                    Track all agent interactions and state changes
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">CQRS</h4>
                  <p className="text-sm text-muted-foreground">
                    Separate read and write operations for better performance
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Protocol Comparison */}
          <ProtocolComparison />

          {/* Production Considerations */}
          <Card>
            <CardHeader>
              <CardTitle>Production Considerations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                    Performance & Scaling
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Implement horizontal scaling for high load</li>
                    <li>• Use caching for frequently accessed data</li>
                    <li>• Optimize message serialization and routing</li>
                    <li>• Monitor system resources and bottlenecks</li>
                  </ul>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                    Security & Compliance
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Implement end-to-end encryption</li>
                    <li>• Use strong authentication and authorization</li>
                    <li>• Maintain audit logs for compliance</li>
                    <li>• Regular security assessments and updates</li>
                  </ul>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    Monitoring & Observability
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Implement distributed tracing</li>
                    <li>• Monitor agent health and performance</li>
                    <li>• Set up alerting for critical issues</li>
                    <li>• Use dashboards for real-time visibility</li>
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
      conceptId="acp"
      title="Agent Communication Protocol (ACP)"
      description="Master advanced agent coordination protocols for enterprise-scale multi-agent systems"
      tabs={tabs}
      onMarkComplete={onMarkComplete}
    />
  )
}
