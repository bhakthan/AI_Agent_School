import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Package, 
  ChartLine, 
  ArrowsOut, 
  GitBranch, 
  Monitor, 
  Database,
  CloudArrowUp,
  Timer
} from "@phosphor-icons/react"

interface AgentDeploymentConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

export default function AgentDeploymentConcept({ onMarkComplete, onNavigateToNext }: AgentDeploymentConceptProps) {
  const tabs = [
    {
      id: 'containerization',
      title: 'Containerization',
      description: 'Docker and Kubernetes deployment strategies for agents',
      icon: <Package className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Agent Containerization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Containerization enables consistent, scalable deployment of AI agents across different environments.
                Docker and Kubernetes provide the foundation for modern agent deployment strategies.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🐳 Docker Benefits</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Environment consistency</li>
                    <li>• Dependency isolation</li>
                    <li>• Portable deployments</li>
                    <li>• Resource efficiency</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">☸️ Kubernetes Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Auto-scaling</li>
                    <li>• Load balancing</li>
                    <li>• Service discovery</li>
                    <li>• Rolling updates</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm">{`# Dockerfile for AI Agent
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Set environment variables
ENV PYTHONPATH=/app
ENV AGENT_ENV=production

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:8000/health || exit 1

# Run the agent
CMD ["python", "main.py"]`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kubernetes Deployment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm">{`# agent-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ai-agent
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ai-agent
  template:
    metadata:
      labels:
        app: ai-agent
    spec:
      containers:
      - name: agent
        image: myregistry/ai-agent:v1.0.0
        ports:
        - containerPort: 8000
        env:
        - name: OPENAI_API_KEY
          valueFrom:
            secretKeyRef:
              name: agent-secrets
              key: openai-key
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'monitoring',
      title: 'Monitoring & Observability',
      description: 'Comprehensive monitoring, logging, and debugging strategies',
      icon: <Monitor className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartLine className="w-5 h-5" />
                Observability Stack
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Comprehensive observability is crucial for production AI agents. 
                The three pillars of observability are metrics, logs, and traces.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">📊 Metrics</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Response time</li>
                    <li>• Throughput</li>
                    <li>• Error rates</li>
                    <li>• Resource usage</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">📝 Logs</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Structured logging</li>
                    <li>• Log aggregation</li>
                    <li>• Search & filtering</li>
                    <li>• Alerting</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔍 Traces</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Request tracing</li>
                    <li>• Performance profiling</li>
                    <li>• Dependency mapping</li>
                    <li>• Bottleneck analysis</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm">{`# Agent monitoring configuration
import logging
from prometheus_client import Counter, Histogram, start_http_server
from opentelemetry import trace
from opentelemetry.exporter.jaeger.thrift import JaegerExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

# Metrics
REQUEST_COUNT = Counter('agent_requests_total', 'Total agent requests')
REQUEST_LATENCY = Histogram('agent_request_duration_seconds', 'Request latency')

# Tracing setup
trace.set_tracer_provider(TracerProvider())
tracer = trace.get_tracer(__name__)

jaeger_exporter = JaegerExporter(
    agent_host_name="localhost",
    agent_port=14268,
)

span_processor = BatchSpanProcessor(jaeger_exporter)
trace.get_tracer_provider().add_span_processor(span_processor)

class AgentObservability:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        
    @REQUEST_LATENCY.time()
    def process_request(self, request):
        REQUEST_COUNT.inc()
        
        with tracer.start_as_current_span("agent_processing") as span:
            span.set_attribute("request.type", request.type)
            span.set_attribute("request.user_id", request.user_id)
            
            try:
                result = self.agent.process(request)
                span.set_attribute("response.success", True)
                return result
            except Exception as e:
                span.set_attribute("response.success", False)
                span.set_attribute("error.message", str(e))
                self.logger.error(f"Agent processing failed: {e}")
                raise`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'scaling',
      title: 'Scaling Strategies',
      description: 'Horizontal and vertical scaling approaches for AI agents',
      icon: <ArrowsOut className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowsOut className="w-5 h-5" />
                Agent Scaling Patterns
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Scaling AI agents requires careful consideration of stateful components, 
                resource requirements, and load distribution patterns.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">📈 Horizontal Scaling</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Multiple agent instances</li>
                    <li>• Load balancing</li>
                    <li>• Stateless design</li>
                    <li>• Auto-scaling policies</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">⬆️ Vertical Scaling</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Increased CPU/Memory</li>
                    <li>• GPU acceleration</li>
                    <li>• Model optimization</li>
                    <li>• Resource limits</li>
                  </ul>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-semibold mb-3">Scaling Considerations:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span><strong>State Management:</strong> Externalize state to Redis/Database</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>Session Affinity:</strong> Route users to same instance when needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                    <span><strong>Circuit Breakers:</strong> Prevent cascade failures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span>
                    <span><strong>Rate Limiting:</strong> Protect against overload</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'devops',
      title: 'DevOps for Agents',
      description: 'CI/CD pipelines and deployment automation',
      icon: <GitBranch className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                Agent CI/CD Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                DevOps practices for AI agents include automated testing, model validation, 
                and deployment strategies that ensure reliability and performance.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔄 CI Pipeline</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Code quality checks</li>
                    <li>• Unit testing</li>
                    <li>• Integration testing</li>
                    <li>• Model validation</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🚀 CD Pipeline</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Automated deployment</li>
                    <li>• Blue-green deployment</li>
                    <li>• Canary releases</li>
                    <li>• Rollback strategies</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm">{`# GitHub Actions workflow for AI Agent
name: Agent CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.11'
    
    - name: Install dependencies
      run: |
        pip install -r requirements.txt
        pip install -r requirements-dev.txt
    
    - name: Run tests
      run: |
        pytest tests/ --cov=agent --cov-report=xml
    
    - name: Model validation
      run: |
        python scripts/validate_model.py
    
    - name: Build Docker image
      run: |
        docker build -t ai-agent:latest .
    
    - name: Push to registry
      if: github.ref == 'refs/heads/main'
      run: |
        docker push ai-agent:latest
    
    - name: Deploy to staging
      if: github.ref == 'refs/heads/main'
      run: |
        kubectl set image deployment/ai-agent-staging agent=ai-agent:latest`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ]

  return (
    <ConceptLayout
      conceptId="agent-deployment"
      title="Agent Deployment & Operations"
      description="Comprehensive deployment, monitoring, and scaling strategies for production AI agents"
      tabs={tabs}
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}
