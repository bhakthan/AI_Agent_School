// Agent integration quiz questions
import { QuizQuestion } from './types';

export const agentIntegrationQuestions: QuizQuestion[] = [
  {
    id: 'integration-b1',
    question: 'Why is agent integration important for enterprise systems?',
    options: [
      'Only for technical reasons',
      'To enable agents to work with existing systems, data, and workflows',
      'Only for cost reduction',
      'Only for compliance'
    ],
    correctAnswer: 1,
    explanation: 'Agent integration allows AI agents to work seamlessly with existing enterprise systems, access relevant data sources, and fit into established workflows without disrupting operations.',
    difficulty: 'beginner',
    category: 'agent-integration',
    subCategory: 'integration-fundamentals',
    learningObjectives: ['Understand integration importance', 'Recognize enterprise needs'],
    relatedConcepts: ['system-integration', 'data-access', 'workflow-compatibility'],
    persona: ['business-leader', 'no-code-engineer', 'agent-designer'],
    timeEstimate: 35
  },
  {
    id: 'integration-i1',
    question: 'What are the common integration patterns for AI agents?',
    options: [
      'Only direct database access',
      'API integration, message queues, event-driven architectures, and microservices',
      'Only file-based integration',
      'Only manual data entry'
    ],
    correctAnswer: 1,
    explanation: 'Common integration patterns include API integration for service communication, message queues for asynchronous processing, event-driven architectures for reactive systems, and microservices for modular deployment.',
    difficulty: 'intermediate',
    category: 'agent-integration',
    subCategory: 'integration-patterns',
    learningObjectives: ['Identify integration patterns', 'Select appropriate approaches'],
    relatedConcepts: ['api-integration', 'message-queues', 'event-driven', 'microservices'],
    persona: ['agent-developer', 'ai-engineer', 'agent-architect'],
    timeEstimate: 50
  },
  {
    id: 'integration-a1',
    question: 'How should agent integration be designed for high-availability enterprise environments?',
    options: [
      'Only use single connections',
      'Implement connection pooling, circuit breakers, retry logic, and health monitoring',
      'Only use synchronous calls',
      'Only use basic error handling'
    ],
    correctAnswer: 1,
    explanation: 'High-availability integration requires connection pooling for resource management, circuit breakers for fault isolation, retry logic for transient failures, and health monitoring for system visibility.',
    difficulty: 'advanced',
    category: 'agent-integration',
    subCategory: 'high-availability',
    learningObjectives: ['Design resilient integration', 'Implement high-availability patterns'],
    relatedConcepts: ['connection-pooling', 'circuit-breakers', 'retry-logic', 'health-monitoring'],
    persona: ['ai-engineer', 'agent-architect', 'ai-ops-engineer'],
    timeEstimate: 65
  }
];
