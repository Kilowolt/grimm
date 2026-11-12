import React, { useState, useMemo } from 'react';
import { Search, Plus, Upload, Download, Trash2, Edit3, ArrowLeft, RotateCcw, CheckCircle2, X } from 'lucide-react';
import { Question } from '../types/quiz';
import { exportQuestionsToJSON, exportQuestionsToCSV } from '../utils/fileParser';
import { LotusMotif, PaperFanMotif } from './DecorativeMotifs';

interface QuestionManagerViewProps {
  questions: Question[];
  onAddQuestion: (q: Question) => void;
  onUpdateQuestion: (q: Question) => void;
  onDeleteQuestion: (id: string) => void;
  onResetToDefault: () => void;
  onClearAll: () => void;
  onOpenUploadModal: () => void;
  onGoHome: () => void;
  onStartGame: () => void;
}

export const QuestionManagerView: React.FC<QuestionManagerViewProps> = ({
  questions,
  onAddQuestion,
  onUpdateQuestion,
  onDeleteQuestion,
  onResetToDefault,
  onClearAll,
  onOpenUploadModal,
  onGoHome,
  onStartGame,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Filtered questions based on search query
  const filteredQuestions = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return questions;
    return questions.filter(
      (q) =>
        q.question.toLowerCase().includes(term) ||
        q.options.some((opt) => opt.toLowerCase().includes(term)) ||
        (q.explanation && q.explanation.toLowerCase().includes(term)) ||
        (q.category && q.category.toLowerCase().includes(term))
    );
  }, [questions, searchTerm]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#D99A72]/20 pb-5">
        <div className="space-y-1">
          <button
            onClick={onGoHome}
            className="inline-flex items-center gap-1.5 text-xs text-[#7A6858] hover:text-[#514438] transition-colors mb-1 font-medium"
          >
            <ArrowLeft size={14} />
            <span>Về trang chủ</span>
          </button>
          <div className="flex items-center gap-2.5">
            <LotusMotif size={24} />
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#514438]">
              Quản Lý Bộ Câu Hỏi Ca Trù
            </h1>
            <span className="text-xs bg-[#E9BFA5]/30 text-[#7A5B45] px-2.5 py-0.5 rounded-full font-bold">
              {questions.length} câu
            </span>
          </div>
        </div>

        {/* Global Toolbar buttons */}
        <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-auto">
          <button
            onClick={() => setIsAddingNew(true)}
            className="px-4 py-2 bg-[#D99A72] hover:bg-[#C98A62] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <Plus size={16} />
            <span>Thêm câu mới</span>
          </button>

          <button
            onClick={onOpenUploadModal}
            className="px-3.5 py-2 bg-[#FFFCF7] border border-[#D99A72]/30 hover:bg-[#FFF0E5] text-[#514438] rounded-xl text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors"
          >
            <Upload size={15} className="text-[#A8B89A]" />
            <span>Nhập tệp</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="px-3.5 py-2 bg-[#FFFCF7] border border-[#D99A72]/30 hover:bg-[#FFF0E5] text-[#514438] rounded-xl text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors"
            >
              <Download size={15} className="text-[#D99A72]" />
              <span>Xuất tệp</span>
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-1 w-44 bg-[#FFFCF7] border border-[#D99A72]/30 rounded-2xl shadow-lg z-20 py-1.5 text-xs">
                <button
                  onClick={() => {
                    exportQuestionsToJSON(questions);
                    setShowExportMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-[#FFF0E5] text-[#514438] transition-colors"
                >
                  Xuất định dạng JSON
                </button>
                <button
                  onClick={() => {
                    exportQuestionsToCSV(questions);
                    setShowExportMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-[#FFF0E5] text-[#514438] transition-colors"
                >
                  Xuất định dạng CSV (Excel)
                </button>
              </div>
            )}
          </div>

          <button
            onClick={onStartGame}
            className="px-4 py-2 bg-[#A8B89A] hover:bg-[#97A789] text-[#2F3D27] rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors ml-auto sm:ml-0"
          >
            <PaperFanMotif size={16} />
            <span>Vào chơi ngay</span>
          </button>
        </div>
      </div>

      {/* Search Bar & Reset actions */}
      <div className="bg-[#FFFCF7] rounded-2xl p-4 border border-[#D99A72]/20 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A6858]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm nội dung câu hỏi, đáp án, hoặc kiến thức di sản..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D99A72]/25 bg-[#FFF7ED] text-sm text-[#514438] placeholder-[#A39282] focus:outline-none focus:ring-2 focus:ring-[#D99A72]/40"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0 text-xs">
          <button
            onClick={onResetToDefault}
            title="Khôi phục 15 câu hỏi nguyên bản về Ca trù"
            className="px-3 py-2 rounded-xl text-[#7A6858] hover:text-[#514438] hover:bg-[#FFF7ED] border border-[#D99A72]/20 flex items-center gap-1 transition-colors"
          >
            <RotateCcw size={14} />
            <span>Khôi phục 15 câu gốc</span>
          </button>

          <button
            onClick={() => setShowClearConfirm(true)}
            className="px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 border border-red-200 flex items-center gap-1 transition-colors"
          >
            <Trash2 size={14} />
            <span>Xóa sạch bộ câu hỏi</span>
          </button>
        </div>
      </div>

      {/* Question Cards List */}
      <div className="space-y-3.5">
        {filteredQuestions.length === 0 ? (
          <div className="bg-[#FFFCF7] rounded-3xl p-12 text-center border border-[#D99A72]/20 space-y-3">
            <LotusMotif size={40} className="mx-auto opacity-40" />
            <h3 className="font-serif font-bold text-lg text-[#514438]">
              Không tìm thấy câu hỏi nào
            </h3>
            <p className="text-xs sm:text-sm text-[#7A6858] max-w-sm mx-auto">
              {searchTerm ? 'Không có câu hỏi nào khớp với từ khóa tìm kiếm.' : 'Hiện tại kho câu hỏi đang rỗng.'}
            </p>
            {!searchTerm && (
              <button
                onClick={onResetToDefault}
                className="px-4 py-2 rounded-xl bg-[#D99A72] text-white text-xs font-semibold shadow-xs"
              >
                Tải lại 15 câu Ca trù mặc định
              </button>
            )}
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const optionLetters = ['A', 'B', 'C', 'D'];

            return (
              <div
                key={q.id || idx}
                className="bg-[#FFFCF7] rounded-2xl p-5 border border-[#D99A72]/25 shadow-xs hover:border-[#D99A72]/50 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#E9BFA5]/30 text-[#7A543B] font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      {q.category && (
                        <span className="text-xs bg-[#FFF7ED] text-[#7A5B45] px-2 py-0.5 rounded-md border border-[#D99A72]/20">
                          {q.category}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[#514438] leading-snug pt-1">
                      {q.question}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => setEditingQuestion(q)}
                      className="p-2 text-[#7A6858] hover:text-[#514438] hover:bg-[#FFF7ED] rounded-xl border border-transparent hover:border-[#D99A72]/20 transition-colors"
                      title="Chỉnh sửa câu hỏi này"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => onDeleteQuestion(q.id)}
                      className="p-2 text-[#7A6858] hover:text-red-600 hover:bg-red-50 rounded-xl border border-transparent hover:border-red-200 transition-colors"
                      title="Xóa câu hỏi này"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* 4 Options preview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt, oIdx) => {
                    const isCorrect = oIdx === q.answer;
                    return (
                      <div
                        key={oIdx}
                        className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                          isCorrect
                            ? 'border-[#8CA482] bg-[#EEF4EC] text-[#2C4A28] font-semibold'
                            : 'border-gray-200 bg-[#FFF7ED]/50 text-[#7A6858]'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-md flex items-center justify-center font-bold bg-white text-xs shrink-0 shadow-2xs">
                          {optionLetters[oIdx]}
                        </span>
                        <span className="truncate">{opt}</span>
                        {isCorrect && (
                          <span className="ml-auto text-[10px] bg-[#8CA482] text-white px-1.5 py-0.5 rounded">
                            Đáp án đúng
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {q.explanation && (
                  <div className="p-3 rounded-xl bg-[#FFF7ED] text-xs text-[#6E5A4A] border border-[#D99A72]/15">
                    <span className="font-semibold text-[#514438]">Giải thích: </span>
                    <span>{q.explanation}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Edit or Add Question Form Modal */}
      {(editingQuestion || isAddingNew) && (
        <QuestionEditorModal
          initialData={editingQuestion}
          onClose={() => {
            setEditingQuestion(null);
            setIsAddingNew(false);
          }}
          onSave={(savedQuestion) => {
            if (editingQuestion) {
              onUpdateQuestion(savedQuestion);
            } else {
              onAddQuestion(savedQuestion);
            }
            setEditingQuestion(null);
            setIsAddingNew(false);
          }}
        />
      )}

      {/* Clear All Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-[#FFFCF7] rounded-3xl p-6 max-w-sm w-full border border-[#D99A72]/30 shadow-xl space-y-4 text-center">
            <h3 className="font-serif font-bold text-lg text-red-600">
              Xóa sạch toàn bộ câu hỏi?
            </h3>
            <p className="text-xs sm:text-sm text-[#7A6858]">
              Thao tác này sẽ xóa tất cả {questions.length} câu hỏi hiện có. Bạn có thể khôi phục lại 15 câu hỏi mặc định bất kỳ lúc nào.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-xl border border-[#D99A72]/30 text-xs sm:text-sm font-medium text-[#7A6858] hover:bg-[#FFF7ED]"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => {
                  onClearAll();
                  setShowClearConfirm(false);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface QuestionEditorModalProps {
  initialData: Question | null;
  onClose: () => void;
  onSave: (q: Question) => void;
}

const QuestionEditorModal: React.FC<QuestionEditorModalProps> = ({
  initialData,
  onClose,
  onSave,
}) => {
  const [questionText, setQuestionText] = useState(initialData?.question || '');
  const [optionA, setOptionA] = useState(initialData?.options[0] || '');
  const [optionB, setOptionB] = useState(initialData?.options[1] || '');
  const [optionC, setOptionC] = useState(initialData?.options[2] || '');
  const [optionD, setOptionD] = useState(initialData?.options[3] || '');
  const [answer, setAnswer] = useState<number>(initialData?.answer ?? 0);
  const [explanation, setExplanation] = useState(initialData?.explanation || '');
  const [category, setCategory] = useState(initialData?.category || 'Ca trù di sản');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!questionText.trim()) {
      setFormError('Vui lòng nhập nội dung câu hỏi.');
      return;
    }
    if (!optionA.trim() || !optionB.trim() || !optionC.trim() || !optionD.trim()) {
      setFormError('Vui lòng điền đầy đủ cả 4 phương án A, B, C, D.');
      return;
    }

    const payload: Question = {
      id: initialData?.id || `custom-${Date.now()}`,
      question: questionText.trim(),
      options: [optionA.trim(), optionB.trim(), optionC.trim(), optionD.trim()],
      answer,
      explanation: explanation.trim() || 'Không có giải thích chi tiết.',
      category: category.trim() || 'Ca trù di sản',
    };

    onSave(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FFFCF7] border border-[#D99A72]/30 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#D99A72]/20 pb-3">
          <h2 className="font-serif text-xl font-bold text-[#514438]">
            {initialData ? 'Chỉnh Sửa Câu Hỏi' : 'Thêm Câu Hỏi Mới'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#7A6858] hover:bg-[#E9BFA5]/20"
          >
            <X size={20} />
          </button>
        </div>

        {formError && (
          <div className="p-3 bg-[#FDF0EE] border border-[#D97368]/40 rounded-xl text-xs text-[#8A372E]">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm text-[#514438]">
          <div className="space-y-1">
            <label className="font-semibold block">Nội dung câu hỏi (*):</label>
            <textarea
              rows={3}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Nhập nội dung câu hỏi về Ca trù..."
              className="w-full p-3 rounded-xl border border-[#D99A72]/30 bg-[#FFF7ED] text-sm focus:outline-none focus:ring-2 focus:ring-[#D99A72]/40"
            />
          </div>

          <div className="space-y-2">
            <label className="font-semibold block">4 Đáp án & Chọn đáp án đúng (*):</label>
            <div className="space-y-2">
              {[
                { letter: 'A', value: optionA, setVal: setOptionA, index: 0 },
                { letter: 'B', value: optionB, setVal: setOptionB, index: 1 },
                { letter: 'C', value: optionC, setVal: setOptionC, index: 2 },
                { letter: 'D', value: optionD, setVal: setOptionD, index: 3 },
              ].map((opt) => (
                <div
                  key={opt.letter}
                  className={`p-2.5 rounded-xl border flex items-center gap-3 transition-colors ${
                    answer === opt.index
                      ? 'border-[#8CA482] bg-[#EEF4EC]'
                      : 'border-[#D99A72]/20 bg-[#FFF7ED]'
                  }`}
                >
                  <label className="flex items-center gap-1.5 cursor-pointer font-bold text-xs shrink-0">
                    <input
                      type="radio"
                      name="correctAnswerRadio"
                      checked={answer === opt.index}
                      onChange={() => setAnswer(opt.index)}
                      className="accent-[#8CA482]"
                    />
                    <span>{opt.letter}</span>
                  </label>
                  <input
                    type="text"
                    value={opt.value}
                    onChange={(e) => opt.setVal(e.target.value)}
                    placeholder={`Nội dung đáp án ${opt.letter}...`}
                    className="flex-1 bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-xs sm:text-sm focus:outline-none"
                  />
                  {answer === opt.index && (
                    <span className="text-[11px] font-bold text-[#52744C] shrink-0 hidden sm:inline">
                      Đáp án đúng
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold block">Giải thích di sản (Hiển thị sau khi trả lời):</label>
            <textarea
              rows={2}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Cung cấp kiến thức hoặc ngữ cảnh lịch sử..."
              className="w-full p-2.5 rounded-xl border border-[#D99A72]/30 bg-[#FFF7ED] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D99A72]/40"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold block">Chủ đề / Phân loại:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Ví dụ: Nhạc cụ, Nghệ nhân, Lịch sử, UNESCO..."
              className="w-full p-2.5 rounded-xl border border-[#D99A72]/30 bg-[#FFF7ED] text-xs sm:text-sm focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#D99A72]/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#D99A72]/30 text-xs sm:text-sm font-medium text-[#7A6858] hover:bg-[#FFF7ED]"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#D99A72] hover:bg-[#C98A62] text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <CheckCircle2 size={16} />
              <span>{initialData ? 'Lưu thay đổi' : 'Thêm vào bộ câu hỏi'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
