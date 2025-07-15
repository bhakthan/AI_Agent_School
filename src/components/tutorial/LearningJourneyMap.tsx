import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, PuzzlePiece, StackSimple, Books, Users, 
  CheckCircle, Circle, Star, TrendUp, Target, 
  Path, MapPin, Trophy, Sparkle, GraduationCap,
  ArrowsHorizontal, Shield, Stack, LinkSimple, 
  Graph, ChartBar, Lock, Package, Scales
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface LearningNode {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  prerequisites: string[];
  skills: string[];
  completionRate: number;
  isCompleted: boolean;
  isUnlocked: boolean;
  path: string;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  nodes: LearningNode[];
  totalProgress: number;
  recommendedOrder: string[];
}

interface LearningJourneyMapProps {
  currentPage?: string;
  isVisible: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

const learningPaths: LearningPath[] = [
  {
    id: 'comprehensive-path',
    title: 'Complete AI Agent Mastery',
    description: 'Comprehensive learning path covering all core concepts in 4 progressive tiers',
    recommendedOrder: [
      // Tier 1: Foundational Concepts
      'agent-architecture', 'agent-security', 'multi-agent-systems', 'agent-ethics', 'ai-agents',
      // Tier 2: Architecture Concepts  
      'a2a-communication', 'mcp', 'flow-visualization',
      // Tier 3: Implementation Concepts
      'acp', 'mcp-a2a-integration', 'data-visualization',
      // Tier 4: Advanced Concepts
      'agent-deployment', 'agent-learning', 'agent-integration',
      // Additional Learning
      'azure-services', 'references', 'community', 'patterns', 'quiz'
    ],
    totalProgress: 0,
    nodes: [
      // Tier 1: Foundational Concepts
      {
        id: 'agent-architecture',
        title: 'Agent Architecture & Lifecycle',
        description: 'Fundamental building blocks and lifecycle of AI agents',
        icon: <Brain size={20} />,
        difficulty: 'beginner',
        estimatedTime: '25-35 min',
        prerequisites: [],
        skills: ['Agent Lifecycle', 'Core Architecture', 'Design Patterns'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: true,
        path: '/concepts'
      },
      {
        id: 'agent-security',
        title: 'Agent Security & Trust',
        description: 'Security mechanisms and trust models for AI agents',
        icon: <Shield size={20} />,
        difficulty: 'beginner',
        estimatedTime: '30-40 min',
        prerequisites: ['agent-architecture'],
        skills: ['Security Models', 'Trust Mechanisms', 'Threat Mitigation'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'multi-agent-systems',
        title: 'Multi-Agent Systems',
        description: 'Coordination and collaboration in multi-agent environments',
        icon: <Users size={20} />,
        difficulty: 'beginner',
        estimatedTime: '35-45 min',
        prerequisites: ['agent-architecture'],
        skills: ['Multi-Agent Coordination', 'Collaboration Patterns', 'Emergent Behavior'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'agent-ethics',
        title: 'Agent Ethics & Governance',
        description: 'Ethical principles and governance for AI agents',
        icon: <Scales size={20} />,
        difficulty: 'beginner',
        estimatedTime: '35-45 min',
        prerequisites: ['agent-architecture'],
        skills: ['Ethics Principles', 'Bias Mitigation', 'Regulatory Compliance'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'ai-agents',
        title: 'AI Agents',
        description: 'Autonomous AI systems that perceive, decide, and act',
        icon: <Brain size={20} />,
        difficulty: 'beginner',
        estimatedTime: '20-30 min',
        prerequisites: [],
        skills: ['Agent Fundamentals', 'Autonomy', 'Decision Making'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: true,
        path: '/concepts'
      },
      
      // Tier 2: Architecture Concepts
      {
        id: 'a2a-communication',
        title: 'A2A Communication',
        description: 'Agent-to-Agent communication and coordination',
        icon: <ArrowsHorizontal size={20} />,
        difficulty: 'intermediate',
        estimatedTime: '25-35 min',
        prerequisites: ['multi-agent-systems'],
        skills: ['Communication Protocols', 'Message Passing', 'Coordination'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'mcp',
        title: 'Model Context Protocol',
        description: 'Secure tool integration protocol for AI agents',
        icon: <Shield size={20} />,
        difficulty: 'intermediate',
        estimatedTime: '30-40 min',
        prerequisites: ['agent-security'],
        skills: ['MCP Protocol', 'Tool Integration', 'Security Patterns'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'flow-visualization',
        title: 'Flow Visualization',
        description: 'Interactive visualization of agent flows and interactions',
        icon: <Graph size={20} />,
        difficulty: 'intermediate',
        estimatedTime: '30-40 min',
        prerequisites: ['a2a-communication'],
        skills: ['Flow Visualization', 'Interactive Diagrams', 'System Analysis'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      
      // Tier 3: Implementation Concepts
      {
        id: 'acp',
        title: 'Agent Communication Protocol',
        description: 'Advanced protocols for enterprise-scale coordination',
        icon: <Stack size={20} />,
        difficulty: 'intermediate',
        estimatedTime: '35-45 min',
        prerequisites: ['a2a-communication'],
        skills: ['ACP Protocol', 'Enterprise Architecture', 'Scale Coordination'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'mcp-a2a-integration',
        title: 'MCP × A2A Integration',
        description: 'Integrate MCP with Agent-to-Agent communication',
        icon: <LinkSimple size={20} />,
        difficulty: 'intermediate',
        estimatedTime: '40-50 min',
        prerequisites: ['mcp', 'a2a-communication'],
        skills: ['Protocol Integration', 'Hybrid Systems', 'Advanced Coordination'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'data-visualization',
        title: 'Data Visualization',
        description: 'Advanced data visualization for AI agent systems',
        icon: <ChartBar size={20} />,
        difficulty: 'intermediate',
        estimatedTime: '35-45 min',
        prerequisites: ['flow-visualization'],
        skills: ['Data Visualization', 'Analytics', 'Dashboard Design'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      
      // Tier 4: Advanced Concepts
      {
        id: 'agent-deployment',
        title: 'Agent Deployment & Operations',
        description: 'Production deployment and operations for AI agents',
        icon: <Package size={20} />,
        difficulty: 'advanced',
        estimatedTime: '40-50 min',
        prerequisites: ['acp'],
        skills: ['Deployment', 'Containerization', 'Monitoring', 'DevOps'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'agent-learning',
        title: 'Agent Learning & Adaptation',
        description: 'Advanced learning techniques for AI agents',
        icon: <Brain size={20} />,
        difficulty: 'advanced',
        estimatedTime: '45-55 min',
        prerequisites: ['ai-agents'],
        skills: ['Reinforcement Learning', 'Transfer Learning', 'Meta-Learning'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'agent-integration',
        title: 'Agent Integration Patterns',
        description: 'Integration patterns for enterprise AI agent systems',
        icon: <LinkSimple size={20} />,
        difficulty: 'advanced',
        estimatedTime: '40-50 min',
        prerequisites: ['mcp-a2a-integration'],
        skills: ['Integration Patterns', 'API Design', 'Enterprise Architecture'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      
      // Additional Learning Resources
      {
        id: 'azure-services',
        title: 'Azure AI Services',
        description: 'Cloud AI service integration with Azure',
        icon: <StackSimple size={20} />,
        difficulty: 'intermediate',
        estimatedTime: '20-25 min',
        prerequisites: ['agent-integration'],
        skills: ['Azure Integration', 'Cloud Services', 'API Usage'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/azure-services'
      },
      {
        id: 'references',
        title: 'References & Documentation',
        description: 'Essential documentation and resources',
        icon: <Books size={20} />,
        difficulty: 'beginner',
        estimatedTime: '15-20 min',
        prerequisites: [],
        skills: ['Documentation', 'Resource Discovery', 'Best Practices'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: true,
        path: '/references'
      },
      {
        id: 'community',
        title: 'Community & Sharing',
        description: 'Connect and share with the AI agent community',
        icon: <Users size={20} />,
        difficulty: 'beginner',
        estimatedTime: '10-15 min',
        prerequisites: [],
        skills: ['Community Engagement', 'Knowledge Sharing', 'Collaboration'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: true,
        path: '/community'
      },
      {
        id: 'patterns',
        title: 'Agent Patterns & Examples',
        description: 'Implementation patterns and real-world examples',
        icon: <PuzzlePiece size={20} />,
        difficulty: 'advanced',
        estimatedTime: '35-40 min',
        prerequisites: ['agent-deployment', 'agent-learning', 'agent-integration'],
        skills: ['Design Patterns', 'Implementation Examples', 'Best Practices'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/patterns'
      },
      {
        id: 'quiz',
        title: 'Knowledge Assessment',
        description: 'Test your understanding with comprehensive quizzes',
        icon: <GraduationCap size={20} />,
        difficulty: 'beginner',
        estimatedTime: '15-20 min',
        prerequisites: [],
        skills: ['Knowledge Assessment', 'Progress Tracking', 'Validation'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: true,
        path: '/quiz'
      }
    ]
  }
];

export const LearningJourneyMap: React.FC<LearningJourneyMapProps> = ({
  currentPage = 'concepts',
  isVisible,
  onClose,
  onNavigate
}) => {
  const [selectedPath, setSelectedPath] = useState<LearningPath>(learningPaths[0]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Debounced hover handlers to prevent flickering
  const handleMouseEnter = useCallback((nodeId: string) => {
    setHoveredNode(nodeId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredNode(null);
  }, []);

  // Load user progress from localStorage
  useEffect(() => {
    const updatedPath = { ...selectedPath };
    let totalCompleted = 0;
    
    updatedPath.nodes = updatedPath.nodes.map(node => {
      // Handle quiz node separately
      if (node.id === 'quiz') {
        const quizProgress = localStorage.getItem('quiz-progress');
        if (quizProgress) {
          const progress = JSON.parse(quizProgress);
          const completedQuizzes = progress.completedQuizzes || [];
          const totalQuizzes = progress.totalQuizzes || 0;
          const averageScore = progress.averageScore || 0;
          
          // Consider quiz completed if they've taken at least 3 quizzes with 70%+ average
          const isCompleted = completedQuizzes.length >= 3 && averageScore >= 70;
          const completionRate = Math.min(100, (completedQuizzes.length / Math.max(1, totalQuizzes)) * 100);
          
          if (isCompleted) totalCompleted++;
          
          return {
            ...node,
            completionRate,
            isCompleted,
            isUnlocked: true // Quiz is always unlocked
          };
        }
        return node;
      }
      
      // Handle other nodes with existing logic
      const analytics = localStorage.getItem(`page-analytics-${node.id}`);
      if (analytics) {
        const data = JSON.parse(analytics);
        const completionRate = data.completionRate || 0;
        const isCompleted = completionRate >= 80;
        
        if (isCompleted) totalCompleted++;
        
        return {
          ...node,
          completionRate,
          isCompleted,
          isUnlocked: node.prerequisites.length === 0 || 
                     node.prerequisites.every(prereq => 
                       updatedPath.nodes.find(n => n.id === prereq)?.isCompleted
                     )
        };
      }
      return node;
    });
    
    updatedPath.totalProgress = (totalCompleted / updatedPath.nodes.length) * 100;
    setSelectedPath(updatedPath);
  }, [isVisible]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTierColor = (nodeId: string) => {
    // Tier 1: Fundamentals
    if (['agent-architecture', 'agent-security', 'multi-agent-systems', 'agent-ethics', 'ai-agents'].includes(nodeId)) {
      return 'bg-blue-100 text-blue-800';
    }
    // Tier 2: Architecture
    if (['a2a-communication', 'mcp', 'flow-visualization'].includes(nodeId)) {
      return 'bg-green-100 text-green-800';
    }
    // Tier 3: Implementation
    if (['acp', 'mcp-a2a-integration', 'data-visualization'].includes(nodeId)) {
      return 'bg-yellow-100 text-yellow-800';
    }
    // Tier 4: Advanced
    if (['agent-deployment', 'agent-learning', 'agent-integration'].includes(nodeId)) {
      return 'bg-red-100 text-red-800';
    }
    // Other resources
    return 'bg-gray-100 text-gray-800';
  };

  const getTierNumber = (nodeId: string) => {
    if (['agent-architecture', 'agent-security', 'multi-agent-systems', 'agent-ethics', 'ai-agents'].includes(nodeId)) return 1;
    if (['a2a-communication', 'mcp', 'flow-visualization'].includes(nodeId)) return 2;
    if (['acp', 'mcp-a2a-integration', 'data-visualization'].includes(nodeId)) return 3;
    if (['agent-deployment', 'agent-learning', 'agent-integration'].includes(nodeId)) return 4;
    return 0; // Other resources
  };

  const getNodePosition = (index: number, total: number) => {
    // Create a much larger canvas with better spacing
    const containerWidth = 1200;
    const containerHeight = 800;
    const nodeRadius = 40;
    const padding = 100;
    
    // Define tier groups with their nodes
    const tiers = [
      ['agent-architecture', 'agent-security', 'multi-agent-systems', 'agent-ethics', 'ai-agents'], // Tier 1
      ['a2a-communication', 'mcp', 'flow-visualization'], // Tier 2
      ['acp', 'mcp-a2a-integration', 'data-visualization'], // Tier 3
      ['agent-deployment', 'agent-learning', 'agent-integration'], // Tier 4
      ['azure-services', 'references', 'community', 'patterns', 'quiz'] // Additional
    ];
    
    // Find which tier and position this node belongs to
    const nodeId = selectedPath.nodes[index]?.id;
    let tierIndex = -1;
    let positionInTier = -1;
    
    for (let i = 0; i < tiers.length; i++) {
      const pos = tiers[i].indexOf(nodeId);
      if (pos !== -1) {
        tierIndex = i;
        positionInTier = pos;
        break;
      }
    }
    
    // Fallback to sequential layout if node not found in tiers
    if (tierIndex === -1) {
      tierIndex = Math.floor(index / 5);
      positionInTier = index % 5;
    }
    
    // Calculate positions with consistent tier spacing
    const tierHeight = 140; // Fixed height between tiers
    const tierStartY = padding + 40; // Start position for first tier
    const tierWidth = containerWidth - padding * 2;
    const currentTier = tiers[tierIndex] || [];
    const nodesInTier = currentTier.length;
    
    // Center nodes horizontally within their tier
    const nodeSpacing = tierWidth / (nodesInTier + 1);
    const x = padding + (positionInTier + 1) * nodeSpacing;
    const y = tierStartY + tierIndex * tierHeight;
    
    return { x, y };
  };

  const getNextRecommendedNode = () => {
    const uncompletedNodes = selectedPath.nodes.filter(node => !node.isCompleted && node.isUnlocked);
    if (uncompletedNodes.length === 0) return null;
    
    // Find the next node in the recommended order
    for (const nodeId of selectedPath.recommendedOrder) {
      const node = uncompletedNodes.find(n => n.id === nodeId);
      if (node) return node;
    }
    
    return uncompletedNodes[0];
  };

  const getAchievements = () => {
    const completedNodes = selectedPath.nodes.filter(node => node.isCompleted);
    const achievements = [];
    
    if (completedNodes.length >= 1) {
      achievements.push({ title: 'First Steps', description: 'Completed your first section', icon: <Star size={16} /> });
    }
    if (completedNodes.length >= 3) {
      achievements.push({ title: 'Learning Streak', description: 'Completed 3 sections', icon: <TrendUp size={16} /> });
    }
    if (completedNodes.length === selectedPath.nodes.length) {
      achievements.push({ title: 'Journey Complete', description: 'Mastered all sections', icon: <Trophy size={16} /> });
    }
    
    // Quiz-specific achievements
    const quizProgress = localStorage.getItem('quiz-progress');
    if (quizProgress) {
      const progress = JSON.parse(quizProgress);
      const completedQuizzes = progress.completedQuizzes || [];
      const highScores = completedQuizzes.filter((quiz: any) => quiz.score >= 90);
      const perfectScores = completedQuizzes.filter((quiz: any) => quiz.score === 100);
      
      if (completedQuizzes.length >= 1) {
        achievements.push({ title: 'Quiz Taker', description: 'Completed your first quiz', icon: <GraduationCap size={16} /> });
      }
      if (highScores.length >= 3) {
        achievements.push({ title: 'High Achiever', description: 'Scored 90%+ on 3 quizzes', icon: <Target size={16} /> });
      }
      if (perfectScores.length >= 1) {
        achievements.push({ title: 'Perfect Score', description: 'Achieved 100% on a quiz', icon: <Sparkle size={16} /> });
      }
    }
    
    return achievements;
  };

  if (!isVisible) return null;

  const nextNode = getNextRecommendedNode();
  const achievements = getAchievements();

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[95vh] flex flex-col">
        <CardHeader className="pb-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Path size={20} className="text-primary" />
                Learning Journey Map
              </CardTitle>
              <CardDescription>
                Visualize your progress and discover your next steps
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          </div>
          
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Overall Progress:</span>
              <Progress value={selectedPath.totalProgress} className="w-32" />
              <span className="text-sm text-muted-foreground">
                {Math.round(selectedPath.totalProgress)}%
              </span>
            </div>
            
            {achievements.length > 0 && (
              <div className="flex items-center gap-1">
                <Trophy size={16} className="text-yellow-600" />
                <span className="text-sm font-medium">{achievements.length} achievements</span>
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 flex-1 overflow-y-auto min-h-0">
          {/* Core Concepts Learning Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-sm font-semibold">1</span>
              </div>
              <h3 className="font-medium text-sm">Fundamentals</h3>
              <p className="text-xs text-muted-foreground">Core concepts & basics</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-sm font-semibold">2</span>
              </div>
              <h3 className="font-medium text-sm">Architecture</h3>
              <p className="text-xs text-muted-foreground">System design patterns</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-sm font-semibold">3</span>
              </div>
              <h3 className="font-medium text-sm">Implementation</h3>
              <p className="text-xs text-muted-foreground">Building & integration</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-sm font-semibold">4</span>
              </div>
              <h3 className="font-medium text-sm">Advanced</h3>
              <p className="text-xs text-muted-foreground">Production & mastery</p>
            </div>
          </div>

          {/* Learning Path Visualization */}
          <div className="relative bg-gradient-to-br from-muted/20 to-muted/40 rounded-lg p-6">
            <div className="relative w-full h-[600px] overflow-auto">
              <div className="relative w-[1200px] h-[800px]">
                {/* Tier Labels - positioned based on actual tier positions */}
                <div className="absolute left-4 top-[170px] text-sm font-semibold text-blue-600">Tier 1: Fundamentals</div>
                <div className="absolute left-4 top-[310px] text-sm font-semibold text-green-600">Tier 2: Architecture</div>
                <div className="absolute left-4 top-[450px] text-sm font-semibold text-yellow-600">Tier 3: Implementation</div>
                <div className="absolute left-4 top-[590px] text-sm font-semibold text-red-600">Tier 4: Advanced</div>
                <div className="absolute left-4 top-[730px] text-sm font-semibold text-gray-600">Additional Resources</div>
                
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet">
                {/* Draw connections between nodes */}
                {selectedPath.nodes.map((node, index) => {
                  if (index === selectedPath.nodes.length - 1) return null;
                  
                  const current = getNodePosition(index, selectedPath.nodes.length);
                  const next = getNodePosition(index + 1, selectedPath.nodes.length);
                  
                  return (
                    <line
                      key={`connection-${index}`}
                      x1={current.x}
                      y1={current.y}
                      x2={next.x}
                      y2={next.y}
                      stroke={node.isCompleted ? '#22c55e' : '#cbd5e1'}
                      strokeWidth="2"
                      strokeDasharray={node.isCompleted ? '0' : '6,6'}
                      className="transition-all duration-300"
                      opacity={0.6}
                    />
                  );
                })}
              </svg>
            
            {/* Learning Nodes */}
            {selectedPath.nodes.map((node, index) => {
              const position = getNodePosition(index, selectedPath.nodes.length);
              const isCurrentPage = currentPage === node.id;
              const isHovered = hoveredNode === node.id;
              
              return (
                <div
                  key={node.id}
                  className={cn(
                    "absolute w-20 h-20 rounded-full border-3 flex items-center justify-center cursor-pointer transition-all duration-200 shadow-lg",
                    // Remove CSS hover to prevent conflicts
                    node.isCompleted ? "bg-green-500 border-green-600 text-white" :
                    node.isUnlocked ? "bg-primary border-primary text-white" :
                    "bg-muted border-muted-foreground text-muted-foreground",
                    isCurrentPage && "ring-4 ring-primary/30",
                    // Only apply hover effects via JavaScript state
                    isHovered && "scale-110 shadow-xl z-20"
                  )}
                  style={{
                    left: position.x - 40,
                    top: position.y - 40,
                    zIndex: isHovered ? 20 : 10
                  }}
                  onClick={() => {
                    if (node.isUnlocked) {
                      onNavigate(node.path);
                    }
                  }}
                  onMouseEnter={() => handleMouseEnter(node.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {node.isCompleted ? (
                    <CheckCircle size={28} weight="fill" />
                  ) : (
                    <div className="text-2xl">{node.icon}</div>
                  )}
                  
                  {/* Node label */}
                  <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 text-center pointer-events-none max-w-[140px]">
                    <div className={cn(
                      "text-sm font-semibold text-center leading-tight mb-1",
                      isCurrentPage ? "text-primary" : "text-foreground"
                    )}>
                      {node.title}
                    </div>
                    <div className="flex items-center justify-center gap-1 flex-wrap">
                      {getTierNumber(node.id) > 0 && (
                        <Badge className={cn("text-xs px-2 py-0.5", getTierColor(node.id))}>
                          T{getTierNumber(node.id)}
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground bg-background/80 px-2 py-0.5 rounded">
                        {node.estimatedTime}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
          </div>
          
          {/* Recommendations and Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Next Steps */}
            {nextNode && (
              <Card className="border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Target size={16} className="text-primary" />
                    Recommended Next Step
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-md">
                        {nextNode.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{nextNode.title}</h4>
                        <p className="text-sm text-muted-foreground">{nextNode.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={cn("text-xs", getDifficultyColor(nextNode.difficulty))}>
                        {nextNode.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {nextNode.estimatedTime}
                      </Badge>
                    </div>
                    
                    <Button 
                      className="w-full"
                      onClick={() => onNavigate(nextNode.path)}
                    >
                      Continue Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Achievements */}
            {achievements.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sparkle size={16} className="text-yellow-600" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                        <div className="text-yellow-600">
                          {achievement.icon}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{achievement.title}</div>
                          <div className="text-xs text-muted-foreground">{achievement.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Detailed Node Information - Fixed position to prevent layout shifts */}
          {hoveredNode && (
            <div className="mt-4">
              <Card className="border-primary/20">
                <CardContent className="p-4">
                  {(() => {
                    const node = selectedPath.nodes.find(n => n.id === hoveredNode);
                    if (!node) return null;
                    
                    return (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-primary/10 rounded">
                            {node.icon}
                          </div>
                          <h4 className="font-medium">{node.title}</h4>
                          <Badge className={cn("text-xs", getDifficultyColor(node.difficulty))}>
                            {node.difficulty}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{node.description}</p>
                        
                        <div className="flex items-center gap-4 text-xs">
                          <span>⏱️ {node.estimatedTime}</span>
                          <span>✅ {node.completionRate}% complete</span>
                          {node.id === 'quiz' && (() => {
                            const quizProgress = localStorage.getItem('quiz-progress');
                            if (quizProgress) {
                              const progress = JSON.parse(quizProgress);
                              const averageScore = progress.averageScore || 0;
                              const completedQuizzes = progress.completedQuizzes || [];
                              return (
                                <>
                                  <span>📊 {averageScore}% avg score</span>
                                  <span>🎯 {completedQuizzes.length} quizzes taken</span>
                                </>
                              );
                            }
                            return null;
                          })()}
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {node.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Placeholder to maintain consistent height when no node is hovered */}
          {!hoveredNode && (
            <div className="mt-4">
              <Card className="border-transparent">
                <CardContent className="p-4">
                  <div className="space-y-2 opacity-0">
                    <div className="h-6 bg-transparent"></div>
                    <div className="h-4 bg-transparent"></div>
                    <div className="h-4 bg-transparent"></div>
                    <div className="h-6 bg-transparent"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningJourneyMap;
