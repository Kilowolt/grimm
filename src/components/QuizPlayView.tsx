import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, XCircle, Award, Sparkles, HelpCircle, LogOut } from 'lucide-react';
import { Question, GameMode, UserAnswerRecord } from '../types/quiz';
import { LotusMotif, PaperFanMotif } from './DecorativeMotifs';
import { playPhachClick, playCorrectChime, playWrongTone } from '../utils/sound';

interface QuizPlayViewProps {
  questions: Question[];
  mode: GameMode;
  soundEnabled: boolean;
  onFinish: (records: UserAnswerRecord[], correctCount: number) => void;
  onQuitToHome: () => void;
}

export const QuizPlayView: React.FC<QuizPlayViewProps> = ({
  questions,
  mode,
  soundEnabled,
  onFinish,
  onQuitToHome,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [records, setRecords] = useState<UserAnswerRecord[]>([]);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  const currentQuestion = questions[currentIndex];
  const total = questions.length;
  const progressPercent = Math.round(((currentIndex + (isAnswered ? 1 : 0)) / total) * 100);

  const optionLabels = ['A', 'B', 'C', 'D'];

  const handleSelectOption = (index: number) => {
    if (isAnswered && mode === 'practice') return; // Cannot change answer in practice mode

    if (soundEnabled) {
      playPhachClick();
    }

    if (mode === 'practice') {
      // In practice mode, locking in answer immediately
      setSelectedAnswer(index);
      setIsAnswered(true);

      const isCorrect = index === currentQuestion.answer;
      if (isCorrect) {
        setScore((prev) => prev + 1);
        if (soundEnabled) playCorrectChime();
      } else {
        if (soundEnabled) playWrongTone();
      }

      setRecords((prev) => [
        ...prev,
        {
          questionId: currentQuestion.id,
          questionText: currentQuestion.question,
          options: currentQuestion.options,
          selectedAnswer: index,
          correctAnswer: currentQuestion.answer,
          isCorrect,
          explanation: currentQuestion.explanation,
        },
      ]);
    } else {
      // In challenge mode, select option first
      setSelectedAnswer(index);
    }
  };

  const handleConfirmChallengeAnswer = () => {
    if (selectedAnswer === null) return;

    if (soundEnabled) playPhachClick();

    const isCorrect = selectedAnswer === currentQuestion.answer;
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);

    const newRecord: UserAnswerRecord = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      options: currentQuestion.options,
      selectedAnswer,
      correctAnswer: currentQuestion.answer,
      isCorrect,
      explanation: currentQuestion.explanation,
    };
    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);

    // Proceed to next question or finish
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      onFinish(updatedRecords, newScore);
    }
  };

  const handleNextQuestion = () => {
    if (soundEnabled) playPhachClick();

    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      onFinish(records, score);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* Quiz Top Bar: Progress, Question Counter & Score */}
      <div className="bg-[#FFFCF7] rounded-2xl p-4 sm:p-5 border border-[#D99A72]/20 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-[#7A6858]">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-[#514438] text-base">
              Câu {currentIndex + 1} / {total}
            </span>
            {currentQuestion.category && (
              <span className="hidden sm:inline-block text-xs bg-[#E9BFA5]/25 text-[#7A5B45] px-2 py-0.5 rounded-md">
                {currentQuestion.category}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 font-semibold text-[#D99A72]">
              <Award size={16} />
              <span>Điểm: </span>
              <span className="text-[#514438] font-bold tabular-nums">{score}</span>
            </div>

            <button
              onClick={() => setShowQuitConfirm(true)}
              title="Dừng và về trang chủ"
              className="flex items-center gap-1 text-xs text-[#7A6858] hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Thoát</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#E9BFA5]/30 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-linear-to-r from-[#D99A72] to-[#A8B89A] h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-[#FFFCF7] rounded-3xl p-6 sm:p-8 border border-[#D99A72]/25 shadow-lg space-y-6 relative overflow-hidden">
        {/* Subtle decorative motif top-right */}
        <div className="absolute top-4 right-4 pointer-events-none opacity-20">
          <LotusMotif size={56} />
        </div>

        {/* Question Text */}
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D99A72] uppercase tracking-wide">
            <Sparkles size={13} />
            <span>Câu hỏi số {currentIndex + 1}</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#514438] leading-snug">
            {currentQuestion.question}
          </h2>
        </div>

        {/* 4 Options Grid */}
        <div className="space-y-3 relative z-10">
          {currentQuestion.options.map((optionText, idx) => {
            let optionStyles = 'border-[#D99A72]/25 bg-[#FFF7ED] hover:bg-[#FFF0E5] text-[#514438]';
            let icon = null;

            if (mode === 'practice') {
              if (isAnswered) {
                if (idx === currentQuestion.answer) {
                  // Correct answer: Sage green
                  optionStyles = 'border-[#8CA482] bg-[#EEF4EC] text-[#2C4A28] font-semibold ring-2 ring-[#8CA482]/40';
                  icon = <CheckCircle2 size={20} className="text-[#65855E] shrink-0" />;
                } else if (idx === selectedAnswer) {
                  // User picked wrong answer: Pastel rose
                  optionStyles = 'border-[#D97368] bg-[#FDF0EE] text-[#692A22] ring-2 ring-[#D97368]/40';
                  icon = <XCircle size={20} className="text-[#D97368] shrink-0" />;
                } else {
                  optionStyles = 'border-gray-200 bg-gray-50/60 text-gray-400 opacity-60';
                }
              }
            } else {
              // Challenge mode
              if (selectedAnswer === idx) {
                optionStyles = 'border-[#D99A72] bg-[#FFF0E5] text-[#514438] font-semibold ring-2 ring-[#D99A72]/50 shadow-xs';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={isAnswered && mode === 'practice'}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-3 text-sm sm:text-base ${optionStyles}`}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                      mode === 'practice' && isAnswered && idx === currentQuestion.answer
                        ? 'bg-[#8CA482] text-white'
                        : mode === 'practice' && isAnswered && idx === selectedAnswer
                        ? 'bg-[#D97368] text-white'
                        : selectedAnswer === idx
                        ? 'bg-[#D99A72] text-white'
                        : 'bg-[#E9BFA5]/40 text-[#7A5B45]'
                    }`}
                  >
                    {optionLabels[idx]}
                  </span>
                  <span className="leading-relaxed">{optionText}</span>
                </div>
                {icon}
              </button>
            );
          })}
        </div>

        {/* Practice Mode: Immediate Explanation Box */}
        {mode === 'practice' && isAnswered && (
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF7ED] border border-[#D99A72]/30 space-y-2 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 font-serif font-bold text-sm sm:text-base text-[#514438]">
              <HelpCircle size={18} className="text-[#D99A72]" />
              <span>
                {selectedAnswer === currentQuestion.answer ? 'Tuyệt vời! Giải thích di sản:' : 'Chưa chính xác! Kiến thức di sản:'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#6E5A4A] leading-relaxed">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-[#D99A72]/15 relative z-10">
          <div className="text-xs text-[#7A6858] flex items-center gap-1.5">
            <PaperFanMotif size={20} />
            <span>
              {mode === 'practice'
                ? isAnswered
                  ? 'Hãy đọc giải thích và tiếp tục'
                  : 'Chọn một đáp án để kiểm tra'
                : selectedAnswer !== null
                ? 'Đã chọn đáp án'
                : 'Chọn đáp án và bấm tiếp tục'}
            </span>
          </div>

          {mode === 'practice' ? (
            isAnswered && (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="px-6 py-3 rounded-xl bg-[#D99A72] hover:bg-[#C98A62] text-white font-semibold text-sm shadow-sm flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>{currentIndex < total - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}</span>
                <ArrowRight size={16} />
              </button>
            )
          ) : (
            <button
              type="button"
              disabled={selectedAnswer === null}
              onClick={handleConfirmChallengeAnswer}
              className={`px-6 py-3 rounded-xl font-semibold text-sm shadow-sm flex items-center gap-2 transition-all ${
                selectedAnswer === null
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#D99A72] hover:bg-[#C98A62] text-white transform hover:-translate-y-0.5'
              }`}
            >
              <span>{currentIndex < total - 1 ? 'Câu tiếp theo' : 'Hoàn thành bài thi'}</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Confirmation modal if user clicks quit */}
      {showQuitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-[#FFFCF7] rounded-3xl p-6 max-w-sm w-full border border-[#D99A72]/30 shadow-xl space-y-4 text-center">
            <h3 className="font-serif font-bold text-lg text-[#514438]">
              Dừng cuộc khám phá?
            </h3>
            <p className="text-xs sm:text-sm text-[#7A6858]">
              Tiến trình làm bài hiện tại sẽ không được lưu nếu bạn rời đi bây giờ.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowQuitConfirm(false)}
                className="px-4 py-2 rounded-xl border border-[#D99A72]/30 text-xs sm:text-sm font-medium text-[#7A6858] hover:bg-[#FFF7ED]"
              >
                Tiếp tục chơi
              </button>
              <button
                onClick={onQuitToHome}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold"
              >
                Về trang chủ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
