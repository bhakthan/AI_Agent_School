// Agent deployment quiz questions
import { QuizQuestion } from './types';

export const agentDeploymentQuestions: QuizQuestion[] = [
  {
    id: 'deployment-b1',
    question: 'What are the key considerations for deploying AI agents to production?',
    options: [
      'Only code quality',
      'Scalability, monitoring, security, and maintenance',
      'Only performance testing',
      'Only user acceptance'
    ],
    correctAnswer: 1,
    explanation: 'Production agent deployment requires scalability for handling load, monitoring for operational visibility, security for protection, and maintenance for ongoing updates and support.',
    difficulty: 'beginner',
    category: 'agent-deployment',
    subCategory: 'deployment-fundamentals',
    learningObjectives: ['Understand deployment requirements', 'Recognize production needs'],
    relatedConcepts: ['production-readiness', 'scalability', 'monitoring', 'security'],
    persona: ['business-leader', 'ai-ops-engineer', 'agent-developer'],
    timeEstimate: 40
  },
  {
    id: 'deployment-i1',
    question: 'What Azure services are commonly used for AI agent deployment?',
    options: [
      'Only Azure VMs',
      'Azure Container Instances, Azure Kubernetes Service, Azure Functions, and Azure App Service',
      'Only Azure Storage',
      'Only Azure SQL Database'
    ],
    correctAnswer: 1,
    explanation: 'Azure offers multiple deployment options: Container Instances for simple containerized agents, Kubernetes Service for orchestrated deployments, Functions for serverless agents, and App Service for web-based agents.',
    difficulty: 'intermediate',
    category: 'agent-deployment',
    subCategory: 'azure-deployment',
    learningObjectives: ['Select deployment services', 'Understand Azure options'],
    relatedConcepts: ['containerization', 'orchestration', 'serverless', 'web-deployment'],
    persona: ['agent-developer', 'ai-engineer', 'ai-ops-engineer'],
    timeEstimate: 55
  },
  {
    id: 'deployment-a1',
    question: 'How should CI/CD pipelines be designed for AI agent deployments?',
    options: [
      'Only manual deployments',
      'Automated testing, model validation, gradual rollouts, and rollback capabilities',
      'Only code deployment',
      'Only documentation updates'
    ],
    correctAnswer: 1,
    explanation: 'AI agent CI/CD pipelines should include automated testing for functionality, model validation for performance, gradual rollouts for risk mitigation, and rollback capabilities for quick recovery.',
    difficulty: 'advanced',
    category: 'agent-deployment',
    subCategory: 'cicd-pipelines',
    learningObjectives: ['Design agent CI/CD', 'Implement deployment automation'],
    relatedConcepts: ['automated-testing', 'model-validation', 'gradual-rollout', 'rollback-strategy'],
    persona: ['ai-engineer', 'agent-architect', 'ai-ops-engineer'],
    timeEstimate: 70
  }
];
