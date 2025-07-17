// Azure services quiz questions
import { QuizQuestion } from './types';

export const azureServicesQuestions: QuizQuestion[] = [
  {
    id: 'azure-openai-b1',
    question: 'What is Azure OpenAI Service?',
    options: [
      'A storage service',
      'A managed service that provides access to OpenAI models with enterprise security',
      'A networking service',
      'A database service'
    ],
    correctAnswer: 1,
    explanation: 'Azure OpenAI Service is a managed service that provides access to powerful OpenAI models like GPT-4 with enterprise-grade security, compliance, and integration capabilities.',
    difficulty: 'beginner',
    category: 'azure-services',
    subCategory: 'azure-openai',
    learningObjectives: ['Understand Azure OpenAI Service'],
    relatedConcepts: ['managed-service', 'enterprise-security', 'model-access'],
    persona: ['business-leader', 'no-code-engineer'],
    timeEstimate: 30
  },
  {
    id: 'azure-openai-b2',
    question: 'What are the main business benefits of using Azure OpenAI versus direct OpenAI API?',
    options: [
      'It\'s completely free',
      'Enhanced security, compliance, and enterprise integration capabilities',
      'It works faster than OpenAI',
      'It requires no setup'
    ],
    correctAnswer: 1,
    explanation: 'Azure OpenAI provides enhanced security, compliance features, and enterprise integration capabilities that are essential for business applications.',
    difficulty: 'beginner',
    category: 'azure-services',
    subCategory: 'azure-openai',
    learningObjectives: ['Understand Azure OpenAI business benefits'],
    relatedConcepts: ['enterprise-security', 'compliance', 'business-integration'],
    persona: ['business-leader'],
    timeEstimate: 35
  },
  {
    id: 'azure-openai-i1',
    question: 'How do you integrate Azure OpenAI with AI agent systems?',
    options: [
      'Only through web browsers',
      'Using REST APIs, SDKs, and Azure SDK integration',
      'Only through command line',
      'Only through Azure portal'
    ],
    correctAnswer: 1,
    explanation: 'Azure OpenAI can be integrated with AI agent systems using REST APIs, language-specific SDKs, and Azure SDK integration for seamless connectivity.',
    difficulty: 'intermediate',
    category: 'azure-services',
    subCategory: 'azure-openai',
    learningObjectives: ['Implement Azure OpenAI integration'],
    relatedConcepts: ['rest-apis', 'sdks', 'azure-integration'],
    persona: ['agent-developer', 'ai-engineer'],
    timeEstimate: 45
  },
  {
    id: 'azure-openai-i2',
    question: 'What are the key considerations for scaling Azure OpenAI in production agent systems?',
    options: [
      'Only server capacity',
      'Rate limits, token quotas, model deployment strategies, and cost optimization',
      'Only network bandwidth',
      'Only storage capacity'
    ],
    correctAnswer: 1,
    explanation: 'Scaling Azure OpenAI requires managing rate limits, token quotas, choosing appropriate model deployment strategies, and implementing cost optimization measures.',
    difficulty: 'intermediate',
    category: 'azure-services',
    subCategory: 'azure-openai',
    learningObjectives: ['Scale Azure OpenAI deployments'],
    relatedConcepts: ['rate-limits', 'token-quotas', 'deployment-strategies', 'cost-optimization'],
    persona: ['ai-engineer', 'ai-ops-engineer'],
    timeEstimate: 50
  },
  {
    id: 'azure-openai-a1',
    question: 'How should you implement content filtering and safety measures for Azure OpenAI in agent systems?',
    options: [
      'No filtering is needed',
      'Use Azure OpenAI content filters, custom validation, and monitoring systems',
      'Only use basic keyword filtering',
      'Only rely on model training'
    ],
    correctAnswer: 1,
    explanation: 'Comprehensive safety requires Azure OpenAI built-in content filters, custom validation logic, and monitoring systems to ensure safe and appropriate agent responses.',
    difficulty: 'advanced',
    category: 'azure-services',
    subCategory: 'azure-openai',
    learningObjectives: ['Implement Azure OpenAI safety measures'],
    relatedConcepts: ['content-filtering', 'safety-monitoring', 'validation-systems'],
    persona: ['ai-engineer', 'agent-architect'],
    timeEstimate: 55
  },
  {
    id: 'azure-openai-a2',
    question: 'What are the best practices for managing Azure OpenAI costs in high-volume agent deployments?',
    options: [
      'Use the most expensive models only',
      'Implement token optimization, model selection strategies, caching, and usage monitoring',
      'Only use free services',
      'Avoid all optimization'
    ],
    correctAnswer: 1,
    explanation: 'Cost management requires token optimization, strategic model selection, response caching, and comprehensive usage monitoring to balance performance with cost efficiency.',
    difficulty: 'advanced',
    category: 'azure-services',
    subCategory: 'azure-openai',
    learningObjectives: ['Optimize Azure OpenAI costs'],
    relatedConcepts: ['token-optimization', 'model-selection', 'caching', 'cost-monitoring'],
    persona: ['ai-engineer', 'agent-architect', 'ai-ops-engineer'],
    timeEstimate: 60
  }
];
