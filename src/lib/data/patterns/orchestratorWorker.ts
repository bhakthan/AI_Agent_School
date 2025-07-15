import { PatternData } from './types';

export const orchestratorWorkerPattern: PatternData = {
  id: 'orchestrator-worker',
  name: 'Orchestrator-Worker',
  description: 'Hierarchical pattern where an orchestrator agent coordinates multiple worker agents to execute complex tasks in parallel.',
  category: 'Multi-Agent',
  useCases: ['Parallel Processing', 'Task Decomposition', 'Workflow Orchestration', 'Load Distribution'],
  whenToUse: 'Use Orchestrator-Worker when you have complex tasks that can be decomposed into independent subtasks for parallel execution. This pattern is ideal for large-scale processing, parallel computation, or when you need to coordinate multiple specialized agents efficiently.',
  nodes: [
    {
      id: 'input',
      type: 'input',
      data: { label: 'Task Input', nodeType: 'input' },
      position: { x: 100, y: 300 }
    },
    {
      id: 'orchestrator',
      type: 'default',
      data: { label: 'Orchestrator', nodeType: 'planner' },
      position: { x: 300, y: 300 }
    },
    {
      id: 'task-decomposer',
      type: 'default',
      data: { label: 'Task Decomposer', nodeType: 'router' },
      position: { x: 500, y: 300 }
    },
    {
      id: 'worker-1',
      type: 'default',
      data: { label: 'Worker 1', nodeType: 'executor' },
      position: { x: 700, y: 200 }
    },
    {
      id: 'worker-2',
      type: 'default',
      data: { label: 'Worker 2', nodeType: 'executor' },
      position: { x: 700, y: 300 }
    },
    {
      id: 'worker-3',
      type: 'default',
      data: { label: 'Worker 3', nodeType: 'executor' },
      position: { x: 700, y: 400 }
    },
    {
      id: 'result-aggregator',
      type: 'default',
      data: { label: 'Result Aggregator', nodeType: 'aggregator' },
      position: { x: 900, y: 300 }
    },
    {
      id: 'output',
      type: 'output',
      data: { label: 'Final Result', nodeType: 'output' },
      position: { x: 1100, y: 300 }
    }
  ],
  edges: [
    { id: 'e1-2', source: 'input', target: 'orchestrator', animated: true },
    { id: 'e2-3', source: 'orchestrator', target: 'task-decomposer', animated: true },
    { id: 'e3-4', source: 'task-decomposer', target: 'worker-1', animated: true },
    { id: 'e3-5', source: 'task-decomposer', target: 'worker-2', animated: true },
    { id: 'e3-6', source: 'task-decomposer', target: 'worker-3', animated: true },
    { id: 'e4-7', source: 'worker-1', target: 'result-aggregator', animated: true },
    { id: 'e5-7', source: 'worker-2', target: 'result-aggregator', animated: true },
    { id: 'e6-7', source: 'worker-3', target: 'result-aggregator', animated: true },
    { id: 'e7-8', source: 'result-aggregator', target: 'output' },
    { id: 'e2-7', source: 'orchestrator', target: 'result-aggregator', animated: true, label: 'Monitor' }
  ],
  codeExample: `// Orchestrator-Worker Pattern implementation
interface WorkerTask {
  id: string;
  type: string;
  data: any;
  priority: number;
  dependencies: string[];
}

interface WorkerResult {
  taskId: string;
  workerId: string;
  result: any;
  duration: number;
  status: 'success' | 'failed' | 'timeout';
}

class OrchestratorWorkerSystem {
  private workers: Map<string, Worker> = new Map();
  private taskQueue: WorkerTask[] = [];
  private completedTasks: Map<string, WorkerResult> = new Map();
  private runningTasks: Map<string, WorkerTask> = new Map();
  
  addWorker(worker: Worker): void {
    this.workers.set(worker.id, worker);
  }
  
  async executeTask(mainTask: string): Promise<any> {
    try {
      // Step 1: Orchestrator analyzes and decomposes the task
      const decomposition = await this.decomposeTask(mainTask);
      
      // Step 2: Create worker tasks
      const workerTasks = await this.createWorkerTasks(decomposition);
      
      // Step 3: Execute tasks in parallel with dependency management
      const results = await this.executeWorkerTasks(workerTasks);
      
      // Step 4: Aggregate results
      const finalResult = await this.aggregateResults(results, mainTask);
      
      return {
        status: 'success',
        result: finalResult,
        tasksExecuted: results.length,
        totalDuration: results.reduce((sum, r) => sum + r.duration, 0)
      };
    } catch (error) {
      return {
        status: 'failed',
        reason: error.message
      };
    }
  }
  
  private async decomposeTask(mainTask: string): Promise<any> {
    const decompositionPrompt = \`
      Analyze the following task and decompose it into independent subtasks:
      
      Task: \${mainTask}
      
      Break this down into:
      1. Independent subtasks that can be executed in parallel
      2. Sequential subtasks that have dependencies
      3. Priority levels for each subtask
      
      Return JSON with:
      {
        "subtasks": [
          {
            "id": "subtask-1",
            "description": "subtask description",
            "type": "data-processing|analysis|computation|research",
            "priority": 1,
            "dependencies": [],
            "estimatedDuration": 5
          }
        ],
        "execution_strategy": "parallel|sequential|hybrid"
      }
    \`;
    
    const response = await llm(decompositionPrompt);
    return JSON.parse(response);
  }
  
  private async createWorkerTasks(decomposition: any): Promise<WorkerTask[]> {
    return decomposition.subtasks.map((subtask: any) => ({
      id: subtask.id,
      type: subtask.type,
      data: {
        description: subtask.description,
        estimatedDuration: subtask.estimatedDuration
      },
      priority: subtask.priority,
      dependencies: subtask.dependencies
    }));
  }
  
  private async executeWorkerTasks(tasks: WorkerTask[]): Promise<WorkerResult[]> {
    const results: WorkerResult[] = [];
    const taskMap = new Map(tasks.map(t => [t.id, t]));
    
    // Execute tasks respecting dependencies
    while (results.length < tasks.length) {
      const readyTasks = tasks.filter(task => 
        !results.some(r => r.taskId === task.id) && // Not completed
        !this.runningTasks.has(task.id) && // Not running
        task.dependencies.every(dep => results.some(r => r.taskId === dep)) // Dependencies met
      );
      
      if (readyTasks.length === 0) {
        await this.delay(100);
        continue;
      }
      
      // Execute ready tasks in parallel
      const promises = readyTasks.map(task => this.executeTask(task));
      const batchResults = await Promise.all(promises);
      results.push(...batchResults);
    }
    
    return results;
  }
  
  private async executeSingleTask(task: WorkerTask): Promise<WorkerResult> {
    const startTime = Date.now();
    this.runningTasks.set(task.id, task);
    
    try {
      // Find available worker
      const worker = await this.findAvailableWorker(task.type);
      
      // Execute task
      const result = await worker.execute(task.data);
      
      const duration = Date.now() - startTime;
      
      return {
        taskId: task.id,
        workerId: worker.id,
        result,
        duration,
        status: 'success'
      };
    } catch (error) {
      return {
        taskId: task.id,
        workerId: 'unknown',
        result: error.message,
        duration: Date.now() - startTime,
        status: 'failed'
      };
    } finally {
      this.runningTasks.delete(task.id);
    }
  }
  
  private async findAvailableWorker(taskType: string): Promise<Worker> {
    // Find worker with matching capabilities and lowest load
    const availableWorkers = Array.from(this.workers.values())
      .filter(w => w.capabilities.includes(taskType) && w.load < w.maxLoad)
      .sort((a, b) => a.load - b.load);
    
    if (availableWorkers.length === 0) {
      throw new Error(\`No available workers for task type: \${taskType}\`);
    }
    
    return availableWorkers[0];
  }
  
  private async aggregateResults(results: WorkerResult[], originalTask: string): Promise<any> {
    const aggregationPrompt = \`
      Original task: \${originalTask}
      
      Worker results:
      \${results.map(r => \`\${r.taskId}: \${JSON.stringify(r.result)}\`).join('\\n')}
      
      Aggregate these results into a comprehensive response for the original task.
      Consider:
      1. How the results relate to each other
      2. Any patterns or insights across results
      3. Final synthesis and conclusions
      
      Return the aggregated result.
    \`;
    
    return await llm(aggregationPrompt);
  }
  
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Monitoring and analytics
  getSystemStatus(): any {
    return {
      totalWorkers: this.workers.size,
      runningTasks: this.runningTasks.size,
      completedTasks: this.completedTasks.size,
      queuedTasks: this.taskQueue.length,
      workerStatus: Array.from(this.workers.values()).map(w => ({
        id: w.id,
        load: w.load,
        maxLoad: w.maxLoad,
        capabilities: w.capabilities
      }))
    };
  }
}

interface Worker {
  id: string;
  capabilities: string[];
  load: number;
  maxLoad: number;
  execute: (data: any) => Promise<any>;
}`,
  pythonCodeExample: `# Orchestrator-Worker Pattern implementation
import asyncio
import json
from typing import Dict, List, Any, Optional
from dataclasses import dataclass
from enum import Enum

class TaskStatus(Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"

@dataclass
class WorkerTask:
    id: str
    type: str
    data: Any
    priority: int
    dependencies: List[str]
    estimated_duration: int = 5

@dataclass
class WorkerResult:
    task_id: str
    worker_id: str
    result: Any
    duration: float
    status: TaskStatus

class Worker:
    def __init__(self, worker_id: str, capabilities: List[str], max_load: int = 5):
        self.id = worker_id
        self.capabilities = capabilities
        self.load = 0
        self.max_load = max_load
    
    async def execute(self, data: Any) -> Any:
        """Execute a task - override in subclasses."""
        self.load += 1
        try:
            # Simulate work
            await asyncio.sleep(0.1)
            return f"Worker {self.id} processed: {data}"
        finally:
            self.load -= 1

class OrchestratorWorkerSystem:
    def __init__(self):
        self.workers: Dict[str, Worker] = {}
        self.completed_tasks: Dict[str, WorkerResult] = {}
        self.running_tasks: Dict[str, WorkerTask] = {}
    
    def add_worker(self, worker: Worker):
        """Add a worker to the system."""
        self.workers[worker.id] = worker
    
    async def execute_task(self, main_task: str) -> Dict[str, Any]:
        """Execute a complex task using the orchestrator-worker pattern."""
        try:
            # Step 1: Orchestrator analyzes and decomposes the task
            decomposition = await self.decompose_task(main_task)
            
            # Step 2: Create worker tasks
            worker_tasks = await self.create_worker_tasks(decomposition)
            
            # Step 3: Execute tasks in parallel with dependency management
            results = await self.execute_worker_tasks(worker_tasks)
            
            # Step 4: Aggregate results
            final_result = await self.aggregate_results(results, main_task)
            
            return {
                "status": "success",
                "result": final_result,
                "tasks_executed": len(results),
                "total_duration": sum(r.duration for r in results)
            }
        except Exception as error:
            return {
                "status": "failed",
                "reason": str(error)
            }
    
    async def decompose_task(self, main_task: str) -> Dict[str, Any]:
        """Decompose main task into subtasks."""
        decomposition_prompt = f"""
        Analyze the following task and decompose it into independent subtasks:
        
        Task: {main_task}
        
        Break this down into:
        1. Independent subtasks that can be executed in parallel
        2. Sequential subtasks that have dependencies
        3. Priority levels for each subtask
        
        Return JSON with:
        {{
            "subtasks": [
                {{
                    "id": "subtask-1",
                    "description": "subtask description",
                    "type": "data-processing|analysis|computation|research",
                    "priority": 1,
                    "dependencies": [],
                    "estimatedDuration": 5
                }}
            ],
            "execution_strategy": "parallel|sequential|hybrid"
        }}
        """
        
        # Call LLM for decomposition
        response = await self.call_llm(decomposition_prompt)
        return json.loads(response)
    
    async def create_worker_tasks(self, decomposition: Dict[str, Any]) -> List[WorkerTask]:
        """Create worker tasks from decomposition."""
        return [
            WorkerTask(
                id=subtask["id"],
                type=subtask["type"],
                data={
                    "description": subtask["description"],
                    "estimated_duration": subtask.get("estimatedDuration", 5)
                },
                priority=subtask["priority"],
                dependencies=subtask["dependencies"]
            )
            for subtask in decomposition["subtasks"]
        ]
    
    async def execute_worker_tasks(self, tasks: List[WorkerTask]) -> List[WorkerResult]:
        """Execute worker tasks respecting dependencies."""
        results = []
        task_map = {task.id: task for task in tasks}
        
        # Execute tasks respecting dependencies
        while len(results) < len(tasks):
            ready_tasks = [
                task for task in tasks
                if (
                    task.id not in [r.task_id for r in results] and  # Not completed
                    task.id not in self.running_tasks and  # Not running
                    all(dep in [r.task_id for r in results] for dep in task.dependencies)  # Dependencies met
                )
            ]
            
            if not ready_tasks:
                await asyncio.sleep(0.1)
                continue
            
            # Execute ready tasks in parallel
            tasks_to_execute = ready_tasks[:min(len(ready_tasks), len(self.workers))]
            coroutines = [self.execute_single_task(task) for task in tasks_to_execute]
            batch_results = await asyncio.gather(*coroutines, return_exceptions=True)
            
            # Process results
            for result in batch_results:
                if isinstance(result, Exception):
                    print(f"Task execution failed: {result}")
                else:
                    results.append(result)
        
        return results
    
    async def execute_single_task(self, task: WorkerTask) -> WorkerResult:
        """Execute a single task."""
        import time
        start_time = time.time()
        self.running_tasks[task.id] = task
        
        try:
            # Find available worker
            worker = await self.find_available_worker(task.type)
            
            # Execute task
            result = await worker.execute(task.data)
            
            duration = time.time() - start_time
            
            return WorkerResult(
                task_id=task.id,
                worker_id=worker.id,
                result=result,
                duration=duration,
                status=TaskStatus.COMPLETED
            )
        except Exception as error:
            return WorkerResult(
                task_id=task.id,
                worker_id="unknown",
                result=str(error),
                duration=time.time() - start_time,
                status=TaskStatus.FAILED
            )
        finally:
            self.running_tasks.pop(task.id, None)
    
    async def find_available_worker(self, task_type: str) -> Worker:
        """Find available worker for task type."""
        available_workers = [
            worker for worker in self.workers.values()
            if task_type in worker.capabilities and worker.load < worker.max_load
        ]
        
        if not available_workers:
            raise Exception(f"No available workers for task type: {task_type}")
        
        # Return worker with lowest load
        return min(available_workers, key=lambda w: w.load)
    
    async def aggregate_results(self, results: List[WorkerResult], original_task: str) -> Any:
        """Aggregate worker results."""
        aggregation_prompt = f"""
        Original task: {original_task}
        
        Worker results:
        {chr(10).join([f"{r.task_id}: {json.dumps(r.result)}" for r in results])}
        
        Aggregate these results into a comprehensive response for the original task.
        Consider:
        1. How the results relate to each other
        2. Any patterns or insights across results
        3. Final synthesis and conclusions
        
        Return the aggregated result.
        """
        
        return await self.call_llm(aggregation_prompt)
    
    def get_system_status(self) -> Dict[str, Any]:
        """Get system status."""
        return {
            "total_workers": len(self.workers),
            "running_tasks": len(self.running_tasks),
            "completed_tasks": len(self.completed_tasks),
            "worker_status": [
                {
                    "id": worker.id,
                    "load": worker.load,
                    "max_load": worker.max_load,
                    "capabilities": worker.capabilities
                }
                for worker in self.workers.values()
            ]
        }
    
    async def call_llm(self, prompt: str) -> str:
        """Call LLM - implement based on your chosen provider."""
        # Placeholder - implement with your LLM provider
        return '{"subtasks": [{"id": "subtask-1", "description": "Process data", "type": "data-processing", "priority": 1, "dependencies": [], "estimatedDuration": 5}], "execution_strategy": "parallel"}'
`,
  implementation: [
    'Design task decomposition and dependency analysis',
    'Create worker registration and capability management',
    'Implement parallel task execution with dependency resolution',
    'Build result aggregation and synthesis logic',
    'Add load balancing and worker selection',
    'Create monitoring and status reporting',
    'Implement error handling and recovery',
    'Add performance optimization and scaling'
  ]
};
