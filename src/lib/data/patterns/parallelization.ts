import { PatternData } from './types';

export const parallelizationPattern: PatternData = {
  id: 'parallelization',
  name: 'Parallelization',
  description: 'Parallelization in LLMs involves sectioning tasks or running them multiple times for aggregated outputs.',
  useCases: ['Implementing guardrails', 'Automating Evals'],
  whenToUse: 'Choose Parallelization when multiple perspectives on the same task can improve output quality, reliability, or creativity. This pattern is particularly valuable for evaluation scenarios, detecting biases, implementing guardrails for safety, or situations where aggregating multiple independent approaches leads to more robust, balanced, or comprehensive results.',
  nodes: [
    {
      id: 'input',
      type: 'input',
      data: { label: 'Input', nodeType: 'input' },
      position: { x: 100, y: 150 }
    },
    {
      id: 'llm1',
      type: 'default',
      data: { label: 'LLM Call', nodeType: 'llm' },
      position: { x: 300, y: 50 }
    },
    {
      id: 'llm2',
      type: 'default',
      data: { label: 'LLM Call', nodeType: 'llm' },
      position: { x: 300, y: 150 }
    },
    {
      id: 'llm3',
      type: 'default',
      data: { label: 'LLM Call', nodeType: 'llm' },
      position: { x: 300, y: 250 }
    },
    {
      id: 'aggregator',
      type: 'default',
      data: { label: 'Aggregator', nodeType: 'aggregator' },
      position: { x: 500, y: 150 }
    },
    {
      id: 'output',
      type: 'output',
      data: { label: 'Output', nodeType: 'output' },
      position: { x: 700, y: 150 }
    }
  ],
  edges: [
    { id: 'e1-2', source: 'input', target: 'llm1', animated: true },
    { id: 'e1-3', source: 'input', target: 'llm2', animated: true },
    { id: 'e1-4', source: 'input', target: 'llm3', animated: true },
    { id: 'e2-5', source: 'llm1', target: 'aggregator' },
    { id: 'e3-5', source: 'llm2', target: 'aggregator' },
    { id: 'e4-5', source: 'llm3', target: 'aggregator' },
    { id: 'e5-6', source: 'aggregator', target: 'output' }
  ],
  codeExample: `// Parallelization implementation
const executeParallel = async (input: string, numParallel = 3) => {
  try {
    // Create multiple parallel tasks
    const tasks = Array.from({ length: numParallel }, (_, index) => 
      processTask(input, index)
    );
    
    // Execute all tasks in parallel
    const results = await Promise.all(tasks);
    
    // Aggregate results
    const aggregatedResult = await aggregateResults(results);
    
    return {
      status: 'success',
      input,
      parallelResults: results,
      aggregatedResult
    };
  } catch (error) {
    return { status: 'failed', reason: error.message };
  }
};

const processTask = async (input: string, taskIndex: number) => {
  const prompt = \`
    Task \${taskIndex + 1}: Process the following input and provide your analysis.
    
    Input: \${input}
    
    Provide a detailed response from your unique perspective.
  \`;
  
  const result = await llm(prompt);
  return { taskIndex, result };
};

const aggregateResults = async (results: any[]) => {
  const aggregationPrompt = \`
    You are an aggregator that combines multiple perspectives into a single, 
    comprehensive response.
    
    Individual responses:
    \${results.map(r => \`Response \${r.taskIndex + 1}: \${r.result}\`).join('\\n\\n')}
    
    Synthesize these responses into a single, coherent answer that captures 
    the best insights from all perspectives.
  \`;
  
  return await llm(aggregationPrompt);
};`,
  pythonCodeExample: `# Parallelization implementation
import asyncio
import openai
from typing import List, Dict, Any

class ParallelizationAgent:
    def __init__(self, client, model: str = "gpt-4"):
        self.client = client
        self.model = model
    
    async def execute(self, input_text: str, num_parallel: int = 3) -> Dict[str, Any]:
        """Execute multiple parallel LLM calls and aggregate results."""
        try:
            # Create multiple parallel tasks
            tasks = [
                self._process_task(input_text, i) 
                for i in range(num_parallel)
            ]
            
            # Execute all tasks in parallel
            results = await asyncio.gather(*tasks)
            
            # Aggregate results
            aggregated_result = await self._aggregate_results(results)
            
            return {
                "status": "success",
                "input": input_text,
                "parallel_results": results,
                "aggregated_result": aggregated_result
            }
            
        except Exception as error:
            return {"status": "failed", "reason": str(error)}
    
    async def _process_task(self, input_text: str, task_index: int) -> Dict[str, Any]:
        """Process a single task with unique perspective."""
        prompt = f"""
        Task {task_index + 1}: Process the following input and provide your analysis.
        
        Input: {input_text}
        
        Provide a detailed response from your unique perspective.
        """
        
        result = await self._llm_call(prompt)
        return {"task_index": task_index, "result": result}
    
    async def _aggregate_results(self, results: List[Dict[str, Any]]) -> str:
        """Aggregate multiple results into a single response."""
        aggregation_prompt = f"""
        You are an aggregator that combines multiple perspectives into a single, 
        comprehensive response.
        
        Individual responses:
        {chr(10).join([f"Response {r['task_index'] + 1}: {r['result']}" for r in results])}
        
        Synthesize these responses into a single, coherent answer that captures 
        the best insights from all perspectives.
        """
        
        return await self._llm_call(aggregation_prompt)
    
    async def _llm_call(self, prompt: str) -> str:
        """Call the LLM with the given prompt."""
        response = await self.client.chat.completions.create(
            model=self.model,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content

# Example usage
async def main():
    client = openai.AsyncOpenAI()  # Initialize with your API key
    agent = ParallelizationAgent(client)
    result = await agent.execute("Analyze the pros and cons of remote work")
    print(json.dumps(result, indent=2))

# Run the example
# import asyncio
# asyncio.run(main())
`,
  implementation: [
    'Set up parallel task execution framework',
    'Define multiple LLM calls with same input but different perspectives',
    'Implement concurrent execution using Promise.all or asyncio.gather',
    'Create aggregation logic to combine multiple outputs',
    'Add error handling for individual task failures',
    'Implement result validation and quality checks',
    'Design consensus mechanisms for conflicting outputs',
    'Add monitoring and performance tracking'
  ]
};
