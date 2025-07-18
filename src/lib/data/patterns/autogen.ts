import { PatternData } from './types';

export const autogenPattern: PatternData = {
  id: 'autogen-multi-agent',
  name: 'AutoGen Multi-Agent',
  description: 'Microsoft AutoGen framework for building multi-agent conversational AI systems with role-based collaboration.',
  category: 'Multi-Agent',
  useCases: [
    'Collaborative Problem Solving',
    'Code Generation and Review',
    'Research and Analysis',
    'Educational Content Creation',
    'Complex Workflow Automation'
  ],
  whenToUse: 'Use AutoGen when you need multiple AI agents to collaborate through natural conversation, especially for complex tasks that benefit from different agent specializations, code execution capabilities, and human-in-the-loop interactions.',
  nodes: [
    {
      id: 'user-proxy',
      type: 'input',
      data: { label: 'User Proxy Agent', nodeType: 'input' },
      position: { x: 100, y: 150 }
    },
    {
      id: 'assistant1',
      type: 'default',
      data: { label: 'Assistant Agent 1', nodeType: 'llm' },
      position: { x: 300, y: 100 }
    },
    {
      id: 'assistant2',
      type: 'default',
      data: { label: 'Assistant Agent 2', nodeType: 'llm' },
      position: { x: 300, y: 200 }
    },
    {
      id: 'group-chat',
      type: 'default',
      data: { label: 'Group Chat Manager', nodeType: 'planner' },
      position: { x: 500, y: 150 }
    },
    {
      id: 'output',
      type: 'output',
      data: { label: 'Solution', nodeType: 'output' },
      position: { x: 700, y: 150 }
    }
  ],
  edges: [
    { id: 'e1-gc', source: 'user-proxy', target: 'group-chat', animated: true },
    { id: 'egc-a1', source: 'group-chat', target: 'assistant1', animated: true },
    { id: 'egc-a2', source: 'group-chat', target: 'assistant2', animated: true },
    { id: 'ea1-gc', source: 'assistant1', target: 'group-chat', animated: true },
    { id: 'ea2-gc', source: 'assistant2', target: 'group-chat', animated: true },
    { id: 'egc-out', source: 'group-chat', target: 'output' }
  ],
  codeExample: `// AutoGen Multi-Agent System
import autogen

// Configure Azure OpenAI
const azure_config = {
  model: "gpt-4",
  api_type: "azure", 
  api_base: process.env.AZURE_OPENAI_ENDPOINT,
  api_version: "2024-02-15-preview",
  api_key: process.env.AZURE_OPENAI_KEY
};

// Create specialized agents
const researchAgent = new autogen.AssistantAgent({
  name: "researcher",
  llm_config: { config_list: [azure_config] },
  system_message: "You are a research specialist. Find and analyze information thoroughly."
});

const codeAgent = new autogen.AssistantAgent({
  name: "coder", 
  llm_config: { config_list: [azure_config] },
  system_message: "You are a coding expert. Write clean, efficient code with proper error handling."
});

const userProxy = new autogen.UserProxyAgent({
  name: "user_proxy",
  human_input_mode: "NEVER",
  code_execution_config: { work_dir: "coding" },
  system_message: "Execute code and provide feedback on results."
});

// Create group chat for collaboration
const groupChat = new autogen.GroupChat({
  agents: [userProxy, researchAgent, codeAgent],
  messages: [],
  max_round: 12
});

const manager = new autogen.GroupChatManager({
  groupchat: groupChat,
  llm_config: { config_list: [azure_config] }
});

// Start collaborative session
userProxy.initiate_chat(
  manager,
  "Help me build a recommendation system with proper testing"
);`,
  pythonCodeExample: `# AutoGen Multi-Agent Implementation
import autogen
from typing import Dict, List

class AutoGenMultiAgentSystem:
    def __init__(self, azure_config: Dict):
        self.azure_config = azure_config
        self.agents = {}
        self.setup_agents()
    
    def setup_agents(self):
        """Create specialized agents for different tasks."""
        
        # Research Agent
        self.agents['researcher'] = autogen.AssistantAgent(
            name="researcher",
            llm_config={"config_list": [self.azure_config]},
            system_message="""You are a research specialist. Your role is to:
            1. Find relevant information from multiple sources
            2. Analyze and synthesize findings
            3. Provide evidence-based insights
            4. Identify knowledge gaps"""
        )
        
        # Coding Agent  
        self.agents['coder'] = autogen.AssistantAgent(
            name="coder",
            llm_config={"config_list": [self.azure_config]},
            system_message="""You are a senior software engineer. Your role is to:
            1. Write clean, efficient, and maintainable code
            2. Implement proper error handling and logging
            3. Follow best practices and design patterns
            4. Create comprehensive tests"""
        )
        
        # Review Agent
        self.agents['reviewer'] = autogen.AssistantAgent(
            name="reviewer", 
            llm_config={"config_list": [self.azure_config]},
            system_message="""You are a code reviewer and quality assurance expert. Your role is to:
            1. Review code for bugs, security issues, and performance
            2. Ensure code follows best practices
            3. Suggest improvements and optimizations
            4. Validate test coverage and quality"""
        )
        
        # User Proxy
        self.agents['user_proxy'] = autogen.UserProxyAgent(
            name="user_proxy",
            human_input_mode="TERMINATE",
            code_execution_config={
                "work_dir": "coding",
                "use_docker": True
            }
        )
    
    def create_group_chat(self, agents: List[str]):
        """Create a group chat with specified agents."""
        selected_agents = [self.agents[name] for name in agents]
        
        groupchat = autogen.GroupChat(
            agents=selected_agents,
            messages=[],
            max_round=15,
            speaker_selection_method="round_robin"
        )
        
        manager = autogen.GroupChatManager(
            groupchat=groupchat,
            llm_config={"config_list": [self.azure_config]}
        )
        
        return manager
    
    def solve_problem(self, problem: str, agent_names: List[str]):
        """Use multi-agent collaboration to solve a problem."""
        manager = self.create_group_chat(agent_names)
        
        self.agents['user_proxy'].initiate_chat(
            manager,
            message=f"""
            Problem to solve: {problem}
            
            Please collaborate to:
            1. Research the problem thoroughly
            2. Design and implement a solution
            3. Review and test the solution
            4. Provide final recommendations
            """
        )

# Usage example
if __name__ == "__main__":
    azure_config = {
        "model": "gpt-4",
        "api_type": "azure",
        "api_base": "https://your-resource.openai.azure.com/",
        "api_version": "2024-02-15-preview",
        "api_key": "your_api_key"
    }
    
    system = AutoGenMultiAgentSystem(azure_config)
    
    # Solve a complex problem with multiple agents
    system.solve_problem(
        "Build a scalable recommendation system for an e-commerce platform",
        ["researcher", "coder", "reviewer", "user_proxy"]
    )`,
  implementation: [
    'Install AutoGen framework and configure Azure OpenAI connection',
    'Define agent roles and system messages for specialized behaviors',
    'Create conversable agents with appropriate LLM configurations',
    'Set up group chat or sequential conversation patterns',
    'Implement code execution capabilities for user proxy agents',
    'Add human-in-the-loop controls for critical decisions',
    'Configure conversation termination conditions',
    'Implement logging and monitoring for agent interactions',
    'Deploy to Azure Container Apps for scalable execution',
    'Set up CI/CD pipelines for agent system updates'
  ]
};
