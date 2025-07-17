// Quiz types and interfaces
export interface QuizQuestion {
  id: string;
  text: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  subCategory?: string;
  explanation?: string;
  codeExample?: string;
  relatedTopics?: string[];
  relatedConcepts?: string[];
  timeEstimate?: number;
  adaptiveWeight?: number;
  persona?: string[];
}

export interface QuizSubCategory {
  id: string;
  name: string;
  description: string;
  prerequisites: string[];
  questions: QuizQuestion[];
}

export interface QuizCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  totalQuestions: number;
  estimatedTime: number;
  subCategories: QuizSubCategory[];
}

export interface UserPersona {
  id: string;
  name: string;
  description: string;
  focusAreas: string[];
  timeAvailable: number;
  targetDifficulty: 'beginner' | 'intermediate' | 'advanced';
  learningStyle: string;
}

export interface QuizSession {
  id: string;
  persona: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: QuizQuestion[];
  userAnswers: number[];
  currentQuestionIndex: number;
  answers: Record<string, number>;
  score?: number;
  timeStarted: number;
  timeSpent?: number;
  startTime: Date;
  timeCompleted?: number;
  isCompleted: boolean;
  completed: boolean;
}

export interface QuizFeedback {
  type: 'correct' | 'incorrect' | 'improvement';
  message: string;
  concept: string;
  resources?: string[];
  isCorrect: boolean;
  questionId: string;
  explanation?: string;
  improvementSuggestions?: string[];
}
