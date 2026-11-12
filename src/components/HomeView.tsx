import React from 'react';
import { Play, BookOpen, Upload, Music, Sparkles, Award } from 'lucide-react';
import { LotusMotif, CloudMotif, PaperFanMotif, LanternMotif } from './DecorativeMotifs';

interface HomeViewProps {
  questionCount: number;
  onStartGame: () => void;
  onOpenManager: () => void;
  onOpenUpload: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  questionCount,
  onStartGame,
  onOpenManager,
  onOpenUpload,
}) => {
  return (
    <div className="relative overflow-hidden">
      {/* Background decorative clouds */}
      <div className="absolute top-12 left-4 pointer-events-none opacity-40 hidden lg:block">
        <CloudMotif width={90} height={45} />
      </div>
      <div className="absolute top-36 right-8 pointer-events-none opacity-40 hidden lg:block">
        <CloudMotif width={120} height={60} />
      </div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-14 sm:pt-12 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E9BFA5]/30 text-[#7A543B] text-xs font-medium border border-[#D99A72]/30">
              <Sparkles size={14} className="text-[#D99A72]" />
              <span>Di sản Văn hóa Phi vật thể UNESCO</span>
              <LotusMotif size={16} />
            </div>

            <div className="space-y-3">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#514438] tracking-tight leading-tight">
                CA TRÙ <br className="hidden sm:inline" />
                <span className="text-[#D99A72]">GIAI ĐIỆU DI SẢN</span>
              </h1>
              <p className="text-base sm:text-lg text-[#6E5A4A] leading-relaxed max-w-xl mx-auto lg:mx-0">
                Lắng nghe di sản, khám phá tinh hoa văn hóa Việt Nam qua những câu hỏi thử thách thú vị và sâu sắc.
              </p>
            </div>

            {/* Current Question Count & Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-[#7A6858]">
              <div className="flex items-center gap-1.5 bg-[#FFFCF7] border border-[#D99A72]/20 px-3 py-1.5 rounded-xl shadow-xs">
                <BookOpen size={16} className="text-[#D99A72]" />
                <span className="font-medium">Kho câu hỏi:</span>
                <span className="font-bold text-[#514438] tabular-nums">{questionCount} câu</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#FFFCF7] border border-[#D99A72]/20 px-3 py-1.5 rounded-xl shadow-xs">
                <Music size={16} className="text-[#A8B89A]" />
                <span>Âm thanh mộc dân gian</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onStartGame}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#D99A72] hover:bg-[#C98A62] active:bg-[#B97A52] text-white font-semibold rounded-2xl shadow-md transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 text-base"
              >
                <Play size={20} className="fill-white" />
                <span>BẮT ĐẦU KHÁM PHÁ</span>
              </button>

              <button
                onClick={onOpenManager}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#FFFCF7] hover:bg-[#FDF6ED] active:bg-[#F5ECE0] text-[#514438] font-medium border border-[#D99A72]/30 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 text-base"
              >
                <BookOpen size={18} className="text-[#D99A72]" />
                <span>BỘ CÂU HỎI CỦA TÔI</span>
              </button>

              <button
                onClick={onOpenUpload}
                title="Tải lên tệp JSON hoặc CSV"
                className="w-full sm:w-auto p-3.5 bg-[#FFFCF7] hover:bg-[#FDF6ED] text-[#7A5B45] border border-[#D99A72]/30 rounded-2xl transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Upload size={18} className="text-[#A8B89A]" />
                <span className="sm:hidden">Tải lên câu hỏi (JSON/CSV)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Large 2D Cartoon Folk Art Illustration */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden border-4 border-[#FFFCF7] shadow-xl bg-[#FFFCF7]">
              {/* Corner decorative lantern & fan */}
              <div className="absolute top-3 left-3 z-10 pointer-events-none drop-shadow-sm">
                <LanternMotif size={28} />
              </div>
              <div className="absolute top-3 right-3 z-10 pointer-events-none drop-shadow-sm">
                <PaperFanMotif size={30} />
              </div>

              <img
                src="/src/assets/images/catru_hero_performance_1794448263324.jpg"
                alt="Không gian diễn xướng Ca trù Việt Nam - Đào nương, Kép đàn và Quan viên"
                referrerPolicy="no-referrer"
                className="w-full h-auto aspect-16/9 object-cover rounded-2xl transition-transform duration-500 hover:scale-[1.01]"
              />

              <div className="p-3 bg-[#FFFCF7] flex items-center justify-between text-xs text-[#7A6858] border-t border-[#D99A72]/15">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#A8B89A]" />
                  <span className="font-medium">Biểu diễn Ca trù tại Cửa Đình</span>
                </div>
                <span className="italic">Nét son truyền thống Việt gianh</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Pillar Cards: 3 Trụ cột Ca trù */}
      <section id="heritage-info" className="bg-[#FFFCF7]/90 border-y border-[#D99A72]/15 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="flex items-center justify-center gap-2">
              <LotusMotif size={22} />
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#514438]">
                Tam Hợp Tuyệt Tác Ca Trù
              </h2>
              <LotusMotif size={22} />
            </div>
            <p className="text-sm sm:text-base text-[#6E5A4A]">
              Sự kết hợp hoàn mỹ giữa thơ ca bác học, nhạc khí độc nhất vô nhị và phong thái thưởng thức tao nhã.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1: Đào Nương & Phách */}
            <div className="bg-[#FFF7ED] rounded-2xl p-5 border border-[#D99A72]/25 shadow-xs space-y-3.5 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="aspect-4/3 rounded-xl overflow-hidden border border-[#D99A72]/20 relative">
                  <img
                    src="/src/assets/images/catru_dao_nuong_avatar_1794448265419.jpg"
                    alt="Đào nương Ca trù tay cầm phách"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-[#514438]/80 text-[#FFF7ED] text-xs font-medium backdrop-blur-xs">
                    Đào Nương (Ca nương)
                  </div>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#514438]">
                  Tiếng Hát & Cỗ Phách
                </h3>
                <p className="text-xs sm:text-sm text-[#6E5A4A] leading-relaxed">
                  Đào nương vừa cất lên giọng hát ém hơi, nẩy hạt tinh tế như ngọc rơi, vừa hai tay gõ phách luồn lách theo từng nhịp thơ.
                </p>
              </div>
              <div className="text-xs text-[#A8B89A] font-semibold pt-1 border-t border-[#D99A72]/15">
                Nhạc cụ: Bàn phách tre & đôi dùi gõ
              </div>
            </div>

            {/* Pillar 2: Kép Đàn & Đàn Đáy */}
            <div className="bg-[#FFF7ED] rounded-2xl p-5 border border-[#D99A72]/25 shadow-xs space-y-3.5 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="aspect-4/3 rounded-xl overflow-hidden border border-[#D99A72]/20 relative">
                  <img
                    src="/src/assets/images/catru_instruments_1794448265586.jpg"
                    alt="Bộ ba nhạc khí Ca trù: Đàn đáy, Phách và Trống chầu"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-[#514438]/80 text-[#FFF7ED] text-xs font-medium backdrop-blur-xs">
                    Kép Đàn & Nhạc Khí
                  </div>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#514438]">
                  Cung Đàn Đáy Trầm Mặc
                </h3>
                <p className="text-xs sm:text-sm text-[#6E5A4A] leading-relaxed">
                  Cây Đàn Đáy ba dây với cần dài và thùng rỗng độc nhất vô nhị trên thế giới chỉ thuộc về văn hóa Việt Nam, tạo tiếng gảy sâu lắng.
                </p>
              </div>
              <div className="text-xs text-[#A8B89A] font-semibold pt-1 border-t border-[#D99A72]/15">
                Nhạc cụ: Đàn Đáy (Vô đề cầm)
              </div>
            </div>

            {/* Pillar 3: Quan Viên & Trống Chầu */}
            <div className="bg-[#FFF7ED] rounded-2xl p-5 border border-[#D99A72]/25 shadow-xs space-y-3.5 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="aspect-4/3 rounded-xl overflow-hidden border border-[#D99A72]/20 relative">
                  <img
                    src="/src/assets/images/catru_dinh_lang_1794448265918.jpg"
                    alt="Đình làng Việt Nam - Không gian diễn xướng Ca trù"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-[#514438]/80 text-[#FFF7ED] text-xs font-medium backdrop-blur-xs">
                    Quan Viên & Đình Làng
                  </div>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#514438]">
                  Tiếng Trống Chầu Tri Kỷ
                </h3>
                <p className="text-xs sm:text-sm text-[#6E5A4A] leading-relaxed">
                  Quan viên cầm roi chầu, dùng tiếng "Tom" chấm câu và tiếng "Chát" khen thưởng những chỗ hát ngắt chữ điêu luyện của ca nương.
                </p>
              </div>
              <div className="text-xs text-[#A8B89A] font-semibold pt-1 border-t border-[#D99A72]/15">
                Nhạc cụ: Trống Chầu & Roi chầu tre
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide & Rules Strip */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-[#FFFCF7] border border-[#D99A72]/20 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-semibold text-[#D99A72]">
              <Award size={18} />
              <span>Thử Thách Xếp Hạng Di Sản</span>
            </div>
            <p className="text-sm text-[#6E5A4A]">
              Tham gia trả lời để đạt danh hiệu <strong>Bậc thầy Ca trù</strong> (90–100%) hoặc <strong>Người am hiểu di sản</strong> (70–89%). Bạn có thể tự tải lên câu hỏi mới bất kỳ lúc nào!
            </p>
          </div>
          <button
            onClick={onStartGame}
            className="shrink-0 px-6 py-3 bg-[#D99A72] hover:bg-[#C98A62] text-white font-semibold rounded-xl shadow-xs transition-colors"
          >
            Bắt đầu thi đấu
          </button>
        </div>
      </section>
    </div>
  );
};
