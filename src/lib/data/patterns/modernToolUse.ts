import { PatternData } from './types';

export const modernToolUsePattern: PatternData = {
  id: 'modern-tool-use',
  name: 'Modern Tool Use',
  description: 'Advanced tool use patterns for AI agents with function calling, tool chaining, and error handling.',
  category: 'Advanced',
  useCases: ['API Integration', 'Multi-Step Workflows', 'Error Recovery', 'Dynamic Tool Selection'],
  whenToUse: 'Use Modern Tool Use when agents need to interact with external APIs, perform complex multi-step operations, or when robust error handling and recovery is required. This pattern is ideal for production systems that require reliable tool integration.',
  nodes: [
    {
      id: 'input',
      type: 'input',
      data: { label: 'Input', nodeType: 'input' },
      position: { x: 100, y: 200 }
    },
    {
      id: 'planner',
      type: 'default',
      data: { label: 'Tool Planner', nodeType: 'llm' },
      position: { x: 300, y: 200 }
    },
    {
      id: 'selector',
      type: 'default',
      data: { label: 'Tool Selector', nodeType: 'router' },
      position: { x: 500, y: 200 }
    },
    {
      id: 'executor',
      type: 'default',
      data: { label: 'Tool Executor', nodeType: 'executor' },
      position: { x: 700, y: 200 }
    },
    {
      id: 'validator',
      type: 'default',
      data: { label: 'Result Validator', nodeType: 'evaluator' },
      position: { x: 900, y: 200 }
    },
    {
      id: 'error-handler',
      type: 'default',
      data: { label: 'Error Handler', nodeType: 'aggregator' },
      position: { x: 700, y: 350 }
    },
    {
      id: 'output',
      type: 'output',
      data: { label: 'Output', nodeType: 'output' },
      position: { x: 1100, y: 200 }
    }
  ],
  edges: [
    { id: 'e1-2', source: 'input', target: 'planner', animated: true },
    { id: 'e2-3', source: 'planner', target: 'selector', animated: true },
    { id: 'e3-4', source: 'selector', target: 'executor', animated: true },
    { id: 'e4-5', source: 'executor', target: 'validator', animated: true },
    { id: 'e5-7', source: 'validator', target: 'output' },
    { id: 'e4-6', source: 'executor', target: 'error-handler', animated: true, label: 'On Error' },
    { id: 'e6-3', source: 'error-handler', target: 'selector', animated: true, label: 'Retry' },
    { id: 'e5-3', source: 'validator', target: 'selector', animated: true, label: 'Invalid' }
  ],
  codeExample: `// Modern Tool Use implementation
interface Tool {
  name: string;
  description: string;
  parameters: any;
  execute: (params: any) => Promise<any>;
}

const executeModernToolUse = async (task: string, tools: Tool[]) => {
  try {
    const maxRetries = 3;
    let attempt = 0;
    
    while (attempt < maxRetries) {
      attempt++;
      
      // Plan tool usage
      const planPrompt = \`
        Task: \${task}
        Available tools: \${tools.map(t => \`\${t.name}: \${t.description}\`).join(', ')}
        
        Create a step-by-step plan for using tools to complete this task.
        Return as JSON: {"steps": [{"tool": "tool_name", "params": {...}, "rationale": "why"}]}
      \`;
      
      const plan = await llm(planPrompt);
      const parsedPlan = JSON.parse(plan);
      
      // Execute tools sequentially
      const results = [];
      for (const step of parsedPlan.steps) {
        try {
          const tool = tools.find(t => t.name === step.tool);
          if (!tool) {
            throw new Error(\`Tool \${step.tool} not found\`);
          }
          
          const result = await tool.execute(step.params);
          results.push({
            tool: step.tool,
            params: step.params,
            result,
            status: 'success'
          });
        } catch (error) {
          results.push({
            tool: step.tool,
            params: step.params,
            error: error.message,
            status: 'failed'
          });
          
          // Error recovery
          const recoveryPrompt = \`
            Tool \${step.tool} failed with error: \${error.message}
            Previous results: \${JSON.stringify(results)}
            
            Suggest an alternative approach or different tool to achieve the goal.
          \`;
          
          const recovery = await llm(recoveryPrompt);
          // Implement recovery logic...
        }
      }
      
      // Validate results
      const validationPrompt = \`
        Task: \${task}
        Results: \${JSON.stringify(results)}
        
        Evaluate if these results successfully complete the task.
        Return: {"success": true/false, "reasoning": "explanation"}
      \`;
      
      const validation = await llm(validationPrompt);
      const validationResult = JSON.parse(validation);
      
      if (validationResult.success) {
        return {
          status: 'success',
          results,
          attempts: attempt
        };
      }
    }
    
    return {
      status: 'max_attempts_reached',
      attempts: attempt
    };
  } catch (error) {
    return { status: 'failed', reason: error.message };
  }
};`,
  pythonCodeExample: `# Modern Tool Use Agent implementation
import json
import asyncio
from typing import Dict, List, Any, Callable
from dataclasses import dataclass

@dataclass
class Tool:
    name: str
    description: str
    parameters: Dict[str, Any]
    execute: Callable[[Dict[str, Any]], Any]

class ModernToolUseAgent:
    def __init__(self, client, model: str = "gpt-4"):
        self.client = client
        self.model = model
    
    async def execute(self, task: str, tools: List[Tool]) -> Dict[str, Any]:
        """Execute modern tool use with planning and error recovery."""
        try:
            max_retries = 3
            attempt = 0
            
            while attempt < max_retries:
                attempt += 1
                
                # Plan tool usage
                plan_prompt = f"""
                Task: {task}
                Available tools: {', '.join([f"{t.name}: {t.description}" for t in tools])}
                
                Create a step-by-step plan for using tools to complete this task.
                Return as JSON: {{"steps": [{{"tool": "tool_name", "params": {{}}, "rationale": "why"}}]}}
                """
                
                plan = await self._llm_call(plan_prompt)
                parsed_plan = json.loads(plan)
                
                # Execute tools sequentially
                results = []
                for step in parsed_plan["steps"]:
                    try:
                        tool = next((t for t in tools if t.name == step["tool"]), None)
                        if not tool:
                            raise ValueError(f"Tool {step['tool']} not found")
                        
                        result = await tool.execute(step["params"])
                        results.append({
                            "tool": step["tool"],
                            "params": step["params"],
                            "result": result,
                            "status": "success"
                        })
                    except Exception as error:
                        results.append({
                            "tool": step["tool"],
                            "params": step["params"],
                            "error": str(error),
                            "status": "failed"
                        })
                        
                        # Error recovery
                        recovery_prompt = f"""
                        Tool {step['tool']} failed with error: {str(error)}
                        Previous results: {json.dumps(results)}
                        
                        Suggest an alternative approach or different tool to achieve the goal.
                        """
                        
                        recovery = await self._llm_call(recovery_prompt)
                        # Implement recovery logic...
                
                # Validate results
                validation_prompt = f"""
                Task: {task}
                Results: {json.dumps(results)}
                
                Evaluate if these results successfully complete the task.
                Return: {{"success": true/false, "reasoning": "explanation"}}
                """
                
                validation = await self._llm_call(validation_prompt)
                validation_result = json.loads(validation)
                
                if validation_result["success"]:
                    return {
                        "status": "success",
                        "results": results,
                        "attempts": attempt
                    }
            
            return {
                "status": "max_attempts_reached",
                "attempts": attempt
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
    'Define tool interface with parameters and execution',
    'Create tool planning and selection logic',
    'Implement sequential and parallel tool execution',
    'Add comprehensive error handling and recovery',
    'Build result validation and quality checking',
    'Create tool chaining and dependency management',
    'Add logging and monitoring capabilities',
    'Implement adaptive tool selection based on context'
  ]
};
