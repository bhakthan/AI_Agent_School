import { PatternData } from './types';

export const evaluatorOptimizerPattern: PatternData = {
  id: 'evaluator-optimizer',
  name: 'Evaluator-Optimizer',
  description: 'Continuous improvement pattern that evaluates outputs against criteria and iteratively optimizes them through feedback loops.',
  category: 'Advanced',
  useCases: ['Quality Improvement', 'Iterative Refinement', 'Performance Optimization', 'Content Enhancement'],
  whenToUse: 'Use Evaluator-Optimizer when output quality is critical and can be improved through iterative refinement. This pattern is ideal for content creation, code optimization, research analysis, or any scenario where initial outputs need systematic improvement.',
  nodes: [
    {
      id: 'input',
      type: 'input',
      data: { label: 'Initial Input', nodeType: 'input' },
      position: { x: 100, y: 200 }
    },
    {
      id: 'generator',
      type: 'default',
      data: { label: 'Generator', nodeType: 'llm' },
      position: { x: 300, y: 200 }
    },
    {
      id: 'evaluator',
      type: 'default',
      data: { label: 'Evaluator', nodeType: 'evaluator' },
      position: { x: 500, y: 150 }
    },
    {
      id: 'optimizer',
      type: 'default',
      data: { label: 'Optimizer', nodeType: 'planner' },
      position: { x: 500, y: 250 }
    },
    {
      id: 'criteria-checker',
      type: 'default',
      data: { label: 'Criteria Checker', nodeType: 'evaluator' },
      position: { x: 700, y: 200 }
    },
    {
      id: 'output',
      type: 'output',
      data: { label: 'Optimized Output', nodeType: 'output' },
      position: { x: 900, y: 200 }
    }
  ],
  edges: [
    { id: 'e1-2', source: 'input', target: 'generator', animated: true },
    { id: 'e2-3', source: 'generator', target: 'evaluator', animated: true },
    { id: 'e3-4', source: 'evaluator', target: 'optimizer', animated: true },
    { id: 'e4-2', source: 'optimizer', target: 'generator', animated: true, label: 'Refine' },
    { id: 'e2-5', source: 'generator', target: 'criteria-checker', animated: true },
    { id: 'e5-6', source: 'criteria-checker', target: 'output' },
    { id: 'e5-3', source: 'criteria-checker', target: 'evaluator', animated: true, label: 'Iterate' }
  ],
  codeExample: `// Evaluator-Optimizer Pattern implementation
interface EvaluationCriteria {
  name: string;
  description: string;
  weight: number;
  threshold: number;
  evaluator: (output: string) => Promise<number>;
}

interface EvaluationResult {
  criteria: string;
  score: number;
  feedback: string;
  passed: boolean;
}

interface OptimizationHistory {
  iteration: number;
  output: string;
  evaluations: EvaluationResult[];
  overallScore: number;
  improvements: string[];
}

class EvaluatorOptimizerSystem {
  private criteria: EvaluationCriteria[] = [];
  private history: OptimizationHistory[] = [];
  private maxIterations: number = 5;
  private targetScore: number = 0.8;
  
  addCriteria(criteria: EvaluationCriteria): void {
    this.criteria.push(criteria);
  }
  
  async optimize(input: string, initialOutput?: string): Promise<any> {
    try {
      let currentOutput = initialOutput || await this.generateInitialOutput(input);
      let iteration = 0;
      let bestOutput = currentOutput;
      let bestScore = 0;
      
      while (iteration < this.maxIterations) {
        iteration++;
        
        // Evaluate current output
        const evaluations = await this.evaluateOutput(currentOutput);
        const overallScore = this.calculateOverallScore(evaluations);
        
        // Check if we've reached the target
        if (overallScore >= this.targetScore) {
          return {
            status: 'success',
            output: currentOutput,
            iterations: iteration,
            score: overallScore,
            history: this.history
          };
        }
        
        // Track best output
        if (overallScore > bestScore) {
          bestOutput = currentOutput;
          bestScore = overallScore;
        }
        
        // Generate optimization suggestions
        const optimizations = await this.generateOptimizations(
          input,
          currentOutput,
          evaluations
        );
        
        // Apply optimizations
        currentOutput = await this.applyOptimizations(
          input,
          currentOutput,
          optimizations
        );
        
        // Record history
        this.history.push({
          iteration,
          output: currentOutput,
          evaluations,
          overallScore,
          improvements: optimizations
        });
      }
      
      return {
        status: 'max_iterations_reached',
        output: bestOutput,
        iterations: iteration,
        score: bestScore,
        history: this.history
      };
    } catch (error) {
      return {
        status: 'failed',
        reason: error.message
      };
    }
  }
  
  private async generateInitialOutput(input: string): Promise<string> {
    const prompt = \`
      Generate a response for the following input:
      
      Input: \${input}
      
      Provide a comprehensive, well-structured response.
    \`;
    
    return await llm(prompt);
  }
  
  private async evaluateOutput(output: string): Promise<EvaluationResult[]> {
    const evaluations: EvaluationResult[] = [];
    
    for (const criteria of this.criteria) {
      try {
        const score = await criteria.evaluator(output);
        const feedback = await this.generateFeedback(output, criteria, score);
        
        evaluations.push({
          criteria: criteria.name,
          score,
          feedback,
          passed: score >= criteria.threshold
        });
      } catch (error) {
        evaluations.push({
          criteria: criteria.name,
          score: 0,
          feedback: \`Evaluation failed: \${error.message}\`,
          passed: false
        });
      }
    }
    
    return evaluations;
  }
  
  private async generateFeedback(
    output: string,
    criteria: EvaluationCriteria,
    score: number
  ): Promise<string> {
    const feedbackPrompt = \`
      Evaluate the following output against the criteria and provide specific feedback:
      
      Output: \${output}
      
      Criteria: \${criteria.name}
      Description: \${criteria.description}
      Score: \${score}
      Threshold: \${criteria.threshold}
      
      Provide specific, actionable feedback for improvement.
    \`;
    
    return await llm(feedbackPrompt);
  }
  
  private calculateOverallScore(evaluations: EvaluationResult[]): number {
    const totalWeight = this.criteria.reduce((sum, c) => sum + c.weight, 0);
    const weightedScore = evaluations.reduce((sum, eval, index) => {
      const weight = this.criteria[index].weight;
      return sum + (eval.score * weight);
    }, 0);
    
    return weightedScore / totalWeight;
  }
  
  private async generateOptimizations(
    input: string,
    output: string,
    evaluations: EvaluationResult[]
  ): Promise<string[]> {
    const failedEvaluations = evaluations.filter(e => !e.passed);
    
    if (failedEvaluations.length === 0) {
      return [];
    }
    
    const optimizationPrompt = \`
      Analyze the following output and evaluation results to suggest specific improvements:
      
      Original Input: \${input}
      Current Output: \${output}
      
      Failed Evaluations:
      \${failedEvaluations.map(e => \`- \${e.criteria}: \${e.feedback}\`).join('\\n')}
      
      Suggest specific, actionable improvements to address each failed evaluation.
      Return as a JSON array of improvement suggestions.
    \`;
    
    const response = await llm(optimizationPrompt);
    return JSON.parse(response);
  }
  
  private async applyOptimizations(
    input: string,
    output: string,
    optimizations: string[]
  ): Promise<string> {
    const optimizationPrompt = \`
      Improve the following output by applying the suggested optimizations:
      
      Original Input: \${input}
      Current Output: \${output}
      
      Optimization Suggestions:
      \${optimizations.map((opt, i) => \`\${i + 1}. \${opt}\`).join('\\n')}
      
      Apply these optimizations to create an improved version of the output.
      Maintain the core content while addressing the specific improvement areas.
    \`;
    
    return await llm(optimizationPrompt);
  }
  
  // Predefined criteria factories
  static createClarityEvaluator(): EvaluationCriteria {
    return {
      name: 'Clarity',
      description: 'How clear and understandable is the output?',
      weight: 0.3,
      threshold: 0.7,
      evaluator: async (output: string) => {
        const prompt = \`
          Rate the clarity of the following text on a scale of 0-1:
          
          Text: \${output}
          
          Consider:
          - Clear language and structure
          - Logical flow of ideas
          - Absence of ambiguity
          
          Return only the numeric score.
        \`;
        
        const response = await llm(prompt);
        return parseFloat(response);
      }
    };
  }
  
  static createAccuracyEvaluator(): EvaluationCriteria {
    return {
      name: 'Accuracy',
      description: 'How factually accurate is the output?',
      weight: 0.4,
      threshold: 0.8,
      evaluator: async (output: string) => {
        const prompt = \`
          Rate the factual accuracy of the following text on a scale of 0-1:
          
          Text: \${output}
          
          Consider:
          - Factual correctness
          - Logical consistency
          - Absence of contradictions
          
          Return only the numeric score.
        \`;
        
        const response = await llm(prompt);
        return parseFloat(response);
      }
    };
  }
  
  static createCompletenessEvaluator(): EvaluationCriteria {
    return {
      name: 'Completeness',
      description: 'How complete and comprehensive is the output?',
      weight: 0.3,
      threshold: 0.6,
      evaluator: async (output: string) => {
        const prompt = \`
          Rate the completeness of the following text on a scale of 0-1:
          
          Text: \${output}
          
          Consider:
          - Coverage of relevant topics
          - Depth of explanation
          - Addressing all aspects
          
          Return only the numeric score.
        \`;
        
        const response = await llm(prompt);
        return parseFloat(response);
      }
    };
  }
}

// Example usage
const optimizer = new EvaluatorOptimizerSystem();

// Add evaluation criteria
optimizer.addCriteria(EvaluatorOptimizerSystem.createClarityEvaluator());
optimizer.addCriteria(EvaluatorOptimizerSystem.createAccuracyEvaluator());
optimizer.addCriteria(EvaluatorOptimizerSystem.createCompletenessEvaluator());

// Optimize output
const result = await optimizer.optimize(
  "Explain quantum computing to a beginner",
  "Quantum computing uses quantum bits..."
);`,
  pythonCodeExample: `# Evaluator-Optimizer Pattern implementation
import asyncio
import json
from typing import Dict, List, Any, Callable, Optional
from dataclasses import dataclass

@dataclass
class EvaluationCriteria:
    name: str
    description: str
    weight: float
    threshold: float
    evaluator: Callable[[str], float]

@dataclass
class EvaluationResult:
    criteria: str
    score: float
    feedback: str
    passed: bool

@dataclass
class OptimizationHistory:
    iteration: int
    output: str
    evaluations: List[EvaluationResult]
    overall_score: float
    improvements: List[str]

class EvaluatorOptimizerSystem:
    def __init__(self, max_iterations: int = 5, target_score: float = 0.8):
        self.criteria: List[EvaluationCriteria] = []
        self.history: List[OptimizationHistory] = []
        self.max_iterations = max_iterations
        self.target_score = target_score
    
    def add_criteria(self, criteria: EvaluationCriteria):
        """Add evaluation criteria."""
        self.criteria.append(criteria)
    
    async def optimize(self, input_text: str, initial_output: Optional[str] = None) -> Dict[str, Any]:
        """Optimize output through evaluation and refinement."""
        try:
            current_output = initial_output or await self.generate_initial_output(input_text)
            iteration = 0
            best_output = current_output
            best_score = 0
            
            while iteration < self.max_iterations:
                iteration += 1
                
                # Evaluate current output
                evaluations = await self.evaluate_output(current_output)
                overall_score = self.calculate_overall_score(evaluations)
                
                # Check if we've reached the target
                if overall_score >= self.target_score:
                    return {
                        "status": "success",
                        "output": current_output,
                        "iterations": iteration,
                        "score": overall_score,
                        "history": [h.__dict__ for h in self.history]
                    }
                
                # Track best output
                if overall_score > best_score:
                    best_output = current_output
                    best_score = overall_score
                
                # Generate optimization suggestions
                optimizations = await self.generate_optimizations(
                    input_text, current_output, evaluations
                )
                
                # Apply optimizations
                current_output = await self.apply_optimizations(
                    input_text, current_output, optimizations
                )
                
                # Record history
                self.history.append(OptimizationHistory(
                    iteration=iteration,
                    output=current_output,
                    evaluations=evaluations,
                    overall_score=overall_score,
                    improvements=optimizations
                ))
            
            return {
                "status": "max_iterations_reached",
                "output": best_output,
                "iterations": iteration,
                "score": best_score,
                "history": [h.__dict__ for h in self.history]
            }
        except Exception as error:
            return {
                "status": "failed",
                "reason": str(error)
            }
    
    async def generate_initial_output(self, input_text: str) -> str:
        """Generate initial output."""
        prompt = f"""
        Generate a response for the following input:
        
        Input: {input_text}
        
        Provide a comprehensive, well-structured response.
        """
        
        return await self.call_llm(prompt)
    
    async def evaluate_output(self, output: str) -> List[EvaluationResult]:
        """Evaluate output against all criteria."""
        evaluations = []
        
        for criteria in self.criteria:
            try:
                score = await criteria.evaluator(output)
                feedback = await self.generate_feedback(output, criteria, score)
                
                evaluations.append(EvaluationResult(
                    criteria=criteria.name,
                    score=score,
                    feedback=feedback,
                    passed=score >= criteria.threshold
                ))
            except Exception as error:
                evaluations.append(EvaluationResult(
                    criteria=criteria.name,
                    score=0,
                    feedback=f"Evaluation failed: {str(error)}",
                    passed=False
                ))
        
        return evaluations
    
    async def generate_feedback(self, output: str, criteria: EvaluationCriteria, score: float) -> str:
        """Generate feedback for evaluation."""
        feedback_prompt = f"""
        Evaluate the following output against the criteria and provide specific feedback:
        
        Output: {output}
        
        Criteria: {criteria.name}
        Description: {criteria.description}
        Score: {score}
        Threshold: {criteria.threshold}
        
        Provide specific, actionable feedback for improvement.
        """
        
        return await self.call_llm(feedback_prompt)
    
    def calculate_overall_score(self, evaluations: List[EvaluationResult]) -> float:
        """Calculate weighted overall score."""
        total_weight = sum(c.weight for c in self.criteria)
        weighted_score = sum(
            eval_result.score * criteria.weight
            for eval_result, criteria in zip(evaluations, self.criteria)
        )
        
        return weighted_score / total_weight
    
    async def generate_optimizations(
        self, input_text: str, output: str, evaluations: List[EvaluationResult]
    ) -> List[str]:
        """Generate optimization suggestions."""
        failed_evaluations = [e for e in evaluations if not e.passed]
        
        if not failed_evaluations:
            return []
        
        optimization_prompt = f"""
        Analyze the following output and evaluation results to suggest specific improvements:
        
        Original Input: {input_text}
        Current Output: {output}
        
        Failed Evaluations:
        {chr(10).join([f"- {e.criteria}: {e.feedback}" for e in failed_evaluations])}
        
        Suggest specific, actionable improvements to address each failed evaluation.
        Return as a JSON array of improvement suggestions.
        """
        
        response = await self.call_llm(optimization_prompt)
        return json.loads(response)
    
    async def apply_optimizations(
        self, input_text: str, output: str, optimizations: List[str]
    ) -> str:
        """Apply optimization suggestions."""
        optimization_prompt = f"""
        Improve the following output by applying the suggested optimizations:
        
        Original Input: {input_text}
        Current Output: {output}
        
        Optimization Suggestions:
        {chr(10).join([f"{i + 1}. {opt}" for i, opt in enumerate(optimizations)])}
        
        Apply these optimizations to create an improved version of the output.
        Maintain the core content while addressing the specific improvement areas.
        """
        
        return await self.call_llm(optimization_prompt)
    
    async def call_llm(self, prompt: str) -> str:
        """Call LLM - implement based on your chosen provider."""
        # Placeholder - implement with your LLM provider
        return "Optimized response"
    
    @staticmethod
    def create_clarity_evaluator() -> EvaluationCriteria:
        """Create clarity evaluation criteria."""
        async def evaluator(output: str) -> float:
            # Simplified clarity scoring
            return 0.8 if len(output) > 100 else 0.5
        
        return EvaluationCriteria(
            name="Clarity",
            description="How clear and understandable is the output?",
            weight=0.3,
            threshold=0.7,
            evaluator=evaluator
        )
    
    @staticmethod
    def create_accuracy_evaluator() -> EvaluationCriteria:
        """Create accuracy evaluation criteria."""
        async def evaluator(output: str) -> float:
            # Simplified accuracy scoring
            return 0.9 if "accurate" in output.lower() else 0.6
        
        return EvaluationCriteria(
            name="Accuracy",
            description="How factually accurate is the output?",
            weight=0.4,
            threshold=0.8,
            evaluator=evaluator
        )
    
    @staticmethod
    def create_completeness_evaluator() -> EvaluationCriteria:
        """Create completeness evaluation criteria."""
        async def evaluator(output: str) -> float:
            # Simplified completeness scoring
            return 0.7 if len(output) > 200 else 0.4
        
        return EvaluationCriteria(
            name="Completeness",
            description="How complete and comprehensive is the output?",
            weight=0.3,
            threshold=0.6,
            evaluator=evaluator
        )

# Example usage
async def main():
    optimizer = EvaluatorOptimizerSystem()
    
    # Add evaluation criteria
    optimizer.add_criteria(EvaluatorOptimizerSystem.create_clarity_evaluator())
    optimizer.add_criteria(EvaluatorOptimizerSystem.create_accuracy_evaluator())
    optimizer.add_criteria(EvaluatorOptimizerSystem.create_completeness_evaluator())
    
    # Optimize output
    result = await optimizer.optimize(
        "Explain quantum computing to a beginner",
        "Quantum computing uses quantum bits..."
    )
    
    print(f"Result: {result}")

if __name__ == "__main__":
    asyncio.run(main())
`,
  implementation: [
    'Define evaluation criteria and scoring system',
    'Create iterative optimization loop',
    'Implement feedback generation and analysis',
    'Build optimization suggestion system',
    'Add multi-criteria evaluation framework',
    'Create performance tracking and history',
    'Implement convergence detection',
    'Add customizable evaluation metrics'
  ]
};
