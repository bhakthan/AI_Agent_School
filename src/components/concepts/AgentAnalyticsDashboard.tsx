import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendUp, TrendDown, Activity, Users } from "@phosphor-icons/react";

// Sample data for different chart types
const responseTimeData = [
  { time: '00:00', responseTime: 120 },
  { time: '04:00', responseTime: 98 },
  { time: '08:00', responseTime: 245 },
  { time: '12:00', responseTime: 189 },
  { time: '16:00', responseTime: 156 },
  { time: '20:00', responseTime: 134 },
];

const agentActivityData = [
  { agent: 'Research Agent', requests: 45, success: 42, errors: 3 },
  { agent: 'Writing Agent', requests: 38, success: 35, errors: 3 },
  { agent: 'Analysis Agent', requests: 52, success: 48, errors: 4 },
  { agent: 'Data Agent', requests: 29, success: 27, errors: 2 },
];

const errorTypeData = [
  { name: 'Timeout', value: 35, color: '#ef4444' },
  { name: 'Network', value: 25, color: '#f97316' },
  { name: 'Parse Error', value: 20, color: '#eab308' },
  { name: 'Auth Error', value: 15, color: '#8b5cf6' },
  { name: 'Other', value: 5, color: '#6b7280' },
];

const chartConfig = {
  responseTime: {
    label: "Response Time (ms)",
    color: "#3b82f6",
  },
  requests: {
    label: "Total Requests",
    color: "#10b981",
  },
  success: {
    label: "Successful",
    color: "#059669",
  },
  errors: {
    label: "Errors",
    color: "#ef4444",
  },
};

export default function AgentAnalyticsDashboard() {
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [realTimeData, setRealTimeData] = useState(responseTimeData);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prevData => {
        const newData = [...prevData];
        const lastPoint = newData[newData.length - 1];
        const newResponseTime = Math.max(50, lastPoint.responseTime + (Math.random() - 0.5) * 50);
        
        newData.push({
          time: new Date().toLocaleTimeString(),
          responseTime: Math.round(newResponseTime)
        });
        
        // Keep only last 10 data points
        if (newData.length > 10) {
          newData.shift();
        }
        
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Agents</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">+12% from last hour</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold">156ms</p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendDown className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">-8% from last hour</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">98.2%</p>
              </div>
              <TrendUp className="h-8 w-8 text-green-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">+0.5% from last hour</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Requests</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">+23% from last hour</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs value={selectedMetric} onValueChange={setSelectedMetric}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="errors">Error Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Real-time Response Times</CardTitle>
                <CardDescription>Live monitoring of agent response times</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <LineChart data={realTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="responseTime" 
                      stroke="var(--color-responseTime)" 
                      strokeWidth={2}
                      dot={{ fill: "var(--color-responseTime)" }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Agent Activity</CardTitle>
                <CardDescription>Request distribution across agents</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <BarChart data={agentActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="agent" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="requests" fill="var(--color-requests)" />
                    <Bar dataKey="success" fill="var(--color-success)" />
                    <Bar dataKey="errors" fill="var(--color-errors)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics Over Time</CardTitle>
              <CardDescription>Historical performance data</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px]">
                <LineChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="responseTime" 
                    stroke="var(--color-responseTime)" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="errors" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Error Distribution</CardTitle>
                <CardDescription>Breakdown of error types</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <PieChart>
                    <Pie
                      data={errorTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {errorTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Error Summary</CardTitle>
                <CardDescription>Current error statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {errorTypeData.map((error, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: error.color }}
                        />
                        <span className="text-sm">{error.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{error.value}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {((error.value / errorTypeData.reduce((sum, e) => sum + e.value, 0)) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
