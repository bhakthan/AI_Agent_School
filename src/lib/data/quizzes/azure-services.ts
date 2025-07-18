// Azure services quiz questions
import { QuizQuestion } from './types';

export const azureServicesQuestions: QuizQuestion[] = [
  {
    id: 'azure-openai-b1',
    text: 'What is Azure OpenAI Service?',
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
    relatedTopics: ['managed-service', 'enterprise-security', 'model-access'],
    relatedConcepts: ['managed-service', 'enterprise-security', 'model-access'],
    persona: ['business-leader', 'no-code-engineer'],
    timeEstimate: 30
  },
  {
    id: 'azure-openai-b2',
    text: 'What are the main business benefits of using Azure OpenAI versus direct OpenAI API?',
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
    relatedTopics: ['enterprise-security', 'compliance', 'business-integration'],
    relatedConcepts: ['enterprise-security', 'compliance', 'business-integration'],
    persona: ['business-leader'],
    timeEstimate: 35
  },
  {
    id: 'azure-openai-i1',
    text: 'How do you integrate Azure OpenAI with AI agent systems?',
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
    relatedTopics: ['rest-apis', 'sdks', 'azure-integration'],
    relatedConcepts: ['rest-apis', 'sdks', 'azure-integration'],
    persona: ['agent-developer', 'ai-engineer'],
    timeEstimate: 45
  },
  {
    id: 'azure-openai-i2',
    text: 'What are the key considerations for scaling Azure OpenAI in production agent systems?',
    question: 'What are the key considerations for scaling Azure OpenAI in production agent systems?',
    options: [
      'Only server capacity',
      'Rate limits, token quotas, model deployment strategies, and cost optimization',
      'Only network bandwidth',
      'Only storage space'
    ],
    correctAnswer: 1,
    explanation: 'Scaling Azure OpenAI requires careful consideration of rate limits, token quotas, strategic model deployment, and cost optimization to ensure reliable and cost-effective operation.',
    difficulty: 'intermediate',
    category: 'azure-services',
    subCategory: 'azure-openai',
    relatedTopics: ['rate-limits', 'token-quotas', 'model-deployment', 'cost-optimization'],
    relatedConcepts: ['rate-limits', 'token-quotas', 'model-deployment', 'cost-optimization'],
    persona: ['agent-developer', 'ai-engineer', 'agent-architect'],
    timeEstimate: 50
  },
  {
    id: 'azure-openai-a1',
    text: 'How do you implement responsible AI practices when using Azure OpenAI in agent systems?',
    question: 'How do you implement responsible AI practices when using Azure OpenAI in agent systems?',
    options: [
      'No special measures needed',
      'Implement content filtering, monitoring, audit logging, and safety evaluations',
      'Only use basic authentication',
      'Only limit API calls'
    ],
    correctAnswer: 1,
    explanation: 'Responsible AI practices include implementing content filtering, comprehensive monitoring, audit logging, and regular safety evaluations to ensure ethical and safe AI deployment.',
    difficulty: 'advanced',
    category: 'azure-services',
    subCategory: 'azure-openai',
    relatedTopics: ['content-filtering', 'ai-monitoring', 'audit-logging', 'safety-evaluations'],
    relatedConcepts: ['content-filtering', 'ai-monitoring', 'audit-logging', 'safety-evaluations'],
    persona: ['agent-architect', 'ai-engineer', 'ai-ops-engineer'],
    timeEstimate: 55
  },
  {
    id: 'azure-openai-a2',
    text: 'What are the best practices for managing Azure OpenAI costs in high-volume agent deployments?',
    question: 'What are the best practices for managing Azure OpenAI costs in high-volume agent deployments?',
    options: [
      'Use the most expensive models only',
      'Implement token optimization, model selection strategies, response caching, and usage monitoring',
      'Only use free tier',
      'Ignore cost considerations'
    ],
    correctAnswer: 1,
    explanation: 'Cost management requires token optimization, strategic model selection, response caching, and comprehensive usage monitoring to balance performance with cost efficiency.',
    difficulty: 'advanced',
    category: 'azure-services',
    subCategory: 'azure-openai',
    relatedTopics: ['token-optimization', 'model-selection', 'caching', 'cost-monitoring'],
    relatedConcepts: ['token-optimization', 'model-selection', 'caching', 'cost-monitoring'],
    persona: ['ai-engineer', 'agent-architect', 'ai-ops-engineer'],
    timeEstimate: 60
  },,
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
    text: '',
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
    text: '',
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
    text: '',
    explanation: 'Cost management requires token optimization, strategic model selection, response caching, and comprehensive usage monitoring to balance performance with cost efficiency.',
    difficulty: 'advanced',
    category: 'azure-services',
    subCategory: 'azure-openai',
    relatedTopics: ['token-optimization', 'model-selection', 'caching', 'cost-monitoring'],
    relatedConcepts: ['token-optimization', 'model-selection', 'caching', 'cost-monitoring'],
    persona: ['ai-engineer', 'agent-architect', 'ai-ops-engineer'],
    timeEstimate: 60
  },
  // AutoGen Azure Integration questions
  {
    id: 'autogen-azure-b1',
    text: 'How does AutoGen framework integrate with Azure OpenAI Service?',
    question: 'How does AutoGen framework integrate with Azure OpenAI Service?',
    options: [
      'No integration available',
      'Through Azure OpenAI REST APIs and SDKs for multi-agent conversations',
      'Only through direct model access',
      'Only through third-party connectors'
    ],
    correctAnswer: 1,
    explanation: 'AutoGen seamlessly integrates with Azure OpenAI Service using REST APIs and SDKs, enabling multi-agent conversations powered by Azure-hosted models with enterprise security.',
    difficulty: 'beginner',
    category: 'azure-services',
    subCategory: 'azure-openai',
    relatedTopics: ['autogen-framework', 'azure-integration', 'multi-agent'],
    relatedConcepts: ['autogen-framework', 'azure-integration', 'multi-agent'],
    persona: ['business-leader', 'agent-developer', 'ai-enthusiast'],
    timeEstimate: 35
  },
  {
    id: 'autogen-azure-i1',
    text: 'What Azure services complement AutoGen for enterprise multi-agent deployments?',
    question: 'What Azure services complement AutoGen for enterprise multi-agent deployments?',
    options: [
      'Only Azure OpenAI',
      'Azure OpenAI, Azure AI Search, Azure Container Apps, and Azure Functions',
      'Only Azure Storage',
      'Only Azure Networking'
    ],
    correctAnswer: 1,
    explanation: 'Enterprise AutoGen deployments leverage Azure OpenAI for models, Azure AI Search for RAG capabilities, Azure Container Apps for scalable hosting, and Azure Functions for serverless execution.',
    difficulty: 'intermediate',
    category: 'azure-services',
    subCategory: 'azure-openai',
    relatedTopics: ['azure-ai-search', 'azure-container-apps', 'azure-functions', 'enterprise-deployment'],
    relatedConcepts: ['azure-ai-search', 'azure-container-apps', 'azure-functions', 'enterprise-deployment'],
    persona: ['agent-developer', 'ai-engineer', 'agent-architect'],
    timeEstimate: 45
  },
  {
    id: 'autogen-azure-a1',
    text: 'How do you implement secure, scalable AutoGen systems using Azure best practices?',
    question: 'How do you implement secure, scalable AutoGen systems using Azure best practices?',
    options: [
      'Use only basic authentication',
      'Implement Azure Key Vault, managed identities, private endpoints, and Azure Monitor for comprehensive security and observability',
      'Use only public endpoints',
      'Implement custom security only'
    ],
    correctAnswer: 1,
    explanation: 'Secure AutoGen implementations use Azure Key Vault for secrets, managed identities for authentication, private endpoints for network security, and Azure Monitor for comprehensive observability.',
    difficulty: 'advanced',
    category: 'azure-services',
    subCategory: 'azure-openai',
    relatedTopics: ['azure-key-vault', 'managed-identities', 'private-endpoints', 'azure-monitor'],
    relatedConcepts: ['azure-key-vault', 'managed-identities', 'private-endpoints', 'azure-monitor'],
    persona: ['agent-architect', 'ai-engineer', 'ai-ops-engineer'],
    timeEstimate: 60
  }
];
