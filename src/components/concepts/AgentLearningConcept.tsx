import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Brain, 
  Lightbulb, 
  ArrowsCounterClockwise, 
  TrendUp, 
  Target,
  Shuffle,
  Lightning,
  Atom
} from "@phosphor-icons/react"

interface AgentLearningConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

export default function AgentLearningConcept({ onMarkComplete, onNavigateToNext }: AgentLearningConceptProps) {
  const tabs = [
    {
      id: 'reinforcement-learning',
      title: 'Reinforcement Learning',
      description: 'Q-learning, policy gradients, and reward systems',
      icon: <Target className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Reinforcement Learning for Agents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Reinforcement Learning enables agents to learn optimal behaviors through interaction with their environment,
                using rewards and penalties to guide learning towards desired outcomes.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🎯 Q-Learning</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Learn action-value functions for optimal decision making
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• State-action value estimation</li>
                    <li>• Exploration vs exploitation</li>
                    <li>• Temporal difference learning</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">📈 Policy Gradients</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Directly optimize policy parameters using gradient ascent
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Policy parameter optimization</li>
                    <li>• Continuous action spaces</li>
                    <li>• Actor-critic methods</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🏆 Reward Systems</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Design effective reward structures for desired behaviors
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Reward shaping</li>
                    <li>• Intrinsic motivation</li>
                    <li>• Multi-objective rewards</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔄 Deep RL</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Combine deep learning with reinforcement learning
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Deep Q-Networks (DQN)</li>
                    <li>• Proximal Policy Optimization</li>
                    <li>• Experience replay</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm">{`# Reinforcement Learning Agent Implementation
import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from collections import deque
import random

class DQNAgent:
    def __init__(self, state_size, action_size, lr=0.001):
        self.state_size = state_size
        self.action_size = action_size
        self.memory = deque(maxlen=10000)
        self.epsilon = 1.0  # exploration rate
        self.epsilon_min = 0.01
        self.epsilon_decay = 0.995
        self.learning_rate = lr
        
        # Neural network for Q-function approximation
        self.q_network = nn.Sequential(
            nn.Linear(state_size, 64),
            nn.ReLU(),
            nn.Linear(64, 64),
            nn.ReLU(),
            nn.Linear(64, action_size)
        )
        
        self.optimizer = optim.Adam(self.q_network.parameters(), lr=lr)
        self.criterion = nn.MSELoss()
    
    def remember(self, state, action, reward, next_state, done):
        self.memory.append((state, action, reward, next_state, done))
    
    def act(self, state):
        if np.random.random() <= self.epsilon:
            return random.randrange(self.action_size)
        
        state_tensor = torch.FloatTensor(state).unsqueeze(0)
        q_values = self.q_network(state_tensor)
        return np.argmax(q_values.cpu().data.numpy())
    
    def replay(self, batch_size=32):
        if len(self.memory) < batch_size:
            return
        
        batch = random.sample(self.memory, batch_size)
        states = torch.FloatTensor([e[0] for e in batch])
        actions = torch.LongTensor([e[1] for e in batch])
        rewards = torch.FloatTensor([e[2] for e in batch])
        next_states = torch.FloatTensor([e[3] for e in batch])
        dones = torch.BoolTensor([e[4] for e in batch])
        
        current_q_values = self.q_network(states).gather(1, actions.unsqueeze(1))
        next_q_values = self.q_network(next_states).max(1)[0].detach()
        target_q_values = rewards + (0.99 * next_q_values * (~dones))
        
        loss = self.criterion(current_q_values.squeeze(), target_q_values)
        
        self.optimizer.zero_grad()
        loss.backward()
        self.optimizer.step()
        
        if self.epsilon > self.epsilon_min:
            self.epsilon *= self.epsilon_decay`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'online-learning',
      title: 'Online Learning',
      description: 'Continuous learning and concept drift adaptation',
      icon: <TrendUp className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendUp className="w-5 h-5" />
                Online Learning Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Online learning enables agents to continuously adapt to changing environments and data distributions,
                maintaining performance as conditions evolve over time.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔄 Continuous Learning</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Incremental model updates</li>
                    <li>• Streaming data processing</li>
                    <li>• Real-time adaptation</li>
                    <li>• Memory-efficient learning</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">📊 Concept Drift Detection</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Statistical drift detection</li>
                    <li>• Performance monitoring</li>
                    <li>• Distribution comparison</li>
                    <li>• Adaptive thresholds</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🎯 Adaptive Algorithms</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Stochastic gradient descent</li>
                    <li>• Online ensemble methods</li>
                    <li>• Adaptive learning rates</li>
                    <li>• Forgetting mechanisms</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">⚡ Real-time Processing</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Stream processing</li>
                    <li>• Mini-batch learning</li>
                    <li>• Sliding window methods</li>
                    <li>• Low-latency updates</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm">{`# Online Learning with Concept Drift Detection
import numpy as np
from sklearn.base import BaseEstimator, ClassifierMixin
from sklearn.linear_model import SGDClassifier
from sklearn.metrics import accuracy_score

class OnlineLearningAgent(BaseEstimator, ClassifierMixin):
    def __init__(self, drift_threshold=0.05, window_size=100):
        self.drift_threshold = drift_threshold
        self.window_size = window_size
        self.model = SGDClassifier(loss='log', learning_rate='adaptive')
        self.performance_history = []
        self.drift_detector = DriftDetector(threshold=drift_threshold)
        
    def partial_fit(self, X, y):
        """Incrementally train the model"""
        if not hasattr(self.model, 'classes_'):
            self.model.partial_fit(X, y, classes=np.unique(y))
        else:
            self.model.partial_fit(X, y)
    
    def predict(self, X):
        return self.model.predict(X)
    
    def update_and_detect_drift(self, X, y_true):
        """Update model and detect concept drift"""
        # Make predictions
        y_pred = self.predict(X)
        
        # Calculate performance
        accuracy = accuracy_score(y_true, y_pred)
        self.performance_history.append(accuracy)
        
        # Detect drift
        drift_detected = self.drift_detector.detect_drift(accuracy)
        
        if drift_detected:
            print(f"Concept drift detected! Accuracy: {accuracy:.3f}")
            self.handle_drift(X, y_true)
        else:
            # Normal incremental learning
            self.partial_fit(X, y_true)
        
        return drift_detected
    
    def handle_drift(self, X, y):
        """Handle detected concept drift"""
        # Option 1: Reset model
        self.model = SGDClassifier(loss='log', learning_rate='adaptive')
        
        # Option 2: Increase learning rate
        # self.model.set_params(eta0=self.model.eta0 * 2)
        
        # Retrain with recent data
        self.partial_fit(X, y)
        
        # Clear old performance history
        self.performance_history = []

class DriftDetector:
    def __init__(self, threshold=0.05, window_size=50):
        self.threshold = threshold
        self.window_size = window_size
        self.baseline_performance = None
        
    def detect_drift(self, current_performance):
        """Detect drift using statistical test"""
        if self.baseline_performance is None:
            self.baseline_performance = current_performance
            return False
        
        # Simple threshold-based detection
        performance_drop = self.baseline_performance - current_performance
        
        if performance_drop > self.threshold:
            self.baseline_performance = current_performance
            return True
        
        return False`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'transfer-learning',
      title: 'Transfer Learning',
      description: 'Knowledge transfer between tasks and domains',
      icon: <Shuffle className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shuffle className="w-5 h-5" />
                Transfer Learning Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Transfer learning allows agents to leverage knowledge from previously learned tasks to quickly adapt to new domains,
                reducing training time and improving performance on related tasks.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔄 Feature Transfer</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Pre-trained embeddings</li>
                    <li>• Shared feature extractors</li>
                    <li>• Domain adaptation</li>
                    <li>• Fine-tuning strategies</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🧠 Knowledge Distillation</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Teacher-student models</li>
                    <li>• Soft target learning</li>
                    <li>• Model compression</li>
                    <li>• Knowledge preservation</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🌐 Domain Adaptation</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Cross-domain learning</li>
                    <li>• Domain-invariant features</li>
                    <li>• Adversarial adaptation</li>
                    <li>• Multi-source domains</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🎯 Task Transfer</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Multi-task learning</li>
                    <li>• Task similarity metrics</li>
                    <li>• Progressive learning</li>
                    <li>• Catastrophic forgetting</li>
                  </ul>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-semibold mb-3">Transfer Learning Best Practices:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span><strong>Task Similarity:</strong> Assess similarity between source and target tasks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>Layer Selection:</strong> Choose appropriate layers for transfer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                    <span><strong>Learning Rate:</strong> Use different rates for transferred and new layers</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'meta-learning',
      title: 'Meta-Learning',
      description: 'Learning to learn and few-shot adaptation',
      icon: <Brain className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Meta-Learning Approaches
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Meta-learning enables agents to learn how to learn, developing the ability to quickly adapt to new tasks
                with minimal training data by leveraging experience from previous learning episodes.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🎯 Few-Shot Learning</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Model-Agnostic Meta-Learning (MAML)</li>
                    <li>• Prototypical networks</li>
                    <li>• Matching networks</li>
                    <li>• Relation networks</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔄 Optimization-Based</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Gradient-based meta-learning</li>
                    <li>• Learning to optimize</li>
                    <li>• Meta-SGD</li>
                    <li>• Reptile algorithm</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🧠 Memory-Based</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Neural Turing Machines</li>
                    <li>• Differentiable memory</li>
                    <li>• External memory systems</li>
                    <li>• Episodic memory</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">📊 Metric-Based</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Similarity metrics</li>
                    <li>• Embedding spaces</li>
                    <li>• Distance learning</li>
                    <li>• Nearest neighbor methods</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm">{`# MAML (Model-Agnostic Meta-Learning) Implementation
import torch
import torch.nn as nn
import torch.optim as optim
from torch.autograd import grad

class MAMLAgent(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super(MAMLAgent, self).__init__()
        self.network = nn.Sequential(
            nn.Linear(input_size, hidden_size),
            nn.ReLU(),
            nn.Linear(hidden_size, hidden_size),
            nn.ReLU(),
            nn.Linear(hidden_size, output_size)
        )
        self.meta_lr = 0.001
        self.inner_lr = 0.01
        
    def forward(self, x, params=None):
        if params is None:
            return self.network(x)
        
        # Forward pass with custom parameters
        x = torch.nn.functional.linear(x, params['0.weight'], params['0.bias'])
        x = torch.nn.functional.relu(x)
        x = torch.nn.functional.linear(x, params['2.weight'], params['2.bias'])
        x = torch.nn.functional.relu(x)
        x = torch.nn.functional.linear(x, params['4.weight'], params['4.bias'])
        return x
    
    def meta_update(self, tasks, meta_optimizer):
        """Perform meta-update across multiple tasks"""
        meta_loss = 0
        
        for task in tasks:
            # Sample support and query sets
            support_x, support_y = task['support']
            query_x, query_y = task['query']
            
            # Inner loop adaptation
            adapted_params = self.inner_loop_adaptation(support_x, support_y)
            
            # Query loss with adapted parameters
            query_pred = self.forward(query_x, adapted_params)
            query_loss = nn.functional.cross_entropy(query_pred, query_y)
            meta_loss += query_loss
        
        # Meta-update
        meta_optimizer.zero_grad()
        meta_loss.backward()
        meta_optimizer.step()
        
        return meta_loss.item()
    
    def inner_loop_adaptation(self, support_x, support_y, num_steps=5):
        """Adapt to new task using support set"""
        # Get current parameters
        params = {name: param.clone() for name, param in self.named_parameters()}
        
        for step in range(num_steps):
            # Forward pass
            pred = self.forward(support_x, params)
            loss = nn.functional.cross_entropy(pred, support_y)
            
            # Compute gradients
            grads = grad(loss, params.values(), create_graph=True)
            
            # Update parameters
            for (name, param), grad in zip(params.items(), grads):
                params[name] = param - self.inner_lr * grad
        
        return params
    
    def fast_adapt(self, support_x, support_y, num_steps=5):
        """Quick adaptation to new task"""
        adapted_params = self.inner_loop_adaptation(support_x, support_y, num_steps)
        return adapted_params`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ]

  return (
    <ConceptLayout
      conceptId="agent-learning"
      title="Agent Learning & Adaptation"
      description="Advanced learning techniques including reinforcement learning, online learning, transfer learning, and meta-learning"
      tabs={tabs}
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}
