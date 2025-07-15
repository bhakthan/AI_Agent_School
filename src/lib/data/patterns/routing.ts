import { PatternData } from './types';

export const routingPattern: PatternData = {
  id: 'routing',
  name: 'Routing',
  description: 'Smart routing system that directs queries to appropriate specialized agents or services based on content analysis.',
  category: 'Multi-Agent',
  useCases: ['Query Routing', 'Load Distribution', 'Specialized Processing', 'Service Orchestration'],
  whenToUse: 'Use Routing when you have multiple specialized agents or services and need to intelligently direct requests to the most appropriate handler. This pattern is ideal for complex systems with domain-specific experts or when you need to distribute workload efficiently.',
  nodes: [
    {
      id: 'input',
      type: 'input',
      data: { label: 'Query Input', nodeType: 'input' },
      position: { x: 100, y: 300 }
    },
    {
      id: 'analyzer',
      type: 'default',
      data: { label: 'Query Analyzer', nodeType: 'llm' },
      position: { x: 300, y: 300 }
    },
    {
      id: 'router',
      type: 'default',
      data: { label: 'Smart Router', nodeType: 'router' },
      position: { x: 500, y: 300 }
    },
    {
      id: 'agent-1',
      type: 'default',
      data: { label: 'Code Agent', nodeType: 'llm' },
      position: { x: 700, y: 150 }
    },
    {
      id: 'agent-2',
      type: 'default',
      data: { label: 'Data Agent', nodeType: 'llm' },
      position: { x: 700, y: 250 }
    },
    {
      id: 'agent-3',
      type: 'default',
      data: { label: 'Research Agent', nodeType: 'llm' },
      position: { x: 700, y: 350 }
    },
    {
      id: 'agent-4',
      type: 'default',
      data: { label: 'General Agent', nodeType: 'llm' },
      position: { x: 700, y: 450 }
    },
    {
      id: 'load-balancer',
      type: 'default',
      data: { label: 'Load Balancer', nodeType: 'aggregator' },
      position: { x: 900, y: 300 }
    },
    {
      id: 'output',
      type: 'output',
      data: { label: 'Response', nodeType: 'output' },
      position: { x: 1100, y: 300 }
    }
  ],
  edges: [
    { id: 'e1-2', source: 'input', target: 'analyzer', animated: true },
    { id: 'e2-3', source: 'analyzer', target: 'router', animated: true },
    { id: 'e3-4', source: 'router', target: 'agent-1', animated: true, label: 'Code' },
    { id: 'e3-5', source: 'router', target: 'agent-2', animated: true, label: 'Data' },
    { id: 'e3-6', source: 'router', target: 'agent-3', animated: true, label: 'Research' },
    { id: 'e3-7', source: 'router', target: 'agent-4', animated: true, label: 'General' },
    { id: 'e4-8', source: 'agent-1', target: 'load-balancer', animated: true },
    { id: 'e5-8', source: 'agent-2', target: 'load-balancer', animated: true },
    { id: 'e6-8', source: 'agent-3', target: 'load-balancer', animated: true },
    { id: 'e7-8', source: 'agent-4', target: 'load-balancer', animated: true },
    { id: 'e8-9', source: 'load-balancer', target: 'output' }
  ],
  codeExample: `// Routing Pattern implementation
interface Agent {
  id: string;
  name: string;
  capabilities: string[];
  load: number;
  maxLoad: number;
  process: (query: string) => Promise<any>;
}

interface RoutingRule {
  condition: (query: string, analysis: any) => boolean;
  agentId: string;
  priority: number;
  weight: number;
}

class SmartRouter {
  private agents: Map<string, Agent> = new Map();
  private routingRules: RoutingRule[] = [];
  private queryHistory: Array<{ query: string; route: string; performance: number }> = [];
  
  registerAgent(agent: Agent): void {
    this.agents.set(agent.id, agent);
  }
  
  addRoutingRule(rule: RoutingRule): void {
    this.routingRules.push(rule);
    this.routingRules.sort((a, b) => b.priority - a.priority);
  }
  
  async route(query: string): Promise<any> {
    try {
      // Step 1: Analyze query
      const analysis = await this.analyzeQuery(query);
      
      // Step 2: Find matching agents
      const candidates = await this.findCandidateAgents(query, analysis);
      
      // Step 3: Select best agent
      const selectedAgent = await this.selectAgent(candidates, analysis);
      
      // Step 4: Route to agent
      const result = await this.executeRoute(selectedAgent, query);
      
      // Step 5: Update metrics
      await this.updateMetrics(query, selectedAgent.id, result);
      
      return result;
    } catch (error) {
      return await this.handleRoutingError(error, query);
    }
  }
  
  private async analyzeQuery(query: string): Promise<any> {
    const analysisPrompt = \`
      Analyze the following query for routing purposes:
      
      Query: "\${query}"
      
      Determine:
      1. Primary domain/category
      2. Complexity level
      3. Required capabilities
      4. Expected response type
      5. Urgency level
      
      Return JSON with:
      {
        "domain": "code|data|research|general",
        "complexity": "low|medium|high",
        "capabilities": ["capability1", "capability2"],
        "responseType": "text|code|data|analysis",
        "urgency": "low|medium|high",
        "keywords": ["keyword1", "keyword2"]
      }
    \`;
    
    const response = await llm(analysisPrompt);
    return JSON.parse(response);
  }
  
  private async findCandidateAgents(query: string, analysis: any): Promise<Agent[]> {
    const candidates: Agent[] = [];
    
    // Rule-based matching
    for (const rule of this.routingRules) {
      if (rule.condition(query, analysis)) {
        const agent = this.agents.get(rule.agentId);
        if (agent && agent.load < agent.maxLoad) {
          candidates.push(agent);
        }
      }
    }
    
    // Capability-based matching
    for (const [id, agent] of this.agents) {
      const matchingCapabilities = agent.capabilities.filter(cap =>
        analysis.capabilities.includes(cap)
      );
      
      if (matchingCapabilities.length > 0 && agent.load < agent.maxLoad) {
        candidates.push(agent);
      }
    }
    
    return candidates;
  }
  
  private async selectAgent(candidates: Agent[], analysis: any): Promise<Agent> {
    if (candidates.length === 0) {
      throw new Error('No available agents found');
    }
    
    if (candidates.length === 1) {
      return candidates[0];
    }
    
    // Score each candidate
    const scores = candidates.map(agent => {
      let score = 0;
      
      // Capability match score
      const capabilityMatch = agent.capabilities.filter(cap =>
        analysis.capabilities.includes(cap)
      ).length;
      score += capabilityMatch * 10;
      
      // Load balance score (lower load = higher score)
      score += (agent.maxLoad - agent.load) * 5;
      
      // Historical performance score
      const avgPerformance = this.getAveragePerformance(agent.id);
      score += avgPerformance * 3;
      
      return { agent, score };
    });
    
    // Select highest scoring agent
    scores.sort((a, b) => b.score - a.score);
    return scores[0].agent;
  }
  
  private async executeRoute(agent: Agent, query: string): Promise<any> {
    const startTime = Date.now();
    
    try {
      // Update agent load
      agent.load++;
      
      // Process query
      const result = await agent.process(query);
      
      // Calculate performance
      const duration = Date.now() - startTime;
      const performance = Math.max(0, 100 - (duration / 100)); // Simple performance metric
      
      return {
        result,
        agentId: agent.id,
        duration,
        performance
      };
    } finally {
      // Decrease agent load
      agent.load--;
    }
  }
  
  private async updateMetrics(query: string, agentId: string, result: any): Promise<void> {
    this.queryHistory.push({
      query,
      route: agentId,
      performance: result.performance
    });
    
    // Keep only last 1000 queries
    if (this.queryHistory.length > 1000) {
      this.queryHistory = this.queryHistory.slice(-1000);
    }
  }
  
  private getAveragePerformance(agentId: string): number {
    const agentQueries = this.queryHistory.filter(q => q.route === agentId);
    if (agentQueries.length === 0) return 50; // Default score
    
    const totalPerformance = agentQueries.reduce((sum, q) => sum + q.performance, 0);
    return totalPerformance / agentQueries.length;
  }
  
  private async handleRoutingError(error: Error, query: string): Promise<any> {
    console.error('Routing error:', error);
    
    // Fallback to general agent
    const generalAgent = Array.from(this.agents.values())
      .find(agent => agent.capabilities.includes('general'));
    
    if (generalAgent && generalAgent.load < generalAgent.maxLoad) {
      return await this.executeRoute(generalAgent, query);
    }
    
    throw new Error(\`Routing failed: \${error.message}\`);
  }
  
  // Analytics methods
  getRoutingStats(): any {
    const stats = {
      totalQueries: this.queryHistory.length,
      agentUsage: {} as any,
      averagePerformance: 0
    };
    
    // Calculate agent usage
    for (const query of this.queryHistory) {
      if (!stats.agentUsage[query.route]) {
        stats.agentUsage[query.route] = 0;
      }
      stats.agentUsage[query.route]++;
    }
    
    // Calculate average performance
    const totalPerformance = this.queryHistory.reduce((sum, q) => sum + q.performance, 0);
    stats.averagePerformance = totalPerformance / this.queryHistory.length;
    
    return stats;
  }
}

// Example usage
const router = new SmartRouter();

// Register agents
router.registerAgent({
  id: 'code-agent',
  name: 'Code Specialist',
  capabilities: ['programming', 'debugging', 'code-review'],
  load: 0,
  maxLoad: 10,
  process: async (query) => \`Code response for: \${query}\`
});

router.registerAgent({
  id: 'data-agent',
  name: 'Data Specialist',
  capabilities: ['data-analysis', 'statistics', 'visualization'],
  load: 0,
  maxLoad: 8,
  process: async (query) => \`Data response for: \${query}\`
});

// Add routing rules
router.addRoutingRule({
  condition: (query, analysis) => analysis.domain === 'code',
  agentId: 'code-agent',
  priority: 10,
  weight: 1.0
});

router.addRoutingRule({
  condition: (query, analysis) => analysis.domain === 'data',
  agentId: 'data-agent',
  priority: 10,
  weight: 1.0
});`,
  pythonCodeExample: `# Smart Routing implementation
import asyncio
import json
from typing import Dict, List, Any, Optional, Callable
from dataclasses import dataclass
from collections import defaultdict

@dataclass
class Agent:
    id: str
    name: str
    capabilities: List[str]
    load: int
    max_load: int
    process: Callable[[str], Any]

@dataclass
class RoutingRule:
    condition: Callable[[str, Dict[str, Any]], bool]
    agent_id: str
    priority: int
    weight: float

class SmartRouter:
    def __init__(self):
        self.agents: Dict[str, Agent] = {}
        self.routing_rules: List[RoutingRule] = []
        self.query_history: List[Dict[str, Any]] = []
        self.performance_metrics: Dict[str, List[float]] = defaultdict(list)
    
    def register_agent(self, agent: Agent):
        """Register an agent with the router."""
        self.agents[agent.id] = agent
    
    def add_routing_rule(self, rule: RoutingRule):
        """Add a routing rule."""
        self.routing_rules.append(rule)
        self.routing_rules.sort(key=lambda x: x.priority, reverse=True)
    
    async def route(self, query: str) -> Dict[str, Any]:
        """Route a query to the appropriate agent."""
        try:
            # Step 1: Analyze query
            analysis = await self.analyze_query(query)
            
            # Step 2: Find candidate agents
            candidates = await self.find_candidate_agents(query, analysis)
            
            # Step 3: Select best agent
            selected_agent = await self.select_agent(candidates, analysis)
            
            # Step 4: Execute route
            result = await self.execute_route(selected_agent, query)
            
            # Step 5: Update metrics
            await self.update_metrics(query, selected_agent.id, result)
            
            return result
        except Exception as error:
            return await self.handle_routing_error(error, query)
    
    async def analyze_query(self, query: str) -> Dict[str, Any]:
        """Analyze query for routing purposes."""
        analysis_prompt = f"""
        Analyze the following query for routing purposes:
        
        Query: "{query}"
        
        Determine:
        1. Primary domain/category
        2. Complexity level
        3. Required capabilities
        4. Expected response type
        5. Urgency level
        
        Return JSON with:
        {{
            "domain": "code|data|research|general",
            "complexity": "low|medium|high",
            "capabilities": ["capability1", "capability2"],
            "responseType": "text|code|data|analysis",
            "urgency": "low|medium|high",
            "keywords": ["keyword1", "keyword2"]
        }}
        """
        
        # Call LLM for analysis
        response = await self.call_llm(analysis_prompt)
        return json.loads(response)
    
    async def find_candidate_agents(self, query: str, analysis: Dict[str, Any]) -> List[Agent]:
        """Find candidate agents for the query."""
        candidates = []
        
        # Rule-based matching
        for rule in self.routing_rules:
            if rule.condition(query, analysis):
                agent = self.agents.get(rule.agent_id)
                if agent and agent.load < agent.max_load:
                    candidates.append(agent)
        
        # Capability-based matching
        for agent in self.agents.values():
            matching_capabilities = set(agent.capabilities) & set(analysis.get('capabilities', []))
            if matching_capabilities and agent.load < agent.max_load:
                candidates.append(agent)
        
        # Remove duplicates
        return list(set(candidates))
    
    async def select_agent(self, candidates: List[Agent], analysis: Dict[str, Any]) -> Agent:
        """Select the best agent from candidates."""
        if not candidates:
            raise Exception("No available agents found")
        
        if len(candidates) == 1:
            return candidates[0]
        
        # Score each candidate
        scores = []
        for agent in candidates:
            score = 0
            
            # Capability match score
            matching_caps = set(agent.capabilities) & set(analysis.get('capabilities', []))
            score += len(matching_caps) * 10
            
            # Load balance score (lower load = higher score)
            score += (agent.max_load - agent.load) * 5
            
            # Historical performance score
            avg_performance = self.get_average_performance(agent.id)
            score += avg_performance * 3
            
            scores.append((agent, score))
        
        # Select highest scoring agent
        scores.sort(key=lambda x: x[1], reverse=True)
        return scores[0][0]
    
    async def execute_route(self, agent: Agent, query: str) -> Dict[str, Any]:
        """Execute routing to selected agent."""
        import time
        start_time = time.time()
        
        try:
            # Update agent load
            agent.load += 1
            
            # Process query
            result = await agent.process(query)
            
            # Calculate performance
            duration = time.time() - start_time
            performance = max(0, 100 - (duration * 10))  # Simple performance metric
            
            return {
                'result': result,
                'agent_id': agent.id,
                'duration': duration,
                'performance': performance
            }
        finally:
            # Decrease agent load
            agent.load -= 1
    
    async def update_metrics(self, query: str, agent_id: str, result: Dict[str, Any]):
        """Update routing metrics."""
        self.query_history.append({
            'query': query,
            'route': agent_id,
            'performance': result['performance'],
            'duration': result['duration']
        })
        
        # Keep only last 1000 queries
        if len(self.query_history) > 1000:
            self.query_history = self.query_history[-1000:]
        
        # Update performance metrics
        self.performance_metrics[agent_id].append(result['performance'])
    
    def get_average_performance(self, agent_id: str) -> float:
        """Get average performance for an agent."""
        performances = self.performance_metrics.get(agent_id, [])
        return sum(performances) / len(performances) if performances else 50.0
    
    async def handle_routing_error(self, error: Exception, query: str) -> Dict[str, Any]:
        """Handle routing errors."""
        print(f"Routing error: {error}")
        
        # Fallback to general agent
        general_agent = None
        for agent in self.agents.values():
            if 'general' in agent.capabilities and agent.load < agent.max_load:
                general_agent = agent
                break
        
        if general_agent:
            return await self.execute_route(general_agent, query)
        
        raise Exception(f"Routing failed: {error}")
    
    def get_routing_stats(self) -> Dict[str, Any]:
        """Get routing statistics."""
        stats = {
            'total_queries': len(self.query_history),
            'agent_usage': defaultdict(int),
            'average_performance': 0,
            'agent_performance': {}
        }
        
        # Calculate agent usage
        for query in self.query_history:
            stats['agent_usage'][query['route']] += 1
        
        # Calculate average performance
        if self.query_history:
            total_performance = sum(q['performance'] for q in self.query_history)
            stats['average_performance'] = total_performance / len(self.query_history)
        
        # Calculate per-agent performance
        for agent_id, performances in self.performance_metrics.items():
            if performances:
                stats['agent_performance'][agent_id] = sum(performances) / len(performances)
        
        return stats
    
    async def call_llm(self, prompt: str) -> str:
        """Call LLM - implement based on your chosen provider."""
        # Placeholder - implement with your LLM provider
        return '{"domain": "general", "complexity": "medium", "capabilities": ["general"], "responseType": "text", "urgency": "medium", "keywords": []}'

# Example usage
async def main():
    router = SmartRouter()
    
    # Register agents
    code_agent = Agent(
        id='code-agent',
        name='Code Specialist',
        capabilities=['programming', 'debugging', 'code-review'],
        load=0,
        max_load=10,
        process=lambda query: f"Code response for: {query}"
    )
    
    data_agent = Agent(
        id='data-agent',
        name='Data Specialist',
        capabilities=['data-analysis', 'statistics', 'visualization'],
        load=0,
        max_load=8,
        process=lambda query: f"Data response for: {query}"
    )
    
    router.register_agent(code_agent)
    router.register_agent(data_agent)
    
    # Add routing rules
    router.add_routing_rule(RoutingRule(
        condition=lambda query, analysis: analysis.get('domain') == 'code',
        agent_id='code-agent',
        priority=10,
        weight=1.0
    ))
    
    router.add_routing_rule(RoutingRule(
        condition=lambda query, analysis: analysis.get('domain') == 'data',
        agent_id='data-agent',
        priority=10,
        weight=1.0
    ))
    
    # Route a query
    result = await router.route("Help me debug this Python function")
    print(f"Result: {result}")
    
    # Get stats
    stats = router.get_routing_stats()
    print(f"Stats: {stats}")

if __name__ == "__main__":
    asyncio.run(main())
`,
  implementation: [
    'Design query analysis and classification system',
    'Create agent registration and capability management',
    'Implement rule-based and ML-based routing logic',
    'Build load balancing and performance monitoring',
    'Add fallback and error handling mechanisms',
    'Create routing metrics and analytics',
    'Implement adaptive routing based on performance',
    'Add A/B testing for routing strategies'
  ]
};
