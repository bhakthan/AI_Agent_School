// Data visualization quiz questions
import { QuizQuestion } from './types';

export const dataVisualizationQuestions: QuizQuestion[] = [
  {
    id: 'visualization-b1',
    question: 'Why is data visualization important for AI agent systems?',
    options: [
      'Only for aesthetic purposes',
      'To help users understand agent behavior, performance metrics, and decision-making processes',
      'Only for technical documentation',
      'Only for marketing materials'
    ],
    correctAnswer: 1,
    explanation: 'Data visualization helps users understand how agents behave, track performance metrics, visualize decision-making processes, and identify patterns in agent interactions and outcomes.',
    difficulty: 'beginner',
    category: 'data-visualization',
    subCategory: 'fundamentals',
    learningObjectives: ['Understand visualization importance', 'Recognize user needs'],
    relatedConcepts: ['user-understanding', 'performance-monitoring', 'decision-transparency'],
    persona: ['business-leader', 'agent-designer', 'no-code-engineer'],
    timeEstimate: 35
  },
  {
    id: 'visualization-i1',
    question: 'What types of visualizations are most effective for agent performance monitoring?',
    options: [
      'Only bar charts',
      'Dashboards, flow diagrams, performance metrics, and interaction timelines',
      'Only text reports',
      'Only static images'
    ],
    correctAnswer: 1,
    explanation: 'Effective agent visualization includes dashboards for real-time monitoring, flow diagrams for process understanding, performance metrics for optimization, and interaction timelines for behavior analysis.',
    difficulty: 'intermediate',
    category: 'data-visualization',
    subCategory: 'visualization-types',
    learningObjectives: ['Select appropriate visualizations', 'Design effective dashboards'],
    relatedConcepts: ['performance-dashboards', 'flow-visualization', 'metrics-display'],
    persona: ['agent-developer', 'ai-engineer', 'agent-designer'],
    timeEstimate: 50
  },
  {
    id: 'visualization-a1',
    question: 'How should real-time agent visualization systems be architected for high-volume environments?',
    options: [
      'Use only static charts',
      'Implement streaming data processing, efficient rendering, data aggregation, and progressive disclosure',
      'Only use basic HTML tables',
      'Only show summary statistics'
    ],
    correctAnswer: 1,
    explanation: 'High-volume visualization systems need streaming data processing for real-time updates, efficient rendering for performance, data aggregation for scalability, and progressive disclosure for usability.',
    difficulty: 'advanced',
    category: 'data-visualization',
    subCategory: 'real-time-systems',
    learningObjectives: ['Architect scalable visualization', 'Optimize rendering performance'],
    relatedConcepts: ['streaming-data', 'efficient-rendering', 'data-aggregation', 'progressive-disclosure'],
    persona: ['ai-engineer', 'agent-architect', 'ai-ops-engineer'],
    timeEstimate: 65
  }
];
