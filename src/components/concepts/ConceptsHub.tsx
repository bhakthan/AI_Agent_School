import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, ArrowsHorizontal, Shield, Stack, ArrowRight, CheckCircle, BookOpen, LinkSimple, Graph, ChartBar, Clock, Lock, Users } from "@phosphor-icons/react"
import AIAgentsConcept from "./AIAgentsConcept"
import A2ACommunicationConcept from "./A2ACommunicationConcept"
import MCPConcept from "./MCPConcept"
import ACPConcept from "./ACPConcept"
import MCPxA2AIntegrationConcept from "./MCPxA2AIntegrationConcept"
import FlowVisualizationConcept from "./FlowVisualizationConcept"
import DataVisualizationConcept from "./DataVisualizationConcept"
import AgentArchitectureConcept from "./AgentArchitectureConcept"
import AgentSecurityConcept from "./AgentSecurityConcept"
import MultiAgentSystemsConcept from "./MultiAgentSystemsConcept"
import AgentDeploymentConcept from "./AgentDeploymentConcept"
import AgentEthicsConcept from "./AgentEthicsConcept"
import AgentLearningConcept from "./AgentLearningConcept"
import AgentIntegrationConcept from "./AgentIntegrationConcept"

interface ConceptInfo {
  id: string
  title: string
  description: string
  level: 'fundamentals' | 'architecture' | 'implementation' | 'advanced'
  icon: React.ReactNode
  color: string
  estimatedTime: string
  prerequisites: string[]
  component: React.ComponentType<{ onMarkComplete?: () => void; onNavigateToNext?: (nextConceptId: string) => void }>
}

const concepts: ConceptInfo[] = [
  // Tier 1: Foundational Concepts
  {
    id: 'agent-architecture',
    title: 'Agent Architecture & Lifecycle',
    description: 'Understanding the fundamental building blocks and lifecycle of AI agents',
    level: 'fundamentals',
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    estimatedTime: '25-35 min',
    prerequisites: [],
    component: AgentArchitectureConcept
  },
  {
    id: 'agent-security',
    title: 'Agent Security & Trust',
    description: 'Security mechanisms and trust models for AI agent systems',
    level: 'fundamentals',
    icon: <Shield className="w-6 h-6" />,
    color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    estimatedTime: '30-40 min',
    prerequisites: ['agent-architecture'],
    component: AgentSecurityConcept
  },
  {
    id: 'multi-agent-systems',
    title: 'Multi-Agent Systems',
    description: 'Coordination, collaboration, and emergent behavior in multi-agent systems',
    level: 'fundamentals',
    icon: <Users className="w-6 h-6" />,
    color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    estimatedTime: '35-45 min',
    prerequisites: ['agent-architecture'],
    component: MultiAgentSystemsConcept
  },
  {
    id: 'agent-ethics',
    title: 'Agent Ethics & Governance',
    description: 'Ethical principles, bias mitigation, and regulatory compliance for AI agents',
    level: 'fundamentals',
    icon: <Shield className="w-6 h-6" />,
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    estimatedTime: '35-45 min',
    prerequisites: ['agent-architecture'],
    component: AgentEthicsConcept
  },
  {
    id: 'ai-agents',
    title: 'AI Agents',
    description: 'Learn about autonomous AI systems that can perceive, decide, and act',
    level: 'fundamentals',
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
    estimatedTime: '20-30 min',
    prerequisites: [],
    component: AIAgentsConcept
  },
  // Tier 2: Architecture Concepts
  {
    id: 'a2a-communication',
    title: 'A2A Communication',
    description: 'How AI agents communicate and coordinate with each other',
    level: 'architecture',
    icon: <ArrowsHorizontal className="w-6 h-6" />,
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    estimatedTime: '25-35 min',
    prerequisites: ['multi-agent-systems'],
    component: A2ACommunicationConcept
  },
  {
    id: 'mcp',
    title: 'Model Context Protocol',
    description: 'Secure tool integration protocol for AI agents',
    level: 'architecture',
    icon: <Shield className="w-6 h-6" />,
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    estimatedTime: '30-40 min',
    prerequisites: ['agent-security'],
    component: MCPConcept
  },
  {
    id: 'flow-visualization',
    title: 'Flow Visualization',
    description: 'Interactive visualization of agent flows and interactions',
    level: 'architecture',
    icon: <Graph className="w-6 h-6" />,
    color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400',
    estimatedTime: '30-40 min',
    prerequisites: ['a2a-communication'],
    component: FlowVisualizationConcept
  },
  // Tier 3: Implementation Concepts
  {
    id: 'acp',
    title: 'Agent Communication Protocol',
    description: 'Advanced protocols for enterprise-scale agent coordination',
    level: 'implementation',
    icon: <Stack className="w-6 h-6" />,
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
    estimatedTime: '35-45 min',
    prerequisites: ['a2a-communication'],
    component: ACPConcept
  },
  {
    id: 'mcp-a2a-integration',
    title: 'MCP x A2A Integration',
    description: 'Integrate Model Context Protocol with Agent-to-Agent communication',
    level: 'implementation',
    icon: <LinkSimple className="w-6 h-6" />,
    color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400',
    estimatedTime: '40-50 min',
    prerequisites: ['mcp', 'a2a-communication'],
    component: MCPxA2AIntegrationConcept
  },
  {
    id: 'data-visualization',
    title: 'Data Visualization',
    description: 'Advanced data visualization techniques for AI agent systems',
    level: 'implementation',
    icon: <ChartBar className="w-6 h-6" />,
    color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400',
    estimatedTime: '35-45 min',
    prerequisites: ['flow-visualization'],
    component: DataVisualizationConcept
  },
  // Tier 4: Advanced Concepts
  {
    id: 'agent-deployment',
    title: 'Agent Deployment & Operations',
    description: 'Containerization, monitoring, scaling, and DevOps for AI agents',
    level: 'advanced',
    icon: <Lock className="w-6 h-6" />,
    color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    estimatedTime: '40-50 min',
    prerequisites: ['acp'],
    component: AgentDeploymentConcept
  },
  {
    id: 'agent-learning',
    title: 'Agent Learning & Adaptation',
    description: 'Reinforcement learning, online learning, transfer learning, and meta-learning',
    level: 'advanced',
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    estimatedTime: '45-55 min',
    prerequisites: ['ai-agents'],
    component: AgentLearningConcept
  },
  {
    id: 'agent-integration',
    title: 'Agent Integration Patterns',
    description: 'API integration, event-driven architecture, microservices, and legacy systems',
    level: 'advanced',
    icon: <LinkSimple className="w-6 h-6" />,
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    estimatedTime: '40-50 min',
    prerequisites: ['mcp-a2a-integration'],
    component: AgentIntegrationConcept
  }
]

export default function ConceptsHub() {
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null)
  const [completedConcepts, setCompletedConcepts] = useState<Set<string>>(new Set())

  const handleConceptSelect = (conceptId: string) => {
    setSelectedConcept(conceptId)
  }

  const handleBackToHub = () => {
    setSelectedConcept(null)
  }

  const handleNextConcept = (nextConceptId: string) => {
    setSelectedConcept(nextConceptId)
  }

  const markConceptComplete = (conceptId: string) => {
    setCompletedConcepts(prev => new Set([...prev, conceptId]))
  }

  if (selectedConcept) {
    const concept = concepts.find(c => c.id === selectedConcept)
    if (concept) {
      const ConceptComponent = concept.component
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleBackToHub}>
              ← Back to Concepts
            </Button>
            <div className="flex items-center gap-2">
              {concept.icon}
              <h2 className="text-xl font-semibold">{concept.title}</h2>
              <Badge className={concept.color}>{concept.level}</Badge>
            </div>
          </div>
          <ConceptComponent 
            onMarkComplete={() => markConceptComplete(selectedConcept)}
            onNavigateToNext={handleNextConcept}
          />
        </div>
      )
    }
  }

  const progressPercentage = (completedConcepts.size / concepts.length) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="w-8 h-8" />
                Core Concepts Learning Path
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Master AI agent concepts through a structured, progressive learning experience
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-2">Overall Progress</div>
              <Progress value={progressPercentage} className="w-32" />
              <div className="text-xs text-muted-foreground mt-1">
                {completedConcepts.size} of {concepts.length} concepts completed
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Learning Path */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {concepts.map((concept, index) => {
          const isCompleted = completedConcepts.has(concept.id)
          // All concepts are now enabled by default for users familiar with AI Agents
          const isLocked = false

          return (
            <Card 
              key={concept.id}
              className={`relative transition-all hover:shadow-lg cursor-pointer`}
              onClick={() => handleConceptSelect(concept.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted">
                      {concept.icon}
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {concept.title}
                        {isCompleted && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={concept.color}>
                          {concept.level}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {concept.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  {!isLocked && (
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {concept.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    {isCompleted ? 'Completed' : 'Ready to start'}
                  </div>
                  <Button 
                    variant={isCompleted ? "outline" : "default"}
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    {isCompleted ? 'Review' : 'Start Learning'}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Learning Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-semibold">1</span>
              </div>
              <div>
                <h4 className="font-medium">Follow the Path</h4>
                <p className="text-sm text-muted-foreground">
                  Complete concepts in order for the best learning experience
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400 font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-medium">Hands-on Practice</h4>
                <p className="text-sm text-muted-foreground">
                  Try the interactive demos and examples in each section
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400 font-semibold">3</span>
              </div>
              <div>
                <h4 className="font-medium">Apply Knowledge</h4>
                <p className="text-sm text-muted-foreground">
                  Build your own projects using the patterns you've learned
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
