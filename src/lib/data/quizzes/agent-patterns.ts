// Agent patterns quiz questions
import { QuizQuestion } from './types';

export const agentPatternsQuestions: QuizQuestion[] = [
  // Voice Agent Pattern
  {
    id: 'patterns-voice-b1',
    question: 'What is the primary purpose of the Voice Agent pattern?',
    options: [
      'To create text-only agents',
      'To enable AI agents to interact through voice interfaces with speech recognition and synthesis',
      'To create visual agents only',
      'To eliminate user interfaces entirely'
    ],
    correctAnswer: 1,
    explanation: 'The Voice Agent pattern enables AI agents to interact through voice interfaces, incorporating speech recognition for input and text-to-speech for output, creating natural conversational experiences.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'voice-agent',
    learningObjectives: ['Understand voice agent basics', 'Recognize voice interaction benefits'],
    relatedConcepts: ['speech-recognition', 'text-to-speech', 'natural-interaction'],
    persona: ['business-leader', 'no-code-engineer', 'agent-designer'],
    timeEstimate: 30
  },
  {
    id: 'patterns-voice-i1',
    question: 'Which Azure services are commonly used to implement Voice Agent patterns?',
    options: [
      'Only Azure OpenAI',
      'Azure Speech Services, Azure OpenAI, and Azure Cognitive Services',
      'Only Azure Storage',
      'Only Azure Functions'
    ],
    correctAnswer: 1,
    explanation: 'Voice Agent patterns typically use Azure Speech Services for speech recognition and synthesis, Azure OpenAI for natural language processing, and Azure Cognitive Services for additional AI capabilities.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'voice-agent',
    learningObjectives: ['Identify Azure services for voice agents', 'Understand service integration'],
    relatedConcepts: ['azure-speech', 'service-integration', 'voice-pipeline'],
    persona: ['agent-developer', 'ai-engineer', 'agent-designer'],
    timeEstimate: 45
  },
  {
    id: 'patterns-voice-a1',
    question: 'What are the key considerations for implementing Voice Agent patterns in enterprise environments?',
    options: [
      'Only cost considerations',
      'Latency, privacy, multi-language support, noise handling, and security',
      'Only technical specifications',
      'Only user preferences'
    ],
    correctAnswer: 1,
    explanation: 'Enterprise Voice Agent implementations must consider latency for real-time interaction, privacy for sensitive data, multi-language support for global users, noise handling for various environments, and security for voice data protection.',
    difficulty: 'advanced',
    category: 'agent-patterns',
    subCategory: 'voice-agent',
    learningObjectives: ['Evaluate enterprise voice requirements', 'Design secure voice systems'],
    relatedConcepts: ['enterprise-requirements', 'voice-security', 'performance-optimization'],
    persona: ['ai-engineer', 'agent-architect', 'ai-ops-engineer'],
    timeEstimate: 60
  },
  
  // Computer Use Pattern
  {
    id: 'patterns-computer-b1',
    question: 'What does the Computer Use pattern enable AI agents to do?',
    options: [
      'Only process text data',
      'Interact with computer interfaces, click buttons, and manipulate UI elements',
      'Only read files',
      'Only send emails'
    ],
    correctAnswer: 1,
    explanation: 'The Computer Use pattern enables AI agents to interact with computer interfaces by clicking buttons, filling forms, navigating windows, and manipulating UI elements, essentially allowing agents to use software like humans do.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'computer-use',
    learningObjectives: ['Understand computer use capabilities', 'Recognize UI automation benefits'],
    relatedConcepts: ['ui-automation', 'screen-interaction', 'human-like-interaction'],
    persona: ['business-leader', 'no-code-engineer', 'agent-designer'],
    timeEstimate: 35
  },
  {
    id: 'patterns-computer-i1',
    question: 'What technologies are typically used to implement Computer Use patterns?',
    options: [
      'Only keyboard inputs',
      'Screen capture, OCR, UI automation libraries, and vision models',
      'Only mouse clicks',
      'Only text processing'
    ],
    correctAnswer: 1,
    explanation: 'Computer Use patterns typically use screen capture for visual input, OCR for text recognition, UI automation libraries for interaction, and vision models for understanding screen content.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'computer-use',
    learningObjectives: ['Identify computer use technologies', 'Understand implementation stack'],
    relatedConcepts: ['screen-capture', 'ocr', 'ui-automation', 'computer-vision'],
    persona: ['agent-developer', 'ai-engineer', 'agent-designer'],
    timeEstimate: 50
  },
  {
    id: 'patterns-computer-a1',
    question: 'How should Computer Use patterns handle security and access control in enterprise environments?',
    options: [
      'Allow unrestricted access',
      'Implement sandboxing, permission controls, audit logging, and secure credential management',
      'Only use basic passwords',
      'Disable all security features'
    ],
    correctAnswer: 1,
    explanation: 'Enterprise Computer Use patterns require sandboxing to isolate agent actions, permission controls to limit access, audit logging for compliance, and secure credential management for authentication.',
    difficulty: 'advanced',
    category: 'agent-patterns',
    subCategory: 'computer-use',
    learningObjectives: ['Design secure computer use systems', 'Implement enterprise controls'],
    relatedConcepts: ['sandboxing', 'access-control', 'security-compliance', 'audit-logging'],
    persona: ['ai-engineer', 'agent-architect', 'ai-ops-engineer'],
    timeEstimate: 65
  },
  
  // Code Act Pattern
  {
    id: 'patterns-codeact-b1',
    question: 'What is the Code Act pattern in AI agent development?',
    options: [
      'Writing only documentation',
      'An agent pattern that enables agents to write, execute, and iterate on code to solve problems',
      'Only reading code',
      'Only testing existing code'
    ],
    correctAnswer: 1,
    explanation: 'The Code Act pattern enables AI agents to write, execute, and iterate on code to solve problems, combining reasoning with code generation and execution in a feedback loop.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'code-act',
    learningObjectives: ['Understand code act concept', 'Recognize code-based problem solving'],
    relatedConcepts: ['code-generation', 'code-execution', 'iterative-development'],
    persona: ['agent-developer', 'ai-enthusiast', 'agent-designer'],
    timeEstimate: 40
  },
  {
    id: 'patterns-codeact-i1',
    question: 'What safety measures should be implemented for Code Act patterns?',
    options: [
      'No safety measures needed',
      'Code sandboxing, execution timeouts, resource limits, and output validation',
      'Only basic error handling',
      'Only syntax checking'
    ],
    correctAnswer: 1,
    explanation: 'Code Act patterns require sandboxing to isolate code execution, timeouts to prevent infinite loops, resource limits to prevent system overload, and output validation to ensure safe results.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'code-act',
    learningObjectives: ['Implement code execution safety', 'Design secure code environments'],
    relatedConcepts: ['code-sandboxing', 'execution-safety', 'resource-management'],
    persona: ['agent-developer', 'ai-engineer', 'ai-ops-engineer'],
    timeEstimate: 55
  },
  {
    id: 'patterns-codeact-a1',
    question: 'How can Code Act patterns be optimized for complex software development tasks?',
    options: [
      'Only use simple scripts',
      'Implement code versioning, dependency management, testing frameworks, and collaborative development workflows',
      'Avoid all complexity',
      'Only use single-line commands'
    ],
    correctAnswer: 1,
    explanation: 'Advanced Code Act patterns can be optimized with code versioning for iteration tracking, dependency management for libraries, testing frameworks for validation, and collaborative workflows for team development.',
    difficulty: 'advanced',
    category: 'agent-patterns',
    subCategory: 'code-act',
    learningObjectives: ['Optimize code act for development', 'Implement advanced code workflows'],
    relatedConcepts: ['code-versioning', 'dependency-management', 'testing-frameworks', 'collaborative-development'],
    persona: ['ai-engineer', 'agent-architect', 'agent-developer'],
    timeEstimate: 70
  },
  
  // ReAct Pattern Questions
  {
    id: 'react-b1',
    question: 'What does "ReAct" stand for in AI agent patterns?',
    options: [
      'React to Actions',
      'Reason and Act',
      'Reactive Actions',
      'Real Actions'
    ],
    correctAnswer: 1,
    explanation: 'ReAct stands for "Reason and Act" - it\'s a pattern where agents alternate between reasoning about their situation and taking actions based on that reasoning.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'react-pattern',
    learningObjectives: ['Define ReAct pattern'],
    relatedConcepts: ['reasoning', 'action', 'thought-process'],
    persona: ['business-leader', 'no-code-engineer'],
    timeEstimate: 30
  },
  {
    id: 'react-b2',
    question: 'What is the main business advantage of the ReAct pattern?',
    options: [
      'It makes agents work faster',
      'It eliminates all errors',
      'It provides transparent decision-making that can be audited and understood',
      'It works without any training'
    ],
    correctAnswer: 2,
    explanation: 'The ReAct pattern provides transparent decision-making by explicitly showing the reasoning process, making it easier to audit, understand, and trust agent decisions.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'react-pattern',
    learningObjectives: ['Understand ReAct business benefits'],
    relatedConcepts: ['transparency', 'auditability', 'trust'],
    persona: ['business-leader'],
    timeEstimate: 35
  },
  {
    id: 'react-i1',
    question: 'In the ReAct pattern, what is the typical sequence of operations?',
    options: [
      'Action → Thought → Observation',
      'Thought → Action → Observation',
      'Observation → Action → Thought',
      'Only actions, no thoughts'
    ],
    correctAnswer: 1,
    explanation: 'The ReAct pattern follows: Thought (reasoning about current state) → Action (taking a step) → Observation (seeing the result), then repeating this cycle.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'react-pattern',
    learningObjectives: ['Understand ReAct sequence'],
    relatedConcepts: ['thought-action-observation', 'iterative-process', 'feedback-loop'],
    persona: ['agent-designer', 'agent-developer'],
    timeEstimate: 40
  },
  {
    id: 'react-i2',
    question: 'When should you use the ReAct pattern versus other agent patterns?',
    options: [
      'Always use ReAct for every task',
      'Use ReAct when you need explicit reasoning traces and step-by-step problem solving',
      'Never use ReAct',
      'Only use ReAct for simple tasks'
    ],
    correctAnswer: 1,
    explanation: 'ReAct is best used when you need explicit reasoning traces, step-by-step problem solving, or when decisions need to be explainable and auditable.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'react-pattern',
    learningObjectives: ['Know when to use ReAct'],
    relatedConcepts: ['pattern-selection', 'use-cases', 'explainability'],
    persona: ['agent-designer', 'agent-developer', 'ai-enthusiast'],
    timeEstimate: 45
  },
  {
    id: 'react-a1',
    question: 'What are the main challenges in implementing ReAct for complex multi-step tasks?',
    options: [
      'There are no challenges',
      'Managing reasoning chain length, handling reasoning errors, and preventing infinite loops',
      'It works perfectly for all tasks',
      'Only the speed of execution'
    ],
    correctAnswer: 1,
    explanation: 'Complex ReAct implementations face challenges in managing reasoning chain length, handling reasoning errors gracefully, and preventing infinite loops in the thought-action cycle.',
    difficulty: 'advanced',
    category: 'agent-patterns',
    subCategory: 'react-pattern',
    learningObjectives: ['Understand ReAct implementation challenges'],
    relatedConcepts: ['chain-length-management', 'error-handling', 'loop-prevention'],
    persona: ['ai-engineer', 'agent-architect'],
    timeEstimate: 55
  },
  {
    id: 'react-a2',
    question: 'How can ReAct be optimized for production environments with latency constraints?',
    options: [
      'Remove all reasoning steps',
      'Implement reasoning caching, parallel action execution, and adaptive reasoning depth',
      'Use only simple actions',
      'Avoid production use'
    ],
    correctAnswer: 1,
    explanation: 'Production ReAct optimization includes reasoning caching for common patterns, parallel action execution where possible, and adaptive reasoning depth based on task complexity.',
    difficulty: 'advanced',
    category: 'agent-patterns',
    subCategory: 'react-pattern',
    learningObjectives: ['Optimize ReAct for production'],
    relatedConcepts: ['performance-optimization', 'caching', 'parallel-execution'],
    persona: ['ai-engineer', 'agent-architect', 'ai-ops-engineer'],
    timeEstimate: 60
  },
  
  // Self-Reflection Pattern Questions
  {
    id: 'reflection-b1',
    question: 'What is the self-reflection pattern in AI agents?',
    options: [
      'Agents looking at mirrors',
      'Agents evaluating their own performance and learning from mistakes',
      'Agents copying other agents',
      'Agents working alone'
    ],
    correctAnswer: 1,
    explanation: 'The self-reflection pattern involves agents evaluating their own performance, identifying mistakes or areas for improvement, and adjusting their behavior accordingly.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'self-reflection',
    learningObjectives: ['Define self-reflection pattern'],
    relatedConcepts: ['self-evaluation', 'performance-improvement', 'learning'],
    persona: ['business-leader', 'no-code-engineer'],
    timeEstimate: 30
  },
  {
    id: 'reflection-b2',
    question: 'What business value does self-reflection provide to AI agents?',
    options: [
      'Makes agents more expensive',
      'Enables continuous improvement and reduces the need for manual corrections',
      'Slows down agent performance',
      'Makes agents more complex to use'
    ],
    correctAnswer: 1,
    explanation: 'Self-reflection enables continuous improvement in agent performance and reduces the need for manual corrections, leading to more autonomous and reliable systems.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'self-reflection',
    learningObjectives: ['Understand self-reflection business value'],
    relatedConcepts: ['continuous-improvement', 'autonomy', 'reliability'],
    persona: ['business-leader'],
    timeEstimate: 35
  },
  {
    id: 'reflection-i1',
    question: 'What are the key components of the self-reflection cycle?',
    options: [
      'Only action execution',
      'Action execution, outcome evaluation, learning extraction, and strategy adjustment',
      'Only outcome evaluation',
      'Just strategy adjustment'
    ],
    correctAnswer: 1,
    explanation: 'The self-reflection cycle includes: executing actions, evaluating outcomes, extracting learnings from successes and failures, and adjusting strategies for future actions.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'self-reflection',
    learningObjectives: ['Understand reflection cycle components'],
    relatedConcepts: ['reflection-cycle', 'outcome-evaluation', 'strategy-adjustment'],
    persona: ['agent-designer', 'agent-developer'],
    timeEstimate: 40
  },
  {
    id: 'reflection-i2',
    question: 'How does self-reflection integrate with other agent patterns like ReAct?',
    options: [
      'It replaces all other patterns',
      'It adds a meta-cognitive layer that evaluates the reasoning and actions of other patterns',
      'It cannot be used with other patterns',
      'It only works in isolation'
    ],
    correctAnswer: 1,
    explanation: 'Self-reflection adds a meta-cognitive layer that can evaluate the reasoning and actions of other patterns like ReAct, providing feedback for improvement.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'self-reflection',
    learningObjectives: ['Understand pattern integration'],
    relatedConcepts: ['meta-cognition', 'pattern-composition', 'feedback-loops'],
    persona: ['agent-designer', 'agent-developer', 'ai-enthusiast'],
    timeEstimate: 45
  }
];
