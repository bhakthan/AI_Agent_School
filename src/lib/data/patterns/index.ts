// Export all pattern types
export * from './types';

// Export individual patterns
export { reactAgentPattern } from './reactAgent';
export { parallelizationPattern } from './parallelization';
export { promptChainingPattern } from './promptChaining';
export { agenticRAGPattern } from './agenticRAG';

// Export consolidated pattern array
import { reactAgentPattern } from './reactAgent';
import { parallelizationPattern } from './parallelization';
import { promptChainingPattern } from './promptChaining';
import { agenticRAGPattern } from './agenticRAG';

export const agentPatterns = [
  reactAgentPattern,
  parallelizationPattern,
  promptChainingPattern,
  agenticRAGPattern
];

// Export specific patterns for easy access
export const chainOfThoughtPattern = promptChainingPattern; // Using prompt-chaining as chain of thought pattern
