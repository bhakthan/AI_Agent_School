import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import AgentLifecycleVisual from "./AgentLifecycleVisual"
import AgentPersonalityShowcase from "./AgentPersonalityShowcase"
import ChatbotToAgentTransition from "./ChatbotToAgentTransition"
import { Brain, Users, Code, Lightbulb } from "@phosphor-icons/react"

interface AIAgentsConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

export default function AIAgentsConcept({ onMarkComplete, onNavigateToNext }: AIAgentsConceptProps) {
  const tabs = [
    {
      id: 'fundamentals',
      title: 'What are AI Agents?',
      description: 'Learn the basic concepts and characteristics of AI agents',
      icon: <Brain className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          {/* Basic Definition */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                What is an AI Agent?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                An AI Agent is an autonomous AI system that can perceive its environment, make decisions, 
                and take actions to achieve specific goals. Unlike traditional chatbots that simply respond 
                to queries, AI agents can plan, execute complex tasks, and adapt their behavior based on outcomes.
              </p>
              
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-semibold mb-3">Key Characteristics:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span><strong>Autonomous:</strong> Can operate independently without constant human intervention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>Goal-oriented:</strong> Works toward specific objectives and outcomes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                    <span><strong>Adaptive:</strong> Learns from experience and adjusts behavior</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span>
                    <span><strong>Interactive:</strong> Can use tools and communicate with other systems</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Comparison with Traditional AI */}
          <Card>
            <CardHeader>
              <CardTitle>AI Agents vs Traditional AI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Traditional AI/Chatbots</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Reactive - responds to specific inputs</li>
                    <li>• Limited to predefined workflows</li>
                    <li>• Single-turn interactions</li>
                    <li>• Cannot use external tools</li>
                    <li>• No memory of previous interactions</li>
                  </ul>
                </div>
                <div className="border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">AI Agents</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Proactive - can initiate actions</li>
                    <li>• Flexible planning and execution</li>
                    <li>• Multi-step, persistent workflows</li>
                    <li>• Can use tools and APIs</li>
                    <li>• Maintains context and memory</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Demo */}
          <ChatbotToAgentTransition />
        </div>
      )
    },
    {
      id: 'architecture',
      title: 'Agent Architecture',
      description: 'Understand the components and lifecycle of AI agents',
      icon: <Users className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          {/* Architecture Components */}
          <Card>
            <CardHeader>
              <CardTitle>Core Architecture Components</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-border rounded-md p-3">
                  <h5 className="font-medium text-primary mb-2">Foundation Models</h5>
                  <p className="text-sm text-muted-foreground">
                    The underlying LLMs that provide reasoning, natural language understanding, and generation capabilities
                  </p>
                </div>
                <div className="border border-border rounded-md p-3">
                  <h5 className="font-medium text-primary mb-2">Planning System</h5>
                  <p className="text-sm text-muted-foreground">
                    Components that break down goals into steps and adapt based on new information
                  </p>
                </div>
                <div className="border border-border rounded-md p-3">
                  <h5 className="font-medium text-primary mb-2">Tool Integration</h5>
                  <p className="text-sm text-muted-foreground">
                    APIs and interfaces that allow agents to interact with external systems
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agent Lifecycle */}
          <AgentLifecycleVisual />

          {/* Agent Personalities */}
          <Card>
            <CardHeader>
              <CardTitle>Agent Personalities & Specialization</CardTitle>
              <CardDescription>
                Different agents can be optimized for different tasks and interaction styles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AgentPersonalityShowcase />
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'implementation',
      title: 'Building Agents',
      description: 'Learn how to implement and deploy AI agents',
      icon: <Code className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
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
                    <h4 className="font-semibold">Define Agent Purpose</h4>
                    <p className="text-sm text-muted-foreground">
                      Clearly define what the agent should accomplish and its boundaries
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">2</Badge>
                  <div>
                    <h4 className="font-semibold">Choose Foundation Model</h4>
                    <p className="text-sm text-muted-foreground">
                      Select appropriate LLM based on task complexity and performance needs
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">3</Badge>
                  <div>
                    <h4 className="font-semibold">Design Tool Integration</h4>
                    <p className="text-sm text-muted-foreground">
                      Determine what external tools and APIs the agent needs access to
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">4</Badge>
                  <div>
                    <h4 className="font-semibold">Implement Safety Measures</h4>
                    <p className="text-sm text-muted-foreground">
                      Add guardrails, validation, and monitoring for responsible operation
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Code Example */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Agent Implementation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md">
                <pre className="text-sm">
{`// Example: Simple AI Agent with Azure OpenAI
import { OpenAI } from 'openai';

class SimpleAgent {
  constructor(apiKey, model = 'gpt-4') {
    this.client = new OpenAI({ apiKey });
    this.model = model;
    this.tools = [];
  }

  async plan(goal) {
    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'system', content: 'You are a helpful AI agent.' },
        { role: 'user', content: \`Plan steps to achieve: \${goal}\` }
      ]
    });
    return response.choices[0].message.content;
  }

  async execute(plan) {
    // Execute the planned steps
    // This is where tool usage would happen
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
      id: 'advanced',
      title: 'Advanced Patterns',
      description: 'Explore advanced agent patterns and best practices',
      icon: <Lightbulb className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          {/* Advanced Patterns */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced Agent Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Multi-Agent Systems</h4>
                  <p className="text-sm text-muted-foreground">
                    Coordinating multiple specialized agents to solve complex problems
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Hierarchical Agents</h4>
                  <p className="text-sm text-muted-foreground">
                    Supervisor agents that coordinate and delegate to worker agents
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Feedback Loops</h4>
                  <p className="text-sm text-muted-foreground">
                    Agents that learn and improve from user feedback and outcomes
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Context Management</h4>
                  <p className="text-sm text-muted-foreground">
                    Advanced techniques for maintaining long-term memory and context
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card>
            <CardHeader>
              <CardTitle>Best Practices & Considerations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    ✅ Do's
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Start with simple, well-defined use cases</li>
                    <li>• Implement robust error handling and fallbacks</li>
                    <li>• Use structured outputs for better reliability</li>
                    <li>• Monitor agent performance and costs</li>
                  </ul>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                    ❌ Don'ts
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Don't give agents unrestricted access to critical systems</li>
                    <li>• Don't ignore potential security vulnerabilities</li>
                    <li>• Don't deploy without proper testing and validation</li>
                    <li>• Don't forget to implement human oversight</li>
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
      conceptId="ai-agents"
      title="AI Agents"
      description="Learn about autonomous AI systems that can perceive, decide, and act to achieve specific goals"
      tabs={tabs}
      nextConcept={{
        id: 'a2a-communication',
        title: 'A2A Communication',
        description: 'How AI agents communicate with each other'
      }}
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}
