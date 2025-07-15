import { PatternData } from './types';

export const selfReflectionPattern: PatternData = {
  id: 'self-reflection',
  name: 'Self-Reflection',
  description: 'Agents that can reflect on their own outputs and improve them through self-critique and iteration.',
  category: 'Advanced',
  useCases: ['Content Quality Improvement', 'Error Correction', 'Iterative Refinement'],
  whenToUse: 'Use Self-Reflection when output quality is critical and can benefit from iterative improvement. This pattern is ideal for content creation, code review, academic writing, or any scenario where the agent should evaluate and refine its own work to meet higher standards.',
  nodes: [
    {
      id: 'input',
      type: 'input',
      data: { label: 'Input', nodeType: 'input' },
      position: { x: 100, y: 150 }
    },
    {
      id: 'generator',
      type: 'default',
      data: { label: 'Generator', nodeType: 'llm' },
      position: { x: 300, y: 150 }
    },
    {
      id: 'critic',
      type: 'default',
      data: { label: 'Critic', nodeType: 'evaluator' },
      position: { x: 500, y: 100 }
    },
    {
      id: 'refiner',
      type: 'default',
      data: { label: 'Refiner', nodeType: 'llm' },
      position: { x: 500, y: 200 }
    },
    {
      id: 'output',
      type: 'output',
      data: { label: 'Output', nodeType: 'output' },
      position: { x: 700, y: 150 }
    }
  ],
  edges: [
    { id: 'e1-2', source: 'input', target: 'generator', animated: true },
    { id: 'e2-3', source: 'generator', target: 'critic', animated: true },
    { id: 'e2-4', source: 'generator', target: 'refiner', animated: true },
    { id: 'e3-4', source: 'critic', target: 'refiner', animated: true },
    { id: 'e4-2', source: 'refiner', target: 'generator', animated: true, label: 'Iterate' },
    { id: 'e4-5', source: 'refiner', target: 'output' }
  ],
  codeExample: `// Self-Reflection implementation
const executeSelfReflection = async (task: string, maxIterations = 3) => {
  try {
    let currentOutput = '';
    let iteration = 0;
    const history = [];
    
    while (iteration < maxIterations) {
      iteration++;
      
      // Generate initial or refined output
      const generatePrompt = iteration === 1 ? 
        \`Task: \${task}\n\nProvide your best response.\` :
        \`Task: \${task}\n\nPrevious attempt: \${currentOutput}\n\nImprove this response based on the feedback.\`;
      
      currentOutput = await llm(generatePrompt);
      
      // Self-critique
      const critiquePrompt = \`
        Evaluate the following response for the task: \${task}
        
        Response: \${currentOutput}
        
        Provide detailed feedback on:
        1. Accuracy and completeness
        2. Clarity and structure
        3. Areas for improvement
        4. Overall quality score (1-10)
        
        If score is 8 or above, respond with "APPROVED: [reasoning]"
        Otherwise, provide specific improvement suggestions.
      \`;
      
      const critique = await llm(critiquePrompt);
      
      history.push({
        iteration,
        output: currentOutput,
        critique
      });
      
      // Check if approved
      if (critique.includes('APPROVED:')) {
        return {
          status: 'success',
          iterations: iteration,
          finalOutput: currentOutput,
          history
        };
      }
      
      // Refine based on critique
      const refinePrompt = \`
        Task: \${task}
        Current response: \${currentOutput}
        Critique: \${critique}
        
        Revise the response addressing all the feedback points.
      \`;
      
      currentOutput = await llm(refinePrompt);
    }
    
    return {
      status: 'max_iterations_reached',
      iterations: iteration,
      finalOutput: currentOutput,
      history
    };
  } catch (error) {
    return { status: 'failed', reason: error.message };
  }
};`,
  pythonCodeExample: `# Self-Reflection Agent implementation
import openai
from typing import Dict, List, Any

class SelfReflectionAgent:
    def __init__(self, client, model: str = "gpt-4"):
        self.client = client
        self.model = model
    
    async def execute(self, task: str, max_iterations: int = 3) -> Dict[str, Any]:
        """Execute self-reflection to improve response quality."""
        try:
            current_output = ""
            iteration = 0
            history = []
            
            while iteration < max_iterations:
                iteration += 1
                
                # Generate initial or refined output
                generate_prompt = (
                    f"Task: {task}\\n\\nProvide your best response."
                    if iteration == 1
                    else f"Task: {task}\\n\\nPrevious attempt: {current_output}\\n\\nImprove this response based on the feedback."
                )
                
                current_output = await self._llm_call(generate_prompt)
                
                # Self-critique
                critique_prompt = f"""
                Evaluate the following response for the task: {task}
                
                Response: {current_output}
                
                Provide detailed feedback on:
                1. Accuracy and completeness
                2. Clarity and structure
                3. Areas for improvement
                4. Overall quality score (1-10)
                
                If score is 8 or above, respond with "APPROVED: [reasoning]"
                Otherwise, provide specific improvement suggestions.
                """
                
                critique = await self._llm_call(critique_prompt)
                
                history.append({
                    "iteration": iteration,
                    "output": current_output,
                    "critique": critique
                })
                
                # Check if approved
                if "APPROVED:" in critique:
                    return {
                        "status": "success",
                        "iterations": iteration,
                        "final_output": current_output,
                        "history": history
                    }
                
                # Refine based on critique
                refine_prompt = f"""
                Task: {task}
                Current response: {current_output}
                Critique: {critique}
                
                Revise the response addressing all the feedback points.
                """
                
                current_output = await self._llm_call(refine_prompt)
            
            return {
                "status": "max_iterations_reached",
                "iterations": iteration,
                "final_output": current_output,
                "history": history
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
`,
  implementation: [
    'Create generation-critique-refinement cycle',
    'Implement quality scoring and approval criteria',
    'Build feedback integration and improvement logic',
    'Add iteration tracking and history management',
    'Create termination conditions for quality thresholds',
    'Implement different critique perspectives',
    'Add meta-cognitive reasoning capabilities',
    'Build learning from previous iterations'
  ]
};
