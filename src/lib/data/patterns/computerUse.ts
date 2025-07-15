import { PatternData } from './types';

export const computerUsePattern: PatternData = {
  id: 'computer-use',
  name: 'Computer Use',
  description: 'Agents that can interact with computer interfaces through screen capture, mouse, and keyboard actions.',
  category: 'Advanced',
  useCases: ['UI Automation', 'Software Testing', 'Desktop Applications', 'Web Scraping'],
  whenToUse: 'Use Computer Use when agents need to interact with graphical user interfaces, automate desktop applications, or perform tasks that require visual interface navigation. This pattern is ideal for testing, automation, and scenarios where API access is not available.',
  nodes: [
    {
      id: 'input',
      type: 'input',
      data: { label: 'Task Input', nodeType: 'input' },
      position: { x: 100, y: 200 }
    },
    {
      id: 'screen-capture',
      type: 'default',
      data: { label: 'Screen Capture', nodeType: 'tool' },
      position: { x: 300, y: 150 }
    },
    {
      id: 'vision-model',
      type: 'default',
      data: { label: 'Vision Model', nodeType: 'llm' },
      position: { x: 500, y: 150 }
    },
    {
      id: 'action-planner',
      type: 'default',
      data: { label: 'Action Planner', nodeType: 'planner' },
      position: { x: 700, y: 150 }
    },
    {
      id: 'action-executor',
      type: 'default',
      data: { label: 'Action Executor', nodeType: 'executor' },
      position: { x: 900, y: 150 }
    },
    {
      id: 'feedback-loop',
      type: 'default',
      data: { label: 'Feedback Loop', nodeType: 'evaluator' },
      position: { x: 700, y: 300 }
    },
    {
      id: 'output',
      type: 'output',
      data: { label: 'Task Result', nodeType: 'output' },
      position: { x: 1100, y: 200 }
    }
  ],
  edges: [
    { id: 'e1-2', source: 'input', target: 'screen-capture', animated: true },
    { id: 'e2-3', source: 'screen-capture', target: 'vision-model', animated: true },
    { id: 'e3-4', source: 'vision-model', target: 'action-planner', animated: true },
    { id: 'e4-5', source: 'action-planner', target: 'action-executor', animated: true },
    { id: 'e5-7', source: 'action-executor', target: 'output' },
    { id: 'e5-6', source: 'action-executor', target: 'feedback-loop', animated: true },
    { id: 'e6-2', source: 'feedback-loop', target: 'screen-capture', animated: true, label: 'Retry' }
  ],
  codeExample: `// Computer Use implementation
import { spawn } from 'child_process';

interface ScreenAction {
  type: 'click' | 'type' | 'scroll' | 'key' | 'drag';
  coordinates?: { x: number; y: number };
  text?: string;
  key?: string;
  duration?: number;
}

class ComputerUseAgent {
  private screenSize: { width: number; height: number };
  
  constructor() {
    this.screenSize = { width: 1920, height: 1080 };
  }
  
  async executeTask(task: string): Promise<any> {
    try {
      let attempts = 0;
      const maxAttempts = 10;
      
      while (attempts < maxAttempts) {
        attempts++;
        
        // Capture current screen
        const screenshot = await this.captureScreen();
        
        // Analyze screen with vision model
        const analysis = await this.analyzeScreen(screenshot, task);
        
        // Plan next action
        const action = await this.planAction(analysis, task);
        
        if (action.type === 'complete') {
          return {
            status: 'success',
            result: action.result,
            attempts
          };
        }
        
        // Execute action
        await this.executeAction(action);
        
        // Wait for UI to update
        await this.delay(1000);
      }
      
      return {
        status: 'failed',
        reason: 'Max attempts reached',
        attempts
      };
    } catch (error) {
      return {
        status: 'error',
        reason: error.message
      };
    }
  }
  
  private async captureScreen(): Promise<Buffer> {
    // Platform-specific screen capture
    if (process.platform === 'darwin') {
      return this.macScreenCapture();
    } else if (process.platform === 'win32') {
      return this.windowsScreenCapture();
    } else {
      return this.linuxScreenCapture();
    }
  }
  
  private async macScreenCapture(): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const child = spawn('screencapture', ['-t', 'png', '-']);
      let data = Buffer.alloc(0);
      
      child.stdout.on('data', (chunk) => {
        data = Buffer.concat([data, chunk]);
      });
      
      child.on('close', (code) => {
        if (code === 0) {
          resolve(data);
        } else {
          reject(new Error(\`Screen capture failed with code \${code}\`));
        }
      });
    });
  }
  
  private async analyzeScreen(screenshot: Buffer, task: string): Promise<any> {
    const visionPrompt = \`
      Task: \${task}
      
      Analyze this screenshot and identify:
      1. Current state of the screen
      2. Relevant UI elements for the task
      3. What action should be taken next
      4. Element coordinates if action is needed
      
      Return JSON with: {
        "description": "what you see",
        "elements": [{"type": "button", "text": "OK", "x": 100, "y": 200}],
        "nextAction": "click on OK button",
        "complete": false
      }
    \`;
    
    const response = await this.callVisionModel(visionPrompt, screenshot);
    return JSON.parse(response);
  }
  
  private async planAction(analysis: any, task: string): Promise<ScreenAction> {
    if (analysis.complete) {
      return {
        type: 'complete',
        result: analysis.result
      };
    }
    
    const actionPrompt = \`
      Current screen analysis: \${JSON.stringify(analysis)}
      Task: \${task}
      
      Plan the next action. Return JSON with:
      {
        "type": "click|type|scroll|key|drag",
        "coordinates": {"x": 100, "y": 200},
        "text": "text to type",
        "key": "Enter",
        "reasoning": "why this action"
      }
    \`;
    
    const response = await llm(actionPrompt);
    return JSON.parse(response);
  }
  
  private async executeAction(action: ScreenAction): Promise<void> {
    switch (action.type) {
      case 'click':
        await this.click(action.coordinates!.x, action.coordinates!.y);
        break;
      case 'type':
        await this.type(action.text!);
        break;
      case 'key':
        await this.pressKey(action.key!);
        break;
      case 'scroll':
        await this.scroll(action.coordinates!.x, action.coordinates!.y);
        break;
      case 'drag':
        // Implement drag functionality
        break;
    }
  }
  
  private async click(x: number, y: number): Promise<void> {
    // Platform-specific click implementation
    if (process.platform === 'darwin') {
      spawn('cliclick', ['c:\${x},\${y}']);
    } else if (process.platform === 'win32') {
      // Windows click implementation
    } else {
      // Linux click implementation
    }
  }
  
  private async type(text: string): Promise<void> {
    // Platform-specific typing implementation
    if (process.platform === 'darwin') {
      spawn('cliclick', ['t:\${text}']);
    }
  }
  
  private async pressKey(key: string): Promise<void> {
    // Platform-specific key press implementation
    if (process.platform === 'darwin') {
      spawn('cliclick', ['k:\${key}']);
    }
  }
  
  private async scroll(x: number, y: number): Promise<void> {
    // Platform-specific scroll implementation
  }
  
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  private async callVisionModel(prompt: string, image: Buffer): Promise<string> {
    // Call vision model (GPT-4V, Claude 3, etc.)
    // Implementation depends on the chosen model
    return '';
  }
}`,
  pythonCodeExample: `# Computer Use Agent implementation
import asyncio
import json
import base64
from typing import Dict, Any, Optional, Tuple
import pyautogui
import cv2
import numpy as np
from PIL import Image
import io

class ComputerUseAgent:
    def __init__(self, vision_client):
        self.vision_client = vision_client
        self.screen_size = pyautogui.size()
        
        # Configure pyautogui
        pyautogui.FAILSAFE = True
        pyautogui.PAUSE = 0.5
    
    async def execute_task(self, task: str) -> Dict[str, Any]:
        """Execute a task using computer interface."""
        try:
            attempts = 0
            max_attempts = 10
            
            while attempts < max_attempts:
                attempts += 1
                
                # Capture current screen
                screenshot = await self.capture_screen()
                
                # Analyze screen with vision model
                analysis = await self.analyze_screen(screenshot, task)
                
                # Plan next action
                action = await self.plan_action(analysis, task)
                
                if action.get('type') == 'complete':
                    return {
                        'status': 'success',
                        'result': action.get('result'),
                        'attempts': attempts
                    }
                
                # Execute action
                await self.execute_action(action)
                
                # Wait for UI to update
                await asyncio.sleep(1)
            
            return {
                'status': 'failed',
                'reason': 'Max attempts reached',
                'attempts': attempts
            }
        except Exception as error:
            return {
                'status': 'error',
                'reason': str(error)
            }
    
    async def capture_screen(self) -> bytes:
        """Capture the current screen."""
        # Take screenshot
        screenshot = pyautogui.screenshot()
        
        # Convert to bytes
        img_buffer = io.BytesIO()
        screenshot.save(img_buffer, format='PNG')
        img_buffer.seek(0)
        
        return img_buffer.read()
    
    async def analyze_screen(self, screenshot: bytes, task: str) -> Dict[str, Any]:
        """Analyze screen content with vision model."""
        # Convert to base64 for API
        img_base64 = base64.b64encode(screenshot).decode('utf-8')
        
        vision_prompt = f"""
        Task: {task}
        
        Analyze this screenshot and identify:
        1. Current state of the screen
        2. Relevant UI elements for the task
        3. What action should be taken next
        4. Element coordinates if action is needed
        
        Return JSON with: {{
            "description": "what you see",
            "elements": [{{"type": "button", "text": "OK", "x": 100, "y": 200}}],
            "nextAction": "click on OK button",
            "complete": false
        }}
        """
        
        response = await self.vision_client.analyze(vision_prompt, img_base64)
        return json.loads(response)
    
    async def plan_action(self, analysis: Dict[str, Any], task: str) -> Dict[str, Any]:
        """Plan the next action based on screen analysis."""
        if analysis.get('complete'):
            return {
                'type': 'complete',
                'result': analysis.get('result')
            }
        
        action_prompt = f"""
        Current screen analysis: {json.dumps(analysis)}
        Task: {task}
        
        Plan the next action. Return JSON with:
        {{
            "type": "click|type|scroll|key|drag",
            "coordinates": {{"x": 100, "y": 200}},
            "text": "text to type",
            "key": "enter",
            "reasoning": "why this action"
        }}
        """
        
        response = await self.vision_client.plan(action_prompt)
        return json.loads(response)
    
    async def execute_action(self, action: Dict[str, Any]):
        """Execute a planned action."""
        action_type = action.get('type')
        
        if action_type == 'click':
            coords = action.get('coordinates', {})
            await self.click(coords.get('x'), coords.get('y'))
        
        elif action_type == 'type':
            text = action.get('text', '')
            await self.type_text(text)
        
        elif action_type == 'key':
            key = action.get('key', '')
            await self.press_key(key)
        
        elif action_type == 'scroll':
            coords = action.get('coordinates', {})
            await self.scroll(coords.get('x'), coords.get('y'))
        
        elif action_type == 'drag':
            start = action.get('start', {})
            end = action.get('end', {})
            await self.drag(start.get('x'), start.get('y'), end.get('x'), end.get('y'))
    
    async def click(self, x: int, y: int):
        """Click at specified coordinates."""
        await asyncio.sleep(0.1)
        pyautogui.click(x, y)
    
    async def type_text(self, text: str):
        """Type text."""
        await asyncio.sleep(0.1)
        pyautogui.typewrite(text)
    
    async def press_key(self, key: str):
        """Press a key."""
        await asyncio.sleep(0.1)
        pyautogui.press(key)
    
    async def scroll(self, x: int, y: int, clicks: int = 3):
        """Scroll at specified coordinates."""
        await asyncio.sleep(0.1)
        pyautogui.scroll(clicks, x, y)
    
    async def drag(self, start_x: int, start_y: int, end_x: int, end_y: int):
        """Drag from start to end coordinates."""
        await asyncio.sleep(0.1)
        pyautogui.drag(end_x - start_x, end_y - start_y, duration=0.5, button='left')
    
    def find_element(self, screenshot: bytes, template: bytes, threshold: float = 0.8) -> Optional[Tuple[int, int]]:
        """Find element in screenshot using template matching."""
        # Convert bytes to opencv images
        screenshot_img = cv2.imdecode(np.frombuffer(screenshot, np.uint8), cv2.IMREAD_COLOR)
        template_img = cv2.imdecode(np.frombuffer(template, np.uint8), cv2.IMREAD_COLOR)
        
        # Template matching
        result = cv2.matchTemplate(screenshot_img, template_img, cv2.TM_CCOEFF_NORMED)
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)
        
        if max_val >= threshold:
            # Return center coordinates
            h, w = template_img.shape[:2]
            center_x = max_loc[0] + w // 2
            center_y = max_loc[1] + h // 2
            return (center_x, center_y)
        
        return None
`,
  implementation: [
    'Set up cross-platform screen capture',
    'Implement vision model integration for screen analysis',
    'Create action planning and execution system',
    'Add mouse and keyboard automation',
    'Build element detection and recognition',
    'Implement feedback loops and error recovery',
    'Add safety constraints and fail-safes',
    'Create task completion validation'
  ]
};
