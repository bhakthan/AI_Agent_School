import { PatternData } from './types';

export const promptChainingPattern: PatternData = {
  id: 'prompt-chaining',
  name: 'Prompt Chaining',
  description: 'It decomposes a task into steps, where each LLM call processes the output of the previous one.',
  useCases: ['Chatbot Applications', 'Tool using AI Agents'],
  whenToUse: 'Employ Prompt Chaining when a complex task naturally breaks down into sequential subtasks where each step depends on the previous one\'s output. This pattern works well for structured workflows like data transformation, step-by-step reasoning, or content refinement processes where the output of each stage serves as input to the next step in a clear linear progression.',
  nodes: [
    {
      id: 'input',
      type: 'input',
      data: { label: 'Input', nodeType: 'input' },
      position: { x: 100, y: 100 }
    },
    {
      id: 'llm1',
      type: 'default',
      data: { label: 'LLM Call', nodeType: 'llm' },
      position: { x: 250, y: 100 }
    },
    {
      id: 'gate',
      type: 'default',
      data: { label: 'Gate', nodeType: 'router' },
      position: { x: 400, y: 100 }
    },
    {
      id: 'llm2',
      type: 'default',
      data: { label: 'LLM Call', nodeType: 'llm' },
      position: { x: 550, y: 50 }
    },
    {
      id: 'llm3',
      type: 'default',
      data: { label: 'LLM Call', nodeType: 'llm' },
      position: { x: 700, y: 50 }
    },
    {
      id: 'output',
      type: 'output',
      data: { label: 'Output', nodeType: 'output' },
      position: { x: 850, y: 50 }
    },
    {
      id: 'fail',
      type: 'output',
      data: { label: 'Fail', nodeType: 'output' },
      position: { x: 550, y: 150 }
    }
  ],
  edges: [
    { id: 'e1-2', source: 'input', target: 'llm1', animated: true },
    { id: 'e2-3', source: 'llm1', target: 'gate', animated: true },
    { id: 'e3-4', source: 'gate', target: 'llm2' },
    { id: 'e4-5', source: 'llm2', target: 'llm3' },
    { id: 'e5-6', source: 'llm3', target: 'output' },
    { id: 'e3-7', source: 'gate', target: 'fail' }
  ],
  codeExample: `// Prompt Chaining implementation
const executePromptChain = async (input: string) => {
  try {
    let currentOutput = input;
    const steps = [];
    
    // Step 1: Initial processing
    const step1Prompt = \`
      Process the following input and prepare it for further analysis:
      
      Input: \${currentOutput}
      
      Provide a structured analysis that can be used in the next step.
    \`;
    
    currentOutput = await llm(step1Prompt);
    steps.push({ step: 1, input: input, output: currentOutput });
    
    // Step 2: Validation gate
    const validationPrompt = \`
      Evaluate if the following analysis is ready for the next processing step:
      
      Analysis: \${currentOutput}
      
      Respond with "PROCEED" if ready, or "FAIL" with explanation if not.
    \`;
    
    const validationResult = await llm(validationPrompt);
    steps.push({ step: 'validation', input: currentOutput, output: validationResult });
    
    if (validationResult.includes('FAIL')) {
      return {
        status: 'failed',
        reason: 'Validation failed',
        steps,
        result: validationResult
      };
    }
    
    // Step 3: Enhancement
    const step3Prompt = \`
      Enhance and refine the following analysis:
      
      Analysis: \${currentOutput}
      
      Provide an improved version with additional insights.
    \`;
    
    currentOutput = await llm(step3Prompt);
    steps.push({ step: 3, input: steps[0].output, output: currentOutput });
    
    // Step 4: Final formatting
    const finalPrompt = \`
      Format the following analysis into a final, polished response:
      
      Analysis: \${currentOutput}
      
      Provide a well-structured, comprehensive final answer.
    \`;
    
    const finalResult = await llm(finalPrompt);
    steps.push({ step: 4, input: currentOutput, output: finalResult });
    
    return {
      status: 'success',
      steps,
      result: finalResult
    };
    
  } catch (error) {
    return { status: 'failed', reason: error.message };
  }
};`,
  pythonCodeExample: `# Prompt Chaining implementation
import openai
from typing import List, Dict, Any

class PromptChainingAgent:
    def __init__(self, client, model: str = "gpt-4"):
        self.client = client
        self.model = model
    
    async def execute(self, input_text: str) -> Dict[str, Any]:
        """Execute a prompt chain with multiple sequential steps."""
        try:
            current_output = input_text
            steps = []
            
            # Step 1: Initial processing
            step1_prompt = f"""
            Process the following input and prepare it for further analysis:
            
            Input: {current_output}
            
            Provide a structured analysis that can be used in the next step.
            """
            
            current_output = await self._llm_call(step1_prompt)
            steps.append({
                "step": 1,
                "input": input_text,
                "output": current_output
            })
            
            # Step 2: Validation gate
            validation_prompt = f"""
            Evaluate if the following analysis is ready for the next processing step:
            
            Analysis: {current_output}
            
            Respond with "PROCEED" if ready, or "FAIL" with explanation if not.
            """
            
            validation_result = await self._llm_call(validation_prompt)
            steps.append({
                "step": "validation",
                "input": current_output,
                "output": validation_result
            })
            
            if "FAIL" in validation_result:
                return {
                    "status": "failed",
                    "reason": "Validation failed",
                    "steps": steps,
                    "result": validation_result
                }
            
            # Step 3: Enhancement
            step3_prompt = f"""
            Enhance and refine the following analysis:
            
            Analysis: {current_output}
            
            Provide an improved version with additional insights.
            """
            
            current_output = await self._llm_call(step3_prompt)
            steps.append({
                "step": 3,
                "input": steps[0]["output"],
                "output": current_output
            })
            
            # Step 4: Final formatting
            final_prompt = f"""
            Format the following analysis into a final, polished response:
            
            Analysis: {current_output}
            
            Provide a well-structured, comprehensive final answer.
            """
            
            final_result = await self._llm_call(final_prompt)
            steps.append({
                "step": 4,
                "input": current_output,
                "output": final_result
            })
            
            return {
                "status": "success",
                "steps": steps,
                "result": final_result
            }
            
        except Exception as error:
            return {"status": "failed", "reason": str(error)}
    
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
    agent = PromptChainingAgent(client)
    result = await agent.execute("Write a comprehensive analysis of renewable energy trends")
    print(json.dumps(result, indent=2))

# Run the example
# import asyncio
# asyncio.run(main())
`,
  implementation: [
    'Design sequential step workflow with clear dependencies',
    'Create individual prompt templates for each step',
    'Implement output validation and quality gates',
    'Build error handling and retry mechanisms',
    'Add step tracking and progress monitoring',
    'Create conditional branching based on intermediate results',
    'Implement rollback mechanisms for failed steps',
    'Add logging and debugging capabilities'
  ]
};
