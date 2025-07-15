import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PatternData } from '@/lib/data/patterns/index';
import { 
  Play, 
  Stop, 
  ArrowsClockwise, 
  CheckCircle,
  Lightning,
  Circle,
  CircleNotch,
  Graph,
  Code
} from "@phosphor-icons/react";
import { useTheme } from '@/components/theme/ThemeProvider';

interface FlowArchitectureVisualizerProps {
  patternData: PatternData;
  className?: string;
}

interface FlowStep {
  id: string;
  nodeId: string;
  label: string;
  status: 'pending' | 'active' | 'complete' | 'error';
  result?: string;
  timestamp?: number;
}

interface DataFlow {
  id: string;
  source: string;
  target: string;
  data: any;
  progress: number;
  timestamp: number;
}

const ARCHITECTURE_LAYERS = [
  { 
    id: 'presentation',
    name: 'Presentation Layer',
    description: 'User interface and visualization components',
    y: 50,
    color: '#3b82f6'
  },
  { 
    id: 'processing',
    name: 'Processing Layer',
    description: 'Data processing and transformation',
    y: 150,
    color: '#10b981'
  },
  { 
    id: 'orchestration',
    name: 'Orchestration Layer',
    description: 'Agent coordination and workflow management',
    y: 250,
    color: '#f59e0b'
  },
  { 
    id: 'data',
    name: 'Data Layer',
    description: 'Data storage and retrieval',
    y: 350,
    color: '#ef4444'
  }
];

const calculateArchitecturePositions = (nodes: any[]) => {
  const positions: { [key: string]: { x: number; y: number; layer: string } } = {};
  
  nodes.forEach((node, index) => {
    const layer = ARCHITECTURE_LAYERS[index % ARCHITECTURE_LAYERS.length];
    const xPosition = 100 + (index * 150) % 600;
    
    positions[node.id] = {
      x: xPosition,
      y: layer.y,
      layer: layer.id
    };
  });
  
  return positions;
};

export const FlowArchitectureVisualizer: React.FC<FlowArchitectureVisualizerProps> = ({ 
  patternData, 
  className 
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  // State
  const [isRunning, setIsRunning] = useState(false);
  const [steps, setSteps] = useState<Record<string, FlowStep>>({});
  const [currentStepId, setCurrentStepId] = useState<string | null>(null);
  const [activeFlows, setActiveFlows] = useState<DataFlow[]>([]);
  const [viewMode, setViewMode] = useState<'architecture' | 'flow' | 'hybrid'>('architecture');
  
  // Calculate positions
  const nodePositions = useMemo(() => {
    return calculateArchitecturePositions(patternData.nodes);
  }, [patternData.nodes]);
  
  // Theme colors
  const colors = useMemo(() => ({
    background: isDarkMode ? '#1f2937' : '#ffffff',
    layer: {
      background: isDarkMode ? '#374151' : '#f9fafb',
      border: isDarkMode ? '#6b7280' : '#e5e7eb',
      text: isDarkMode ? '#f9fafb' : '#374151'
    },
    node: {
      default: isDarkMode ? '#4b5563' : '#f3f4f6',
      active: isDarkMode ? '#3b82f6' : '#2563eb',
      complete: isDarkMode ? '#10b981' : '#059669',
      error: isDarkMode ? '#ef4444' : '#dc2626',
      border: isDarkMode ? '#6b7280' : '#d1d5db',
      text: isDarkMode ? '#f9fafb' : '#111827'
    },
    flow: {
      default: isDarkMode ? '#6b7280' : '#9ca3af',
      active: isDarkMode ? '#3b82f6' : '#2563eb',
      data: isDarkMode ? '#10b981' : '#059669'
    }
  }), [isDarkMode]);
  
  // Get node color based on status
  const getNodeColor = useCallback((nodeId: string) => {
    const step = steps[nodeId];
    if (!step) return colors.node.default;
    
    switch (step.status) {
      case 'active': return colors.node.active;
      case 'complete': return colors.node.complete;
      case 'error': return colors.node.error;
      default: return colors.node.default;
    }
  }, [steps, colors.node]);
  
  // Update node status
  const updateNodeStatus = useCallback((nodeId: string, status: 'pending' | 'active' | 'complete' | 'error', result?: string) => {
    setSteps(prevSteps => ({
      ...prevSteps,
      [nodeId]: {
        ...prevSteps[nodeId],
        status,
        result,
        timestamp: Date.now()
      }
    }));
    
    setCurrentStepId(nodeId);
  }, []);
  
  // Simulate architecture flow
  const simulateArchitectureFlow = useCallback(async () => {
    setIsRunning(true);
    setSteps({});
    setCurrentStepId(null);
    setActiveFlows([]);
    
    try {
      // Initialize steps
      const stepsMap = patternData.nodes.reduce<Record<string, FlowStep>>((acc, node) => {
        acc[node.id] = {
          id: node.id,
          nodeId: node.id,
          label: node.data.label,
          status: 'pending'
        };
        return acc;
      }, {});
      
      setSteps(stepsMap);
      
      // Simulate processing through layers
      for (let i = 0; i < patternData.nodes.length; i++) {
        const node = patternData.nodes[i];
        
        // Activate current node
        updateNodeStatus(node.id, 'active');
        
        // Create data flow animation
        const targetEdges = patternData.edges.filter(edge => edge.source === node.id);
        const newFlows = targetEdges.map(edge => ({
          id: `flow-${edge.id}-${Date.now()}`,
          source: edge.source,
          target: edge.target,
          data: { message: `Processing ${node.data.label}` },
          progress: 0,
          timestamp: Date.now()
        }));
        
        setActiveFlows(prev => [...prev, ...newFlows]);
        
        // Wait for processing
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Complete current node
        updateNodeStatus(node.id, 'complete', `${node.data.label} processing complete`);
        
        // Update flow progress
        setActiveFlows(prev => prev.map(flow => 
          newFlows.find(nf => nf.id === flow.id) 
            ? { ...flow, progress: 1 } 
            : flow
        ));
        
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
    } catch (error) {
      console.error('Architecture simulation failed:', error);
    } finally {
      setIsRunning(false);
    }
  }, [patternData, updateNodeStatus]);
  
  // Reset simulation
  const resetSimulation = useCallback(() => {
    setIsRunning(false);
    setSteps({});
    setCurrentStepId(null);
    setActiveFlows([]);
  }, []);
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Graph className="w-5 h-5" />
            Architecture Flow Visualization
          </span>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={viewMode === 'architecture' ? 'default' : 'outline'}
              onClick={() => setViewMode('architecture')}
              disabled={isRunning}
            >
              Architecture
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'flow' ? 'default' : 'outline'}
              onClick={() => setViewMode('flow')}
              disabled={isRunning}
            >
              Flow
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'hybrid' ? 'default' : 'outline'}
              onClick={() => setViewMode('hybrid')}
              disabled={isRunning}
            >
              Hybrid
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          {patternData.description} - Architecture-focused visualization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="visualization" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="visualization">Visualization</TabsTrigger>
            <TabsTrigger value="layers">Architecture Layers</TabsTrigger>
            <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visualization" className="space-y-4">
            {/* Architecture Visualization */}
            <div className="border rounded-lg p-4 bg-background">
              <svg 
                width="800" 
                height="450" 
                viewBox="0 0 800 450"
                className="w-full h-auto"
                style={{ backgroundColor: colors.background }}
              >
                {/* Define markers */}
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon
                      points="0 0, 10 3.5, 0 7"
                      fill={colors.flow.default}
                    />
                  </marker>
                  <marker
                    id="arrowhead-active"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon
                      points="0 0, 10 3.5, 0 7"
                      fill={colors.flow.active}
                    />
                  </marker>
                </defs>
                
                {/* Architecture Layers Background */}
                {viewMode !== 'flow' && ARCHITECTURE_LAYERS.map(layer => (
                  <g key={layer.id}>
                    <rect
                      x="20"
                      y={layer.y - 25}
                      width="760"
                      height="80"
                      fill={colors.layer.background}
                      stroke={colors.layer.border}
                      strokeWidth="1"
                      rx="4"
                      opacity="0.7"
                    />
                    <text
                      x="30"
                      y={layer.y - 5}
                      className="text-sm font-semibold fill-current"
                      fill={colors.layer.text}
                    >
                      {layer.name}
                    </text>
                    <text
                      x="30"
                      y={layer.y + 15}
                      className="text-xs fill-current"
                      fill={colors.layer.text}
                      opacity="0.8"
                    >
                      {layer.description}
                    </text>
                  </g>
                ))}
                
                {/* Render edges */}
                {patternData.edges.map((edge) => {
                  const sourcePos = nodePositions[edge.source];
                  const targetPos = nodePositions[edge.target];
                  
                  if (!sourcePos || !targetPos) return null;
                  
                  const startX = sourcePos.x + 60;
                  const startY = sourcePos.y + 30;
                  const endX = targetPos.x + 60;
                  const endY = targetPos.y + 30;
                  
                  const isActive = activeFlows.some(flow => 
                    flow.source === edge.source && flow.target === edge.target
                  );
                  
                  return (
                    <g key={edge.id}>
                      <line
                        x1={startX}
                        y1={startY}
                        x2={endX}
                        y2={endY}
                        stroke={isActive ? colors.flow.active : colors.flow.default}
                        strokeWidth={isActive ? "3" : "2"}
                        markerEnd={isActive ? "url(#arrowhead-active)" : "url(#arrowhead)"}
                        className={isActive ? "animate-pulse" : ""}
                      />
                      {edge.label && (
                        <text
                          x={(startX + endX) / 2}
                          y={(startY + endY) / 2 - 5}
                          textAnchor="middle"
                          className="text-xs fill-current"
                          fill={colors.layer.text}
                        >
                          {edge.label}
                        </text>
                      )}
                    </g>
                  );
                })}
                
                {/* Render nodes */}
                {patternData.nodes.map((node) => {
                  const pos = nodePositions[node.id];
                  if (!pos) return null;
                  
                  const nodeColor = getNodeColor(node.id);
                  const isActive = currentStepId === node.id;
                  const step = steps[node.id];
                  
                  return (
                    <g key={node.id}>
                      <rect
                        x={pos.x}
                        y={pos.y}
                        width="120"
                        height="60"
                        rx="8"
                        fill={nodeColor}
                        stroke={colors.node.border}
                        strokeWidth="2"
                        className={isActive ? "animate-pulse" : ""}
                      />
                      <text
                        x={pos.x + 60}
                        y={pos.y + 25}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-sm font-medium fill-current"
                        fill={colors.node.text}
                      >
                        {node.data.label}
                      </text>
                      {step && (
                        <text
                          x={pos.x + 60}
                          y={pos.y + 45}
                          textAnchor="middle"
                          className="text-xs fill-current"
                          fill={colors.node.text}
                        >
                          {step.status}
                        </text>
                      )}
                      
                      {/* Status indicator */}
                      {step && (
                        <circle
                          cx={pos.x + 110}
                          cy={pos.y + 10}
                          r="5"
                          fill={
                            step.status === 'active' ? colors.node.active :
                            step.status === 'complete' ? colors.node.complete :
                            step.status === 'error' ? colors.node.error :
                            colors.node.default
                          }
                          className={step.status === 'active' ? "animate-pulse" : ""}
                        />
                      )}
                    </g>
                  );
                })}
                
                {/* Data flow animations */}
                {activeFlows.map((flow) => {
                  const sourcePos = nodePositions[flow.source];
                  const targetPos = nodePositions[flow.target];
                  
                  if (!sourcePos || !targetPos) return null;
                  
                  const startX = sourcePos.x + 60;
                  const startY = sourcePos.y + 30;
                  const endX = targetPos.x + 60;
                  const endY = targetPos.y + 30;
                  
                  const currentX = startX + (endX - startX) * flow.progress;
                  const currentY = startY + (endY - startY) * flow.progress;
                  
                  return (
                    <circle
                      key={flow.id}
                      cx={currentX}
                      cy={currentY}
                      r="4"
                      fill={colors.flow.data}
                      className="animate-pulse"
                    />
                  );
                })}
              </svg>
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {!isRunning ? (
                  <Button 
                    onClick={simulateArchitectureFlow} 
                    size="sm"
                    className="gap-1"
                  >
                    <Play size={16} weight="fill" /> 
                    Start Architecture Flow
                  </Button>
                ) : (
                  <Button 
                    onClick={resetSimulation}
                    size="sm"
                    variant="destructive"
                    className="gap-1"
                  >
                    <Stop size={16} weight="fill" />
                    Stop
                  </Button>
                )}
                
                <Button 
                  onClick={resetSimulation}
                  size="sm"
                  variant="outline"
                  className="gap-1"
                  disabled={isRunning}
                >
                  <ArrowsClockwise size={16} />
                  Reset
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  Nodes: {patternData.nodes.length}
                </Badge>
                <Badge variant="secondary">
                  Connections: {patternData.edges.length}
                </Badge>
                {isRunning && (
                  <Badge variant="default" className="animate-pulse">
                    <CircleNotch className="w-3 h-3 mr-1 animate-spin" />
                    Processing...
                  </Badge>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="layers" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ARCHITECTURE_LAYERS.map(layer => (
                <Card key={layer.id} className="border-l-4" style={{ borderLeftColor: layer.color }}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{layer.name}</CardTitle>
                    <CardDescription>{layer.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Components:</div>
                      <div className="flex flex-wrap gap-1">
                        {patternData.nodes
                          .filter(node => nodePositions[node.id]?.layer === layer.id)
                          .map(node => (
                            <Badge key={node.id} variant="outline" className="text-xs">
                              {node.data.label}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="metrics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Processing Speed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">1.2s</div>
                  <div className="text-sm text-muted-foreground">Average node processing time</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Throughput</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">45/min</div>
                  <div className="text-sm text-muted-foreground">Requests processed per minute</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">98.5%</div>
                  <div className="text-sm text-muted-foreground">Successful completions</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FlowArchitectureVisualizer;
