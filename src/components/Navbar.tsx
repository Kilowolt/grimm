import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { LotusMotif } from './DecorativeMotifs';

interface NavbarProps {
  currentView: 'home' | 'play' | 'manager' | 'result';
  onNavigate: (view: 'home' | 'manager') => void;
  onOpenSetup: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  questionCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenSetup,
  soundEnabled,
  onToggleSound,
  questionCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FFF7ED]/95 backdrop-blur-md border-b border-[#D99A72]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-left group transition-transform active:scale-95 whitespace-nowrap shrink-0"
        >
          <LotusMotif size={28} className="transition-transform group-hover:rotate-12 duration-300" />
          <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-[#514438]">
            Ca Trù · Giai Điệu Di Sản
          </span>
        </button>

        {/* Zone 2: Single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#7A6858]">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#514438] ${
              currentView === 'home' ? 'text-[#D99A72] font-semibold' : ''
            }`}
          >
            Trang chủ
          </button>
          <button
            onClick={() => onNavigate('manager')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-[#514438] ${
              currentView === 'manager' ? 'text-[#D99A72] font-semibold' : ''
            }`}
          >
            <span>Bộ câu hỏi</span>
            <span className="text-xs bg-[#E9BFA5]/30 text-[#7A5B45] px-1.5 py-0.5 rounded font-mono">
              {questionCount}
            </span>
          </button>
          <a
            href="#heritage-info"
            onClick={(e) => {
              if (currentView !== 'home') {
                e.preventDefault();
                onNavigate('home');
                setTimeout(() => {
                  document.getElementById('heritage-info')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="transition-colors whitespace-nowrap shrink-0 hover:text-[#514438]"
          >
            Nghệ thuật Ca trù
          </a>
        </nav>

        {/* Zone 3: 1 primary action with sound affordance */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            aria-label={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            className="p-2 rounded-full text-[#7A6858] hover:text-[#514438] hover:bg-[#E9BFA5]/20 transition-colors"
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {currentView !== 'play' && (
            <button
              onClick={onOpenSetup}
              className="px-4 py-2 text-sm font-semibold text-white bg-[#D99A72] hover:bg-[#C98A62] active:bg-[#B97A52] rounded-xl shadow-sm transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0"
            >
              Bắt đầu khám phá
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
