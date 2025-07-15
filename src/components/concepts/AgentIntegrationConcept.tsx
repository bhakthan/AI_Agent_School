import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Plugs, 
  Lightning, 
  Cube, 
  Bridge, 
  Globe,
  Queue,
  Plug,
  Database
} from "@phosphor-icons/react"

interface AgentIntegrationConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

export default function AgentIntegrationConcept({ onMarkComplete, onNavigateToNext }: AgentIntegrationConceptProps) {
  const tabs = [
    {
      id: 'api-integration',
      title: 'API Integration',
      description: 'RESTful services, GraphQL, and webhook patterns',
      icon: <Plugs className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plugs className="w-5 h-5" />
                API Integration Patterns
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                API integration enables agents to interact with external services and data sources,
                providing access to real-time information and external capabilities.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔄 REST APIs</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• HTTP methods (GET, POST, PUT, DELETE)</li>
                    <li>• Status code handling</li>
                    <li>• Rate limiting and throttling</li>
                    <li>• Authentication and authorization</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">📊 GraphQL</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Query optimization</li>
                    <li>• Schema introspection</li>
                    <li>• Real-time subscriptions</li>
                    <li>• Batched requests</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔗 Webhooks</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Event-driven notifications</li>
                    <li>• Payload validation</li>
                    <li>• Retry mechanisms</li>
                    <li>• Security signatures</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🛡️ Security</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• OAuth 2.0 / OpenID Connect</li>
                    <li>• API key management</li>
                    <li>• TLS/SSL encryption</li>
                    <li>• Input validation</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm">{`# API Integration for AI Agents
import asyncio
import aiohttp
import logging
from typing import Dict, Any, Optional
from dataclasses import dataclass

@dataclass
class APIResponse:
    status: int
    data: Dict[str, Any]
    headers: Dict[str, str]

class APIIntegrationAgent:
    def __init__(self, base_url: str, api_key: str):
        self.base_url = base_url
        self.api_key = api_key
        self.session = None
        self.rate_limiter = RateLimiter(requests_per_minute=100)
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession(
            headers={
                'Authorization': f'Bearer {self.api_key}',
                'Content-Type': 'application/json',
                'User-Agent': 'AIAgent/1.0'
            },
            timeout=aiohttp.ClientTimeout(total=30)
        )
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    async def make_request(self, method: str, endpoint: str, 
                          data: Optional[Dict] = None,
                          params: Optional[Dict] = None) -> APIResponse:
        """Make HTTP request with rate limiting and error handling"""
        await self.rate_limiter.acquire()
        
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        
        try:
            async with self.session.request(
                method, url, json=data, params=params
            ) as response:
                response_data = await response.json()
                
                return APIResponse(
                    status=response.status,
                    data=response_data,
                    headers=dict(response.headers)
                )
        except asyncio.TimeoutError:
            raise APIError("Request timeout")
        except aiohttp.ClientError as e:
            raise APIError(f"Request failed: {e}")
    
    async def webhook_handler(self, request_data: Dict[str, Any]) -> Dict[str, Any]:
        """Handle incoming webhook requests"""
        # Validate webhook signature
        if not self.validate_webhook_signature(request_data):
            raise SecurityError("Invalid webhook signature")
        
        # Process webhook event
        event_type = request_data.get('event_type')
        
        if event_type == 'user_message':
            return await self.handle_user_message(request_data['payload'])
        elif event_type == 'system_alert':
            return await self.handle_system_alert(request_data['payload'])
        
        return {'status': 'processed', 'event_type': event_type}
    
    def validate_webhook_signature(self, request_data: Dict[str, Any]) -> bool:
        """Validate webhook signature for security"""
        # Implementation depends on webhook provider
        signature = request_data.get('signature')
        payload = request_data.get('payload')
        
        # Calculate expected signature
        expected_signature = self.calculate_signature(payload)
        
        return signature == expected_signature

class RateLimiter:
    def __init__(self, requests_per_minute: int):
        self.requests_per_minute = requests_per_minute
        self.requests = []
    
    async def acquire(self):
        now = asyncio.get_event_loop().time()
        
        # Remove old requests
        self.requests = [req_time for req_time in self.requests 
                        if now - req_time < 60]
        
        # Check if we can make a request
        if len(self.requests) >= self.requests_per_minute:
            sleep_time = 60 - (now - self.requests[0])
            await asyncio.sleep(sleep_time)
        
        self.requests.append(now)`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'event-driven',
      title: 'Event-Driven Architecture',
      description: 'Event sourcing, CQRS, and message queues',
      icon: <Lightning className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightning className="w-5 h-5" />
                Event-Driven Patterns
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Event-driven architecture enables agents to respond to events in real-time,
                providing scalable and decoupled system integration patterns.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">📡 Event Sourcing</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Immutable event log</li>
                    <li>• State reconstruction</li>
                    <li>• Audit trail</li>
                    <li>• Temporal queries</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">⚡ CQRS</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Command-query separation</li>
                    <li>• Read/write optimization</li>
                    <li>• Eventual consistency</li>
                    <li>• Scalable architecture</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">📬 Message Queues</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Asynchronous processing</li>
                    <li>• Reliability guarantees</li>
                    <li>• Load balancing</li>
                    <li>• Dead letter queues</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔄 Event Streaming</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Real-time processing</li>
                    <li>• Stream analytics</li>
                    <li>• Event replay</li>
                    <li>• Backpressure handling</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm">{`# Event-Driven Agent Architecture
import asyncio
import json
from typing import Dict, Any, Callable, List
from dataclasses import dataclass, asdict
from datetime import datetime
from enum import Enum

class EventType(Enum):
    USER_MESSAGE = "user_message"
    SYSTEM_ALERT = "system_alert"
    TASK_COMPLETED = "task_completed"
    AGENT_ERROR = "agent_error"

@dataclass
class Event:
    id: str
    type: EventType
    timestamp: datetime
    data: Dict[str, Any]
    metadata: Dict[str, Any]

class EventStore:
    def __init__(self):
        self.events: List[Event] = []
        self.subscribers: Dict[EventType, List[Callable]] = {}
    
    async def append_event(self, event: Event):
        """Append event to the event store"""
        self.events.append(event)
        
        # Notify subscribers
        if event.type in self.subscribers:
            for handler in self.subscribers[event.type]:
                await handler(event)
    
    def subscribe(self, event_type: EventType, handler: Callable):
        """Subscribe to specific event types"""
        if event_type not in self.subscribers:
            self.subscribers[event_type] = []
        self.subscribers[event_type].append(handler)
    
    def get_events(self, event_type: EventType = None, 
                   since: datetime = None) -> List[Event]:
        """Query events from the store"""
        filtered_events = self.events
        
        if event_type:
            filtered_events = [e for e in filtered_events if e.type == event_type]
        
        if since:
            filtered_events = [e for e in filtered_events if e.timestamp >= since]
        
        return filtered_events

class EventDrivenAgent:
    def __init__(self, event_store: EventStore):
        self.event_store = event_store
        self.state = {}
        self.setup_event_handlers()
    
    def setup_event_handlers(self):
        """Setup event handlers for different event types"""
        self.event_store.subscribe(EventType.USER_MESSAGE, self.handle_user_message)
        self.event_store.subscribe(EventType.SYSTEM_ALERT, self.handle_system_alert)
        self.event_store.subscribe(EventType.TASK_COMPLETED, self.handle_task_completed)
    
    async def handle_user_message(self, event: Event):
        """Handle user message events"""
        message = event.data.get('message')
        user_id = event.data.get('user_id')
        
        # Process the message
        response = await self.process_message(message, user_id)
        
        # Emit response event
        response_event = Event(
            id=f"response_{event.id}",
            type=EventType.TASK_COMPLETED,
            timestamp=datetime.now(),
            data={
                'response': response,
                'user_id': user_id,
                'original_event_id': event.id
            },
            metadata={'agent_id': self.agent_id}
        )
        
        await self.event_store.append_event(response_event)
    
    async def handle_system_alert(self, event: Event):
        """Handle system alert events"""
        alert_type = event.data.get('alert_type')
        severity = event.data.get('severity')
        
        if severity == 'critical':
            await self.handle_critical_alert(event)
        else:
            await self.log_alert(event)
    
    async def handle_task_completed(self, event: Event):
        """Handle task completion events"""
        task_id = event.data.get('task_id')
        result = event.data.get('result')
        
        # Update internal state
        self.state[f'task_{task_id}'] = {
            'status': 'completed',
            'result': result,
            'timestamp': event.timestamp
        }
    
    async def emit_event(self, event_type: EventType, data: Dict[str, Any]):
        """Emit new event"""
        event = Event(
            id=f"{event_type.value}_{datetime.now().isoformat()}",
            type=event_type,
            timestamp=datetime.now(),
            data=data,
            metadata={'agent_id': self.agent_id}
        )
        
        await self.event_store.append_event(event)`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'microservices',
      title: 'Microservices Integration',
      description: 'Service mesh, API gateways, and distributed systems',
      icon: <Cube className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cube className="w-5 h-5" />
                Microservices Architecture
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Microservices architecture enables agents to be deployed as part of larger distributed systems,
                providing scalability, resilience, and independent deployability.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🌐 Service Mesh</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Traffic management</li>
                    <li>• Security policies</li>
                    <li>• Observability</li>
                    <li>• Circuit breaking</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🚪 API Gateway</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Request routing</li>
                    <li>• Authentication</li>
                    <li>• Rate limiting</li>
                    <li>• Request/response transformation</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔍 Service Discovery</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Dynamic service registration</li>
                    <li>• Health checking</li>
                    <li>• Load balancing</li>
                    <li>• Failover handling</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">📊 Distributed Tracing</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Request correlation</li>
                    <li>• Performance monitoring</li>
                    <li>• Error tracking</li>
                    <li>• Dependency mapping</li>
                  </ul>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-semibold mb-3">Best Practices:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span><strong>Stateless Design:</strong> Keep services stateless for better scalability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>Circuit Breakers:</strong> Implement circuit breakers for resilience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                    <span><strong>Graceful Degradation:</strong> Design for partial failures</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'legacy-integration',
      title: 'Legacy System Integration',
      description: 'Adapters, bridges, and middleware patterns',
      icon: <Bridge className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bridge className="w-5 h-5" />
                Legacy Integration Patterns
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Legacy system integration enables agents to work with existing enterprise systems,
                providing modernization pathways while preserving existing investments.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔌 Adapter Pattern</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Interface translation</li>
                    <li>• Protocol conversion</li>
                    <li>• Data format transformation</li>
                    <li>• Legacy API wrapping</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🌉 Bridge Pattern</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• System interconnection</li>
                    <li>• Message routing</li>
                    <li>• Protocol bridging</li>
                    <li>• Data synchronization</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">⚙️ Middleware</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Message transformation</li>
                    <li>• Routing logic</li>
                    <li>• Error handling</li>
                    <li>• Transaction management</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔄 ETL Processes</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Data extraction</li>
                    <li>• Transformation pipelines</li>
                    <li>• Loading strategies</li>
                    <li>• Batch processing</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm">{`# Legacy System Integration Adapter
import asyncio
import logging
from typing import Dict, Any, Optional
from abc import ABC, abstractmethod
from dataclasses import dataclass

@dataclass
class LegacyRequest:
    system_id: str
    operation: str
    data: Dict[str, Any]
    timeout: Optional[int] = 30

@dataclass
class LegacyResponse:
    success: bool
    data: Dict[str, Any]
    error_message: Optional[str] = None

class LegacySystemAdapter(ABC):
    """Abstract base class for legacy system adapters"""
    
    @abstractmethod
    async def connect(self) -> bool:
        pass
    
    @abstractmethod
    async def execute_request(self, request: LegacyRequest) -> LegacyResponse:
        pass
    
    @abstractmethod
    async def disconnect(self) -> None:
        pass

class MainframeAdapter(LegacySystemAdapter):
    """Adapter for mainframe systems"""
    
    def __init__(self, host: str, port: int, credentials: Dict[str, str]):
        self.host = host
        self.port = port
        self.credentials = credentials
        self.connection = None
        self.logger = logging.getLogger(__name__)
    
    async def connect(self) -> bool:
        try:
            # Simulate mainframe connection
            self.connection = await self.establish_connection()
            self.logger.info(f"Connected to mainframe at {self.host}:{self.port}")
            return True
        except Exception as e:
            self.logger.error(f"Failed to connect to mainframe: {e}")
            return False
    
    async def execute_request(self, request: LegacyRequest) -> LegacyResponse:
        """Execute request on mainframe system"""
        if not self.connection:
            return LegacyResponse(
                success=False,
                data={},
                error_message="Not connected to mainframe"
            )
        
        try:
            # Transform modern request to mainframe format
            mainframe_request = self.transform_request(request)
            
            # Execute on mainframe
            raw_response = await self.send_mainframe_request(mainframe_request)
            
            # Transform response back to modern format
            response_data = self.transform_response(raw_response)
            
            return LegacyResponse(
                success=True,
                data=response_data
            )
            
        except Exception as e:
            self.logger.error(f"Mainframe request failed: {e}")
            return LegacyResponse(
                success=False,
                data={},
                error_message=str(e)
            )
    
    def transform_request(self, request: LegacyRequest) -> Dict[str, Any]:
        """Transform modern request to mainframe format"""
        return {
            'TRANSACTION_CODE': request.operation,
            'INPUT_DATA': self.format_mainframe_data(request.data),
            'USER_ID': self.credentials.get('user_id'),
            'TIMESTAMP': self.get_mainframe_timestamp()
        }
    
    def transform_response(self, raw_response: Dict[str, Any]) -> Dict[str, Any]:
        """Transform mainframe response to modern format"""
        return {
            'result': raw_response.get('OUTPUT_DATA', {}),
            'status': raw_response.get('RETURN_CODE'),
            'message': raw_response.get('MESSAGE_TEXT')
        }
    
    async def disconnect(self) -> None:
        if self.connection:
            await self.connection.close()
            self.connection = None
            self.logger.info("Disconnected from mainframe")

class LegacyIntegrationAgent:
    """Agent for integrating with legacy systems"""
    
    def __init__(self):
        self.adapters: Dict[str, LegacySystemAdapter] = {}
        self.logger = logging.getLogger(__name__)
    
    def register_adapter(self, system_id: str, adapter: LegacySystemAdapter):
        """Register a legacy system adapter"""
        self.adapters[system_id] = adapter
    
    async def execute_legacy_operation(self, system_id: str, operation: str, 
                                     data: Dict[str, Any]) -> LegacyResponse:
        """Execute operation on legacy system"""
        if system_id not in self.adapters:
            return LegacyResponse(
                success=False,
                data={},
                error_message=f"No adapter registered for system: {system_id}"
            )
        
        adapter = self.adapters[system_id]
        
        # Ensure connection
        if not await adapter.connect():
            return LegacyResponse(
                success=False,
                data={},
                error_message=f"Failed to connect to system: {system_id}"
            )
        
        try:
            request = LegacyRequest(
                system_id=system_id,
                operation=operation,
                data=data
            )
            
            response = await adapter.execute_request(request)
            return response
            
        finally:
            await adapter.disconnect()`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ]

  return (
    <ConceptLayout
      conceptId="agent-integration"
      title="Agent Integration Patterns"
      description="Comprehensive integration patterns for connecting agents with APIs, event systems, microservices, and legacy systems"
      tabs={tabs}
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}
