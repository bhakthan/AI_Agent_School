import { PatternData } from './types';

export const autonomousWorkflowPattern: PatternData = {
  id: 'autonomous-workflow',
  name: 'Autonomous Workflow',
  description: 'Self-managing workflow system where agents autonomously plan, execute, and adapt complex multi-step processes.',
  category: 'Advanced',
  useCases: ['Process Automation', 'Complex Task Execution', 'Adaptive Systems', 'Self-Managing Pipelines'],
  whenToUse: 'Use Autonomous Workflow when you need systems that can independently manage complex, multi-step processes with minimal human intervention. This pattern is ideal for automated business processes, data pipelines, content creation workflows, or any scenario requiring adaptive, self-managing task execution.',
  nodes: [
    {
      id: 'trigger',
      type: 'input',
      data: { label: 'Workflow Trigger', nodeType: 'input' },
      position: { x: 100, y: 300 }
    },
    {
      id: 'planner',
      type: 'default',
      data: { label: 'Workflow Planner', nodeType: 'planner' },
      position: { x: 300, y: 300 }
    },
    {
      id: 'executor',
      type: 'default',
      data: { label: 'Step Executor', nodeType: 'executor' },
      position: { x: 500, y: 300 }
    },
    {
      id: 'monitor',
      type: 'default',
      data: { label: 'Progress Monitor', nodeType: 'evaluator' },
      position: { x: 700, y: 250 }
    },
    {
      id: 'adapter',
      type: 'default',
      data: { label: 'Workflow Adapter', nodeType: 'router' },
      position: { x: 700, y: 350 }
    },
    {
      id: 'state-manager',
      type: 'default',
      data: { label: 'State Manager', nodeType: 'aggregator' },
      position: { x: 500, y: 450 }
    },
    {
      id: 'completion',
      type: 'output',
      data: { label: 'Workflow Result', nodeType: 'output' },
      position: { x: 900, y: 300 }
    }
  ],
  edges: [
    { id: 'e1-2', source: 'trigger', target: 'planner', animated: true },
    { id: 'e2-3', source: 'planner', target: 'executor', animated: true },
    { id: 'e3-4', source: 'executor', target: 'monitor', animated: true },
    { id: 'e4-5', source: 'monitor', target: 'adapter', animated: true },
    { id: 'e5-2', source: 'adapter', target: 'planner', animated: true, label: 'Replan' },
    { id: 'e5-3', source: 'adapter', target: 'executor', animated: true, label: 'Adjust' },
    { id: 'e3-6', source: 'executor', target: 'state-manager', animated: true },
    { id: 'e6-4', source: 'state-manager', target: 'monitor', animated: true },
    { id: 'e4-7', source: 'monitor', target: 'completion' },
    { id: 'e6-2', source: 'state-manager', target: 'planner', animated: true, label: 'Context' }
  ],
  codeExample: `// Autonomous Workflow Pattern implementation
interface WorkflowStep {
  id: string;
  name: string;
  type: 'task' | 'decision' | 'parallel' | 'loop' | 'condition';
  dependencies: string[];
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
  retryCount: number;
  maxRetries: number;
  timeout: number;
  execute: (context: WorkflowContext) => Promise<any>;
}

interface WorkflowContext {
  workflowId: string;
  variables: Record<string, any>;
  stepResults: Record<string, any>;
  executionHistory: Array<{
    stepId: string;
    startTime: number;
    endTime: number;
    result: any;
    error?: string;
  }>;
}

interface WorkflowPlan {
  steps: WorkflowStep[];
  executionOrder: string[];
  conditions: Record<string, string>;
  adaptationRules: Array<{
    condition: string;
    action: 'retry' | 'skip' | 'replan' | 'escalate';
    parameters: Record<string, any>;
  }>;
}

class AutonomousWorkflowSystem {
  private activeWorkflows: Map<string, WorkflowContext> = new Map();
  private workflowPlans: Map<string, WorkflowPlan> = new Map();
  private executionQueue: Array<{ workflowId: string; stepId: string }> = [];
  
  async executeWorkflow(trigger: any, workflowTemplate?: string): Promise<any> {
    try {
      const workflowId = \`workflow-\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`;
      
      // Step 1: Plan the workflow
      const plan = await this.planWorkflow(trigger, workflowTemplate);
      this.workflowPlans.set(workflowId, plan);
      
      // Step 2: Initialize workflow context
      const context = await this.initializeContext(workflowId, trigger);
      this.activeWorkflows.set(workflowId, context);
      
      // Step 3: Execute workflow autonomously
      const result = await this.executeWorkflowSteps(workflowId, plan);
      
      // Step 4: Cleanup
      this.activeWorkflows.delete(workflowId);
      this.workflowPlans.delete(workflowId);
      
      return {
        status: 'completed',
        workflowId,
        result,
        executionTime: Date.now() - context.variables.startTime
      };
    } catch (error) {
      return {
        status: 'failed',
        reason: error.message
      };
    }
  }
  
  private async planWorkflow(trigger: any, template?: string): Promise<WorkflowPlan> {
    const planningPrompt = \`
      Create a detailed workflow plan for the following trigger:
      
      Trigger: \${JSON.stringify(trigger)}
      Template: \${template || 'none'}
      
      Analyze the requirements and create a step-by-step workflow plan.
      Consider:
      1. Required steps and their dependencies
      2. Decision points and conditions
      3. Error handling and recovery
      4. Parallel execution opportunities
      5. Success criteria and validation
      
      Return JSON with:
      {
        "steps": [
          {
            "id": "step-1",
            "name": "Step Name",
            "type": "task|decision|parallel|loop|condition",
            "dependencies": ["step-0"],
            "inputs": {},
            "outputs": {},
            "maxRetries": 3,
            "timeout": 30000,
            "description": "What this step does"
          }
        ],
        "executionOrder": ["step-1", "step-2"],
        "conditions": {
          "step-2": "step-1.result.success === true"
        },
        "adaptationRules": [
          {
            "condition": "step failure rate > 50%",
            "action": "replan",
            "parameters": {"strategy": "alternative_approach"}
          }
        ]
      }
    \`;
    
    const planResponse = await llm(planningPrompt);
    const planData = JSON.parse(planResponse);
    
    // Convert plan data to WorkflowPlan with executable steps
    return {
      steps: planData.steps.map(step => ({
        ...step,
        status: 'pending',
        retryCount: 0,
        execute: this.createStepExecutor(step)
      })),
      executionOrder: planData.executionOrder,
      conditions: planData.conditions,
      adaptationRules: planData.adaptationRules
    };
  }
  
  private createStepExecutor(stepData: any): (context: WorkflowContext) => Promise<any> {
    return async (context: WorkflowContext) => {
      const executionPrompt = \`
        Execute the following workflow step:
        
        Step: \${stepData.name}
        Type: \${stepData.type}
        Description: \${stepData.description}
        Inputs: \${JSON.stringify(stepData.inputs)}
        
        Workflow Context:
        Variables: \${JSON.stringify(context.variables)}
        Previous Results: \${JSON.stringify(context.stepResults)}
        
        Execute this step and return the result.
      \`;
      
      const result = await llm(executionPrompt);
      return JSON.parse(result);
    };
  }
  
  private async initializeContext(workflowId: string, trigger: any): Promise<WorkflowContext> {
    return {
      workflowId,
      variables: {
        startTime: Date.now(),
        trigger,
        userId: trigger.userId || 'system'
      },
      stepResults: {},
      executionHistory: []
    };
  }
  
  private async executeWorkflowSteps(workflowId: string, plan: WorkflowPlan): Promise<any> {
    const context = this.activeWorkflows.get(workflowId);
    if (!context) throw new Error('Workflow context not found');
    
    const stepMap = new Map(plan.steps.map(step => [step.id, step]));
    const completedSteps = new Set<string>();
    
    // Execute steps according to dependencies
    for (const stepId of plan.executionOrder) {
      const step = stepMap.get(stepId);
      if (!step) continue;
      
      // Check dependencies
      const dependenciesMet = step.dependencies.every(depId => completedSteps.has(depId));
      if (!dependenciesMet) {
        continue; // Skip for now, will be retried
      }
      
      // Check conditions
      if (plan.conditions[stepId]) {
        const conditionMet = await this.evaluateCondition(
          plan.conditions[stepId],
          context
        );
        if (!conditionMet) {
          step.status = 'skipped';
          completedSteps.add(stepId);
          continue;
        }
      }
      
      // Execute step
      const stepResult = await this.executeStep(step, context);
      
      // Monitor progress and adapt if needed
      const adaptationNeeded = await this.monitorProgress(workflowId, step, stepResult);
      if (adaptationNeeded) {
        await this.adaptWorkflow(workflowId, adaptationNeeded);
      }
      
      completedSteps.add(stepId);
    }
    
    return this.aggregateResults(context);
  }
  
  private async executeStep(step: WorkflowStep, context: WorkflowContext): Promise<any> {
    const startTime = Date.now();
    step.status = 'running';
    
    try {
      const result = await Promise.race([
        step.execute(context),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Step timeout')), step.timeout)
        )
      ]);
      
      step.status = 'completed';
      context.stepResults[step.id] = result;
      
      context.executionHistory.push({
        stepId: step.id,
        startTime,
        endTime: Date.now(),
        result
      });
      
      return result;
    } catch (error) {
      step.status = 'failed';
      step.retryCount++;
      
      context.executionHistory.push({
        stepId: step.id,
        startTime,
        endTime: Date.now(),
        result: null,
        error: error.message
      });
      
      // Retry if possible
      if (step.retryCount < step.maxRetries) {
        await this.delay(1000 * step.retryCount); // Exponential backoff
        return await this.executeStep(step, context);
      }
      
      throw error;
    }
  }
  
  private async monitorProgress(workflowId: string, step: WorkflowStep, result: any): Promise<string | null> {
    const monitorPrompt = \`
      Monitor the progress of this workflow step:
      
      Step: \${step.name}
      Status: \${step.status}
      Result: \${JSON.stringify(result)}
      Retry Count: \${step.retryCount}
      
      Analyze if any adaptation is needed:
      1. Performance issues
      2. Quality concerns
      3. Resource constraints
      4. Error patterns
      
      Return adaptation needed or "none" if everything is fine.
    \`;
    
    const monitoring = await llm(monitorPrompt);
    return monitoring === 'none' ? null : monitoring;
  }
  
  private async adaptWorkflow(workflowId: string, adaptation: string): Promise<void> {
    const plan = this.workflowPlans.get(workflowId);
    if (!plan) return;
    
    const adaptationPrompt = \`
      Adapt the workflow based on the following issue:
      
      Issue: \${adaptation}
      Current Plan: \${JSON.stringify(plan)}
      
      Suggest adaptations such as:
      1. Step modifications
      2. Alternative approaches
      3. Resource adjustments
      4. Recovery strategies
      
      Return the adaptation strategy.
    \`;
    
    const adaptationStrategy = await llm(adaptationPrompt);
    
    // Apply adaptation (simplified)
    console.log('Adapting workflow:', adaptationStrategy);
  }
  
  private async evaluateCondition(condition: string, context: WorkflowContext): Promise<boolean> {
    // Simple condition evaluation (in practice, use a proper expression evaluator)
    try {
      const func = new Function('context', \`return \${condition}\`);
      return func(context);
    } catch {
      return false;
    }
  }
  
  private async aggregateResults(context: WorkflowContext): Promise<any> {
    const aggregationPrompt = \`
      Aggregate the results from all workflow steps:
      
      Step Results: \${JSON.stringify(context.stepResults)}
      Execution History: \${JSON.stringify(context.executionHistory)}
      
      Provide a comprehensive summary of the workflow execution.
    \`;
    
    return await llm(aggregationPrompt);
  }
  
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Analytics and monitoring
  getWorkflowMetrics(workflowId: string): any {
    const context = this.activeWorkflows.get(workflowId);
    if (!context) return null;
    
    return {
      workflowId,
      status: 'running',
      startTime: context.variables.startTime,
      stepsCompleted: context.executionHistory.length,
      totalSteps: Object.keys(context.stepResults).length,
      avgStepDuration: context.executionHistory.reduce((sum, h) => 
        sum + (h.endTime - h.startTime), 0) / context.executionHistory.length
    };
  }
}`,
  pythonCodeExample: `# Autonomous Workflow Pattern implementation
import asyncio
import json
from typing import Dict, List, Any, Optional, Callable
from dataclasses import dataclass, field
from enum import Enum
import time

class StepStatus(Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    SKIPPED = "skipped"

class StepType(Enum):
    TASK = "task"
    DECISION = "decision"
    PARALLEL = "parallel"
    LOOP = "loop"
    CONDITION = "condition"

@dataclass
class WorkflowStep:
    id: str
    name: str
    type: StepType
    dependencies: List[str]
    inputs: Dict[str, Any]
    outputs: Dict[str, Any]
    status: StepStatus = StepStatus.PENDING
    retry_count: int = 0
    max_retries: int = 3
    timeout: int = 30
    description: str = ""
    execute: Optional[Callable] = None

@dataclass
class WorkflowContext:
    workflow_id: str
    variables: Dict[str, Any] = field(default_factory=dict)
    step_results: Dict[str, Any] = field(default_factory=dict)
    execution_history: List[Dict[str, Any]] = field(default_factory=list)

@dataclass
class WorkflowPlan:
    steps: List[WorkflowStep]
    execution_order: List[str]
    conditions: Dict[str, str]
    adaptation_rules: List[Dict[str, Any]]

class AutonomousWorkflowSystem:
    def __init__(self):
        self.active_workflows: Dict[str, WorkflowContext] = {}
        self.workflow_plans: Dict[str, WorkflowPlan] = {}
        self.execution_queue: List[Dict[str, str]] = []
    
    async def execute_workflow(self, trigger: Dict[str, Any], workflow_template: Optional[str] = None) -> Dict[str, Any]:
        """Execute an autonomous workflow."""
        try:
            import random
            import string
            workflow_id = f"workflow-{int(time.time())}-{''.join(random.choices(string.ascii_lowercase, k=9))}"
            
            # Step 1: Plan the workflow
            plan = await self.plan_workflow(trigger, workflow_template)
            self.workflow_plans[workflow_id] = plan
            
            # Step 2: Initialize workflow context
            context = await self.initialize_context(workflow_id, trigger)
            self.active_workflows[workflow_id] = context
            
            # Step 3: Execute workflow autonomously
            result = await self.execute_workflow_steps(workflow_id, plan)
            
            # Step 4: Cleanup
            self.active_workflows.pop(workflow_id, None)
            self.workflow_plans.pop(workflow_id, None)
            
            return {
                "status": "completed",
                "workflow_id": workflow_id,
                "result": result,
                "execution_time": time.time() - context.variables["start_time"]
            }
        except Exception as error:
            return {
                "status": "failed",
                "reason": str(error)
            }
    
    async def plan_workflow(self, trigger: Dict[str, Any], template: Optional[str] = None) -> WorkflowPlan:
        """Create a workflow plan."""
        planning_prompt = f"""
        Create a detailed workflow plan for the following trigger:
        
        Trigger: {json.dumps(trigger)}
        Template: {template or 'none'}
        
        Analyze the requirements and create a step-by-step workflow plan.
        Consider:
        1. Required steps and their dependencies
        2. Decision points and conditions
        3. Error handling and recovery
        4. Parallel execution opportunities
        5. Success criteria and validation
        
        Return JSON with:
        {{
            "steps": [
                {{
                    "id": "step-1",
                    "name": "Step Name",
                    "type": "task",
                    "dependencies": ["step-0"],
                    "inputs": {{}},
                    "outputs": {{}},
                    "max_retries": 3,
                    "timeout": 30,
                    "description": "What this step does"
                }}
            ],
            "execution_order": ["step-1", "step-2"],
            "conditions": {{
                "step-2": "step-1.result.success === true"
            }},
            "adaptation_rules": [
                {{
                    "condition": "step failure rate > 50%",
                    "action": "replan",
                    "parameters": {{"strategy": "alternative_approach"}}
                }}
            ]
        }}
        """
        
        plan_response = await self.call_llm(planning_prompt)
        plan_data = json.loads(plan_response)
        
        # Convert plan data to WorkflowPlan with executable steps
        steps = []
        for step_data in plan_data["steps"]:
            step = WorkflowStep(
                id=step_data["id"],
                name=step_data["name"],
                type=StepType(step_data["type"]),
                dependencies=step_data["dependencies"],
                inputs=step_data["inputs"],
                outputs=step_data["outputs"],
                max_retries=step_data.get("max_retries", 3),
                timeout=step_data.get("timeout", 30),
                description=step_data.get("description", "")
            )
            step.execute = self.create_step_executor(step_data)
            steps.append(step)
        
        return WorkflowPlan(
            steps=steps,
            execution_order=plan_data["execution_order"],
            conditions=plan_data["conditions"],
            adaptation_rules=plan_data["adaptation_rules"]
        )
    
    def create_step_executor(self, step_data: Dict[str, Any]) -> Callable:
        """Create an executor function for a step."""
        async def executor(context: WorkflowContext) -> Any:
            execution_prompt = f"""
            Execute the following workflow step:
            
            Step: {step_data["name"]}
            Type: {step_data["type"]}
            Description: {step_data.get("description", "")}
            Inputs: {json.dumps(step_data["inputs"])}
            
            Workflow Context:
            Variables: {json.dumps(context.variables)}
            Previous Results: {json.dumps(context.step_results)}
            
            Execute this step and return the result.
            """
            
            result = await self.call_llm(execution_prompt)
            return json.loads(result)
        
        return executor
    
    async def initialize_context(self, workflow_id: str, trigger: Dict[str, Any]) -> WorkflowContext:
        """Initialize workflow context."""
        return WorkflowContext(
            workflow_id=workflow_id,
            variables={
                "start_time": time.time(),
                "trigger": trigger,
                "user_id": trigger.get("userId", "system")
            },
            step_results={},
            execution_history=[]
        )
    
    async def execute_workflow_steps(self, workflow_id: str, plan: WorkflowPlan) -> Any:
        """Execute workflow steps."""
        context = self.active_workflows.get(workflow_id)
        if not context:
            raise Exception("Workflow context not found")
        
        step_map = {step.id: step for step in plan.steps}
        completed_steps = set()
        
        # Execute steps according to dependencies
        for step_id in plan.execution_order:
            step = step_map.get(step_id)
            if not step:
                continue
            
            # Check dependencies
            dependencies_met = all(dep_id in completed_steps for dep_id in step.dependencies)
            if not dependencies_met:
                continue  # Skip for now, will be retried
            
            # Check conditions
            if step_id in plan.conditions:
                condition_met = await self.evaluate_condition(
                    plan.conditions[step_id], context
                )
                if not condition_met:
                    step.status = StepStatus.SKIPPED
                    completed_steps.add(step_id)
                    continue
            
            # Execute step
            step_result = await self.execute_step(step, context)
            
            # Monitor progress and adapt if needed
            adaptation_needed = await self.monitor_progress(workflow_id, step, step_result)
            if adaptation_needed:
                await self.adapt_workflow(workflow_id, adaptation_needed)
            
            completed_steps.add(step_id)
        
        return await self.aggregate_results(context)
    
    async def execute_step(self, step: WorkflowStep, context: WorkflowContext) -> Any:
        """Execute a single workflow step."""
        start_time = time.time()
        step.status = StepStatus.RUNNING
        
        try:
            # Execute step with timeout
            result = await asyncio.wait_for(
                step.execute(context), 
                timeout=step.timeout
            )
            
            step.status = StepStatus.COMPLETED
            context.step_results[step.id] = result
            
            context.execution_history.append({
                "step_id": step.id,
                "start_time": start_time,
                "end_time": time.time(),
                "result": result
            })
            
            return result
        except Exception as error:
            step.status = StepStatus.FAILED
            step.retry_count += 1
            
            context.execution_history.append({
                "step_id": step.id,
                "start_time": start_time,
                "end_time": time.time(),
                "result": None,
                "error": str(error)
            })
            
            # Retry if possible
            if step.retry_count < step.max_retries:
                await asyncio.sleep(1 * step.retry_count)  # Exponential backoff
                return await self.execute_step(step, context)
            
            raise error
    
    async def monitor_progress(self, workflow_id: str, step: WorkflowStep, result: Any) -> Optional[str]:
        """Monitor workflow progress."""
        monitor_prompt = f"""
        Monitor the progress of this workflow step:
        
        Step: {step.name}
        Status: {step.status.value}
        Result: {json.dumps(result)}
        Retry Count: {step.retry_count}
        
        Analyze if any adaptation is needed:
        1. Performance issues
        2. Quality concerns
        3. Resource constraints
        4. Error patterns
        
        Return adaptation needed or "none" if everything is fine.
        """
        
        monitoring = await self.call_llm(monitor_prompt)
        return None if monitoring == "none" else monitoring
    
    async def adapt_workflow(self, workflow_id: str, adaptation: str):
        """Adapt workflow based on monitoring."""
        plan = self.workflow_plans.get(workflow_id)
        if not plan:
            return
        
        adaptation_prompt = f"""
        Adapt the workflow based on the following issue:
        
        Issue: {adaptation}
        Current Plan: {json.dumps(plan.__dict__, default=str)}
        
        Suggest adaptations such as:
        1. Step modifications
        2. Alternative approaches
        3. Resource adjustments
        4. Recovery strategies
        
        Return the adaptation strategy.
        """
        
        adaptation_strategy = await self.call_llm(adaptation_prompt)
        
        # Apply adaptation (simplified)
        print(f"Adapting workflow: {adaptation_strategy}")
    
    async def evaluate_condition(self, condition: str, context: WorkflowContext) -> bool:
        """Evaluate a workflow condition."""
        # Simple condition evaluation (in practice, use a proper expression evaluator)
        try:
            # This is a simplified version - in practice, use a safe expression evaluator
            return True  # Placeholder
        except:
            return False
    
    async def aggregate_results(self, context: WorkflowContext) -> Any:
        """Aggregate workflow results."""
        aggregation_prompt = f"""
        Aggregate the results from all workflow steps:
        
        Step Results: {json.dumps(context.step_results)}
        Execution History: {json.dumps(context.execution_history)}
        
        Provide a comprehensive summary of the workflow execution.
        """
        
        return await self.call_llm(aggregation_prompt)
    
    def get_workflow_metrics(self, workflow_id: str) -> Optional[Dict[str, Any]]:
        """Get workflow metrics."""
        context = self.active_workflows.get(workflow_id)
        if not context:
            return None
        
        return {
            "workflow_id": workflow_id,
            "status": "running",
            "start_time": context.variables["start_time"],
            "steps_completed": len(context.execution_history),
            "total_steps": len(context.step_results),
            "avg_step_duration": (
                sum(h["end_time"] - h["start_time"] for h in context.execution_history) / 
                len(context.execution_history)
            ) if context.execution_history else 0
        }
    
    async def call_llm(self, prompt: str) -> str:
        """Call LLM - implement based on your chosen provider."""
        # Placeholder - implement with your LLM provider
        return '{"result": "workflow step completed"}'

# Example usage
async def main():
    workflow_system = AutonomousWorkflowSystem()
    
    trigger = {
        "type": "data_processing",
        "data_source": "customer_feedback.csv",
        "userId": "user123"
    }
    
    result = await workflow_system.execute_workflow(trigger)
    print(f"Workflow result: {result}")

if __name__ == "__main__":
    asyncio.run(main())
`,
  implementation: [
    'Design autonomous workflow planning system',
    'Create adaptive step execution engine',
    'Implement progress monitoring and adaptation',
    'Build state management and persistence',
    'Add error handling and recovery mechanisms',
    'Create condition evaluation and branching',
    'Implement workflow optimization and learning',
    'Add comprehensive monitoring and analytics'
  ]
};
