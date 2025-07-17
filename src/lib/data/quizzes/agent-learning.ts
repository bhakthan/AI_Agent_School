// Agent learning quiz questions
import { QuizQuestion } from './types';

export const agentLearningQuestions: QuizQuestion[] = [
  {
    id: 'learning-b1',
    question: 'What does "agent learning" mean in the context of AI agents?',
    options: [
      'Only pre-training models',
      'The ability of agents to improve performance through experience and feedback',
      'Only reading documentation',
      'Only following fixed rules'
    ],
    correctAnswer: 1,
    explanation: 'Agent learning refers to the ability of AI agents to improve their performance over time through experience, feedback, and adaptation to new situations and environments.',
    difficulty: 'beginner',
    category: 'agent-learning',
    subCategory: 'learning-fundamentals',
    learningObjectives: ['Understand agent learning', 'Recognize adaptation capabilities'],
    relatedConcepts: ['adaptive-behavior', 'feedback-loops', 'experience-based-learning'],
    persona: ['business-leader', 'ai-enthusiast', 'agent-designer'],
    timeEstimate: 35
  },
  {
    id: 'learning-i1',
    question: 'What are the main types of learning mechanisms for AI agents?',
    options: [
      'Only supervised learning',
      'Reinforcement learning, online learning, transfer learning, and meta-learning',
      'Only unsupervised learning',
      'Only rule-based learning'
    ],
    correctAnswer: 1,
    explanation: 'AI agents can use reinforcement learning (reward-based), online learning (continuous updates), transfer learning (applying knowledge across domains), and meta-learning (learning how to learn).',
    difficulty: 'intermediate',
    category: 'agent-learning',
    subCategory: 'learning-types',
    learningObjectives: ['Identify learning mechanisms', 'Understand learning approaches'],
    relatedConcepts: ['reinforcement-learning', 'online-learning', 'transfer-learning', 'meta-learning'],
    persona: ['agent-developer', 'ai-engineer', 'ai-enthusiast'],
    timeEstimate: 50
  },
  {
    id: 'learning-a1',
    question: 'How can agent learning systems be designed to prevent catastrophic forgetting?',
    options: [
      'Only use static models',
      'Implement continual learning, memory replay, regularization, and knowledge distillation',
      'Only retrain from scratch',
      'Only use simple models'
    ],
    correctAnswer: 1,
    explanation: 'Preventing catastrophic forgetting requires continual learning techniques, memory replay of past experiences, regularization to preserve important knowledge, and knowledge distillation to transfer learning.',
    difficulty: 'advanced',
    category: 'agent-learning',
    subCategory: 'continual-learning',
    learningObjectives: ['Implement continual learning', 'Prevent knowledge loss'],
    relatedConcepts: ['continual-learning', 'memory-replay', 'regularization', 'knowledge-distillation'],
    persona: ['ai-engineer', 'agent-architect', 'ai-ops-engineer'],
    timeEstimate: 65
  }
];
