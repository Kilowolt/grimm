import React, { useState } from 'react';
import { X, Play, Shuffle, HelpCircle, Swords, Volume2, VolumeX, Check } from 'lucide-react';
import { GameMode, GameSettings } from '../types/quiz';
import { LotusMotif } from './DecorativeMotifs';

interface GameSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: (settings: GameSettings) => void;
  totalQuestions: number;
  initialSettings: GameSettings;
}

export const GameSetupModal: React.FC<GameSetupModalProps> = ({
  isOpen,
  onClose,
  onStart,
  totalQuestions,
  initialSettings,
}) => {
  const [questionCount, setQuestionCount] = useState<number | 'all'>(initialSettings.questionCount);
  const [mode, setMode] = useState<GameMode>(initialSettings.mode);
  const [shuffleQuestions, setShuffleQuestions] = useState<boolean>(initialSettings.shuffleQuestions);
  const [shuffleOptions, setShuffleOptions] = useState<boolean>(initialSettings.shuffleOptions);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(initialSettings.soundEnabled);

  if (!isOpen) return null;

  const countOptions: Array<{ label: string; value: number | 'all'; disabled?: boolean }> = [
    { label: '5 câu', value: 5, disabled: totalQuestions < 5 },
    { label: '10 câu', value: 10, disabled: totalQuestions < 10 },
    { label: '15 câu', value: 15, disabled: totalQuestions < 15 },
    { label: '20 câu', value: 20, disabled: totalQuestions < 20 },
    { label: `Toàn bộ (${totalQuestions})`, value: 'all' },
  ];

  const handleConfirm = () => {
    onStart({
      questionCount,
      mode,
      shuffleQuestions,
      shuffleOptions,
      soundEnabled,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FFFCF7] border border-[#D99A72]/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#D99A72]/20 pb-4">
          <div className="flex items-center gap-2">
            <LotusMotif size={24} />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#514438]">
              Thiết Lập Trò Chơi
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng bảng thiết lập"
            className="p-1.5 rounded-full hover:bg-[#E9BFA5]/20 text-[#7A6858] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5 text-sm text-[#514438]">
          {/* Section 1: Choose mode */}
          <div className="space-y-2">
            <label className="font-semibold block text-[#514438]">1. Chọn Chế Độ Chơi:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMode('practice')}
                className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                  mode === 'practice'
                    ? 'border-[#D99A72] bg-[#FFF0E5] shadow-xs'
                    : 'border-[#D99A72]/20 bg-[#FFF7ED] hover:bg-[#FFF0E5]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#514438]">
                    <HelpCircle size={16} className="text-[#D99A72]" />
                    <span>Luyện Tập</span>
                  </div>
                  {mode === 'practice' && <Check size={16} className="text-[#D99A72]" />}
                </div>
                <p className="text-xs text-[#7A6858] leading-relaxed">
                  Xem ngay lời giải thích chuyên sâu sau mỗi câu trả lời.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setMode('challenge')}
                className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                  mode === 'challenge'
                    ? 'border-[#D99A72] bg-[#FFF0E5] shadow-xs'
                    : 'border-[#D99A72]/20 bg-[#FFF7ED] hover:bg-[#FFF0E5]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#514438]">
                    <Swords size={16} className="text-[#A8B89A]" />
                    <span>Thử Thách</span>
                  </div>
                  {mode === 'challenge' && <Check size={16} className="text-[#D99A72]" />}
                </div>
                <p className="text-xs text-[#7A6858] leading-relaxed">
                  Thi đấu liên tục không lộ đáp án cho đến khi xem kết quả cuối cùng.
                </p>
              </button>
            </div>
          </div>

          {/* Section 2: Choose question count */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold block text-[#514438]">2. Số Lượng Câu Hỏi:</label>
              <span className="text-xs text-[#7A6858]">Hiện có {totalQuestions} câu</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {countOptions.map(opt => {
                const isSelected = questionCount === opt.value;
                return (
                  <button
                    key={String(opt.value)}
                    type="button"
                    disabled={opt.disabled}
                    onClick={() => setQuestionCount(opt.value)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                      opt.disabled
                        ? 'opacity-40 cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400'
                        : isSelected
                        ? 'border-[#D99A72] bg-[#D99A72] text-white shadow-xs'
                        : 'border-[#D99A72]/25 bg-[#FFF7ED] text-[#514438] hover:bg-[#FFF0E5]'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Shuffles & Audio */}
          <div className="space-y-2 pt-1 border-t border-[#D99A72]/15">
            <label className="font-semibold block text-[#514438] pt-1">3. Tùy Chọn Khác:</label>
            <div className="space-y-2.5">
              <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFF7ED] border border-[#D99A72]/15 cursor-pointer hover:bg-[#FFF0E5]/60 transition-colors">
                <div className="flex items-center gap-2">
                  <Shuffle size={16} className="text-[#7A6858]" />
                  <span className="text-xs sm:text-sm">Xáo trộn thứ tự câu hỏi</span>
                </div>
                <input
                  type="checkbox"
                  checked={shuffleQuestions}
                  onChange={(e) => setShuffleQuestions(e.target.checked)}
                  className="w-4 h-4 accent-[#D99A72] rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFF7ED] border border-[#D99A72]/15 cursor-pointer hover:bg-[#FFF0E5]/60 transition-colors">
                <div className="flex items-center gap-2">
                  <Shuffle size={16} className="text-[#7A6858]" />
                  <span className="text-xs sm:text-sm">Xáo trộn vị trí đáp án (A, B, C, D)</span>
                </div>
                <input
                  type="checkbox"
                  checked={shuffleOptions}
                  onChange={(e) => setShuffleOptions(e.target.checked)}
                  className="w-4 h-4 accent-[#D99A72] rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFF7ED] border border-[#D99A72]/15 cursor-pointer hover:bg-[#FFF0E5]/60 transition-colors">
                <div className="flex items-center gap-2">
                  {soundEnabled ? <Volume2 size={16} className="text-[#D99A72]" /> : <VolumeX size={16} className="text-[#7A6858]" />}
                  <span className="text-xs sm:text-sm">Âm thanh click phách và chuông</span>
                </div>
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                  className="w-4 h-4 accent-[#D99A72] rounded cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#D99A72]/20">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-[#D99A72]/30 text-sm font-medium text-[#7A6858] hover:bg-[#FFF7ED] transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-6 py-2.5 rounded-xl bg-[#D99A72] hover:bg-[#C98A62] text-white text-sm font-semibold shadow-xs flex items-center gap-2 transition-all"
          >
            <Play size={16} className="fill-white" />
            <span>VÀO CHƠI NGAY</span>
          </button>
        </div>
      </div>
    </div>
  );
};
