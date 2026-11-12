export interface Question {
  id: string;
  question: string;
  options: [string, string, string, string];
  answer: number; // 0, 1, 2, 3
  explanation: string;
  category?: string;
}

export type GameMode = 'practice' | 'challenge';

export interface GameSettings {
  questionCount: number | 'all';
  mode: GameMode;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  soundEnabled: boolean;
}

export interface UserAnswerRecord {
  questionId: string;
  questionText: string;
  options: [string, string, string, string];
  selectedAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizResult {
  total: number;
  correct: number;
  incorrect: number;
  percentage: number;
  rankTitle: string;
  rankDesc: string;
  records: UserAnswerRecord[];
}
