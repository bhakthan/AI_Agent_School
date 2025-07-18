// Multi-agent systems quiz questions
import { QuizQuestion } from './types';

export const multiAgentSystemsQuestions: QuizQuestion[] = [
  {
    id: 'multi-agent-a1',
    text: '',
    question: 'What are the key characteristics that define an effective multi-agent system?',
    options: [
      'Only centralized control',
      'Autonomy, social ability, reactivity, and pro-activeness',
      'Only parallel processing',
      'Only distributed storage'
    ],
    correctAnswer: 1,
    explanation: 'Effective multi-agent systems exhibit autonomy (independent decision-making), social ability (communication with other agents), reactivity (responding to environment changes), and pro-activeness (goal-directed behavior).',
    difficulty: 'beginner',
    category: 'multi-agent-systems',
    subCategory: 'fundamentals'
  },
  {
    id: 'multi-agent-i2',
    text: '',
    question: 'What communication protocols are commonly used in multi-agent systems?',
    options: [
      'Only HTTP',
      'FIPA-ACL, JADE, and custom message queues',
      'Only TCP/IP',
      'Only WebSocket'
    ],
    correctAnswer: 1,
    explanation: 'Multi-agent systems use specialized protocols like FIPA-ACL for standardized communication, JADE for Java-based systems, and message queues with custom protocols for specific requirements.',
    difficulty: 'intermediate',
    category: 'multi-agent-systems',
    subCategory: 'communication-protocols'
  },
  {
    id: 'multi-agent-a2',
    text: '',
    question: 'How can multi-agent systems be architected for fault tolerance and scalability?',
    options: [
      'Use only centralized control',
      'Implement redundancy, load balancing, graceful degradation, and horizontal scaling',
      'Only increase hardware',
      'Only use faster networks'
    ],
    correctAnswer: 1,
    explanation: 'Fault-tolerant and scalable multi-agent systems require redundancy (backup agents), load balancing (distributing work), graceful degradation (maintaining functionality with failures), and horizontal scaling (adding more agents).',
    difficulty: 'advanced',
    category: 'multi-agent-systems',
    subCategory: 'architecture-patterns'
  },
  // AutoGen Framework questions
  {
    id: 'multi-agent-autogen-b1',
    text: '',
    question: 'What is Microsoft AutoGen and how does it facilitate multi-agent conversations?',
    options: [
      'A single AI model',
      'A framework for enabling multiple AI agents to collaborate and converse automatically',
      'A data storage system',
      'A web framework'
    ],
    correctAnswer: 1,
    explanation: 'Microsoft AutoGen is a framework that enables multiple AI agents to collaborate through structured conversations, with each agent having specialized roles and capabilities for complex problem-solving.',
    difficulty: 'beginner',
    category: 'multi-agent-systems',
    subCategory: 'autogen-framework',
    persona: ['business-leader', 'agent-designer', 'ai-enthusiast', 'agent-developer']
  },
  {
    id: 'multi-agent-autogen-i2',
    text: '',
    question: 'Which agent types are commonly used in AutoGen multi-agent workflows?',
    options: [
      'Only AssistantAgent',
      'AssistantAgent, UserProxyAgent, and GroupChatManager',
      'Only databases',
      'Only web servers'
    ],
    correctAnswer: 1,
    explanation: 'AutoGen typically uses AssistantAgent for AI-powered responses, UserProxyAgent for human interaction and code execution, and GroupChatManager for orchestrating multi-agent conversations.',
    difficulty: 'intermediate',
    category: 'multi-agent-systems',
    subCategory: 'autogen-framework',
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'multi-agent-autogen-a3',
    text: '',
    question: 'How should you design AutoGen workflows for complex enterprise scenarios?',
    options: [
      'Use only one agent',
      'Design specialized agents with clear roles, implement robust conversation flows, and integrate with enterprise systems',
      'Only use default configurations',
      'Avoid any customization'
    ],
    correctAnswer: 1,
    explanation: 'Enterprise AutoGen workflows require specialized agents (analyst, executor, reviewer), well-defined conversation patterns, integration with enterprise APIs, and proper error handling for production reliability.',
    difficulty: 'advanced',
    category: 'multi-agent-systems',
    subCategory: 'autogen-framework',
    persona: ['agent-architect', 'ai-engineer', 'ai-ops-engineer']
  },
  // Original questions
  {
    id: 'multi-agent-b1',
    text: 'What is a multi-agent system?',
    question: 'What is a multi-agent system?',
    options: [
      'A single AI agent',
      'A system where multiple AI agents work together to solve complex problems',
      'A database system',
      'A user interface'
    ],
    correctAnswer: 1,
    explanation: 'A multi-agent system consists of multiple AI agents that work together, each with specialized capabilities, to solve complex problems that are difficult for a single agent to handle.',
    difficulty: 'beginner',
    category: 'multi-agent-systems',
    subCategory: 'fundamentals',
    relatedTopics: ['agent-coordination', 'distributed-intelligence', 'collaboration'],
    relatedConcepts: ['agent-coordination', 'distributed-intelligence', 'collaboration'],
    persona: ['business-leader', 'agent-designer', 'ai-enthusiast'],
    timeEstimate: 30
  },
  {
    id: 'multi-agent-i1',
    text: 'What are the key challenges in multi-agent system design?',
    question: 'What are the key challenges in multi-agent system design?',
    options: [
      'Only network latency',
      'Coordination, communication, conflict resolution, and resource allocation',
      'Only storage requirements',
      'Only user interface design'
    ],
    correctAnswer: 1,
    explanation: 'Multi-agent systems face challenges in coordination (synchronizing actions), communication (message passing), conflict resolution (handling disagreements), and resource allocation (sharing computational resources).',
    difficulty: 'intermediate',
    category: 'multi-agent-systems',
    subCategory: 'design-challenges',
    relatedTopics: ['agent-coordination', 'distributed-systems', 'resource-management'],
    relatedConcepts: ['agent-coordination', 'distributed-systems', 'resource-management'],
    persona: ['agent-developer', 'ai-engineer', 'agent-architect'],
    timeEstimate: 45
  },
  {
    id: 'multi-agent-a5',
    text: '',
    question: 'How can multi-agent systems be architected for fault tolerance and scalability?',
    options: [
      'Use only centralized control',
      'Implement redundancy, load balancing, graceful degradation, and horizontal scaling',
      'Only increase hardware',
      'Only use faster networks'
    ],
    correctAnswer: 1,
    explanation: 'Fault-tolerant multi-agent systems require redundancy (backup agents), load balancing (distributing work), graceful degradation (maintaining partial functionality), and horizontal scaling (adding more agents).',
    difficulty: 'advanced',
    category: 'multi-agent-systems',
    subCategory: 'architecture-patterns',
    relatedConcepts: ['fault-tolerance', 'scalability', 'redundancy', 'load-balancing'],
    persona: ['ai-engineer', 'agent-architect', 'ai-ops-engineer'],
    timeEstimate: 70
  },
  {
    id: 'multi-agent-i4',
    text: '',
    question: 'What communication protocols are commonly used in multi-agent systems?',
    options: [
      'Only HTTP',
      'FIPA-ACL, JADE, and message queues with custom protocols',
      'Only TCP/IP',
      'Only WebSocket'
    ],
    correctAnswer: 1,
    explanation: 'Multi-agent systems use specialized protocols like FIPA-ACL for standardized communication, JADE for Java-based systems, and message queues with custom protocols for specific requirements.',
    difficulty: 'intermediate',
    category: 'multi-agent-systems',
    subCategory: 'communication-protocols',
    relatedConcepts: ['fipa-acl', 'jade', 'message-protocols', 'agent-communication'],
    persona: ['agent-developer', 'ai-engineer', 'agent-architect'],
    timeEstimate: 50
  },
  // AutoGen Framework questions
  {
    id: 'autogen-b1',
    text: 'What is Microsoft AutoGen framework primarily designed for?',
    question: 'What is Microsoft AutoGen framework primarily designed for?',
    options: [
      'Single-agent LLM applications',
      'Multi-agent conversational AI systems',
      'Database management',
      'Web development'
    ],
    correctAnswer: 1,
    explanation: 'AutoGen is specifically designed to enable creation of LLM applications using multiple agents that can converse with each other to solve complex tasks.',
    difficulty: 'beginner',
    category: 'multi-agent-systems',
    subCategory: 'autogen-framework',
    relatedTopics: ['conversational-ai', 'multi-agent-systems', 'microsoft-frameworks'],
    relatedConcepts: ['conversational-ai', 'multi-agent-systems', 'microsoft-frameworks'],
    persona: ['business-leader', 'agent-designer', 'ai-enthusiast', 'agent-developer'],
    timeEstimate: 30
  },
  {
    id: 'autogen-i1',
    text: 'Which types of agents are core components in AutoGen framework?',
    question: 'Which types of agents are core components in AutoGen framework?',
    options: [
      'Only AI agents',
      'Conversable agents, Assistant agents, and User proxy agents',
      'Only database agents',
      'Only web scraping agents'
    ],
    correctAnswer: 1,
    explanation: 'AutoGen provides three main agent types: Conversable agents (base class), Assistant agents (AI-powered), and User proxy agents (human representation).',
    difficulty: 'intermediate',
    category: 'multi-agent-systems',
    subCategory: 'autogen-framework',
    relatedTopics: ['agent-architecture', 'conversation-patterns', 'human-in-loop'],
    relatedConcepts: ['agent-architecture', 'conversation-patterns', 'human-in-loop'],
    persona: ['agent-developer', 'ai-engineer', 'agent-architect'],
    timeEstimate: 45
  },
  {
    id: 'autogen-a1',
    text: 'How does AutoGen integrate with Azure AI Services for enterprise deployments?',
    question: 'How does AutoGen integrate with Azure AI Services for enterprise deployments?',
    options: [
      'No integration possible',
      'Through Azure OpenAI, Azure AI Search, and Azure Container Apps for scalable multi-agent systems',
      'Only through basic API calls',
      'Only for development environments'
    ],
    correctAnswer: 1,
    explanation: 'AutoGen integrates seamlessly with Azure ecosystem including Azure OpenAI for models, Azure AI Search for RAG, and Azure Container Apps for scalable deployment.',
    difficulty: 'advanced',
    category: 'multi-agent-systems',
    subCategory: 'autogen-framework',
    relatedTopics: ['azure-integration', 'scalable-deployment', 'enterprise-architecture'],
    relatedConcepts: ['azure-integration', 'scalable-deployment', 'enterprise-architecture'],
    persona: ['agent-architect', 'ai-engineer', 'ai-ops-engineer'],
    timeEstimate: 60
  }
];
