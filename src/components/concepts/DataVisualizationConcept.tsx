import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartBar, Database, TrendUp, Sparkle } from "@phosphor-icons/react"
import EnhancedDataFlowVisualizer from "../visualization/EnhancedDataFlowVisualizer"
import DataTransformVisualizer from "../visualization/DataTransformVisualizer"
import TransformSequenceDemo from "../visualization/TransformSequenceDemo"
import AgentAnalyticsDashboard from "./AgentAnalyticsDashboard"

interface DataVisualizationConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

export default function DataVisualizationConcept({ onMarkComplete, onNavigateToNext }: DataVisualizationConceptProps) {
  const tabs = [
    {
      id: 'fundamentals',
      title: 'Data Visualization Basics',
      description: 'Understanding data visualization for AI agents',
      icon: <ChartBar className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          {/* Visualization Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartBar className="w-5 h-5" />
                What is Data Visualization for AI Agents?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Data visualization for AI agents involves creating visual representations of 
                agent performance, behavior patterns, decision processes, and system metrics. 
                It helps in understanding, debugging, and optimizing agent systems.
              </p>
              
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-semibold mb-3">Key Visualization Areas:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span><strong>Performance Metrics:</strong> Response times, success rates, resource usage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>Behavior Patterns:</strong> Agent decision trees, learning curves</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                    <span><strong>System Health:</strong> Error rates, bottlenecks, resource constraints</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span>
                    <span><strong>User Interactions:</strong> Request patterns, user satisfaction</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Chart Types */}
          <Card>
            <CardHeader>
              <CardTitle>Common Chart Types for Agent Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Time Series Charts</h4>
                  <p className="text-sm text-muted-foreground">
                    Track performance metrics and behavior over time
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Heatmaps</h4>
                  <p className="text-sm text-muted-foreground">
                    Show intensity of agent activity across different dimensions
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Scatter Plots</h4>
                  <p className="text-sm text-muted-foreground">
                    Analyze relationships between different agent metrics
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Distribution Charts</h4>
                  <p className="text-sm text-muted-foreground">
                    Understand the distribution of response times and other metrics
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Data Visualization */}
          <Card>
            <CardHeader>
              <CardTitle>Interactive Data Flow Visualization</CardTitle>
              <CardDescription>
                Visualize data flows between agents with advanced filtering and timeline features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EnhancedDataFlowVisualizer
                flows={[
                  {
                    id: 'flow-1',
                    edgeId: 'edge-1',
                    source: 'user',
                    target: 'agent',
                    type: 'query',
                    content: 'User query',
                    timestamp: Date.now(),
                    progress: 0
                  },
                  {
                    id: 'flow-2',
                    edgeId: 'edge-2',
                    source: 'agent',
                    target: 'database',
                    type: 'query',
                    content: 'Data retrieval',
                    timestamp: Date.now() + 1000,
                    progress: 0
                  }
                ]}
                edges={[
                  {
                    id: 'edge-1',
                    source: 'user',
                    target: 'agent',
                    type: 'default'
                  },
                  {
                    id: 'edge-2',
                    source: 'agent',
                    target: 'database',
                    type: 'default'
                  }
                ]}
                nodes={[
                  {
                    id: 'user',
                    type: 'input',
                    data: { label: 'User', nodeType: 'input' },
                    position: { x: 100, y: 200 }
                  },
                  {
                    id: 'agent',
                    type: 'default',
                    data: { label: 'Agent', nodeType: 'llm' },
                    position: { x: 300, y: 200 }
                  },
                  {
                    id: 'database',
                    type: 'output',
                    data: { label: 'Database', nodeType: 'output' },
                    position: { x: 500, y: 200 }
                  }
                ]}
                visualizationMode="detailed"
                speed={1}
              />
            </CardContent>
          </Card>

          {/* Data Transform Visualization */}
          <Card>
            <CardHeader>
              <CardTitle>Data Transform Visualization</CardTitle>
              <CardDescription>
                See how data transforms through different processing stages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTransformVisualizer 
                flows={[
                  {
                    id: 'transform-1',
                    edgeId: 'edge-1',
                    source: 'input',
                    target: 'processor',
                    type: 'data',
                    content: 'Raw data',
                    timestamp: Date.now(),
                    progress: 0,
                    transformStage: 'raw',
                    transformationProgress: 0
                  }
                ]}
                edges={[
                  {
                    id: 'edge-1',
                    source: 'input',
                    target: 'processor',
                    type: 'default'
                  }
                ]}
              />
            </CardContent>
          </Card>

          {/* Sample Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Sample Agent Metrics Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    Response Time
                  </h4>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    245ms
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Average response time
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    Success Rate
                  </h4>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    98.7%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Successful requests
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                    Active Agents
                  </h4>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    24
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Currently active
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'architecture',
      title: 'Visualization Architecture',
      description: 'Technical architecture for data visualization systems',
      icon: <Database className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          {/* Architecture Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Data Visualization Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="border border-border rounded-md p-3">
                  <h5 className="font-medium text-primary mb-2">Data Collection</h5>
                  <p className="text-sm text-muted-foreground">
                    Gather metrics from agents and system components
                  </p>
                </div>
                <div className="border border-border rounded-md p-3">
                  <h5 className="font-medium text-primary mb-2">Data Storage</h5>
                  <p className="text-sm text-muted-foreground">
                    Store time-series data and aggregated metrics
                  </p>
                </div>
                <div className="border border-border rounded-md p-3">
                  <h5 className="font-medium text-primary mb-2">Processing</h5>
                  <p className="text-sm text-muted-foreground">
                    Transform and aggregate data for visualization
                  </p>
                </div>
                <div className="border border-border rounded-md p-3">
                  <h5 className="font-medium text-primary mb-2">Visualization</h5>
                  <p className="text-sm text-muted-foreground">
                    Render interactive charts and dashboards
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technology Stack */}
          <Card>
            <CardHeader>
              <CardTitle>Technology Stack for Agent Data Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    Data Collection & Storage
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">Prometheus</Badge>
                    <Badge variant="outline" className="text-xs">InfluxDB</Badge>
                    <Badge variant="outline" className="text-xs">Elasticsearch</Badge>
                    <Badge variant="outline" className="text-xs">MongoDB</Badge>
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    Visualization Libraries
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">Chart.js</Badge>
                    <Badge variant="outline" className="text-xs">D3.js</Badge>
                    <Badge variant="outline" className="text-xs">Plotly</Badge>
                    <Badge variant="outline" className="text-xs">Recharts</Badge>
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                    Dashboard Frameworks
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">Grafana</Badge>
                    <Badge variant="outline" className="text-xs">Tableau</Badge>
                    <Badge variant="outline" className="text-xs">Power BI</Badge>
                    <Badge variant="outline" className="text-xs">Custom React</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Flow */}
          <Card>
            <CardHeader>
              <CardTitle>Data Flow Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                      <span className="text-white font-semibold">1</span>
                    </div>
                    <div>Agent Metrics</div>
                  </div>
                  <div className="text-muted-foreground">→</div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
                      <span className="text-white font-semibold">2</span>
                    </div>
                    <div>Data Collection</div>
                  </div>
                  <div className="text-muted-foreground">→</div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-2">
                      <span className="text-white font-semibold">3</span>
                    </div>
                    <div>Processing</div>
                  </div>
                  <div className="text-muted-foreground">→</div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-2">
                      <span className="text-white font-semibold">4</span>
                    </div>
                    <div>Visualization</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'implementation',
      title: 'Building Dashboards',
      description: 'Implement data visualization dashboards',
      icon: <TrendUp className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          {/* Implementation Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Implementation Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">1</Badge>
                  <div>
                    <h4 className="font-semibold">Define Metrics</h4>
                    <p className="text-sm text-muted-foreground">
                      Identify key performance indicators and business metrics
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">2</Badge>
                  <div>
                    <h4 className="font-semibold">Set Up Data Collection</h4>
                    <p className="text-sm text-muted-foreground">
                      Implement logging and monitoring in your agent system
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">3</Badge>
                  <div>
                    <h4 className="font-semibold">Create Data API</h4>
                    <p className="text-sm text-muted-foreground">
                      Build API endpoints to serve aggregated data
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">4</Badge>
                  <div>
                    <h4 className="font-semibold">Build Dashboard UI</h4>
                    <p className="text-sm text-muted-foreground">
                      Create interactive dashboard with charts and controls
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transform Sequence Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Transform Sequence Demo</CardTitle>
              <CardDescription>
                Interactive demonstration of data transformation pipelines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TransformSequenceDemo />
            </CardContent>
          </Card>

          {/* Live Analytics Dashboard */}
          <Card>
            <CardHeader>
              <CardTitle>Live Agent Analytics Dashboard</CardTitle>
              <CardDescription>Real-time monitoring and analytics for AI agent systems</CardDescription>
            </CardHeader>
            <CardContent>
              <AgentAnalyticsDashboard />
            </CardContent>
          </Card>

          {/* Code Example */}
          <Card>
            <CardHeader>
              <CardTitle>React Dashboard Example</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-background p-3 rounded border overflow-x-auto">
{`import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AgentMetricsDashboard = () => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    // Fetch metrics from API
    fetch('/api/agent-metrics')
      .then(res => res.json())
      .then(data => setMetrics(data));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Response Time Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Response Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={metrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="responseTime" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Success Rate Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Success Rate</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={metrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="successRate" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};`}
              </pre>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'advanced',
      title: 'Advanced Analytics',
      description: 'Advanced data analysis and visualization techniques',
      icon: <Sparkle className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          {/* Advanced Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics Techniques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Predictive Analytics</h4>
                  <p className="text-sm text-muted-foreground">
                    Use machine learning to predict agent performance and failures
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Anomaly Detection</h4>
                  <p className="text-sm text-muted-foreground">
                    Identify unusual patterns and potential issues automatically
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Correlation Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Find relationships between different agent metrics
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Performance Forecasting</h4>
                  <p className="text-sm text-muted-foreground">
                    Predict future resource needs and capacity requirements
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-time Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Real-time Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                    Streaming Data Challenges
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• High-frequency data updates</li>
                    <li>• Memory and performance constraints</li>
                    <li>• Data consistency and ordering</li>
                    <li>• Real-time aggregation complexity</li>
                  </ul>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    Solutions & Best Practices
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Use time-windowed aggregations</li>
                    <li>• Implement efficient data structures</li>
                    <li>• Use WebSockets for real-time updates</li>
                    <li>• Implement data sampling strategies</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Machine Learning Integration */}
          <Card>
            <CardHeader>
              <CardTitle>ML-Powered Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    Automated Insights
                  </h4>
                  <p className="text-sm mb-2">
                    Use ML algorithms to automatically identify patterns and generate insights
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">Pattern Recognition</Badge>
                    <Badge variant="outline" className="text-xs">Trend Analysis</Badge>
                    <Badge variant="outline" className="text-xs">Outlier Detection</Badge>
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                    Smart Alerting
                  </h4>
                  <p className="text-sm mb-2">
                    ML-driven alerting system that learns from historical data
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">Adaptive Thresholds</Badge>
                    <Badge variant="outline" className="text-xs">Context-Aware</Badge>
                    <Badge variant="outline" className="text-xs">Noise Reduction</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ]

  return (
    <ConceptLayout
      conceptId="data-visualization"
      title="Data Visualization"
      description="Learn how to create powerful data visualizations for AI agent systems"
      tabs={tabs}
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}
