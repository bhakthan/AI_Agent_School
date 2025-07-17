// Core concepts quiz questions
import { QuizQuestion } from './types';

export const coreConceptsQuestions: QuizQuestion[] = [
  // Basic AI Agent concepts
  {
    id: 'core-b1',
    text: 'What is an AI agent?',
    question: 'What is an AI agent?',
    options: [
      'A human employee',
      'A software system that can perceive its environment and take actions to achieve goals',
      'A database',
      'A web server'
    ],
    correctAnswer: 1,
    explanation: 'An AI agent is a software system that can perceive its environment, process information, and take actions to achieve specific goals autonomously.',
    difficulty: 'beginner',
    category: 'core-concepts',
    subCategory: 'agents',
    relatedTopics: ['artificial-intelligence', 'autonomy', 'goal-oriented'],
    relatedConcepts: ['artificial-intelligence', 'autonomy', 'goal-oriented'],
    timeEstimate: 30
  },
  {
    id: 'core-b2',
    question: 'What are the main components of an AI agent?',
    options: [
      'Only a processor',
      'Sensors, actuators, and a decision-making system',
      'Only memory',
      'Only a user interface'
    ],
    correctAnswer: 1,
    explanation: 'AI agents consist of sensors to perceive the environment, actuators to perform actions, and a decision-making system to process information and choose appropriate actions.',
    difficulty: 'beginner',
    category: 'core-concepts',
    subCategory: 'agents',
    learningObjectives: ['Identify agent components', 'Understand agent architecture'],
    relatedConcepts: ['sensors', 'actuators', 'decision-making'],
    persona: ['agent-designer', 'agent-developer', 'ai-enthusiast'],
    timeEstimate: 35
  },
  {
    id: 'core-i1',
    question: 'What is the difference between reactive and deliberative agents?',
    options: [
      'There is no difference',
      'Reactive agents respond immediately to stimuli, while deliberative agents plan and reason about actions',
      'Deliberative agents are faster',
      'Reactive agents are more intelligent'
    ],
    correctAnswer: 1,
    explanation: 'Reactive agents respond immediately to environmental stimuli without complex reasoning, while deliberative agents engage in planning and reasoning before taking actions.',
    difficulty: 'intermediate',
    category: 'core-concepts',
    subCategory: 'agents',
    learningObjectives: ['Distinguish agent types', 'Understand agent behaviors'],
    relatedConcepts: ['reactive-systems', 'deliberative-systems', 'planning'],
    persona: ['agent-developer', 'ai-engineer', 'agent-architect'],
    timeEstimate: 40
  },
  {
    id: 'core-a1',
    question: 'How do multi-agent systems handle coordination and communication?',
    options: [
      'They don\'t communicate',
      'Through protocols, message passing, and coordination mechanisms',
      'Only through databases',
      'Only through user interfaces'
    ],
    correctAnswer: 1,
    explanation: 'Multi-agent systems use communication protocols, message passing systems, and coordination mechanisms to enable agents to work together effectively.',
    difficulty: 'advanced',
    category: 'core-concepts',
    subCategory: 'agents',
    learningObjectives: ['Understand multi-agent coordination', 'Implement communication protocols'],
    relatedConcepts: ['multi-agent-systems', 'communication-protocols', 'coordination'],
    persona: ['ai-engineer', 'agent-architect', 'ai-ops-engineer'],
    timeEstimate: 60
  }
];
