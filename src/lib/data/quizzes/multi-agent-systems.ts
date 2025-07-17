// Multi-agent systems quiz questions
import { QuizQuestion } from './types';

export const multiAgentSystemsQuestions: QuizQuestion[] = [
  {
    id: 'multi-agent-b1',
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
    learningObjectives: ['Define multi-agent systems', 'Understand agent collaboration'],
    relatedConcepts: ['agent-coordination', 'distributed-intelligence', 'collaboration'],
    persona: ['business-leader', 'agent-designer', 'ai-enthusiast'],
    timeEstimate: 30
  },
  {
    id: 'multi-agent-i1',
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
    learningObjectives: ['Identify multi-agent challenges', 'Understand system complexity'],
    relatedConcepts: ['agent-coordination', 'distributed-systems', 'resource-management'],
    persona: ['agent-developer', 'ai-engineer', 'agent-architect'],
    timeEstimate: 45
  },
  {
    id: 'multi-agent-a1',
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
    learningObjectives: ['Design scalable multi-agent systems', 'Implement fault tolerance'],
    relatedConcepts: ['fault-tolerance', 'scalability', 'redundancy', 'load-balancing'],
    persona: ['ai-engineer', 'agent-architect', 'ai-ops-engineer'],
    timeEstimate: 70
  },
  {
    id: 'multi-agent-i2',
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
    learningObjectives: ['Understand agent communication', 'Select appropriate protocols'],
    relatedConcepts: ['fipa-acl', 'jade', 'message-protocols', 'agent-communication'],
    persona: ['agent-developer', 'ai-engineer', 'agent-architect'],
    timeEstimate: 50
  }
];
