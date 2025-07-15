import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Scales, 
  Eye, 
  ShieldCheck, 
  Users, 
  Warning,
  Certificate,
  MagnifyingGlass,
  BookOpen
} from "@phosphor-icons/react"

interface AgentEthicsConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

export default function AgentEthicsConcept({ onMarkComplete, onNavigateToNext }: AgentEthicsConceptProps) {
  const tabs = [
    {
      id: 'ethical-principles',
      title: 'Ethical AI Principles',
      description: 'Core principles of fairness, transparency, and accountability',
      icon: <Scales className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scales className="w-5 h-5" />
                Fundamental Ethical Principles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Ethical AI development requires adherence to fundamental principles that ensure 
                AI agents benefit society while minimizing harm and respecting human values.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">⚖️ Fairness</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Ensuring AI agents treat all users equitably without discrimination
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Equal treatment across demographics</li>
                    <li>• Bias detection and mitigation</li>
                    <li>• Inclusive design practices</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔍 Transparency</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Making AI decision-making processes understandable and auditable
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Explainable AI techniques</li>
                    <li>• Decision audit trails</li>
                    <li>• Clear communication to users</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">📋 Accountability</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Clear responsibility chains for AI agent decisions and actions
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Governance frameworks</li>
                    <li>• Responsibility assignment</li>
                    <li>• Error handling procedures</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔒 Privacy</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Protecting user data and maintaining confidentiality
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Data minimization</li>
                    <li>• Consent mechanisms</li>
                    <li>• Secure data handling</li>
                  </ul>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-semibold mb-3">Implementation Framework:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span><strong>Ethics by Design:</strong> Integrate ethical considerations from the start</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>Continuous Monitoring:</strong> Regular assessment of ethical compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                    <span><strong>Stakeholder Engagement:</strong> Include diverse perspectives in development</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'bias-detection',
      title: 'Bias Detection & Mitigation',
      description: 'Identifying and addressing algorithmic bias in AI systems',
      icon: <MagnifyingGlass className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MagnifyingGlass className="w-5 h-5" />
                Bias Detection Framework
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Systematic bias detection and mitigation is essential for building fair and trustworthy AI agents.
                This involves both technical and procedural approaches to identify and address bias.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">📊 Statistical Parity</h4>
                  <p className="text-sm text-muted-foreground">
                    Equal positive prediction rates across groups
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🎯 Equalized Odds</h4>
                  <p className="text-sm text-muted-foreground">
                    Equal true/false positive rates across groups
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">⚖️ Calibration</h4>
                  <p className="text-sm text-muted-foreground">
                    Prediction probabilities reflect true outcomes
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm">{`# Bias detection implementation
import pandas as pd
import numpy as np
from sklearn.metrics import confusion_matrix

class BiasDetector:
    def __init__(self):
        self.fairness_metrics = {}
    
    def statistical_parity(self, y_pred, sensitive_attr):
        """Calculate statistical parity difference"""
        groups = np.unique(sensitive_attr)
        positive_rates = {}
        
        for group in groups:
            mask = sensitive_attr == group
            positive_rates[group] = np.mean(y_pred[mask])
        
        # Calculate maximum difference
        rates = list(positive_rates.values())
        return max(rates) - min(rates)
    
    def equalized_odds(self, y_true, y_pred, sensitive_attr):
        """Calculate equalized odds difference"""
        groups = np.unique(sensitive_attr)
        tpr_diff = []
        fpr_diff = []
        
        for group in groups:
            mask = sensitive_attr == group
            tn, fp, fn, tp = confusion_matrix(
                y_true[mask], y_pred[mask]
            ).ravel()
            
            tpr = tp / (tp + fn) if (tp + fn) > 0 else 0
            fpr = fp / (fp + tn) if (fp + tn) > 0 else 0
            
            tpr_diff.append(tpr)
            fpr_diff.append(fpr)
        
        return {
            'tpr_difference': max(tpr_diff) - min(tpr_diff),
            'fpr_difference': max(fpr_diff) - min(fpr_diff)
        }
    
    def generate_bias_report(self, y_true, y_pred, sensitive_attrs):
        """Generate comprehensive bias report"""
        report = {}
        
        for attr_name, attr_values in sensitive_attrs.items():
            report[attr_name] = {
                'statistical_parity': self.statistical_parity(y_pred, attr_values),
                'equalized_odds': self.equalized_odds(y_true, y_pred, attr_values)
            }
        
        return report`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'regulatory-compliance',
      title: 'Regulatory Compliance',
      description: 'GDPR, AI Act, and industry-specific regulations',
      icon: <Certificate className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Certificate className="w-5 h-5" />
                Regulatory Landscape
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                AI agents must comply with various regulations depending on their deployment context, 
                data processing activities, and geographical reach.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🇪🇺 EU AI Act</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Risk-based approach</li>
                    <li>• Prohibited AI practices</li>
                    <li>• High-risk system requirements</li>
                    <li>• Transparency obligations</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔐 GDPR</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Data protection by design</li>
                    <li>• Right to explanation</li>
                    <li>• Data minimization</li>
                    <li>• Consent management</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🏥 Healthcare (HIPAA)</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Patient data protection</li>
                    <li>• Access controls</li>
                    <li>• Audit trails</li>
                    <li>• Breach notification</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🏦 Financial (SOX)</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Model governance</li>
                    <li>• Risk management</li>
                    <li>• Audit requirements</li>
                    <li>• Internal controls</li>
                  </ul>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-semibold mb-3">Compliance Implementation:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span><strong>Impact Assessment:</strong> Conduct data protection and algorithmic impact assessments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>Documentation:</strong> Maintain detailed records of data processing and model decisions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                    <span><strong>Regular Audits:</strong> Perform compliance audits and risk assessments</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'responsible-ai',
      title: 'Responsible AI',
      description: 'Safety measures, human oversight, and explainability',
      icon: <ShieldCheck className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                Responsible AI Framework
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Responsible AI ensures that AI agents operate safely, transparently, and with appropriate human oversight.
                This includes technical safeguards, explainability mechanisms, and governance structures.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🛡️ Safety Measures</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Robustness testing</li>
                    <li>• Adversarial defense</li>
                    <li>• Fail-safe mechanisms</li>
                    <li>• Safety constraints</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">👥 Human Oversight</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Human-in-the-loop</li>
                    <li>• Meaningful control</li>
                    <li>• Override capabilities</li>
                    <li>• Escalation procedures</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔍 Explainability</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Model interpretability</li>
                    <li>• Decision explanations</li>
                    <li>• Feature importance</li>
                    <li>• Counterfactual analysis</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">📊 Governance</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Ethics committees</li>
                    <li>• Review processes</li>
                    <li>• Risk assessment</li>
                    <li>• Incident response</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm">{`# Responsible AI implementation
class ResponsibleAIFramework:
    def __init__(self):
        self.safety_constraints = []
        self.human_oversight = True
        self.explainability_enabled = True
    
    def add_safety_constraint(self, constraint):
        """Add safety constraint to the agent"""
        self.safety_constraints.append(constraint)
    
    def validate_decision(self, decision, context):
        """Validate decision against safety constraints"""
        for constraint in self.safety_constraints:
            if not constraint.validate(decision, context):
                return False, constraint.get_violation_reason()
        return True, None
    
    def generate_explanation(self, decision, input_data):
        """Generate explanation for agent decision"""
        explanation = {
            'decision': decision,
            'confidence': self.calculate_confidence(decision),
            'key_factors': self.identify_key_factors(input_data),
            'alternative_options': self.get_alternatives(decision),
            'risk_assessment': self.assess_risks(decision)
        }
        return explanation
    
    def require_human_approval(self, decision):
        """Check if decision requires human approval"""
        risk_score = self.calculate_risk_score(decision)
        return risk_score > self.human_approval_threshold
    
    def log_decision(self, decision, explanation, human_approved=False):
        """Log decision for audit trail"""
        audit_entry = {
            'timestamp': datetime.now(),
            'decision': decision,
            'explanation': explanation,
            'human_approved': human_approved,
            'risk_score': self.calculate_risk_score(decision)
        }
        self.audit_log.append(audit_entry)`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ]

  return (
    <ConceptLayout
      conceptId="agent-ethics"
      title="Agent Ethics & Governance"
      description="Ethical principles, bias mitigation, regulatory compliance, and responsible AI practices"
      tabs={tabs}
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}
