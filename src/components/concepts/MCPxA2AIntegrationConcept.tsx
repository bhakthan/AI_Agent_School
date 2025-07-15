import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import MCPxA2AIntegrationFlow from "../visualization/MCPxA2AIntegrationFlow"
import { ArrowsHorizontal, Shield, LinkSimple, Sparkle } from "@phosphor-icons/react"

interface MCPxA2AIntegrationConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

export default function MCPxA2AIntegrationConcept({ onMarkComplete, onNavigateToNext }: MCPxA2AIntegrationConceptProps) {
  const tabs = [
    {
      id: 'fundamentals',
      title: 'MCP x A2A Basics',
      description: 'Understanding the integration between MCP and A2A systems',
      icon: <LinkSimple className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          {/* Integration Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkSimple className="w-5 h-5" />
                MCP x A2A Integration Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                The integration of Model Context Protocol (MCP) with Agent-to-Agent (A2A) communication 
                creates a powerful framework where agents can securely share tools and resources while 
                maintaining proper isolation and security boundaries.
              </p>
              
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-semibold mb-3">Key Integration Benefits:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span><strong>Secure Tool Sharing:</strong> Agents can access tools from other agents securely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>Resource Optimization:</strong> Avoid duplicate tool implementations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                    <span><strong>Capability Discovery:</strong> Agents can discover and use remote capabilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span>
                    <span><strong>Standardized Interface:</strong> Consistent way to access distributed tools</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Architecture Components */}
          <Card>
            <CardHeader>
              <CardTitle>Integration Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    MCP Server Bridge
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Exposes MCP tools through A2A communication protocols
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <ArrowsHorizontal className="w-4 h-4" />
                    A2A Tool Proxy
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Allows A2A agents to discover and invoke remote MCP tools
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'architecture',
      title: 'Integration Flow',
      description: 'Visualize how MCP and A2A work together',
      icon: <ArrowsHorizontal className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          {/* Interactive Flow Visualization */}
          <MCPxA2AIntegrationFlow />

          {/* Protocol Mapping */}
          <Card>
            <CardHeader>
              <CardTitle>Protocol Mapping</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    MCP to A2A Message Translation
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• MCP tool calls → A2A service requests</li>
                    <li>• MCP resources → A2A capability advertisements</li>
                    <li>• MCP notifications → A2A event broadcasts</li>
                    <li>• MCP errors → A2A exception handling</li>
                  </ul>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    Security Considerations
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Authentication between MCP and A2A layers</li>
                    <li>• Authorization for tool access</li>
                    <li>• Encryption of sensitive data</li>
                    <li>• Audit logging for compliance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'implementation',
      title: 'Implementation Guide',
      description: 'Build MCP x A2A integration systems',
      icon: <Shield className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          {/* Implementation Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Step-by-Step Implementation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">1</Badge>
                  <div>
                    <h4 className="font-semibold">Set Up MCP Server</h4>
                    <p className="text-sm text-muted-foreground">
                      Create an MCP server that exposes tools and resources
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">2</Badge>
                  <div>
                    <h4 className="font-semibold">Implement A2A Bridge</h4>
                    <p className="text-sm text-muted-foreground">
                      Build a bridge that translates between MCP and A2A protocols
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">3</Badge>
                  <div>
                    <h4 className="font-semibold">Configure Security</h4>
                    <p className="text-sm text-muted-foreground">
                      Set up authentication, authorization, and encryption
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">4</Badge>
                  <div>
                    <h4 className="font-semibold">Test Integration</h4>
                    <p className="text-sm text-muted-foreground">
                      Validate tool discovery, invocation, and error handling
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Code Example */}
          <Card>
            <CardHeader>
              <CardTitle>Example Integration Code</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-background p-3 rounded border overflow-x-auto">
{`// MCP to A2A Bridge
class MCPToA2ABridge {
  constructor(mcpServer, a2aClient) {
    this.mcpServer = mcpServer;
    this.a2aClient = a2aClient;
  }

  async discoverTools() {
    const mcpTools = await this.mcpServer.listTools();
    
    // Register tools with A2A system
    for (const tool of mcpTools) {
      await this.a2aClient.registerCapability({
        name: tool.name,
        description: tool.description,
        handler: (params) => this.invokeMCPTool(tool.name, params)
      });
    }
  }

  async invokeMCPTool(toolName, params) {
    try {
      const result = await this.mcpServer.callTool(toolName, params);
      return {
        success: true,
        data: result
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}`}
              </pre>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'advanced',
      title: 'Advanced Patterns',
      description: 'Explore sophisticated integration patterns',
      icon: <Sparkle className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          {/* Advanced Patterns */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced Integration Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Distributed Tool Registry</h4>
                  <p className="text-sm text-muted-foreground">
                    Maintain a distributed registry of available MCP tools across A2A network
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Tool Composition</h4>
                  <p className="text-sm text-muted-foreground">
                    Combine multiple MCP tools into complex A2A workflows
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Capability Negotiation</h4>
                  <p className="text-sm text-muted-foreground">
                    Agents negotiate tool access and resource sharing dynamically
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Federated Security</h4>
                  <p className="text-sm text-muted-foreground">
                    Implement federated authentication and authorization across systems
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card>
            <CardHeader>
              <CardTitle>Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                    Performance Optimization
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Cache tool discovery results</li>
                    <li>• Use connection pooling for MCP servers</li>
                    <li>• Implement circuit breakers for reliability</li>
                    <li>• Monitor latency and throughput</li>
                  </ul>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                    Scalability Patterns
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Load balance across multiple MCP servers</li>
                    <li>• Implement horizontal scaling for bridges</li>
                    <li>• Use event-driven architecture</li>
                    <li>• Design for graceful degradation</li>
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
      conceptId="mcp-a2a-integration"
      title="MCP x A2A Integration"
      description="Learn how to integrate Model Context Protocol with Agent-to-Agent communication"
      tabs={tabs}
      nextConcept={{
        id: 'flow-visualization',
        title: 'Flow Visualization',
        description: 'Interactive visualization of agent flows'
      }}
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}
