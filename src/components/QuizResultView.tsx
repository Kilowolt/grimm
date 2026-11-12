import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Home, Award, CheckCircle2, XCircle, ChevronDown, ChevronUp, Sparkles, BookOpen } from 'lucide-react';
import { QuizResult } from '../types/quiz';
import { LotusMotif, PaperFanMotif } from './DecorativeMotifs';
import { playFanfare } from '../utils/sound';

interface QuizResultViewProps {
  result: QuizResult;
  soundEnabled: boolean;
  onPlayAgain: () => void;
  onGoHome: () => void;
  onOpenManager: () => void;
}

export const QuizResultView: React.FC<QuizResultViewProps> = ({
  result,
  soundEnabled,
  onPlayAgain,
  onGoHome,
  onOpenManager,
}) => {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  useEffect(() => {
    // Fire celebration confetti with warm pastel tones
    if (result.percentage >= 50) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D99A72', '#E9BFA5', '#A8B89A', '#FFF7ED', '#C98A62'],
        });
      } catch {
        // Safe fallback
      }
    }

    if (soundEnabled && result.percentage >= 50) {
      playFanfare();
    }
  }, [result.percentage, soundEnabled]);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 animate-in fade-in duration-300">
      {/* Result Card Hero */}
      <div className="bg-[#FFFCF7] rounded-3xl p-6 sm:p-10 border border-[#D99A72]/30 shadow-xl text-center space-y-6 relative overflow-hidden">
        {/* Subtle decorative motif */}
        <div className="absolute top-4 left-4 pointer-events-none opacity-20">
          <PaperFanMotif size={60} />
        </div>
        <div className="absolute top-4 right-4 pointer-events-none opacity-20">
          <LotusMotif size={60} />
        </div>

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9BFA5]/30 text-[#7A543B] text-xs font-semibold">
            <Sparkles size={14} className="text-[#D99A72]" />
            <span>KẾT QUẢ CUỘC THI</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#514438]">
            {result.rankTitle}
          </h1>
          <p className="text-sm sm:text-base text-[#6E5A4A] max-w-md mx-auto">
            {result.rankDesc}
          </p>
        </div>

        {/* Score & Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto relative z-10">
          <div className="bg-[#FFF7ED] rounded-2xl p-4 border border-[#D99A72]/20 space-y-1">
            <span className="text-xs text-[#7A6858] font-medium">Tổng điểm</span>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#D99A72] tabular-nums">
              {result.correct} / {result.total}
            </div>
          </div>

          <div className="bg-[#FFF7ED] rounded-2xl p-4 border border-[#D99A72]/20 space-y-1">
            <span className="text-xs text-[#7A6858] font-medium">Độ chính xác</span>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#514438] tabular-nums">
              {result.percentage}%
            </div>
          </div>

          <div className="bg-[#FFF7ED] rounded-2xl p-4 border border-[#8CA482]/30 space-y-1">
            <span className="text-xs text-[#52744C] font-medium">Số câu đúng</span>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#52744C] tabular-nums flex items-center justify-center gap-1">
              <CheckCircle2 size={20} />
              <span>{result.correct}</span>
            </div>
          </div>

          <div className="bg-[#FFF7ED] rounded-2xl p-4 border border-[#D97368]/30 space-y-1">
            <span className="text-xs text-[#8A372E] font-medium">Số câu sai</span>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#8A372E] tabular-nums flex items-center justify-center gap-1">
              <XCircle size={20} />
              <span>{result.incorrect}</span>
            </div>
          </div>
        </div>

        {/* Rank Criteria Reference */}
        <div className="text-xs text-[#7A6858] bg-[#FFF7ED]/70 rounded-xl p-3 max-w-xl mx-auto border border-[#D99A72]/15">
          <span className="font-semibold text-[#514438]">Thang xếp hạng:</span> 90–100%: Bậc thầy Ca trù · 70–89%: Người am hiểu di sản · 50–69%: Người khám phá · Dưới 50%: Tân binh di sản.
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 relative z-10">
          <button
            onClick={onPlayAgain}
            className="px-6 py-3 rounded-xl bg-[#D99A72] hover:bg-[#C98A62] text-white font-semibold text-sm shadow-sm flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <RotateCcw size={16} />
            <span>Chơi lại</span>
          </button>

          <button
            onClick={onGoHome}
            className="px-6 py-3 rounded-xl bg-[#FFFCF7] border border-[#D99A72]/30 hover:bg-[#FFF7ED] text-[#514438] font-medium text-sm flex items-center gap-2 transition-colors"
          >
            <Home size={16} className="text-[#D99A72]" />
            <span>Về trang chủ</span>
          </button>

          <button
            onClick={onOpenManager}
            className="px-5 py-3 rounded-xl bg-[#FFFCF7] border border-[#D99A72]/30 hover:bg-[#FFF7ED] text-[#7A6858] font-medium text-sm flex items-center gap-2 transition-colors"
          >
            <BookOpen size={16} />
            <span>Quản lý câu hỏi</span>
          </button>
        </div>
      </div>

      {/* Answer Review Section */}
      <div className="bg-[#FFFCF7] rounded-3xl p-6 sm:p-8 border border-[#D99A72]/20 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-[#D99A72]/20 pb-4">
          <div className="flex items-center gap-2">
            <Award size={20} className="text-[#D99A72]" />
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#514438]">
              Xem Lại Chi Tiết Từng Câu Hỏi
            </h2>
          </div>
          <span className="text-xs text-[#7A6858]">
            {result.records.length} câu hỏi
          </span>
        </div>

        <div className="space-y-3">
          {result.records.map((rec, idx) => {
            const isExpanded = expandedIndex === idx;
            const optionLetters = ['A', 'B', 'C', 'D'];

            return (
              <div
                key={rec.questionId || idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  rec.isCorrect
                    ? 'border-[#8CA482]/40 bg-[#FFF7ED]'
                    : 'border-[#D97368]/40 bg-[#FFF7ED]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleExpand(idx)}
                  className="w-full p-4 flex items-center justify-between text-left gap-3"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-white ${
                        rec.isCorrect ? 'bg-[#8CA482]' : 'bg-[#D97368]'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="text-sm font-semibold text-[#514438] leading-snug line-clamp-2">
                      {rec.questionText}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {rec.isCorrect ? (
                      <span className="text-xs font-semibold text-[#52744C] flex items-center gap-1">
                        <CheckCircle2 size={16} />
                        <span className="hidden sm:inline">Đúng</span>
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-[#8A372E] flex items-center gap-1">
                        <XCircle size={16} />
                        <span className="hidden sm:inline">Sai</span>
                      </span>
                    )}
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-[#D99A72]/15 space-y-3 text-xs sm:text-sm">
                    {/* Options list */}
                    <div className="space-y-1.5 pt-2">
                      {rec.options.map((opt, oIdx) => {
                        const isCorrectOption = oIdx === rec.correctAnswer;
                        const isSelectedOption = oIdx === rec.selectedAnswer;

                        return (
                          <div
                            key={oIdx}
                            className={`p-2.5 rounded-xl border flex items-center justify-between text-xs sm:text-sm ${
                              isCorrectOption
                                ? 'border-[#8CA482] bg-[#EEF4EC] text-[#2C4A28] font-semibold'
                                : isSelectedOption
                                ? 'border-[#D97368] bg-[#FDF0EE] text-[#692A22]'
                                : 'border-gray-200 bg-white/70 text-[#7A6858]'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs">
                                {optionLetters[oIdx]}.
                              </span>
                              <span>{opt}</span>
                            </div>
                            {isCorrectOption && (
                              <span className="text-[11px] font-bold text-[#52744C]">Đáp án đúng</span>
                            )}
                            {!isCorrectOption && isSelectedOption && (
                              <span className="text-[11px] font-bold text-[#8A372E]">Bạn đã chọn</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="p-3 bg-[#FFFCF7] rounded-xl border border-[#D99A72]/20 text-[#6E5A4A] space-y-1">
                      <span className="font-semibold text-[#514438] block">Kiến thức văn hóa:</span>
                      <p className="leading-relaxed">{rec.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
