export interface PatternNode {
  id: string
  type: string
  data: {
    label: string
    description?: string
    nodeType?: 'input' | 'llm' | 'output' | 'router' | 'tool' | 'aggregator' | 'evaluator' | 'planner' | 'executor'
  }
  position: { x: number; y: number }
}

export interface PatternEdge {
  id: string
  source: string
  target: string
  type?: string
  label?: string
  animated?: boolean
  style?: {
    stroke?: string
    strokeWidth?: number
    strokeDasharray?: string
  }
}

export interface PatternData {
  id: string
  name: string
  description: string
  category?: string
  nodes: PatternNode[]
  edges: PatternEdge[]
  useCases: string[]
  codeExample: string
  pythonCodeExample?: string
  implementation: string[]
  whenToUse?: string
  advantages?: string[]
}

export type PatternType = 
  | 'react'
  | 'prompt-chaining'
  | 'parallelization'
  | 'orchestrator-worker'
  | 'evaluator-optimizer'
  | 'routing'
  | 'autonomous-workflow'
  | 'deep-researcher'
  | 'voice-agent'
  | 'agent-evaluation'
  | 'codeact-agent'
  | 'self-reflection'
  | 'agentic-rag'
  | 'modern-tool-use'
  | 'mcp'
  | 'agent-to-agent';
