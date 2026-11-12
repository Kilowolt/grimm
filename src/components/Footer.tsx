import React from 'react';
import { LotusMotif, PaperFanMotif, CloudMotif } from './DecorativeMotifs';

interface FooterProps {
  onGoHome: () => void;
  onOpenManager: () => void;
  onOpenSetup: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onGoHome, onOpenManager, onOpenSetup }) => {
  return (
    <footer className="mt-auto border-t border-[#D99A72]/20 bg-[#FFFCF7] text-[#7A6858] text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <LotusMotif size={22} />
              <span className="font-serif font-bold text-base text-[#514438]">
                Ca Trù · Giai Điệu Di Sản
              </span>
            </div>
            <p className="text-xs text-[#7A6858] max-w-md">
              Dự án trò chơi giáo dục gìn giữ và lan tỏa vẻ đẹp âm nhạc cổ truyền Việt Nam.
              Di sản văn hóa phi vật thể cần được bảo vệ khẩn cấp (UNESCO 2009).
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-medium text-xs">
            <button
              onClick={onGoHome}
              className="hover:text-[#514438] transition-colors"
            >
              Trang chủ
            </button>
            <button
              onClick={onOpenSetup}
              className="hover:text-[#514438] transition-colors"
            >
              Vào chơi
            </button>
            <button
              onClick={onOpenManager}
              className="hover:text-[#514438] transition-colors"
            >
              Quản lý câu hỏi
            </button>
            <a
              href="#heritage-info"
              onClick={(e) => {
                e.preventDefault();
                onGoHome();
                setTimeout(() => {
                  document.getElementById('heritage-info')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hover:text-[#514438] transition-colors"
            >
              Kiến thức Ca trù
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-[#D99A72]/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#A39282]">
          <div className="flex items-center gap-2">
            <span>Bản quyền nội dung &copy; {new Date().getFullYear()} Ca Trù Giai Điệu Di Sản</span>
            <span>·</span>
            <span>Việt Nam</span>
          </div>

          <div className="flex items-center gap-2">
            <PaperFanMotif size={16} />
            <span>Âm sắc Đàn Đáy · Tiếng Phách Luồn Tay · Trống Chầu Điểm Nhịp</span>
            <CloudMotif width={24} height={12} />
          </div>
        </div>
      </div>
    </footer>
  );
};
