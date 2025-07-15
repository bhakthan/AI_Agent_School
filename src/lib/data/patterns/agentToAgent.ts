import { PatternData } from './types';

export const agentToAgentPattern: PatternData = {
  id: 'agent-to-agent',
  name: 'Agent-to-Agent Communication',
  description: 'Communication protocols and patterns for multi-agent systems with coordination and collaboration.',
  category: 'Multi-Agent',
  useCases: ['Distributed Systems', 'Collaborative Problem Solving', 'Task Delegation', 'Knowledge Sharing'],
  whenToUse: 'Use Agent-to-Agent communication when you need multiple AI agents to collaborate, share information, or coordinate on complex tasks. This pattern is ideal for distributed problem-solving, specialized agent teams, or systems requiring different expertise areas.',
  nodes: [
    {
      id: 'coordinator',
      type: 'input',
      data: { label: 'Coordinator Agent', nodeType: 'llm' },
      position: { x: 100, y: 200 }
    },
    {
      id: 'message-bus',
      type: 'default',
      data: { label: 'Message Bus', nodeType: 'router' },
      position: { x: 300, y: 200 }
    },
    {
      id: 'agent-1',
      type: 'default',
      data: { label: 'Specialist Agent 1', nodeType: 'llm' },
      position: { x: 500, y: 100 }
    },
    {
      id: 'agent-2',
      type: 'default',
      data: { label: 'Specialist Agent 2', nodeType: 'llm' },
      position: { x: 500, y: 200 }
    },
    {
      id: 'agent-3',
      type: 'default',
      data: { label: 'Specialist Agent 3', nodeType: 'llm' },
      position: { x: 500, y: 300 }
    },
    {
      id: 'aggregator',
      type: 'default',
      data: { label: 'Response Aggregator', nodeType: 'aggregator' },
      position: { x: 700, y: 200 }
    },
    {
      id: 'output',
      type: 'output',
      data: { label: 'Final Output', nodeType: 'output' },
      position: { x: 900, y: 200 }
    }
  ],
  edges: [
    { id: 'e1-2', source: 'coordinator', target: 'message-bus', animated: true },
    { id: 'e2-3', source: 'message-bus', target: 'agent-1', animated: true },
    { id: 'e2-4', source: 'message-bus', target: 'agent-2', animated: true },
    { id: 'e2-5', source: 'message-bus', target: 'agent-3', animated: true },
    { id: 'e3-6', source: 'agent-1', target: 'aggregator', animated: true },
    { id: 'e4-6', source: 'agent-2', target: 'aggregator', animated: true },
    { id: 'e5-6', source: 'agent-3', target: 'aggregator', animated: true },
    { id: 'e6-7', source: 'aggregator', target: 'output' },
    { id: 'e3-4', source: 'agent-1', target: 'agent-2', animated: true, label: 'Peer Communication' },
    { id: 'e4-5', source: 'agent-2', target: 'agent-3', animated: true, label: 'Peer Communication' }
  ],
  codeExample: `// Agent-to-Agent Communication implementation
interface AgentMessage {
  id: string;
  from: string;
  to: string;
  type: 'request' | 'response' | 'broadcast' | 'notification';
  content: any;
  timestamp: number;
  conversationId?: string;
}

class AgentCommunicationSystem {
  private agents: Map<string, Agent> = new Map();
  private messageQueue: AgentMessage[] = [];
  private messageHistory: AgentMessage[] = [];
  
  async registerAgent(agent: Agent): Promise<void> {
    this.agents.set(agent.id, agent);
    agent.setCommunicationSystem(this);
  }
  
  async sendMessage(message: AgentMessage): Promise<void> {
    this.messageHistory.push(message);
    
    if (message.to === 'broadcast') {
      // Broadcast to all agents except sender
      for (const [id, agent] of this.agents) {
        if (id !== message.from) {
          await agent.receiveMessage(message);
        }
      }
    } else {
      // Send to specific agent
      const targetAgent = this.agents.get(message.to);
      if (targetAgent) {
        await targetAgent.receiveMessage(message);
      }
    }
  }
  
  async coordinateTask(task: string): Promise<any> {
    const coordinator = this.agents.get('coordinator');
    if (!coordinator) {
      throw new Error('No coordinator agent found');
    }
    
    // Coordinator analyzes task and delegates
    const delegation = await coordinator.analyzeAndDelegate(task);
    
    // Send tasks to specialist agents
    const promises = delegation.subtasks.map(async (subtask: any) => {
      const message: AgentMessage = {
        id: \`msg-\${Date.now()}-\${Math.random()}\`,
        from: 'coordinator',
        to: subtask.assignedAgent,
        type: 'request',
        content: {
          task: subtask.description,
          context: subtask.context,
          deadline: subtask.deadline
        },
        timestamp: Date.now()
      };
      
      await this.sendMessage(message);
      return this.waitForResponse(message.id);
    });
    
    // Wait for all responses
    const responses = await Promise.all(promises);
    
    // Aggregate results
    const aggregatedResult = await coordinator.aggregateResults(responses);
    
    return aggregatedResult;
  }
  
  private async waitForResponse(messageId: string): Promise<any> {
    return new Promise((resolve) => {
      const checkForResponse = () => {
        const response = this.messageHistory.find(
          msg => msg.type === 'response' && msg.content.replyToId === messageId
        );
        
        if (response) {
          resolve(response.content.result);
        } else {
          setTimeout(checkForResponse, 100);
        }
      };
      
      checkForResponse();
    });
  }
}

class Agent {
  constructor(
    public id: string,
    public role: string,
    public capabilities: string[]
  ) {}
  
  private communicationSystem?: AgentCommunicationSystem;
  
  setCommunicationSystem(system: AgentCommunicationSystem): void {
    this.communicationSystem = system;
  }
  
  async receiveMessage(message: AgentMessage): Promise<void> {
    console.log(\`Agent \${this.id} received message:\`, message);
    
    if (message.type === 'request') {
      const result = await this.processTask(message.content.task);
      
      // Send response
      await this.sendResponse(message.id, result);
    }
  }
  
  private async sendResponse(originalMessageId: string, result: any): Promise<void> {
    if (!this.communicationSystem) return;
    
    const response: AgentMessage = {
      id: \`resp-\${Date.now()}-\${Math.random()}\`,
      from: this.id,
      to: 'coordinator',
      type: 'response',
      content: {
        replyToId: originalMessageId,
        result
      },
      timestamp: Date.now()
    };
    
    await this.communicationSystem.sendMessage(response);
  }
  
  private async processTask(task: string): Promise<any> {
    // Simulate task processing
    return \`Processed by \${this.id}: \${task}\`;
  }
}`,
  pythonCodeExample: `# Agent-to-Agent Communication implementation
import asyncio
import json
from typing import Dict, List, Any, Optional
from dataclasses import dataclass, field
from enum import Enum

class MessageType(Enum):
    REQUEST = "request"
    RESPONSE = "response"
    BROADCAST = "broadcast"
    NOTIFICATION = "notification"

@dataclass
class AgentMessage:
    id: str
    from_agent: str
    to_agent: str
    message_type: MessageType
    content: Any
    timestamp: float
    conversation_id: Optional[str] = None

class Agent:
    def __init__(self, agent_id: str, role: str, capabilities: List[str]):
        self.id = agent_id
        self.role = role
        self.capabilities = capabilities
        self.communication_system = None
        self.message_queue = asyncio.Queue()
        self.running = False
    
    def set_communication_system(self, system):
        """Set the communication system for this agent."""
        self.communication_system = system
    
    async def start(self):
        """Start the agent's message processing loop."""
        self.running = True
        while self.running:
            try:
                message = await asyncio.wait_for(self.message_queue.get(), timeout=1.0)
                await self.handle_message(message)
            except asyncio.TimeoutError:
                continue
    
    async def stop(self):
        """Stop the agent."""
        self.running = False
    
    async def receive_message(self, message: AgentMessage):
        """Receive a message from another agent."""
        await self.message_queue.put(message)
    
    async def handle_message(self, message: AgentMessage):
        """Handle an incoming message."""
        print(f"Agent {self.id} received message: {message}")
        
        if message.message_type == MessageType.REQUEST:
            result = await self.process_task(message.content.get('task', ''))
            await self.send_response(message.id, result)
        elif message.message_type == MessageType.BROADCAST:
            await self.handle_broadcast(message)
        elif message.message_type == MessageType.NOTIFICATION:
            await self.handle_notification(message)
    
    async def process_task(self, task: str) -> Any:
        """Process a task - override in subclasses."""
        await asyncio.sleep(0.1)  # Simulate processing time
        return f"Processed by {self.id}: {task}"
    
    async def send_response(self, original_message_id: str, result: Any):
        """Send a response to the original sender."""
        if not self.communication_system:
            return
        
        response = AgentMessage(
            id=f"resp-{asyncio.get_event_loop().time()}",
            from_agent=self.id,
            to_agent="coordinator",
            message_type=MessageType.RESPONSE,
            content={
                "reply_to_id": original_message_id,
                "result": result
            },
            timestamp=asyncio.get_event_loop().time()
        )
        
        await self.communication_system.send_message(response)
    
    async def send_message(self, to_agent: str, content: Any, message_type: MessageType = MessageType.REQUEST):
        """Send a message to another agent."""
        if not self.communication_system:
            return
        
        message = AgentMessage(
            id=f"msg-{asyncio.get_event_loop().time()}",
            from_agent=self.id,
            to_agent=to_agent,
            message_type=message_type,
            content=content,
            timestamp=asyncio.get_event_loop().time()
        )
        
        await self.communication_system.send_message(message)
    
    async def handle_broadcast(self, message: AgentMessage):
        """Handle broadcast messages."""
        print(f"Agent {self.id} received broadcast: {message.content}")
    
    async def handle_notification(self, message: AgentMessage):
        """Handle notification messages."""
        print(f"Agent {self.id} received notification: {message.content}")

class AgentCommunicationSystem:
    def __init__(self):
        self.agents: Dict[str, Agent] = {}
        self.message_history: List[AgentMessage] = []
        self.pending_responses: Dict[str, asyncio.Future] = {}
    
    async def register_agent(self, agent: Agent):
        """Register an agent with the communication system."""
        self.agents[agent.id] = agent
        agent.set_communication_system(self)
        await agent.start()
    
    async def send_message(self, message: AgentMessage):
        """Send a message through the communication system."""
        self.message_history.append(message)
        
        if message.to_agent == "broadcast":
            # Broadcast to all agents except sender
            for agent_id, agent in self.agents.items():
                if agent_id != message.from_agent:
                    await agent.receive_message(message)
        else:
            # Send to specific agent
            target_agent = self.agents.get(message.to_agent)
            if target_agent:
                await target_agent.receive_message(message)
        
        # Handle response tracking
        if message.message_type == MessageType.RESPONSE:
            reply_to_id = message.content.get("reply_to_id")
            if reply_to_id in self.pending_responses:
                self.pending_responses[reply_to_id].set_result(message.content.get("result"))
    
    async def coordinate_task(self, task: str) -> Any:
        """Coordinate a task across multiple agents."""
        coordinator = self.agents.get("coordinator")
        if not coordinator:
            raise ValueError("No coordinator agent found")
        
        # Analyze task and create delegation plan
        delegation_plan = await self.create_delegation_plan(task)
        
        # Send tasks to specialist agents
        tasks = []
        for subtask in delegation_plan["subtasks"]:
            message_id = f"task-{asyncio.get_event_loop().time()}"
            message = AgentMessage(
                id=message_id,
                from_agent="coordinator",
                to_agent=subtask["assigned_agent"],
                message_type=MessageType.REQUEST,
                content={
                    "task": subtask["description"],
                    "context": subtask["context"]
                },
                timestamp=asyncio.get_event_loop().time()
            )
            
            # Set up response tracking
            future = asyncio.Future()
            self.pending_responses[message_id] = future
            
            await self.send_message(message)
            tasks.append(future)
        
        # Wait for all responses
        responses = await asyncio.gather(*tasks)
        
        # Aggregate results
        aggregated_result = await self.aggregate_results(responses)
        
        return aggregated_result
    
    async def create_delegation_plan(self, task: str) -> Dict[str, Any]:
        """Create a plan for delegating the task."""
        # Simplified delegation logic
        return {
            "subtasks": [
                {
                    "description": f"Subtask 1 of: {task}",
                    "assigned_agent": "agent-1",
                    "context": {"priority": "high"}
                },
                {
                    "description": f"Subtask 2 of: {task}",
                    "assigned_agent": "agent-2",
                    "context": {"priority": "medium"}
                }
            ]
        }
    
    async def aggregate_results(self, responses: List[Any]) -> Any:
        """Aggregate results from multiple agents."""
        return {
            "status": "completed",
            "results": responses,
            "summary": f"Task completed with {len(responses)} responses"
        }
`,
  implementation: [
    'Design message protocol and data structures',
    'Implement message routing and delivery system',
    'Create agent registration and discovery',
    'Build task coordination and delegation',
    'Add conversation tracking and context',
    'Implement peer-to-peer communication',
    'Create response aggregation and consensus',
    'Add fault tolerance and error handling'
  ]
};
