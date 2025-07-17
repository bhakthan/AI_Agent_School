// Agent ethics quiz questions
import { QuizQuestion } from './types';

export const agentEthicsQuestions: QuizQuestion[] = [
  {
    id: 'ethics-b1',
    question: 'What are the main ethical considerations for AI agent development?',
    options: [
      'Only technical performance',
      'Fairness, transparency, accountability, and privacy protection',
      'Only cost efficiency',
      'Only speed of development'
    ],
    correctAnswer: 1,
    explanation: 'AI agent ethics involves ensuring fairness (avoiding bias), transparency (explainable decisions), accountability (clear responsibility), and privacy protection (data rights and confidentiality).',
    difficulty: 'beginner',
    category: 'agent-ethics',
    subCategory: 'ethical-principles',
    learningObjectives: ['Understand AI ethics principles', 'Recognize ethical responsibilities'],
    relatedConcepts: ['fairness', 'transparency', 'accountability', 'privacy'],
    persona: ['business-leader', 'agent-designer', 'ai-enthusiast'],
    timeEstimate: 40
  },
  {
    id: 'ethics-i1',
    question: 'How can AI agents be designed to avoid bias and ensure fairness?',
    options: [
      'Ignore bias completely',
      'Use diverse training data, implement bias testing, and regular audits',
      'Only use technical solutions',
      'Only rely on user feedback'
    ],
    correctAnswer: 1,
    explanation: 'Bias prevention requires diverse training data to represent all groups, bias testing to identify unfair outcomes, regular audits to monitor performance across demographics, and inclusive design processes.',
    difficulty: 'intermediate',
    category: 'agent-ethics',
    subCategory: 'bias-prevention',
    learningObjectives: ['Implement bias prevention', 'Design fair AI systems'],
    relatedConcepts: ['bias-testing', 'diverse-data', 'fairness-audits', 'inclusive-design'],
    persona: ['agent-developer', 'ai-engineer', 'agent-designer'],
    timeEstimate: 55
  },
  {
    id: 'ethics-a1',
    question: 'What governance frameworks should organizations implement for ethical AI agent deployment?',
    options: [
      'No governance needed',
      'Ethics committees, impact assessments, monitoring systems, and stakeholder engagement',
      'Only technical reviews',
      'Only legal compliance'
    ],
    correctAnswer: 1,
    explanation: 'Ethical AI governance requires ethics committees for oversight, impact assessments for risk evaluation, monitoring systems for ongoing compliance, and stakeholder engagement for inclusive decision-making.',
    difficulty: 'advanced',
    category: 'agent-ethics',
    subCategory: 'governance-frameworks',
    learningObjectives: ['Design ethical governance', 'Implement oversight systems'],
    relatedConcepts: ['ethics-committees', 'impact-assessment', 'ethical-monitoring', 'stakeholder-engagement'],
    persona: ['ai-engineer', 'agent-architect', 'business-leader'],
    timeEstimate: 65
  }
];
