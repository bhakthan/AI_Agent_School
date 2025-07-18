import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import A2ACommunicationPatterns from "./A2ACommunicationPatterns"
import A2AMultiAgentSystem from "./A2AMultiAgentSystem"
import Agent2AgentProtocolExplainer from "./Agent2AgentProtocolExplainer"
import { ArrowsHorizontal, Network, GitBranch, Sparkle, CloudArrowUp } from "@phosphor-icons/react"

interface A2ACommunicationConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

export default function A2ACommunicationConcept({ onMarkComplete, onNavigateToNext }: A2ACommunicationConceptProps) {
  const tabs = [
    {
      id: 'fundamentals',
      title: 'A2A Basics',
      description: 'Learn how agents communicate with each other',
      icon: <ArrowsHorizontal className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          {/* Basic Definition */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowsHorizontal className="w-5 h-5" />
                What is Agent-to-Agent (A2A) Communication?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Agent-to-Agent (A2A) communication is a protocol that enables AI agents to communicate, 
                coordinate, and collaborate with each other. Instead of working in isolation, agents can 
                share information, delegate tasks, and combine their capabilities to solve complex problems.
              </p>
              
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-semibold mb-3">Why A2A Communication Matters:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span><strong>Specialization:</strong> Each agent can focus on what it does best</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>Scalability:</strong> Distribute workload across multiple agents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                    <span><strong>Resilience:</strong> If one agent fails, others can continue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span>
                    <span><strong>Efficiency:</strong> Parallel processing and task distribution</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Communication Patterns */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Communication Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Request-Response</h4>
                  <p className="text-sm text-muted-foreground">
                    Agent A sends a request to Agent B and waits for a response
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Publish-Subscribe</h4>
                  <p className="text-sm text-muted-foreground">
                    Agents publish events and others subscribe to relevant updates
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Delegation</h4>
                  <p className="text-sm text-muted-foreground">
                    A supervisor agent delegates tasks to specialized worker agents
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Collaboration</h4>
                  <p className="text-sm text-muted-foreground">
                    Multiple agents work together on a shared task or goal
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Protocol Explainer */}
          <Agent2AgentProtocolExplainer />
        </div>
      )
    },
    {
      id: 'architecture',
      title: 'Communication Architecture',
      description: 'Understand the technical architecture of A2A systems',
      icon: <Network className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          {/* Architecture Overview */}
          <Card>
            <CardHeader>
              <CardTitle>A2A Architecture Components</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-border rounded-md p-3">
                  <h5 className="font-medium text-primary mb-2">Message Broker</h5>
                  <p className="text-sm text-muted-foreground">
                    Handles message routing, queuing, and delivery between agents
                  </p>
                </div>
                <div className="border border-border rounded-md p-3">
                  <h5 className="font-medium text-primary mb-2">Agent Registry</h5>
                  <p className="text-sm text-muted-foreground">
                    Maintains directory of available agents and their capabilities
                  </p>
                </div>
                <div className="border border-border rounded-md p-3">
                  <h5 className="font-medium text-primary mb-2">Protocol Handler</h5>
                  <p className="text-sm text-muted-foreground">
                    Manages message format, serialization, and protocol compliance
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Communication Patterns Detail */}
          <A2ACommunicationPatterns />

          {/* Security Considerations */}
          <Card>
            <CardHeader>
              <CardTitle>Security & Trust</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                    Security Challenges
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Agent authentication and authorization</li>
                    <li>• Message encryption and integrity</li>
                    <li>• Preventing malicious agent behavior</li>
                    <li>• Audit trails and monitoring</li>
                  </ul>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    Best Practices
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Use secure protocols (TLS/SSL)</li>
                    <li>• Implement agent identity verification</li>
                    <li>• Monitor inter-agent communications</li>
                    <li>• Use structured message formats</li>
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
      title: 'Multi-Agent Systems',
      description: 'Build systems with multiple cooperating agents',
      icon: <GitBranch className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          {/* Multi-Agent System Demo */}
          <A2AMultiAgentSystem />

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
                    <h4 className="font-semibold">Design Agent Roles</h4>
                    <p className="text-sm text-muted-foreground">
                      Define what each agent will be responsible for and how they'll interact
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">2</Badge>
                  <div>
                    <h4 className="font-semibold">Choose Communication Protocol</h4>
                    <p className="text-sm text-muted-foreground">
                      Select message format, transport mechanism, and coordination patterns
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">3</Badge>
                  <div>
                    <h4 className="font-semibold">Implement Message Handling</h4>
                    <p className="text-sm text-muted-foreground">
                      Create message parsers, handlers, and response generators
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">4</Badge>
                  <div>
                    <h4 className="font-semibold">Test & Monitor</h4>
                    <p className="text-sm text-muted-foreground">
                      Validate communication flows and add monitoring for production
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'advanced',
      title: 'Advanced A2A Patterns',
      description: 'Explore sophisticated multi-agent coordination patterns',
      icon: <Sparkle className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          {/* Advanced Patterns */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced Coordination Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Consensus Mechanisms</h4>
                  <p className="text-sm text-muted-foreground">
                    Agents reach agreement on decisions through voting or consensus protocols
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Auction-Based Coordination</h4>
                  <p className="text-sm text-muted-foreground">
                    Agents bid for tasks based on their capabilities and current workload
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Hierarchical Coordination</h4>
                  <p className="text-sm text-muted-foreground">
                    Multi-level agent hierarchies with supervisors and workers
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Emergent Behavior</h4>
                  <p className="text-sm text-muted-foreground">
                    Complex behaviors emerge from simple agent interactions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Considerations */}
          <Card>
            <CardHeader>
              <CardTitle>Performance & Scalability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    Scaling Challenges
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Message volume and network congestion</li>
                    <li>• Agent discovery and registration</li>
                    <li>• Fault tolerance and recovery</li>
                    <li>• Load balancing across agents</li>
                  </ul>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    Optimization Strategies
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Use efficient message serialization</li>
                    <li>• Implement message batching and compression</li>
                    <li>• Add caching and result memoization</li>
                    <li>• Monitor and optimize agent workloads</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'autogen-integration',
      title: 'AutoGen Integration',
      description: 'Integrating AutoGen with Azure AI Services',
      icon: <CloudArrowUp className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          {/* AutoGen + Azure Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudArrowUp className="w-5 h-5" />
                AutoGen with Azure AI Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                AutoGen can be seamlessly integrated with Azure AI Services to leverage Azure OpenAI, 
                Azure AI Search, and other Azure cognitive services for enhanced multi-agent capabilities.
              </p>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-600 mb-3">Azure Integration Benefits</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <h5 className="font-medium">Azure OpenAI Integration</h5>
                    <p className="text-sm text-muted-foreground">Direct access to GPT-4, GPT-3.5, and other models</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Azure AI Search</h5>
                    <p className="text-sm text-muted-foreground">Enhanced RAG capabilities for agents</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Azure Container Apps</h5>
                    <p className="text-sm text-muted-foreground">Scalable deployment for multi-agent systems</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Azure Functions</h5>
                    <p className="text-sm text-muted-foreground">Serverless execution for agent workflows</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">AutoGen with Azure OpenAI</h4>
                <pre className="text-sm overflow-x-auto">{`import autogen
from azure.identity import DefaultAzureCredential

# Azure OpenAI configuration
azure_config = {
    "model": "gpt-4",
    "api_type": "azure",
    "api_base": "https://your-resource.openai.azure.com/",
    "api_version": "2024-02-15-preview",
    "api_key": "your_api_key"
}

# Create agents with Azure OpenAI
assistant = autogen.AssistantAgent(
    name="azure_assistant",
    llm_config={
        "config_list": [azure_config],
        "temperature": 0.7
    },
    system_message="You are an AI assistant powered by Azure OpenAI."
)

# Research agent with Azure AI Search integration
researcher = autogen.AssistantAgent(
    name="researcher",
    llm_config={"config_list": [azure_config]},
    system_message="""You are a research specialist. 
    Use Azure AI Search to find relevant information."""
)

# Group chat for collaboration
groupchat = autogen.GroupChat(
    agents=[assistant, researcher, user_proxy],
    messages=[],
    max_round=10
)

manager = autogen.GroupChatManager(
    groupchat=groupchat,
    llm_config={"config_list": [azure_config]}
)`}</pre>
              </div>
            </CardContent>
          </Card>

          {/* AutoGen Enterprise Deployment */}
          <Card>
            <CardHeader>
              <CardTitle>Enterprise Deployment with Azure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-600">Deployment Options</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                      <span><strong>Azure Container Apps:</strong> Scalable containerized deployment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                      <span><strong>Azure Functions:</strong> Serverless agent execution</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                      <span><strong>Azure Kubernetes Service:</strong> Advanced orchestration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span>
                      <span><strong>Azure App Service:</strong> Web-based agent interfaces</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-blue-600">Security & Compliance</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2"></span>
                      <span><strong>Azure Key Vault:</strong> Secure credential management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></span>
                      <span><strong>Azure Active Directory:</strong> Identity and access control</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-teal-500 mt-2"></span>
                      <span><strong>Azure Monitor:</strong> Comprehensive logging and monitoring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-pink-500 mt-2"></span>
                      <span><strong>Private Endpoints:</strong> Secure network connectivity</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Azure Container Apps Deployment</h4>
                <pre className="text-sm overflow-x-auto">{`# Azure Container Apps deployment configuration
apiVersion: app/v1
kind: ContainerApp
metadata:
  name: autogen-multi-agent
spec:
  configuration:
    ingress:
      external: true
      targetPort: 8000
    secrets:
    - name: azure-openai-key
      value: "your-secret-key"
  template:
    containers:
    - image: your-registry/autogen-agent:latest
      name: autogen-agent
      env:
      - name: AZURE_OPENAI_ENDPOINT
        value: "https://your-resource.openai.azure.com/"
      - name: AZURE_OPENAI_KEY
        secretRef: azure-openai-key
      resources:
        cpu: 1.0
        memory: 2Gi
    scale:
      minReplicas: 1
      maxReplicas: 10`}</pre>
              </div>
            </CardContent>
          </Card>

          {/* AutoGen Best Practices */}
          <Card>
            <CardHeader>
              <CardTitle>AutoGen Best Practices with Azure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg border-green-200 bg-green-50 dark:bg-green-900/20">
                  <h4 className="font-semibold text-green-700 mb-2">Performance</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Use connection pooling</li>
                    <li>• Implement caching strategies</li>
                    <li>• Monitor token usage</li>
                    <li>• Optimize conversation length</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg border-blue-200 bg-blue-50 dark:bg-blue-900/20">
                  <h4 className="font-semibold text-blue-700 mb-2">Security</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Use managed identities</li>
                    <li>• Implement rate limiting</li>
                    <li>• Validate all inputs</li>
                    <li>• Encrypt sensitive data</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg border-purple-200 bg-purple-50 dark:bg-purple-900/20">
                  <h4 className="font-semibold text-purple-700 mb-2">Monitoring</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Track conversation metrics</li>
                    <li>• Monitor error rates</li>
                    <li>• Log agent interactions</li>
                    <li>• Set up alerting</li>
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
      conceptId="a2a-communication"
      title="A2A Communication"
      description="Learn how AI agents communicate and coordinate with each other to solve complex problems"
      tabs={tabs}
      nextConcept={{
        id: 'mcp',
        title: 'Model Context Protocol',
        description: 'Secure tool integration for AI agents'
      }}
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}
