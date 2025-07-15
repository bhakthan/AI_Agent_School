// Temporary patterns file to avoid syntax errors
export interface PatternData {
  id: string
  name: string
  description: string
  category?: string
  nodes: any[]
  edges: any[]
  useCases: string[]
  codeExample: string
  pythonCodeExample?: string
  implementation: string[]
  whenToUse?: string
  advantages?: string[]
}

export const agentPatterns: PatternData[] = [
  {
    id: 'react-agent',
    name: 'ReAct Agent',
    description: 'A reasoning and acting framework where an agent alternates between reasoning (using LLMs) and acting (using tools like Google or email).',
    category: 'Core',
    useCases: ['Multi-Step Problem Solving', 'Research Tasks', 'Information Gathering'],
    nodes: [],
    edges: [],
    codeExample: '// ReAct Agent implementation\nconst agent = new ReactAgent();',
    implementation: ['Set up LLM', 'Define tools', 'Implement reasoning loop'],
    advantages: ['Flexible reasoning', 'Tool integration', 'Iterative problem solving']
  },
  {
    id: 'parallelization',
    name: 'Parallelization',
    description: 'Parallelization in LLMs involves sectioning tasks or running them multiple times for aggregated outputs.',
    useCases: ['Implementing guardrails', 'Automating Evals'],
    nodes: [],
    edges: [],
    codeExample: '// Parallelization implementation\nconst results = await Promise.all(tasks);',
    implementation: ['Divide tasks', 'Execute in parallel', 'Aggregate results'],
    advantages: ['Improved performance', 'Better reliability', 'Scalability']
  },
  {
    id: 'prompt-chaining',
    name: 'Prompt Chaining',
    description: 'It decomposes a task into steps, where each LLM call processes the output of the previous one.',
    useCases: ['Chatbot Applications', 'Tool using AI Agents'],
    nodes: [],
    edges: [],
    codeExample: '// Prompt Chaining implementation\nconst result = await chainPrompts(steps);',
    implementation: ['Define steps', 'Chain prompts', 'Process sequentially'],
    advantages: ['Clear workflow', 'Step-by-step reasoning', 'Maintainable']
  }
];

// Export individual patterns for easier access
export const parallelizationPattern = agentPatterns.find(p => p.id === 'parallelization');
export const chainOfThoughtPattern = agentPatterns.find(p => p.id === 'prompt-chaining');
