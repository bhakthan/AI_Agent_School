import { Separator } from "@/components/ui/separator"
import ConceptsHub from "./ConceptsHub"
import ReferenceSection from "../references/ReferenceSection"
import { SmartPageAnalytics } from "../tutorial/SmartPageAnalytics"
import { FloatingContextualHelp, useFloatingContextualHelp } from "../tutorial/FloatingContextualHelp"
import { PageSynopsis } from "../tutorial/EnhancedTutorialButton"
import { Brain, ArrowsHorizontal, Shield, Stack } from "@phosphor-icons/react"

// Define the page synopsis for Core Concepts
const coreConceptsSynopsis: PageSynopsis = {
  title: "Core Concepts",
  description: "Master the fundamental concepts of AI agents through interactive learning experiences",
  estimatedTime: "2-3 hours",
  keyFeatures: [
    "Progressive learning path with prerequisites",
    "Interactive demonstrations and examples", 
    "Hands-on exercises and code samples",
    "Real-world implementation guidance"
  ],
  learningCategories: [
    {
      name: "AI Agents",
      description: "Learn about autonomous AI systems",
      difficulty: "beginner",
      icon: <Brain className="w-4 h-4" />
    },
    {
      name: "A2A Communication",
      description: "Agent-to-agent communication patterns",
      difficulty: "intermediate",
      icon: <ArrowsHorizontal className="w-4 h-4" />
    },
    {
      name: "Model Context Protocol",
      description: "Secure tool integration for AI agents",
      difficulty: "intermediate",
      icon: <Shield className="w-4 h-4" />
    },
    {
      name: "Agent Communication Protocol",
      description: "Advanced coordination protocols",
      difficulty: "advanced",
      icon: <Stack className="w-4 h-4" />
    }
  ]
}

export default function ConceptsExplorer() {
  const { isVisible, hideHelp, showHelp, toggleHelp } = useFloatingContextualHelp("core-concepts", 5000)
  return (
    <div className="max-w-7xl mx-auto space-y-8 relative">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Core Concepts</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Master the fundamental concepts of AI agents through interactive learning experiences
        </p>
      </div>

      <Separator />

      {/* Main Content */}
      <ConceptsHub />

      {/* References */}
      <div className="mt-12">
        <ReferenceSection type="concept" itemId="core-concepts" />
      </div>

      {/* SmartPageAnalytics - Bottom Left */}
      <div className="fixed bottom-4 left-4 z-50">
        <SmartPageAnalytics
          pageKey="core-concepts"
          pageTitle="Core Concepts"
          onRecommendationClick={(recommendation) => {
            console.log('Recommendation clicked:', recommendation)
          }}
        />
      </div>

      {/* FloatingContextualHelp - Bottom Right */}
      <div className="fixed bottom-4 right-4 z-50">
        <FloatingContextualHelp
          pageSynopsis={coreConceptsSynopsis}
          pageKey="core-concepts"
          isVisible={isVisible}
          onClose={hideHelp}
          onToggle={toggleHelp}
          onStartTutorial={() => {
            console.log('Starting tutorial for Core Concepts')
          }}
        />
      </div>
    </div>
  )
}