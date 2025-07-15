import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Code, Gear, GraduationCap, ArrowRight, ArrowLeft, CheckCircle } from "@phosphor-icons/react"
import EnlightenMeButton from "./EnlightenMeButton"

interface ConceptTab {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  level: 'fundamentals' | 'architecture' | 'implementation' | 'advanced'
  content: React.ReactNode
  completed?: boolean
}

interface ConceptLayoutProps {
  conceptId: string
  title: string
  description: string
  tabs: ConceptTab[]
  nextConcept?: {
    id: string
    title: string
    description: string
  }
  onMarkComplete?: () => void
}

const levelColors = {
  fundamentals: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  architecture: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  implementation: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
  advanced: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
}

const levelIcons = {
  fundamentals: <BookOpen className="w-4 h-4" />,
  architecture: <Gear className="w-4 h-4" />,
  implementation: <Code className="w-4 h-4" />,
  advanced: <GraduationCap className="w-4 h-4" />
}

export default function ConceptLayout({ conceptId, title, description, tabs, nextConcept, onMarkComplete }: ConceptLayoutProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '')
  const [completedTabs, setCompletedTabs] = useState<Set<string>>(new Set())
  const [isConceptComplete, setIsConceptComplete] = useState(false)

  const currentTabIndex = tabs.findIndex(tab => tab.id === activeTab)
  const currentTab = tabs[currentTabIndex]
  const progress = ((completedTabs.size) / tabs.length) * 100

  const handleTabComplete = (tabId: string) => {
    setCompletedTabs(prev => new Set([...prev, tabId]))
    
    // Check if all tabs are completed
    const newCompletedTabs = new Set([...completedTabs, tabId])
    if (newCompletedTabs.size === tabs.length && !isConceptComplete) {
      setIsConceptComplete(true)
      onMarkComplete?.()
    }
  }

  const handleNext = () => {
    if (currentTabIndex < tabs.length - 1) {
      handleTabComplete(activeTab)
      setActiveTab(tabs[currentTabIndex + 1].id)
    }
  }

  const handlePrevious = () => {
    if (currentTabIndex > 0) {
      setActiveTab(tabs[currentTabIndex - 1].id)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{title}</CardTitle>
              <CardDescription className="text-base mt-2">{description}</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-2">Learning Progress</div>
              <Progress value={progress} className="w-32" />
              <div className="text-xs text-muted-foreground mt-1">
                {completedTabs.size} of {tabs.length} completed
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-auto p-1">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex flex-col items-center gap-2 h-auto py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <div className="flex items-center gap-2">
                {levelIcons[tab.level]}
                {completedTabs.has(tab.id) && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>
              <div className="text-center">
                <div className="font-medium text-sm">{tab.title}</div>
                <Badge 
                  variant="outline" 
                  className={`text-xs mt-1 ${levelColors[tab.level]}`}
                >
                  {tab.level}
                </Badge>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="space-y-6">
            {/* Tab Header */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {levelIcons[tab.level]}
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {tab.title}
                        <Badge className={levelColors[tab.level]}>
                          {tab.level}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="mt-1">{tab.description}</CardDescription>
                    </div>
                  </div>
                  <EnlightenMeButton
                    title={tab.title}
                    conceptId={`${conceptId}-${tab.id}`}
                    description={tab.description}
                    variant="floating"
                    size="sm"
                  />
                </div>
              </CardHeader>
            </Card>

            {/* Tab Content */}
            <div className="space-y-6">
              {tab.content}
            </div>

            {/* Navigation */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentTabIndex === 0}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleTabComplete(activeTab)}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Complete
                    </Button>

                    {currentTabIndex < tabs.length - 1 ? (
                      <Button
                        onClick={handleNext}
                        className="flex items-center gap-2"
                      >
                        Next
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      nextConcept && (
                        <Button
                          onClick={() => handleTabComplete(activeTab)}
                          className="flex items-center gap-2"
                        >
                          Next: {nextConcept.title}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
