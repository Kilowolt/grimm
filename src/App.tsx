/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Question, GameSettings, QuizResult, UserAnswerRecord } from './types/quiz';
import { DEFAULT_QUESTIONS } from './data/defaultQuestions';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { GameSetupModal } from './components/GameSetupModal';
import { QuizPlayView } from './components/QuizPlayView';
import { QuizResultView } from './components/QuizResultView';
import { QuestionManagerView } from './components/QuestionManagerView';
import { UploadQuestionModal } from './components/UploadQuestionModal';
import { Footer } from './components/Footer';

const STORAGE_KEY_QUESTIONS = 'ca_tru_heritage_questions_v1';
const STORAGE_KEY_SOUND = 'ca_tru_sound_preference';

export default function App() {
  const [questions, setQuestions] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_QUESTIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return DEFAULT_QUESTIONS;
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SOUND);
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const [currentView, setCurrentView] = useState<'home' | 'play' | 'result' | 'manager'>('home');
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Active game session
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentGameSettings, setCurrentGameSettings] = useState<GameSettings>({
    questionCount: 10,
    mode: 'practice',
    shuffleQuestions: true,
    shuffleOptions: true,
    soundEnabled: true,
  });

  // Result state
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  // Sync questions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(questions));
    } catch {
      // ignore
    }
  }, [questions]);

  // Sync sound to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SOUND, String(soundEnabled));
    } catch {
      // ignore
    }
  }, [soundEnabled]);

  const handleToggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  /**
   * Start a new game with the user's settings
   */
  const handleStartGame = (settings: GameSettings) => {
    setCurrentGameSettings(settings);
    setSoundEnabled(settings.soundEnabled);

    let prepared = [...questions];

    // Shuffle questions if requested
    if (settings.shuffleQuestions) {
      prepared = prepared.sort(() => Math.random() - 0.5);
    }

    // Limit count
    const count = settings.questionCount === 'all' ? prepared.length : Math.min(settings.questionCount, prepared.length);
    prepared = prepared.slice(0, count);

    // Shuffle options if requested (preserving answer alignment)
    if (settings.shuffleOptions) {
      prepared = prepared.map((q) => {
        const originalCorrectText = q.options[q.answer];
        // Create an indexed array to shuffle
        const shuffled = [...q.options].sort(() => Math.random() - 0.5) as [string, string, string, string];
        const newAnswerIndex = shuffled.indexOf(originalCorrectText);

        return {
          ...q,
          options: shuffled,
          answer: newAnswerIndex >= 0 ? newAnswerIndex : 0,
        };
      });
    }

    setActiveQuestions(prepared);
    setIsSetupOpen(false);
    setCurrentView('play');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Finish quiz and compute rank
   */
  const handleFinishQuiz = (records: UserAnswerRecord[], correctCount: number) => {
    const total = records.length;
    const incorrectCount = total - correctCount;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    let rankTitle = 'Tân binh di sản';
    let rankDesc = 'Bạn đang ở những bước đầu khám phá kho tàng Ca trù. Hãy chơi lại để nắm vững thêm các tri thức văn hóa nhé!';

    if (percentage >= 90) {
      rankTitle = 'Bậc Thầy Ca Trù';
      rankDesc = 'Xuất sắc! Bạn nắm giữ hiểu biết uyên bác về âm nhạc cổ truyền, xứng danh tri âm tri kỷ của nghệ thuật Ca trù.';
    } else if (percentage >= 70) {
      rankTitle = 'Người Am Hiểu Di Sản';
      rankDesc = 'Ấn tượng! Bạn có vốn hiểu biết rất sâu sắc về các lề lối, nhạc khí và không gian diễn xướng Ca trù.';
    } else if (percentage >= 50) {
      rankTitle = 'Người Khám Phá';
      rankDesc = 'Khá tốt! Bạn đã có những nhận thức cơ bản về loại hình nghệ thuật di sản độc đáo này.';
    }

    setQuizResult({
      total,
      correct: correctCount,
      incorrect: incorrectCount,
      percentage,
      rankTitle,
      rankDesc,
      records,
    });

    setCurrentView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Question bank modifications
   */
  const handleAddQuestion = (newQ: Question) => {
    setQuestions((prev) => [newQ, ...prev]);
  };

  const handleUpdateQuestion = (updatedQ: Question) => {
    setQuestions((prev) => prev.map((q) => (q.id === updatedQ.id ? updatedQ : q)));
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleResetToDefault = () => {
    setQuestions(DEFAULT_QUESTIONS);
  };

  const handleClearAllQuestions = () => {
    setQuestions([]);
  };

  const handleApplyImportedQuestions = (newQuestions: Question[], mode: 'replace' | 'append') => {
    if (mode === 'replace') {
      setQuestions(newQuestions);
    } else {
      setQuestions((prev) => [...prev, ...newQuestions]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF7ED] text-[#514438] selection:bg-[#E9BFA5] selection:text-[#514438]">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSetup={() => setIsSetupOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        questionCount={questions.length}
      />

      {/* Main Views */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            questionCount={questions.length}
            onStartGame={() => setIsSetupOpen(true)}
            onOpenManager={() => {
              setCurrentView('manager');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenUpload={() => setIsUploadOpen(true)}
          />
        )}

        {currentView === 'play' && activeQuestions.length > 0 && (
          <QuizPlayView
            questions={activeQuestions}
            mode={currentGameSettings.mode}
            soundEnabled={soundEnabled}
            onFinish={handleFinishQuiz}
            onQuitToHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'result' && quizResult && (
          <QuizResultView
            result={quizResult}
            soundEnabled={soundEnabled}
            onPlayAgain={() => handleStartGame(currentGameSettings)}
            onGoHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenManager={() => {
              setCurrentView('manager');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'manager' && (
          <QuestionManagerView
            questions={questions}
            onAddQuestion={handleAddQuestion}
            onUpdateQuestion={handleUpdateQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onResetToDefault={handleResetToDefault}
            onClearAll={handleClearAllQuestions}
            onOpenUploadModal={() => setIsUploadOpen(true)}
            onGoHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onStartGame={() => setIsSetupOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onGoHome={() => {
          setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenManager={() => {
          setCurrentView('manager');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSetup={() => setIsSetupOpen(true)}
      />

      {/* Game Setup Modal */}
      <GameSetupModal
        isOpen={isSetupOpen}
        onClose={() => setIsSetupOpen(false)}
        onStart={handleStartGame}
        totalQuestions={questions.length}
        initialSettings={{
          ...currentGameSettings,
          soundEnabled,
        }}
      />

      {/* Upload Question Modal */}
      <UploadQuestionModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onApplyQuestions={handleApplyImportedQuestions}
        currentQuestionsCount={questions.length}
      />
    </div>
  );
}
