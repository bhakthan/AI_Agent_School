// User personas for quiz targeting
import { UserPersona } from './types';

export const userPersonas: UserPersona[] = [
  {
    id: 'business-leader',
    name: 'Business Leader',
    description: 'Executives and managers focused on business value and strategic implementation',
    focusAreas: ['business-value', 'strategy', 'roi'],
    timeAvailable: 30,
    targetDifficulty: 'beginner',
    learningStyle: 'conceptual'
  },
  {
    id: 'no-code-engineer',
    name: 'No-Code Engineer',
    description: 'Users who prefer visual tools and low-code solutions',
    focusAreas: ['visual-tools', 'low-code', 'automation'],
    timeAvailable: 45,
    targetDifficulty: 'beginner',
    learningStyle: 'visual'
  },
  {
    id: 'agent-designer',
    name: 'Agent Designer',
    description: 'UX/UI designers working on agent interfaces and experiences',
    focusAreas: ['user-experience', 'interface-design', 'interaction-patterns'],
    timeAvailable: 60,
    targetDifficulty: 'intermediate',
    learningStyle: 'design-oriented'
  },
  {
    id: 'agent-developer',
    name: 'Agent Developer',
    description: 'Software developers building AI agent applications',
    focusAreas: ['development', 'integration', 'apis'],
    timeAvailable: 75,
    targetDifficulty: 'intermediate',
    learningStyle: 'hands-on'
  },
  {
    id: 'ai-engineer',
    name: 'AI Engineer',
    description: 'Engineers focused on AI/ML implementation and optimization',
    focusAreas: ['machine-learning', 'model-optimization', 'ai-systems'],
    timeAvailable: 90,
    targetDifficulty: 'advanced',
    learningStyle: 'technical'
  },
  {
    id: 'ai-enthusiast',
    name: 'AI Enthusiast',
    description: 'Individuals passionate about learning AI technologies',
    focusAreas: ['learning', 'experimentation', 'trends'],
    timeAvailable: 60,
    targetDifficulty: 'intermediate',
    learningStyle: 'exploratory'
  },
  {
    id: 'agent-architect',
    name: 'Agent Architect',
    description: 'System architects designing large-scale agent solutions',
    focusAreas: ['architecture', 'scalability', 'system-design'],
    timeAvailable: 90,
    targetDifficulty: 'advanced',
    learningStyle: 'architectural'
  },
  {
    id: 'ai-ops-engineer',
    name: 'AI Ops Engineer',
    description: 'Engineers focused on deploying and operating AI systems',
    focusAreas: ['deployment', 'monitoring', 'operations'],
    timeAvailable: 80,
    targetDifficulty: 'advanced',
    learningStyle: 'operational'
  }
];
