import { PatternData } from './types';

export const codeActPattern: PatternData = {
  id: 'codeact-agent',
  name: 'CodeAct Agent',
  description: 'Allows agents to autonomously execute Python code instead of using JSON, enabling them to handle complex tasks more efficiently.',
  category: 'Core',
  useCases: ['Complex Computational Tasks', 'Data Analysis', 'Algorithmic Problem Solving'],
  whenToUse: 'Select the CodeAct pattern when your tasks involve complex computations, data manipulation, or algorithmic problem solving that would benefit from actual code execution. It\'s particularly valuable for data science workflows, mathematical computations, and situations where the agent needs to process structured data dynamically rather than relying on pre-defined API calls.',
  nodes: [
    {
      id: 'user',
      type: 'input',
      data: { label: 'User', nodeType: 'input' },
      position: { x: 100, y: 150 }
    },
    {
      id: 'agent',
      type: 'default',
      data: { label: 'Agent', nodeType: 'llm' },
      position: { x: 300, y: 150 }
    },
    {
      id: 'think',
      type: 'default',
      data: { label: 'Think', nodeType: 'llm' },
      position: { x: 500, y: 100 }
    },
    {
      id: 'act',
      type: 'default',
      data: { label: 'Act (Code)', nodeType: 'executor' },
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
    { id: 'e1-2', source: 'user', target: 'agent', animated: true },
    { id: 'e2-3', source: 'agent', target: 'think', animated: true },
    { id: 'e2-4', source: 'agent', target: 'act', animated: true },
    { id: 'e3-5', source: 'think', target: 'output' },
    { id: 'e4-5', source: 'act', target: 'output' }
  ],
  codeExample: `// CodeAct Agent implementation
const executeCodeAct = async (task: string) => {
  try {
    let currentStep = 0;
    const maxSteps = 10;
    let result = '';
    
    while (currentStep < maxSteps) {
      currentStep++;
      
      // Think step - analyze what needs to be done
      const thinkPrompt = \`
        Task: \${task}
        Current step: \${currentStep}
        
        Analyze what needs to be done next. You can either:
        1. Write and execute Python code to solve part of the problem
        2. Provide the final answer if the task is complete
        
        If you need to write code, respond with:
        THINK: [your reasoning]
        CODE: [python code to execute]
        
        If task is complete, respond with:
        THINK: [your reasoning]
        ANSWER: [final answer]
      \`;
      
      const thinkResponse = await llm(thinkPrompt);
      
      if (thinkResponse.includes('ANSWER:')) {
        result = thinkResponse.split('ANSWER:')[1].trim();
        break;
      }
      
      // Act step - execute the code
      if (thinkResponse.includes('CODE:')) {
        const code = thinkResponse.split('CODE:')[1].trim();
        
        try {
          const executionResult = await executeCode(code);
          
          const actPrompt = \`
            Previous thought: \${thinkResponse}
            Code executed: \${code}
            Execution result: \${executionResult}
            
            Continue with the next step or provide final answer.
          \`;
          
          const actResponse = await llm(actPrompt);
          
          if (actResponse.includes('ANSWER:')) {
            result = actResponse.split('ANSWER:')[1].trim();
            break;
          }
        } catch (error) {
          result = \`Error executing code: \${error.message}\`;
          break;
        }
      }
    }
    
    return {
      status: 'success',
      steps: currentStep,
      result
    };
  } catch (error) {
    return { status: 'failed', reason: error.message };
  }
};

const executeCode = async (code: string) => {
  // Simulate code execution
  return \`Execution result for: \${code}\`;
};`,
  pythonCodeExample: `# CodeAct Agent implementation
import openai
import subprocess
import sys
from typing import Dict, Any

class CodeActAgent:
    def __init__(self, client, model: str = "gpt-4"):
        self.client = client
        self.model = model
    
    async def execute(self, task: str) -> Dict[str, Any]:
        """Execute CodeAct agent to solve tasks through code execution."""
        try:
            current_step = 0
            max_steps = 10
            result = ""
            
            while current_step < max_steps:
                current_step += 1
                
                # Think step - analyze what needs to be done
                think_prompt = f"""
                Task: {task}
                Current step: {current_step}
                
                Analyze what needs to be done next. You can either:
                1. Write and execute Python code to solve part of the problem
                2. Provide the final answer if the task is complete
                
                If you need to write code, respond with:
                THINK: [your reasoning]
                CODE: [python code to execute]
                
                If task is complete, respond with:
                THINK: [your reasoning]
                ANSWER: [final answer]
                """
                
                think_response = await self._llm_call(think_prompt)
                
                if "ANSWER:" in think_response:
                    result = think_response.split("ANSWER:")[1].strip()
                    break
                
                # Act step - execute the code
                if "CODE:" in think_response:
                    code = think_response.split("CODE:")[1].strip()
                    
                    try:
                        execution_result = self._execute_code(code)
                        
                        act_prompt = f"""
                        Previous thought: {think_response}
                        Code executed: {code}
                        Execution result: {execution_result}
                        
                        Continue with the next step or provide final answer.
                        """
                        
                        act_response = await self._llm_call(act_prompt)
                        
                        if "ANSWER:" in act_response:
                            result = act_response.split("ANSWER:")[1].strip()
                            break
                    except Exception as error:
                        result = f"Error executing code: {str(error)}"
                        break
            
            return {
                "status": "success",
                "steps": current_step,
                "result": result
            }
        except Exception as error:
            return {"status": "failed", "reason": str(error)}
    
    def _execute_code(self, code: str) -> str:
        """Execute Python code safely."""
        try:
            # Create a temporary file with the code
            with open("temp_code.py", "w") as f:
                f.write(code)
            
            # Execute the code
            result = subprocess.run(
                [sys.executable, "temp_code.py"],
                capture_output=True,
                text=True,
                timeout=10
            )
            
            if result.returncode == 0:
                return result.stdout
            else:
                return f"Error: {result.stderr}"
        except Exception as error:
            return f"Execution error: {str(error)}"
    
    async def _llm_call(self, prompt: str) -> str:
        """Call the LLM with the given prompt."""
        response = await self.client.chat.completions.create(
            model=self.model,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content
`,
  implementation: [
    'Set up code execution environment with safety constraints',
    'Create think-act cycle for iterative problem solving',
    'Implement code parsing and execution logic',
    'Add error handling and timeout mechanisms',
    'Build result validation and feedback loops',
    'Create session management for persistent variables',
    'Add code safety checks and sandboxing',
    'Implement logging and debugging capabilities'
  ]
};
