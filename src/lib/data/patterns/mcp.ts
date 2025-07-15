import { PatternData } from './types';

export const mcpPattern: PatternData = {
  id: 'mcp',
  name: 'Model Context Protocol (MCP)',
  description: 'Standardized protocol for connecting AI assistants to external data sources and tools.',
  category: 'Integration',
  useCases: ['Tool Integration', 'Data Source Connection', 'Resource Management', 'Protocol Standardization'],
  whenToUse: 'Use MCP when you need standardized integration between AI assistants and external systems. This pattern is ideal for connecting to databases, APIs, file systems, and other resources through a unified protocol interface.',
  nodes: [
    {
      id: 'client',
      type: 'input',
      data: { label: 'MCP Client', nodeType: 'input' },
      position: { x: 100, y: 200 }
    },
    {
      id: 'transport',
      type: 'default',
      data: { label: 'Transport Layer', nodeType: 'router' },
      position: { x: 300, y: 200 }
    },
    {
      id: 'server',
      type: 'default',
      data: { label: 'MCP Server', nodeType: 'aggregator' },
      position: { x: 500, y: 200 }
    },
    {
      id: 'resources',
      type: 'default',
      data: { label: 'Resources', nodeType: 'tool' },
      position: { x: 700, y: 150 }
    },
    {
      id: 'tools',
      type: 'default',
      data: { label: 'Tools', nodeType: 'tool' },
      position: { x: 700, y: 250 }
    },
    {
      id: 'prompts',
      type: 'default',
      data: { label: 'Prompts', nodeType: 'llm' },
      position: { x: 700, y: 350 }
    },
    {
      id: 'output',
      type: 'output',
      data: { label: 'Response', nodeType: 'output' },
      position: { x: 900, y: 200 }
    }
  ],
  edges: [
    { id: 'e1-2', source: 'client', target: 'transport', animated: true },
    { id: 'e2-3', source: 'transport', target: 'server', animated: true },
    { id: 'e3-4', source: 'server', target: 'resources', animated: true },
    { id: 'e3-5', source: 'server', target: 'tools', animated: true },
    { id: 'e3-6', source: 'server', target: 'prompts', animated: true },
    { id: 'e4-7', source: 'resources', target: 'output' },
    { id: 'e5-7', source: 'tools', target: 'output' },
    { id: 'e6-7', source: 'prompts', target: 'output' }
  ],
  codeExample: `// MCP Client implementation
interface MCPMessage {
  jsonrpc: '2.0';
  id?: string | number;
  method?: string;
  params?: any;
  result?: any;
  error?: any;
}

class MCPClient {
  private transport: Transport;
  private messageId = 0;
  
  constructor(transport: Transport) {
    this.transport = transport;
  }
  
  async initialize(): Promise<void> {
    const response = await this.request('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {
        roots: { listChanged: true },
        sampling: {}
      },
      clientInfo: {
        name: 'SparkAgent',
        version: '1.0.0'
      }
    });
    
    if (response.error) {
      throw new Error(\`MCP initialization failed: \${response.error.message}\`);
    }
  }
  
  async listResources(): Promise<any> {
    return await this.request('resources/list');
  }
  
  async readResource(uri: string): Promise<any> {
    return await this.request('resources/read', { uri });
  }
  
  async listTools(): Promise<any> {
    return await this.request('tools/list');
  }
  
  async callTool(name: string, args: any): Promise<any> {
    return await this.request('tools/call', { name, arguments: args });
  }
  
  async listPrompts(): Promise<any> {
    return await this.request('prompts/list');
  }
  
  async getPrompt(name: string, args?: any): Promise<any> {
    return await this.request('prompts/get', { name, arguments: args });
  }
  
  private async request(method: string, params?: any): Promise<MCPMessage> {
    const message: MCPMessage = {
      jsonrpc: '2.0',
      id: ++this.messageId,
      method,
      params
    };
    
    return await this.transport.send(message);
  }
}

// Usage example
const client = new MCPClient(new StdioTransport());
await client.initialize();

const tools = await client.listTools();
const result = await client.callTool('database_query', {
  query: 'SELECT * FROM users LIMIT 10'
});`,
  pythonCodeExample: `# MCP Server implementation
import asyncio
import json
from typing import Dict, Any, List
from dataclasses import dataclass

@dataclass
class MCPResource:
    uri: str
    name: str
    description: str
    mime_type: str

@dataclass
class MCPTool:
    name: str
    description: str
    input_schema: Dict[str, Any]

class MCPServer:
    def __init__(self):
        self.resources: Dict[str, MCPResource] = {}
        self.tools: Dict[str, MCPTool] = {}
        self.prompts: Dict[str, Dict[str, Any]] = {}
    
    async def handle_message(self, message: Dict[str, Any]) -> Dict[str, Any]:
        """Handle incoming MCP messages."""
        method = message.get('method')
        params = message.get('params', {})
        
        try:
            if method == 'initialize':
                return await self._handle_initialize(params)
            elif method == 'resources/list':
                return await self._handle_resources_list()
            elif method == 'resources/read':
                return await self._handle_resource_read(params)
            elif method == 'tools/list':
                return await self._handle_tools_list()
            elif method == 'tools/call':
                return await self._handle_tool_call(params)
            elif method == 'prompts/list':
                return await self._handle_prompts_list()
            elif method == 'prompts/get':
                return await self._handle_prompt_get(params)
            else:
                return {
                    'jsonrpc': '2.0',
                    'id': message.get('id'),
                    'error': {
                        'code': -32601,
                        'message': f'Method not found: {method}'
                    }
                }
        except Exception as e:
            return {
                'jsonrpc': '2.0',
                'id': message.get('id'),
                'error': {
                    'code': -32603,
                    'message': f'Internal error: {str(e)}'
                }
            }
    
    async def _handle_initialize(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Handle initialization request."""
        return {
            'jsonrpc': '2.0',
            'id': params.get('id'),
            'result': {
                'protocolVersion': '2024-11-05',
                'capabilities': {
                    'resources': {'subscribe': True, 'listChanged': True},
                    'tools': {'listChanged': True},
                    'prompts': {'listChanged': True}
                },
                'serverInfo': {
                    'name': 'SparkMCP',
                    'version': '1.0.0'
                }
            }
        }
    
    async def _handle_resources_list(self) -> Dict[str, Any]:
        """List available resources."""
        return {
            'jsonrpc': '2.0',
            'result': {
                'resources': [
                    {
                        'uri': resource.uri,
                        'name': resource.name,
                        'description': resource.description,
                        'mimeType': resource.mime_type
                    }
                    for resource in self.resources.values()
                ]
            }
        }
    
    async def _handle_resource_read(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Read a specific resource."""
        uri = params.get('uri')
        if uri not in self.resources:
            raise ValueError(f'Resource not found: {uri}')
        
        # Read resource content (implementation depends on resource type)
        content = await self._read_resource_content(uri)
        
        return {
            'jsonrpc': '2.0',
            'result': {
                'contents': [
                    {
                        'uri': uri,
                        'mimeType': self.resources[uri].mime_type,
                        'text': content
                    }
                ]
            }
        }
    
    async def _handle_tools_list(self) -> Dict[str, Any]:
        """List available tools."""
        return {
            'jsonrpc': '2.0',
            'result': {
                'tools': [
                    {
                        'name': tool.name,
                        'description': tool.description,
                        'inputSchema': tool.input_schema
                    }
                    for tool in self.tools.values()
                ]
            }
        }
    
    async def _handle_tool_call(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Execute a tool call."""
        tool_name = params.get('name')
        arguments = params.get('arguments', {})
        
        if tool_name not in self.tools:
            raise ValueError(f'Tool not found: {tool_name}')
        
        # Execute tool (implementation depends on tool type)
        result = await self._execute_tool(tool_name, arguments)
        
        return {
            'jsonrpc': '2.0',
            'result': {
                'content': [
                    {
                        'type': 'text',
                        'text': str(result)
                    }
                ]
            }
        }
    
    async def _read_resource_content(self, uri: str) -> str:
        """Read resource content - implement based on resource type."""
        # Placeholder implementation
        return f"Content for {uri}"
    
    async def _execute_tool(self, tool_name: str, arguments: Dict[str, Any]) -> Any:
        """Execute tool - implement based on tool type."""
        # Placeholder implementation
        return f"Tool {tool_name} executed with args: {arguments}"
`,
  implementation: [
    'Implement MCP protocol message handling',
    'Create transport layer abstraction (stdio, websocket, etc.)',
    'Build resource management system',
    'Implement tool registration and execution',
    'Add prompt template system',
    'Create capability negotiation',
    'Build error handling and validation',
    'Add logging and monitoring capabilities'
  ]
};
