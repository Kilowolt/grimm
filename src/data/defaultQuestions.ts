import { Question } from '../types/quiz';

export const DEFAULT_QUESTIONS: Question[] = [
  {
    id: 'ct-01',
    question: 'Tên gọi "Ca trù" bắt nguồn từ phong tục nào trong truyền thống biểu diễn?',
    options: [
      'Dùng thẻ tre (trù) để đánh dấu và tính tiền thưởng cho ca nương',
      'Được biểu diễn độc quyền dưới thời vua Lê Thái Tổ tại Trù Sơn',
      'Một loại rượu thuốc cổ truyền dâng lên các vị thần linh',
      'Tên gọi của chiếc quạt lụa do người nghe cầm khi thưởng thức'
    ],
    answer: 0,
    explanation: 'Chữ "trù" trong tiếng Hán Việt nghĩa là thẻ tre hoặc thẻ gỗ. Xưa kia, quan viên ngồi nghe hát dùng thẻ trù để khen ngợi từng đoạn hát hay, cuối buổi ca nương gom thẻ lại để quy ra tiền thưởng.',
    category: 'Lịch sử & Nguồn gốc'
  },
  {
    id: 'ct-02',
    question: 'Ca trù Việt Nam được UNESCO ghi danh vào danh sách Di sản văn hóa phi vật thể vào năm nào?',
    options: [
      'Năm 2003 (Kiệt tác truyền khẩu)',
      'Năm 2009 (Cần được bảo vệ khẩn cấp)',
      'Năm 2012 (Đại diện của nhân loại)',
      'Năm 2016 (Thực hành tín ngưỡng)'
    ],
    answer: 1,
    explanation: 'Vào ngày 01/10/2009, tại kỳ họp thứ tư của Ủy ban Liên chính phủ UNESCO tại Abu Dhabi, Ca trù đã chính thức được ghi danh vào Danh sách Di sản văn hóa phi vật thể cần được bảo vệ khẩn cấp.',
    category: 'Di sản thế giới'
  },
  {
    id: 'ct-03',
    question: 'Một canh hát Ca trù chuẩn mực thường có sự tham gia của bao nhiêu nhân vật chủ chốt?',
    options: [
      '2 người: Đào nương hát và một nghệ nhân đánh cồng chiêng',
      '3 người: Đào nương (hát gõ phách), Kép đàn (đàn đáy) và Quan viên (trống chầu)',
      '4 người: Đào nương, nghệ nhân sáo trúc, nhị và đàn tranh',
      '5 người: Một dàn nhạc cụ dân tộc ngũ âm kết hợp ca đoàn'
    ],
    answer: 1,
    explanation: 'Ca trù là nghệ thuật thính phòng tinh tế của bộ ba: Đào nương (vừa hát vừa gõ phách), Kép đàn (người nam gảy đàn đáy) và Quan viên (khách sành điệu cầm roi chầu điểm trống khen chê).',
    category: 'Nghệ nhân & Vai trò'
  },
  {
    id: 'ct-04',
    question: 'Cây đàn độc đáo chỉ xuất hiện duy nhất trong nghệ thuật Ca trù Việt Nam là gì?',
    options: [
      'Đàn Bầu (Độc huyền cầm)',
      'Đàn Đáy (Vô đề cầm)',
      'Đàn Nguyệt (Đoản cầm)',
      'Đàn Tranh (Thập lục huyền cầm)'
    ],
    answer: 1,
    explanation: 'Đàn đáy (còn gọi là Vô đề cầm) là nhạc cụ thuần Việt với cần rất dài, thùng đàn hình thang không có đáy (hoặc khoét lỗ ở mặt đáy), phím đàn gắn cao giúp tạo ra âm sắc trầm ấm, sâu lắng đặc trưng.',
    category: 'Nhạc cụ Ca trù'
  },
  {
    id: 'ct-05',
    question: 'Đào nương trong ca trù vừa hát vừa trực tiếp sử dụng nhạc cụ nào để giữ nhịp?',
    options: [
      'Bộ Phách (thanh gỗ/tre và hai dùi gõ)',
      'Đôi sênh tiền bằng đồng',
      'Chiếc mõ cá gỗ mít',
      'Trống bồng đeo ngang thắt lưng'
    ],
    answer: 0,
    explanation: 'Bộ Phách gồm một bàn phách làm bằng tre hoặc gỗ chắc và hai chiếc dùi (tay phải cầm dùi kép, tay trái cầm dùi đơn). Tiếng phách lúc giòn giã lúc khoan thai luồn lách theo từng hơi thở câu hát.',
    category: 'Nhạc cụ Ca trù'
  },
  {
    id: 'ct-06',
    question: 'Người cầm "roi chầu" đánh trống chầu trong canh hát Ca trù được gọi là gì?',
    options: [
      'Đầu bếp tiệc hát',
      'Kép đệm phụ',
      'Quan viên (hay Trưởng tràng)',
      'Thầy tu tụng kinh'
    ],
    answer: 2,
    explanation: 'Quan viên là người am hiểu sâu sắc về văn học và âm nhạc, cầm chiếc roi chầu đánh vào trống chầu để thẩm định, tán thưởng câu thơ hay, giọng hát đẹp hoặc điểm câu chấm câu.',
    category: 'Nghệ nhân & Vai trò'
  },
  {
    id: 'ct-07',
    question: 'Trong kỹ thuật đánh trống chầu, tiếng gõ vào tang trống để tỏ ý tán thưởng, khen ngợi được gọi là gì?',
    options: [
      'Tiếng "Chát"',
      'Tiếng "Tom"',
      'Tiếng "Rền"',
      'Tiếng "Bụp"'
    ],
    answer: 0,
    explanation: 'Tiếng "Tom" (đánh vào giữa mặt trống) giữ nhịp cơ bản, còn tiếng "Chát" (gõ mũi roi vào tang gỗ) biểu thị sự khen ngợi, tán thưởng câu văn hay hoặc nốt ngắt giọng điêu luyện.',
    category: 'Nghệ thuật trình diễn'
  },
  {
    id: 'ct-08',
    question: 'Kỹ thuật phát âm, nhả chữ đặc thù nào là đỉnh cao trong nghệ thuật hát của đào nương Ca trù?',
    options: [
      'Hát thật to như giọng Opera kịch tính',
      'Hát ém hơi, ngậm miệng ngân (nẩy hạt), đổ hột và luồn phách',
      'Hát giọng gió hoàn toàn không mở khẩu hình',
      'Hát bè nhiều tầng kết hợp đọc đồng dao'
    ],
    answer: 1,
    explanation: 'Ca trù đòi hỏi kỹ thuật thanh nhạc bác học: ca nương phải giữ chặt quai hàm, ém hơi trong cổ họng, rung các âm nhỏ li ti (nẩy hạt hay đổ hột) nghe như tiếng ngọc rơi trên mâm vàng.',
    category: 'Nghệ thuật ca hát'
  },
  {
    id: 'ct-09',
    question: 'Thể loại văn học thuần Việt nào gắn bó mật thiết và phát triển rực rỡ nhất cùng Ca trù?',
    options: [
      'Thơ Hát nói (thể thơ tự do kết hợp vần điệu lục bát - song thất)',
      'Hịch và Cáo chữ Hán',
      'Truyện Kiều lục bát cổ',
      'Thơ Đường luật thất ngôn bát cú nghiêm ngặt'
    ],
    answer: 0,
    explanation: 'Thể Hát nói là sáng tạo văn học đỉnh cao của người Việt kết hợp ca từ âm nhạc, được các danh sĩ như Nguyễn Công Trứ, Cao Bá Quát, Dương Khuê, Chu Mạnh Trinh nâng tầm thành kiệt tác.',
    category: 'Văn học & Nghệ thuật'
  },
  {
    id: 'ct-10',
    question: 'Không gian diễn xướng Ca trù cổ xưa gắn liền với nghi lễ nào của làng xã Việt Nam?',
    options: [
      'Lễ hội đâm trâu Tây Nguyên',
      'Hát Cửa đình (hát tế Thần, Thành hoàng làng cầu quốc thái dân an)',
      'Hát trên thuyền rồng sông Hương',
      'Hát phường vải khi dệt lụa đêm trăng'
    ],
    answer: 1,
    explanation: 'Không gian thiêng liêng nhất của Ca trù là tại Đình làng trong các dịp lễ tiết, tế Thần hoàng làng. Hình thức này được gọi là "Hát Cửa đình", vừa trang nghiêm vừa rực rỡ sắc màu.',
    category: 'Không gian diễn xướng'
  },
  {
    id: 'ct-11',
    question: 'Ngoài tên gọi "Ca trù", loại hình này xưa kia còn được gọi bằng những tên nào khác?',
    options: [
      'Hát Nhà tơ, Hát Cô đầu, Hát Cửa quyền, Hát Cửa đình',
      'Hát Xoan, Hát Ghẹo, Hát Dặm',
      'Hát Chèo đò, Hát Then, Đờn ca tài tử',
      'Hát Bội, Hát Bài chòi, Tuồng cung đình'
    ],
    answer: 0,
    explanation: 'Tùy theo địa phương và không gian, ca trù từng mang tên Hát Nhà tơ (trong cung phủ/dinh thự), Hát Cửa quyền, Hát Cô đầu (khi đào nương tự lập gánh), và Hát Cửa đình.',
    category: 'Lịch sử & Nguồn gốc'
  },
  {
    id: 'ct-12',
    question: 'Nhạc cụ Đàn đáy trong Ca trù có bao nhiêu dây đàn?',
    options: [
      '1 dây tơ duy nhất',
      '2 dây bằng cước nylon',
      '3 dây tơ tằm mềm',
      '16 dây kim loại mỏng'
    ],
    answer: 2,
    explanation: 'Đàn đáy có 3 dây bằng tơ tằm se lại (ngày nay đôi khi dùng cước mềm), lên theo các quãng âm đặc biệt, tạo nên âm hưởng mộc mạc, trầm bổng khôn xiết.',
    category: 'Nhạc cụ Ca trù'
  },
  {
    id: 'ct-13',
    question: 'Một Đào nương mới vào nghề khi chưa đủ tuổi và tài năng thường làm nhiệm vụ gì trong giáo phường?',
    options: [
      'Hát múa Bỏ bộ và múa quạt lụa (Múa tứ linh, múa bài bông)',
      'Cầm roi chầu chỉ huy dàn nhạc',
      'Gảy đàn đáy thay kép đàn',
      'Làm khán giả thẩm âm ngoài đình làng'
    ],
    answer: 0,
    explanation: 'Trước khi trở thành Ca nương chính danh được "mở xiêm áo", các cô gái trẻ học việc phải học gõ phách, múa dẫn đường và biểu diễn các điệu múa truyền thống như Múa Bài bông, Múa Tứ linh.',
    category: 'Nghệ nhân & Vai trò'
  },
  {
    id: 'ct-14',
    question: 'Danh sĩ thời Nguyễn nào nổi tiếng với những bài Hát nói Ca trù mang khẩu khí phóng khoáng, ngông nghênh?',
    options: [
      'Nguyễn Bỉnh Khiêm',
      'Nguyễn Công Trứ (tác giả "Bài ca ngất ngưởng")',
      'Hồ Xuân Hương',
      'Nguyễn Du'
    ],
    answer: 1,
    explanation: 'Uy Viễn Tướng công Nguyễn Công Trứ là bậc thầy của thể Hát nói Ca trù với các kiệt tác như "Bài ca ngất ngưởng", "Chí làm trai", kết hợp giữa triết lý nhân sinh và tình yêu nghệ thuật.',
    category: 'Văn học & Nghệ thuật'
  },
  {
    id: 'ct-15',
    question: 'Nghệ nhân Ca trù lỗi lạc nào của Việt Nam được phong tặng danh hiệu Nghệ sĩ Nhân dân và truyền lửa bảo tồn di sản thế kỷ 20 - 21?',
    options: [
      'Nghệ nhân Nhân dân Quách Thị Hồ',
      'Nghệ sĩ Nhân dân Thanh Ngoan',
      'Nghệ sĩ Nhân dân Bạch Tuyết',
      'Nghệ nhân Hà Thị Cầu'
    ],
    answer: 0,
    explanation: 'Cố Nghệ nhân Nhân dân Quách Thị Hồ (1909 - 2001) là cây đại thụ của Ca trù Việt Nam. Tiếng hát và tiếng phách của bà được ghi âm và phổ biến khắp thế giới, được Hội đồng Âm nhạc Quốc tế trao bằng danh dự.',
    category: 'Bảo tồn di sản'
  }
];
