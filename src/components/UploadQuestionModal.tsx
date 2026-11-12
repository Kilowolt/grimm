import React, { useState, useRef } from 'react';
import { X, Upload, FileText, Download, CheckCircle2, AlertTriangle, Trash2, ArrowRight } from 'lucide-react';
import { Question } from '../types/quiz';
import { parseQuestionsJSON, parseQuestionsCSV, downloadSampleJSON, downloadSampleCSV } from '../utils/fileParser';
import { LotusMotif } from './DecorativeMotifs';

interface UploadQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyQuestions: (newQuestions: Question[], mode: 'replace' | 'append') => void;
  currentQuestionsCount: number;
}

export const UploadQuestionModal: React.FC<UploadQuestionModalProps> = ({
  isOpen,
  onClose,
  onApplyQuestions,
  currentQuestionsCount,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [parsedQuestions, setParsedQuestions] = useState<Question[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [importMode, setImportMode] = useState<'replace' | 'append'>('append');
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFile = (file: File) => {
    setIsProcessing(true);
    setFileName(file.name);
    setErrors([]);
    setParsedQuestions([]);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content !== 'string') {
        setErrors(['Không thể đọc nội dung tệp tin.']);
        setIsProcessing(false);
        return;
      }

      const lowerName = file.name.toLowerCase();
      let res;
      if (lowerName.endsWith('.json')) {
        res = parseQuestionsJSON(content);
      } else if (lowerName.endsWith('.csv') || lowerName.endsWith('.txt')) {
        res = parseQuestionsCSV(content);
      } else {
        // Try JSON first, fallback to CSV
        try {
          res = parseQuestionsJSON(content);
        } catch {
          res = parseQuestionsCSV(content);
        }
      }

      if (res.success && res.questions.length > 0) {
        setParsedQuestions(res.questions);
        setErrors(res.errors);
      } else {
        setParsedQuestions([]);
        setErrors(res.errors.length > 0 ? res.errors : ['Không tìm thấy câu hỏi hợp lệ nào trong tệp.']);
      }

      setIsProcessing(false);
    };

    reader.onerror = () => {
      setErrors(['Lỗi xảy ra trong quá trình đọc tệp từ thiết bị của bạn.']);
      setIsProcessing(false);
    };

    reader.readAsText(file, 'UTF-8');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleConfirmImport = () => {
    if (parsedQuestions.length === 0) return;
    onApplyQuestions(parsedQuestions, importMode);
    onClose();
  };

  const handleReset = () => {
    setFileName(null);
    setParsedQuestions([]);
    setErrors([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FFFCF7] border border-[#D99A72]/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#D99A72]/20 pb-4">
          <div className="flex items-center gap-2">
            <LotusMotif size={24} />
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#514438]">
                Tải Lên Bộ Câu Hỏi Mới
              </h2>
              <p className="text-xs text-[#7A6858]">
                Hỗ trợ tệp JSON hoặc CSV chuẩn tiếng Việt có dấu
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng"
            className="p-1.5 rounded-full hover:bg-[#E9BFA5]/20 text-[#7A6858] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sample Templates Download Buttons */}
        <div className="bg-[#FFF7ED] rounded-2xl p-4 border border-[#D99A72]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5 text-center sm:text-left">
            <span className="font-bold text-[#514438]">Chưa có file mẫu chuẩn?</span>
            <p className="text-[#7A6858]">Tải file mẫu về máy để điền câu hỏi của bạn dễ dàng:</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={downloadSampleJSON}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#D99A72]/30 text-[#514438] hover:bg-[#FFF0E5] font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Download size={14} className="text-[#D99A72]" />
              <span>Tải mẫu JSON</span>
            </button>
            <button
              type="button"
              onClick={downloadSampleCSV}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#D99A72]/30 text-[#514438] hover:bg-[#FFF0E5] font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Download size={14} className="text-[#A8B89A]" />
              <span>Tải mẫu CSV</span>
            </button>
          </div>
        </div>

        {/* Drag & Drop Zone */}
        {!fileName ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all duration-200 ${
              isDragging
                ? 'border-[#D99A72] bg-[#FFF0E5]/60 scale-[1.01]'
                : 'border-[#D99A72]/35 bg-[#FFF7ED] hover:bg-[#FFF0E5]/40 hover:border-[#D99A72]'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept=".json,.csv"
              className="hidden"
            />
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[#E9BFA5]/30 flex items-center justify-center text-[#D99A72]">
                <Upload size={28} />
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-sm sm:text-base text-[#514438]">
                  Kéo thả tệp JSON hoặc CSV vào đây
                </span>
                <p className="text-xs text-[#7A6858]">
                  hoặc bấm vào khung để chọn tệp từ máy tính của bạn
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* File Uploaded Overview & Preview */
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FFF7ED] border border-[#D99A72]/30">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#E9BFA5]/30 text-[#D99A72]">
                  <FileText size={20} />
                </div>
                <div>
                  <span className="font-bold text-sm text-[#514438] block">{fileName}</span>
                  <span className="text-xs text-[#7A6858]">
                    {parsedQuestions.length > 0
                      ? `Tìm thấy ${parsedQuestions.length} câu hỏi hợp lệ`
                      : 'Không có câu hỏi hợp lệ'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="p-2 text-[#7A6858] hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                title="Chọn lại tệp khác"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* Error notifications */}
            {errors.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#FDF0EE] border border-[#D97368]/40 space-y-2 text-xs text-[#8A372E]">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <AlertTriangle size={16} />
                  <span>Cảnh báo định dạng ({errors.length} mục):</span>
                </div>
                <ul className="list-disc list-inside space-y-1 max-h-28 overflow-y-auto pl-1">
                  {errors.slice(0, 5).map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                  {errors.length > 5 && <li>...và {errors.length - 5} thông báo lỗi khác.</li>}
                </ul>
              </div>
            )}

            {/* Questions Preview List */}
            {parsedQuestions.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-[#514438]">
                  <span>Xem trước ({parsedQuestions.length} câu hỏi):</span>
                  <span className="text-[#7A6858]">Kho hiện tại: {currentQuestionsCount} câu</span>
                </div>

                <div className="max-h-56 overflow-y-auto space-y-2.5 pr-1">
                  {parsedQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white rounded-xl border border-[#D99A72]/20 space-y-1 text-xs"
                    >
                      <div className="font-semibold text-[#514438]">
                        {idx + 1}. {q.question}
                      </div>
                      <div className="text-[#7A6858] grid grid-cols-2 gap-1 pl-3 text-[11px]">
                        {q.options.map((opt, oIdx) => (
                          <span
                            key={oIdx}
                            className={oIdx === q.answer ? 'text-[#52744C] font-bold' : ''}
                          >
                            {['A', 'B', 'C', 'D'][oIdx]}. {opt} {oIdx === q.answer ? '✓' : ''}
                          </span>
                        ))}
                      </div>
                      {q.explanation && (
                        <p className="text-[11px] text-[#A8B89A] italic line-clamp-1">
                          Giải thích: {q.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Import Mode selection */}
                <div className="p-4 bg-[#FFF7ED] rounded-2xl border border-[#D99A72]/25 space-y-2">
                  <label className="text-xs font-bold text-[#514438] block">
                    Phương thức nhập vào hệ thống:
                  </label>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => setImportMode('append')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        importMode === 'append'
                          ? 'border-[#D99A72] bg-[#FFF0E5] font-bold text-[#514438] shadow-2xs'
                          : 'border-[#D99A72]/20 bg-white text-[#7A6858] hover:bg-[#FFF0E5]/30'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <CheckCircle2 size={14} className={importMode === 'append' ? 'text-[#D99A72]' : 'text-gray-300'} />
                        <span>Thêm vào bộ hiện có</span>
                      </div>
                      <p className="text-[11px] font-normal text-[#7A6858]">
                        Giữ nguyên {currentQuestionsCount} câu cũ + thêm {parsedQuestions.length} câu mới.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setImportMode('replace')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        importMode === 'replace'
                          ? 'border-[#D99A72] bg-[#FFF0E5] font-bold text-[#514438] shadow-2xs'
                          : 'border-[#D99A72]/20 bg-white text-[#7A6858] hover:bg-[#FFF0E5]/30'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <CheckCircle2 size={14} className={importMode === 'replace' ? 'text-[#D99A72]' : 'text-gray-300'} />
                        <span>Thay thế toàn bộ</span>
                      </div>
                      <p className="text-[11px] font-normal text-[#7A6858]">
                        Xóa toàn bộ câu cũ và chỉ giữ {parsedQuestions.length} câu mới này.
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#D99A72]/20">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-[#D99A72]/30 text-sm font-medium text-[#7A6858] hover:bg-[#FFF7ED]"
          >
            Đóng
          </button>
          <button
            type="button"
            disabled={parsedQuestions.length === 0 || isProcessing}
            onClick={handleConfirmImport}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm shadow-sm flex items-center gap-2 transition-all ${
              parsedQuestions.length === 0 || isProcessing
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#D99A72] hover:bg-[#C98A62] text-white'
            }`}
          >
            <span>Xác nhận nhập {parsedQuestions.length} câu hỏi</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
