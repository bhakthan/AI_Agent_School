// Agent security quiz questions
import { QuizQuestion } from './types';

export const agentSecurityQuestions: QuizQuestion[] = [
  {
    id: 'security-b1',
    question: 'Why is security important in AI agent systems?',
    options: [
      'It\'s not important for AI agents',
      'To protect against prompt injection, data breaches, and unauthorized access',
      'Only for compliance reasons',
      'Only for performance optimization'
    ],
    correctAnswer: 1,
    explanation: 'Security is crucial for AI agents to protect against prompt injection attacks, prevent data breaches, control unauthorized access, and ensure safe operation in production environments.',
    difficulty: 'beginner',
    category: 'agent-security',
    subCategory: 'security-fundamentals',
    learningObjectives: ['Understand agent security importance', 'Recognize security threats'],
    relatedConcepts: ['prompt-injection', 'data-protection', 'access-control'],
    persona: ['business-leader', 'agent-designer', 'ai-ops-engineer'],
    timeEstimate: 35
  },
  {
    id: 'security-i1',
    question: 'What are the main types of security threats to AI agent systems?',
    options: [
      'Only network attacks',
      'Prompt injection, data poisoning, adversarial inputs, and privilege escalation',
      'Only physical security',
      'Only software bugs'
    ],
    correctAnswer: 1,
    explanation: 'AI agent systems face threats including prompt injection (manipulating agent behavior), data poisoning (corrupting training data), adversarial inputs (crafted to fool models), and privilege escalation (gaining unauthorized access).',
    difficulty: 'intermediate',
    category: 'agent-security',
    subCategory: 'threat-analysis',
    learningObjectives: ['Identify security threats', 'Analyze attack vectors'],
    relatedConcepts: ['prompt-injection', 'data-poisoning', 'adversarial-attacks', 'privilege-escalation'],
    persona: ['agent-developer', 'ai-engineer', 'ai-ops-engineer'],
    timeEstimate: 50
  },
  {
    id: 'security-a1',
    question: 'How should enterprise AI agent systems implement defense-in-depth security?',
    options: [
      'Only use firewalls',
      'Implement input validation, output filtering, access controls, monitoring, and incident response',
      'Only use encryption',
      'Only use authentication'
    ],
    correctAnswer: 1,
    explanation: 'Defense-in-depth for AI agents includes input validation to prevent malicious inputs, output filtering to ensure safe responses, access controls for authorization, monitoring for threat detection, and incident response for security events.',
    difficulty: 'advanced',
    category: 'agent-security',
    subCategory: 'enterprise-security',
    learningObjectives: ['Design comprehensive security', 'Implement security layers'],
    relatedConcepts: ['defense-in-depth', 'input-validation', 'output-filtering', 'security-monitoring'],
    persona: ['ai-engineer', 'agent-architect', 'ai-ops-engineer'],
    timeEstimate: 60
  },
  {
    id: 'security-i2',
    question: 'What is prompt injection and how can it be prevented?',
    options: [
      'A type of SQL injection',
      'Malicious inputs designed to manipulate AI agent behavior, prevented through input validation and output filtering',
      'A network security issue',
      'A hardware problem'
    ],
    correctAnswer: 1,
    explanation: 'Prompt injection involves crafting inputs to manipulate AI agent behavior beyond intended parameters. Prevention includes input validation, output filtering, and prompt engineering techniques.',
    difficulty: 'intermediate',
    category: 'agent-security',
    subCategory: 'prompt-security',
    learningObjectives: ['Understand prompt injection', 'Implement prevention measures'],
    relatedConcepts: ['input-validation', 'prompt-engineering', 'output-sanitization'],
    persona: ['agent-developer', 'ai-engineer', 'agent-architect'],
    timeEstimate: 45
  },
  {
    id: 'security-a2',
    question: 'How should sensitive data be handled in AI agent systems?',
    options: [
      'Store everything in plain text',
      'Use encryption, data masking, access controls, and audit logging',
      'Only use basic passwords',
      'Share data freely'
    ],
    correctAnswer: 1,
    explanation: 'Sensitive data in AI agents requires encryption at rest and in transit, data masking for privacy, strict access controls, and comprehensive audit logging for compliance.',
    difficulty: 'advanced',
    category: 'agent-security',
    subCategory: 'data-protection',
    learningObjectives: ['Implement data protection', 'Ensure compliance'],
    relatedConcepts: ['encryption', 'data-masking', 'access-controls', 'audit-logging'],
    persona: ['ai-engineer', 'agent-architect', 'ai-ops-engineer'],
    timeEstimate: 55
  }
];
