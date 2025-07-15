// Export all pattern types
export * from './types';

// Export individual patterns
export { reactAgentPattern } from './reactAgent';
export { parallelizationPattern } from './parallelization';
export { promptChainingPattern } from './promptChaining';
export { agenticRAGPattern } from './agenticRAG';
export { codeActPattern } from './codeAct';
export { selfReflectionPattern } from './selfReflection';
export { modernToolUsePattern } from './modernToolUse';
export { mcpPattern } from './mcp';
export { agentToAgentPattern } from './agentToAgent';
export { computerUsePattern } from './computerUse';
export { voiceAgentPattern } from './voiceAgent';
export { routingPattern } from './routing';
export { orchestratorWorkerPattern } from './orchestratorWorker';
export { evaluatorOptimizerPattern } from './evaluatorOptimizer';
export { autonomousWorkflowPattern } from './autonomousWorkflow';
export { deepResearcherPattern } from './deepResearcher';
export { agentEvaluationPattern } from './agentEvaluation';

// Export consolidated pattern array
import { reactAgentPattern } from './reactAgent';
import { parallelizationPattern } from './parallelization';
import { promptChainingPattern } from './promptChaining';
import { agenticRAGPattern } from './agenticRAG';
import { codeActPattern } from './codeAct';
import { selfReflectionPattern } from './selfReflection';
import { modernToolUsePattern } from './modernToolUse';
import { mcpPattern } from './mcp';
import { agentToAgentPattern } from './agentToAgent';
import { computerUsePattern } from './computerUse';
import { voiceAgentPattern } from './voiceAgent';
import { routingPattern } from './routing';
import { orchestratorWorkerPattern } from './orchestratorWorker';
import { evaluatorOptimizerPattern } from './evaluatorOptimizer';
import { autonomousWorkflowPattern } from './autonomousWorkflow';
import { deepResearcherPattern } from './deepResearcher';
import { agentEvaluationPattern } from './agentEvaluation';

export const agentPatterns = [
  reactAgentPattern,
  parallelizationPattern,
  promptChainingPattern,
  agenticRAGPattern,
  codeActPattern,
  selfReflectionPattern,
  modernToolUsePattern,
  mcpPattern,
  agentToAgentPattern,
  computerUsePattern,
  voiceAgentPattern,
  routingPattern,
  orchestratorWorkerPattern,
  evaluatorOptimizerPattern,
  autonomousWorkflowPattern,
  deepResearcherPattern,
  agentEvaluationPattern
];

// Export specific patterns for easy access
export const chainOfThoughtPattern = promptChainingPattern; // Using prompt-chaining as chain of thought pattern
