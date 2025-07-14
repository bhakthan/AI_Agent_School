import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Users, Database, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimationStep {
  id: string;
  title: string;
  description: string;
  duration: number;
  highlight: string[];
  message?: string;
  techStack?: string;
  securityNote?: string;
}

const A2AMultiAgentSystem: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showArchitecture, setShowArchitecture] = useState(false);

  const animationSteps: AnimationStep[] = [
    {
      id: 'user-query',
      title: 'Customer Query',
      description: 'Customer asks a complex question requiring both product research and order status',
      message: '"What are the eco-friendly features of the Aqua-Pure X1 water filter, and can you check my latest order status?"',
      duration: 3000,
      highlight: ['user-app', 'customer-service']
    },
    {
      id: 'a2a-task-creation',
      title: 'A2A Task Creation',
      description: 'Web app creates task with Customer Service Agent using A2A protocol',
      techStack: 'A2A SDK - Task lifecycle management',
      duration: 2500,
      highlight: ['a2a-client', 'customer-service', 'a2a-server']
    },
    {
      id: 'genai-pipeline-start',
      title: 'GenAI Pipeline Initialization',
      description: 'Customer Service Agent starts GenAI-processors pipeline for query analysis',
      techStack: 'GenAI-processors - Modular task breakdown',
      duration: 3000,
      highlight: ['genai-pipeline', 'customer-service']
    },
    {
      id: 'task-delegation',
      title: 'Task Delegation',
      description: 'Agent delegates product research to Google Gemini Agent and order lookup to OMS Tool Agent',
      techStack: 'A2A Protocol - Inter-agent communication',
      duration: 3500,
      highlight: ['customer-service', 'product-research', 'oms-tool', 'delegation-lines']
    },
    {
      id: 'product-research',
      title: 'Product Research',
      description: 'Google Gemini Agent researches eco-friendly features using external knowledge',
      techStack: 'Google Gemini - Advanced research capabilities',
      duration: 4000,
      highlight: ['product-research', 'research-pipeline']
    },
    {
      id: 'mcp-auth',
      title: 'MCP Authentication',
      description: 'Customer Service Agent authenticates with Azure MCP Server for secure tool access',
      techStack: 'MCP Protocol - Secure tool authentication',
      securityNote: 'OAuth 2.0 PKCE flow with encrypted session keys',
      duration: 2500,
      highlight: ['mcp-client', 'mcp-server', 'azure-apim']
    },
    {
      id: 'secure-tool-call',
      title: 'Secure Tool Execution',
      description: 'MCP Server executes order lookup via Azure Functions with secure backend access',
      techStack: 'Azure API Management + Functions',
      securityNote: 'Backend endpoints never exposed publicly',
      duration: 3000,
      highlight: ['mcp-server', 'azure-functions', 'order-db']
    },
    {
      id: 'response-synthesis',
      title: 'Response Synthesis',
      description: 'Customer Service Agent combines research results and order data into comprehensive response',
      techStack: 'GenAI-processors - Response generation pipeline',
      duration: 3500,
      highlight: ['genai-pipeline', 'customer-service', 'response-synthesis']
    },
    {
      id: 'final-response',
      title: 'A2A Response Delivery',
      description: 'Complete response delivered to customer via A2A protocol',
      message: '"The Aqua-Pure X1 features 99.9% plastic-free construction and energy-efficient filtration. Your order #12345 shipped yesterday - tracking: 1Z999AA10123456784"',
      duration: 4000,
      highlight: ['customer-service', 'a2a-client', 'user-app', 'final-response']
    }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < animationSteps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, animationSteps[currentStep].duration);
    } else if (currentStep >= animationSteps.length - 1) {
      setIsPlaying(false);
      setShowArchitecture(true);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, animationSteps]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setShowArchitecture(false);
  };

  const currentStepData = animationSteps[currentStep];

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          <span>Multi-Agent System: A2A, GenAI-processors & MCP</span>
          <Badge variant="secondary">Interactive Demo</Badge>
        </CardTitle>
        <p className="text-muted-foreground">
          Watch how Agent-to-Agent communication, GenAI-processors, and Model Context Protocol work together in a real e-commerce scenario
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Control Buttons */}
          <div className="flex gap-2 justify-center">
            <Button onClick={handlePlay} variant="outline" size="sm">
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button onClick={handleReset} variant="outline" size="sm">
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / animationSteps.length) * 100}%` }}
            />
          </div>

          {/* Main Animation Area */}
          <div className="relative">
            <svg
              viewBox="0 0 1400 950"
              className="w-full h-auto border rounded-lg bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-900"
            >
              {/* Define styles for the multi-agent system */}
              <defs>
                <style>
                  {`
                    /* Main containers and boxes */
                    .box { stroke-width: 1.5; stroke-opacity: 0.8; rx: 8; ry: 8; }
                    .azure-box { fill: #f0f6ff; stroke: #0078d4; }
                    .google-box { fill: #f1f8e9; stroke: #34a853; }
                    .user-box { fill: #f3e5f5; stroke: #8e24aa; }
                    .mcp-box { fill: #fff3e0; stroke: #ff9800; }

                    /* Cloud shapes */
                    .cloud { fill-opacity: 0.1; stroke-width: 1.5; stroke-dasharray: 4 2; }
                    .azure-cloud { fill: #0078d4; stroke: #0078d4; }
                    .google-cloud { fill: #34a853; stroke: #34a853; }

                    /* Text styles */
                    .title { font-size: 20px; font-weight: 600; fill: rgb(30 41 59); }
                    .subtitle { font-size: 16px; font-weight: 600; fill: rgb(30 41 59); }
                    .label { font-size: 13px; fill: #333; }
                    .icon-label { font-size: 12px; font-weight: 500; fill: #333; }
                    .flow-step-text { font-size: 14px; font-weight: 500; fill: #1a1a1a; }
                    .protocol-label { font-family: 'Courier New', monospace; font-size: 12px; font-weight: bold; }
                    
                    /* Paths and arrows */
                    .flow-path { fill: none; stroke: #555; stroke-width: 2; stroke-linecap: round; }
                    .a2a-arrow { stroke: #d73d33; }
                    .mcp-arrow { stroke: #0078d4; }
                    .internal-arrow { stroke: #34a853; stroke-dasharray: 4 2; }

                    /* Animation ping */
                    .ping { stroke-width: 2; r: 6; }
                    .a2a-ping { fill: #d73d33; stroke: #fff; }
                    .mcp-ping { fill: #0078d4; stroke: #fff; }
                    .genai-ping { fill: #ffca28; stroke: #fff; }

                    /* Dark mode overrides */
                    @media (prefers-color-scheme: dark) {
                      .title { fill: rgb(248 250 252); }
                      .subtitle { fill: rgb(248 250 252); }
                      .label { fill: rgb(226 232 240); }
                      .icon-label { fill: rgb(226 232 240); }
                      .flow-step-text { fill: rgb(226 232 240); }
                      .azure-box { fill: #1e3a8a; stroke: #60a5fa; }
                      .google-box { fill: #166534; stroke: #4ade80; }
                      .user-box { fill: #581c87; stroke: #c084fc; }
                      .mcp-box { fill: #92400e; stroke: #fbbf24; }
                    }
                  `}
                </style>
                
                {/* Arrow markers */}
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#555" />
                </marker>
                <marker id="arrowhead-a2a" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#d73d33" />
                </marker>
                <marker id="arrowhead-mcp" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#0078d4" />
                </marker>
                <marker id="arrowhead-internal" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#34a853" />
                </marker>

                {/* Icons */}
                <symbol id="icon-azure" viewBox="0 0 24 24">
                  <path fill="#0078d4" d="M12.44 2.19l-7.5 1.41c-.93.18-1.5 1-1.32 1.93l1.88 9.97c.18.93 1 1.5 1.93 1.32l7.5-1.41c.93-.18 1.5-1 1.32-1.93l-1.88-9.97c-.18-.93-1-1.5-1.93-1.32z"/>
                </symbol>
                <symbol id="icon-google" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12.5C5,8.75 8.36,5.73 12.19,5.73C15.22,5.73 17.02,6.91 17.02,6.91L19.07,4.88C19.07,4.88 16.72,3 12.19,3C6.42,3 2,7.4 2,12.5C2,17.6 6.42,22 12.19,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.9 21.35,11.1 21.35,11.1V11.1Z" />
                </symbol>
                <symbol id="icon-a2a" viewBox="0 0 24 24">
                  <path fill="#d73d33" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M8,7.5L13,12.5L11,14.5L6,9.5M16,16.5L11,11.5L13,9.5L18,14.5" />
                </symbol>
                <symbol id="icon-genai-proc" viewBox="0 0 24 24">
                  <path fill="#ffca28" d="M12,2L2,7V17L12,22L22,17V7L12,2M11,15.5V11H8.5L12.5,7V11H15L11,15.5Z" />
                </symbol>
                <symbol id="icon-mcp" viewBox="0 0 24 24">
                   <path fill="#0078d4" d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7A3,3 0 0,1 15,10A3,3 0 0,1 12,13A3,3 0 0,1 9,10A3,3 0 0,1 12,7M12,14C14.67,14 17,15.33 17,17V18H7V17C7,15.33 9.33,14 12,14Z" />
                </symbol>
                <symbol id="icon-db" viewBox="0 0 24 24">
                    <path fill="#777" d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z" />
                </symbol>
              </defs>

              {/* Main Title */}
              <text x="700" y="35" textAnchor="middle" className="title">
                E-commerce Multi-Agent System: A2A, GenAI-processors, and MCP in Action
              </text>

              {/* User / Web App Lane */}
              <g id="user-lane">
                <rect x="20" y="70" width="280" height="840" className="box user-box" fillOpacity="0.2"/>
                <text x="160" y="100" textAnchor="middle" className="subtitle">User / Web App</text>
                <text x="160" y="180" textAnchor="middle" className="label">A2A Client</text>
                <rect x="70" y="200" width="180" height="80" fill="white" className="box user-box"/>
                <text x="160" y="245" textAnchor="middle" className="label" fontWeight="bold">Web Frontend</text>
                
                {/* Query text */}
                <text x="160" y="320" textAnchor="middle" className="flow-step-text" opacity={currentStepData.highlight.includes('user-app') ? 1 : 0.3}>
                  1. User asks complex query
                </text>
                <text x="160" y="800" textAnchor="middle" className="flow-step-text" opacity={currentStepData.highlight.includes('final-response') ? 1 : 0.3}>
                  12. Agent sends final message
                </text>
                <text x="160" y="820" textAnchor="middle" className="flow-step-text" opacity={currentStepData.highlight.includes('final-response') ? 1 : 0.3}>
                  and completes task
                </text>
              </g>

              {/* Azure AI Agent Lane */}
              <g id="azure-agent-lane">
                <path className="cloud azure-cloud" d="M 340 70 Q 320 70 320 90 L 320 870 Q 320 890 340 890 L 600 890 Q 620 890 620 870 L 620 90 Q 620 70 600 70 Z" />
                <text x="480" y="100" textAnchor="middle" className="subtitle">Azure AI Agent</text>
                <rect x="340" y="120" width="280" height="400" className="box azure-box"/>
                <text x="480" y="145" textAnchor="middle" className="label" fontWeight="bold">Customer Service Agent</text>
                <use href="#icon-azure" x="350" y="127" width="24" height="24" />
                
                {/* A2A SDK Server */}
                <rect x="370" y="170" width="220" height="70" fill="white" className="box azure-box" />
                <use href="#icon-a2a" x="380" y="180" width="24" height="24" />
                <text x="410" y="200" className="icon-label">A2A SDK Server</text>
                <text x="380" y="225" className="label" fontSize="12">Handles task lifecycle</text>

                {/* GenAI-processors Pipeline */}
                <rect x="370" y="260" width="220" height="110" fill="white" className="box azure-box" />
                <use href="#icon-genai-proc" x="380" y="270" width="24" height="24" />
                <text x="410" y="285" className="icon-label">GenAI-processors Pipeline</text>
                <text x="380" y="305" className="label" fontSize="12">1. Triage Request</text>
                <text x="380" y="325" className="label" fontSize="12">2. Delegate/Use Tools (A2A/MCP Client)</text>
                <text x="380" y="345" className="label" fontSize="12">3. Synthesize Final Response</text>

                {/* Agent Acts As Client */}
                <rect x="370" y="390" width="220" height="110" fill="white" className="box azure-box" />
                <text x="480" y="410" textAnchor="middle" className="label" fontWeight="bold">Agent Acts As Client</text>
                <use href="#icon-a2a" x="380" y="430" width="24" height="24" />
                <text x="410" y="445" className="icon-label">A2A Client (for delegation)</text>
                <use href="#icon-mcp" x="380" y="465" width="24" height="24" />
                <text x="410" y="480" className="icon-label">MCP Client (for tools)</text>
                
                {/* Flow step labels */}
                <text x="480" y="550" textAnchor="middle" className="flow-step-text" opacity={currentStepData.highlight.includes('a2a-server') ? 1 : 0.3}>
                  2. createTask
                </text>
                <text x="480" y="600" textAnchor="middle" className="flow-step-text" opacity={currentStepData.highlight.includes('genai-pipeline') ? 1 : 0.3}>
                  3. Triage request
                </text>
                <text x="480" y="750" textAnchor="middle" className="flow-step-text" opacity={currentStepData.highlight.includes('response-synthesis') ? 1 : 0.3}>
                  11. Synthesize final answer
                </text>
              </g>
              
              {/* Google Gemini Agent Lane */}
              <g id="google-agent-lane">
                <path className="cloud google-cloud" d="M 650 70 Q 630 70 630 90 L 630 870 Q 630 890 650 890 L 910 890 Q 930 890 930 870 L 930 90 Q 930 70 910 70 Z" />
                <text x="790" y="100" textAnchor="middle" className="subtitle">Google Gemini Agent</text>
                <rect x="650" y="120" width="280" height="200" className="box google-box"/>
                <text x="790" y="145" textAnchor="middle" className="label" fontWeight="bold">Product Research Agent</text>
                <use href="#icon-google" x="660" y="127" width="24" height="24" />

                {/* A2A SDK Server */}
                <rect x="680" y="170" width="220" height="60" fill="white" className="box google-box" />
                <use href="#icon-a2a" x="690" y="180" width="24" height="24" />
                <text x="720" y="200" className="icon-label">A2A SDK Server</text>

                {/* ResearchAgent Pipeline */}
                <rect x="680" y="240" width="220" height="60" fill="white" className="box google-box" />
                <use href="#icon-genai-proc" x="690" y="250" width="24" height="24" />
                <text x="720" y="270" className="icon-label">ResearchAgent Pipeline</text>
                
                {/* Flow step labels */}
                <text x="625" y="350" textAnchor="end" className="flow-step-text" opacity={currentStepData.highlight.includes('delegation-lines') ? 1 : 0.3}>
                  4. Delegate research sub-task
                </text>
                <text x="790" y="380" textAnchor="middle" className="flow-step-text" opacity={currentStepData.highlight.includes('product-research') ? 1 : 0.3}>
                  5. Gemini researches product
                </text>
                <text x="625" y="410" textAnchor="end" className="flow-step-text" opacity={currentStepData.highlight.includes('product-research') ? 1 : 0.3}>
                  6. Send research results
                </text>
              </g>

              {/* Azure MCP Tool Agent Lane */}
              <g id="mcp-lane">
                <path className="cloud azure-cloud" d="M 960 70 Q 940 70 940 90 L 940 870 Q 940 890 960 890 L 1220 890 Q 1240 890 1240 870 L 1240 90 Q 1240 70 1220 70 Z" />
                <text x="1100" y="100" textAnchor="middle" className="subtitle">Azure Tool Agent</text>
                <rect x="960" y="120" width="280" height="380" className="box azure-box"/>
                <text x="1100" y="145" textAnchor="middle" className="label" fontWeight="bold">OMS Tool Agent</text>
                <use href="#icon-azure" x="970" y="127" width="24" height="24" />

                {/* MCP Server */}
                <rect x="990" y="170" width="220" height="150" fill="white" className="box azure-box" />
                <use href="#icon-mcp" x="1000" y="180" width="24" height="24" />
                <text x="1030" y="195" className="icon-label">MCP Server</text>
                <text x="1000" y="215" className="label" fontSize="12" fontWeight="bold">Azure API Management</text>
                <text x="1000" y="235" className="label" fontSize="12">- OAuth/AuthZ Endpoint</text>
                <text x="1000" y="255" className="label" fontSize="12">- Session Key Encryption</text>
                <text x="1000" y="275" className="label" fontSize="12">- MCP SSE/Message Endpoints</text>
                <text x="1000" y="295" className="label" fontSize="12">- Secure Backend Proxy</text>
                
                {/* Azure Function Tool */}
                <rect x="990" y="340" width="220" height="60" fill="white" className="box azure-box" />
                <text x="1000" y="360" className="label" fontSize="12" fontWeight="bold">Azure Function Tool</text>
                <text x="1000" y="380" className="label" fontSize="12">(e.g., getOrderStatus)</text>
                
                {/* Order DB */}
                <use href="#icon-db" x="1084" y="420" width="32" height="32" />
                <text x="1100" y="470" textAnchor="middle" className="label">Order DB</text>
                
                {/* Flow step labels */}
                <text x="790" y="550" className="flow-step-text" opacity={currentStepData.highlight.includes('mcp-auth') ? 1 : 0.3}>
                  7. Auth for OMS tool
                </text>
                <text x="790" y="580" className="flow-step-text" opacity={currentStepData.highlight.includes('mcp-auth') ? 1 : 0.3}>
                  8. Get Session Key
                </text>
                <text x="1100" y="390" textAnchor="middle" className="flow-step-text" opacity={currentStepData.highlight.includes('azure-functions') ? 1 : 0.3}>
                  9. Call getOrderStatus
                </text>
                <text x="1100" y="500" textAnchor="middle" className="flow-step-text" opacity={currentStepData.highlight.includes('order-db') ? 1 : 0.3}>
                  Query DB
                </text>
                <text x="800" y="650" className="flow-step-text" opacity={currentStepData.highlight.includes('azure-functions') ? 1 : 0.3}>
                  10. Return order status
                </text>
              </g>
              
              {/* Flow Paths */}
              <g>
                {/* 1. User -> Azure Agent (A2A) */}
                <path className="flow-path a2a-arrow" markerEnd="url(#arrowhead-a2a)" d="M 255, 240 C 300, 240, 320, 195, 365, 195"
                  opacity={currentStepData.highlight.includes('user-app') && currentStepData.highlight.includes('customer-service') ? 1 : 0.3}/>
                <text x="325" y="225" className="protocol-label a2a-arrow" opacity={currentStepData.highlight.includes('user-app') && currentStepData.highlight.includes('customer-service') ? 1 : 0.3}>A2A</text>
                
                {/* 2. Azure Agent Triage (GenAI-processors) */}
                <path className="flow-path internal-arrow" markerEnd="url(#arrowhead-internal)" d="M 480, 240 V 275"
                  opacity={currentStepData.highlight.includes('genai-pipeline') ? 1 : 0.3}/>
                
                {/* 3. Delegation to Google Agent (A2A) */}
                <path className="flow-path a2a-arrow" markerEnd="url(#arrowhead-a2a)" d="M 600, 285 C 620, 285, 630, 195, 675, 195"
                  opacity={currentStepData.highlight.includes('delegation-lines') ? 1 : 0.3}/>
                <text x="630" y="240" className="protocol-label a2a-arrow" opacity={currentStepData.highlight.includes('delegation-lines') ? 1 : 0.3}>A2A</text>
                
                {/* 4. Google Agent processes and responds (A2A) */}
                <path className="flow-path a2a-arrow" markerEnd="url(#arrowhead-a2a)" d="M 675, 295 C 630, 295, 620, 335, 600, 335"
                  opacity={currentStepData.highlight.includes('product-research') ? 1 : 0.3}/>
                
                {/* 5. Tool use: Azure Agent -> MCP (MCP Auth) */}
                <path className="flow-path mcp-arrow" markerEnd="url(#arrowhead-mcp)" d="M 600, 470 C 700, 470, 900, 245, 985, 245"
                  opacity={currentStepData.highlight.includes('mcp-client') && currentStepData.highlight.includes('mcp-server') ? 1 : 0.3}/>
                <path className="flow-path mcp-arrow" markerEnd="url(#arrowhead-mcp)" d="M 985, 255 C 900, 255, 700, 480, 600, 480"
                  opacity={currentStepData.highlight.includes('mcp-client') && currentStepData.highlight.includes('mcp-server') ? 1 : 0.3}/>
                <text x="760" y="465" className="protocol-label mcp-arrow" opacity={currentStepData.highlight.includes('mcp-client') && currentStepData.highlight.includes('mcp-server') ? 1 : 0.3}>MCP Auth</text>

                {/* 6. MCP Tool Call */}
                <path className="flow-path mcp-arrow" markerEnd="url(#arrowhead-mcp)" d="M 1215, 250 H 1250 V 360 H 1215"
                  opacity={currentStepData.highlight.includes('azure-functions') ? 1 : 0.3}/>
                
                {/* 7. Internal DB query */}
                <path className="flow-path internal-arrow" markerEnd="url(#arrowhead-internal)" d="M 1100, 400 V 420"
                  opacity={currentStepData.highlight.includes('order-db') ? 1 : 0.3}/>

                {/* 8. MCP Tool Response */}
                <path className="flow-path mcp-arrow" markerEnd="url(#arrowhead-mcp)" d="M 985, 370 C 900, 370, 700, 490, 600, 490"
                  opacity={currentStepData.highlight.includes('azure-functions') ? 1 : 0.3}/>
                
                {/* 9. Azure Agent Synthesize */}
                <path className="flow-path internal-arrow" markerEnd="url(#arrowhead-internal)" d="M 480, 370 V 335"
                  opacity={currentStepData.highlight.includes('response-synthesis') ? 1 : 0.3}/>
                
                {/* 10. Final Response to User */}
                <path className="flow-path a2a-arrow" markerEnd="url(#arrowhead-a2a)" d="M 365, 205 C 320, 205, 300, 250, 255, 250"
                  opacity={currentStepData.highlight.includes('final-response') ? 1 : 0.3}/>
                <text x="325" y="270" className="protocol-label a2a-arrow" opacity={currentStepData.highlight.includes('final-response') ? 1 : 0.3}>A2A</text>
              </g>

              {/* Animation Ping */}
              {isPlaying && (
                <circle className="ping" opacity={0.8}>
                  <animate attributeName="r" values="4;8;4" dur="1s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1s" repeatCount="indefinite"/>
                  <animateMotion dur="1.5s" fill="freeze">
                    <mpath href={`#current-step-${currentStep}`}/>
                  </animateMotion>
                </circle>
              )}
              
              {/* Legend */}
              <g transform="translate(20, 880)">
                <text x="0" y="15" fontWeight="bold" fontSize="14" className="label">Legend:</text>
                <use href="#icon-a2a" x="80" y="0" width="20" height="20" />
                <text x="105" y="15" className="label">A2A Protocol</text>
                <use href="#icon-genai-proc" x="220" y="0" width="20" height="20" />
                <text x="245" y="15" className="label">GenAI-processors</text>
                <use href="#icon-mcp" x="380" y="0" width="20" height="20" />
                <text x="405" y="15" className="label">Model Context Protocol (MCP)</text>
                <rect x="580" y="5" width="20" height="10" className="user-box" strokeWidth="1"/>
                <text x="605" y="15" className="label">User/Client Components</text>
                <rect x="760" y="5" width="20" height="10" className="azure-box" strokeWidth="1"/>
                <text x="785" y="15" className="label">Azure Components</text>
                <rect x="920" y="5" width="20" height="10" className="google-box" strokeWidth="1"/>
                <text x="945" y="15" className="label">Google Components</text>
              </g>
            </svg>
          </div>

          {/* Step Information */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-muted/50 rounded-lg p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">Step {currentStep + 1}</Badge>
                <h3 className="font-semibold">{currentStepData.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{currentStepData.description}</p>
              
              {currentStepData.message && (
                <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-md mb-2">
                  <p className="text-sm"><strong>Message:</strong> {currentStepData.message}</p>
                </div>
              )}
              
              {currentStepData.techStack && (
                <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-md mb-2">
                  <p className="text-sm"><strong>Technology:</strong> {currentStepData.techStack}</p>
                </div>
              )}
              
              {currentStepData.securityNote && (
                <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-md">
                  <p className="text-sm flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <strong>Security:</strong> {currentStepData.securityNote}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Architecture Summary */}
          <AnimatePresence>
            {showArchitecture && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
              >
                <Card className="border-blue-200 dark:border-blue-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-blue-600 dark:text-blue-400 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      A2A Protocol
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span className="text-sm">Standardized agent communication</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span className="text-sm">Task lifecycle management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span className="text-sm">Asynchronous message passing</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 dark:border-purple-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-purple-600 dark:text-purple-400 flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      GenAI-processors
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      <span className="text-sm">Modular processing pipelines</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      <span className="text-sm">Async task decomposition</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      <span className="text-sm">Chainable + parallel execution</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 dark:border-red-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      MCP Protocol
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      <span className="text-sm">Secure tool authentication</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      <span className="text-sm">OAuth 2.0 PKCE flow</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      <span className="text-sm">Encrypted session management</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Detailed Architecture Explanation */}
          <div className="mt-8 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Understanding the Synergy of A2A, MCP, and GenAI-processors</CardTitle>
                <p className="text-muted-foreground">
                  These three technologies work together to create sophisticated, multi-agent systems that can handle complex business scenarios.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Technology Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Database className="w-5 h-5 text-purple-600" />
                      GenAI-processors: The Agent's "Brain"
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      A Python library for building the internal logic of an agent. It provides a modular framework where complex tasks are broken down into smaller, reusable, asynchronous components called Processors.
                    </p>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-md">
                      <p className="text-sm font-medium">Example Pipeline:</p>
                      <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        TopicGenerator → TopicResearcher → Synthesizer
                      </code>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      A2A Protocol: The Agent's "Nervous System"
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      The communication and task management layer that allows agents to interact with each other and external systems in a standardized way. It defines protocols centered around task lifecycles.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                      <p className="text-sm font-medium">Task States:</p>
                      <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        submitted → working → completed
                      </code>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Shield className="w-5 h-5 text-red-600" />
                      MCP: The Agent's "Hands" for Tools
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      A specialized protocol for AI models to securely discover and use external tools. It standardizes how agents authenticate with and call tools from secure providers.
                    </p>
                    <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                      <p className="text-sm font-medium">Security Features:</p>
                      <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        OAuth 2.0 + PKCE + Session Encryption
                      </code>
                    </div>
                  </div>
                </div>

                {/* Business Scenario Breakdown */}
                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-4">Business Scenario: Multi-Faceted Customer Inquiry</h3>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg">
                    <p className="text-sm italic mb-3">
                      "What are the eco-friendly features of the 'Aqua-Pure X1' water filter, and can you check the status of my latest order for it?"
                    </p>
                    <p className="text-sm text-muted-foreground">
                      This complex query requires coordination between multiple specialized agents, each with different capabilities and access permissions.
                    </p>
                  </div>
                </div>

                {/* Agent Roles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <Card className="border-blue-200 dark:border-blue-800">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-blue-600 dark:text-blue-400 text-base">
                        Customer Service Agent
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">Azure AI - Primary orchestrator</p>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span className="text-sm">Handles customer interaction</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span className="text-sm">Orchestrates task delegation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span className="text-sm">Synthesizes final response</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 dark:border-green-800">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-green-600 dark:text-green-400 text-base">
                        Product Research Agent
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">Google Gemini - Knowledge specialist</p>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="text-sm">Deep product knowledge research</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="text-sm">Eco-friendly feature analysis</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="text-sm">External knowledge integration</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200 dark:border-orange-800">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-orange-600 dark:text-orange-400 text-base">
                        OMS Tool Agent
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">Azure MCP - Secure data access</p>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                        <span className="text-sm">Secure order system access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                        <span className="text-sm">Non-conversational tool provider</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                        <span className="text-sm">Azure API Management gateway</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Integration Summary */}
                <div className="mt-8 p-4 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800 dark:to-gray-800 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3">Integration Summary</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>GenAI-processors</strong> define what your agents do through modular, chainable pipelines
                    </p>
                    <p>
                      <strong>A2A SDK</strong> exposes your agent's skills as services and enables inter-agent communication
                    </p>
                    <p>
                      <strong>MCP</strong> provides secure access to external tools and data sources when your agents need them
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default A2AMultiAgentSystem;
