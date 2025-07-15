import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Eye, UserCheck, Warning, CheckCircle } from "@phosphor-icons/react"

interface AgentSecurityConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

export default function AgentSecurityConcept({ onMarkComplete, onNavigateToNext }: AgentSecurityConceptProps) {
  const tabs = [
    {
      id: 'authentication',
      title: 'Agent Authentication',
      description: 'Verifying agent identity and establishing trust',
      icon: <UserCheck className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          {/* Authentication Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5" />
                Agent Identity Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Agent authentication ensures that only authorized agents can participate in multi-agent systems
                and access sensitive resources. This forms the foundation of agent security.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔐 Digital Signatures</h4>
                  <p className="text-sm text-muted-foreground">
                    Cryptographic signatures to verify agent messages and actions
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🎫 Token-Based Auth</h4>
                  <p className="text-sm text-muted-foreground">
                    JWT tokens and API keys for secure agent-to-service communication
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔗 Certificate Chains</h4>
                  <p className="text-sm text-muted-foreground">
                    X.509 certificates for establishing trusted agent hierarchies
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">⚡ OAuth 2.0</h4>
                  <p className="text-sm text-muted-foreground">
                    Standard OAuth flows for third-party agent authorization
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm">
{`// Agent Authentication Example
class AgentAuthenticator {
  async authenticateAgent(agentId, credentials) {
    // 1. Verify agent certificate
    const cert = await this.verifyCertificate(credentials.certificate)
    
    // 2. Validate agent identity
    const identity = await this.validateIdentity(agentId, cert)
    
    // 3. Generate access token
    const token = await this.generateToken(identity, {
      permissions: this.getPermissions(identity),
      expiration: Date.now() + (24 * 60 * 60 * 1000)
    })
    
    return { success: true, token, identity }
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'trust-networks',
      title: 'Trust Networks',
      description: 'Building and maintaining trust relationships between agents',
      icon: <Shield className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          {/* Trust Networks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Agent Trust Networks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Trust networks enable agents to establish and maintain confidence in other agents' 
                capabilities, reliability, and behavior patterns over time.
              </p>
              
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-semibold mb-3">Trust Metrics:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span><strong>Reliability Score:</strong> Consistency of agent performance over time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>Capability Trust:</strong> Confidence in agent's specific abilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                    <span><strong>Behavioral Trust:</strong> Predictability of agent actions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span>
                    <span><strong>Recommendation Trust:</strong> Trust propagated through referrals</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm">
{`// Trust Network Implementation
class TrustNetwork {
  async calculateTrust(agentA, agentB) {
    const directTrust = await this.getDirectTrust(agentA, agentB)
    const recommendationTrust = await this.getRecommendationTrust(agentA, agentB)
    const reputationScore = await this.getReputationScore(agentB)
    
    return {
      overall: (directTrust * 0.6) + (recommendationTrust * 0.3) + (reputationScore * 0.1),
      components: { directTrust, recommendationTrust, reputationScore }
    }
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'secure-communication',
      title: 'Secure Communication',
      description: 'Protecting agent-to-agent communications',
      icon: <Lock className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          {/* Secure Communication */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Encrypted Agent Communication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Secure communication protocols protect sensitive information exchanged between agents
                and prevent unauthorized access to agent interactions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔐 End-to-End Encryption</h4>
                  <p className="text-sm text-muted-foreground">
                    Encrypt messages so only intended recipients can read them
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🛡️ Message Integrity</h4>
                  <p className="text-sm text-muted-foreground">
                    Ensure messages haven't been tampered with during transmission
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">🔄 Perfect Forward Secrecy</h4>
                  <p className="text-sm text-muted-foreground">
                    Protect past communications even if keys are compromised
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">📝 Non-Repudiation</h4>
                  <p className="text-sm text-muted-foreground">
                    Prevent agents from denying they sent specific messages
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'privacy-protection',
      title: 'Privacy Protection',
      description: 'Safeguarding sensitive data in agent systems',
      icon: <Eye className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          {/* Privacy Protection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Agent Privacy Techniques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                Privacy protection ensures that sensitive information processed by agents remains 
                confidential and complies with data protection regulations.
              </p>
              
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-semibold mb-3">Privacy Techniques:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <span><strong>Data Anonymization:</strong> Remove personally identifiable information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <span><strong>Differential Privacy:</strong> Add statistical noise to protect individual privacy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2"></span>
                    <span><strong>Homomorphic Encryption:</strong> Compute on encrypted data without decrypting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span>
                    <span><strong>Secure Multi-Party Computation:</strong> Collaborative computation without data sharing</span>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-start gap-2">
                  <Warning className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Compliance Considerations</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      Agent systems must comply with GDPR, CCPA, HIPAA, and other privacy regulations.
                      Implement proper data governance and user consent mechanisms.
                    </p>
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
      conceptId="agent-security"
      title="Agent Security & Trust"
      description="Essential security concepts and trust mechanisms for AI agent systems"
      tabs={tabs}
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}
