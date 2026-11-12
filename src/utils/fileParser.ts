import { Question } from '../types/quiz';

export interface ParseResult {
  success: boolean;
  questions: Question[];
  errors: string[];
  totalParsed: number;
}

/**
 * Normalizes answer value to number 0..3
 */
function normalizeAnswer(ans: unknown): number | null {
  if (typeof ans === 'number' && ans >= 0 && ans <= 3) {
    return Math.floor(ans);
  }
  if (typeof ans === 'string') {
    const trimmed = ans.trim().toUpperCase();
    if (trimmed === 'A' || trimmed === '0') return 0;
    if (trimmed === 'B' || trimmed === '1') return 1;
    if (trimmed === 'C' || trimmed === '2') return 2;
    if (trimmed === 'D' || trimmed === '3') return 3;
    const parsed = parseInt(trimmed, 10);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 3) return parsed;
  }
  return null;
}

/**
 * Validate a question object
 */
export function validateQuestion(raw: unknown, index: number): { question: Question | null; error: string | null } {
  if (!raw || typeof raw !== 'object') {
    return { question: null, error: `Dòng/Mục #${index + 1}: Dữ liệu không phải là đối tượng hợp lệ.` };
  }

  const r = raw as Record<string, unknown>;

  const questionText = typeof r.question === 'string' ? r.question.trim() : '';
  if (!questionText) {
    return { question: null, error: `Câu #${index + 1}: Thiếu nội dung câu hỏi ("question").` };
  }

  let rawOptions: unknown[] = [];
  if (Array.isArray(r.options)) {
    rawOptions = r.options;
  } else if (r.optionA !== undefined || r.option1 !== undefined) {
    rawOptions = [
      r.optionA ?? r.option1 ?? '',
      r.optionB ?? r.option2 ?? '',
      r.optionC ?? r.option3 ?? '',
      r.optionD ?? r.option4 ?? ''
    ];
  }

  if (rawOptions.length !== 4) {
    return { question: null, error: `Câu #${index + 1} ("${questionText.slice(0, 30)}..."): Cần đủ 4 đáp án (hiện có ${rawOptions.length}).` };
  }

  const options = rawOptions.map(opt => (opt !== null && opt !== undefined ? String(opt).trim() : '')) as [string, string, string, string];
  if (options.some(opt => opt.length === 0)) {
    return { question: null, error: `Câu #${index + 1}: Có đáp án rỗng.` };
  }

  const answerIndex = normalizeAnswer(r.answer);
  if (answerIndex === null) {
    return { question: null, error: `Câu #${index + 1}: Đáp án "answer" không hợp lệ (phải là 0, 1, 2, 3 hoặc A, B, C, D).` };
  }

  const explanation = typeof r.explanation === 'string' ? r.explanation.trim() : 'Không có giải thích chi tiết.';
  const category = typeof r.category === 'string' ? r.category.trim() : 'Ca trù di sản';

  return {
    question: {
      id: `custom-${Date.now()}-${index}-${Math.random().toString(36).substring(2, 7)}`,
      question: questionText,
      options,
      answer: answerIndex,
      explanation,
      category
    },
    error: null
  };
}

/**
 * Parses JSON content
 */
export function parseQuestionsJSON(content: string): ParseResult {
  const errors: string[] = [];
  const validQuestions: Question[] = [];

  const cleaned = content.replace(/^\uFEFF/, '').trim();
  if (!cleaned) {
    return { success: false, questions: [], errors: ['Tệp JSON rỗng.'], totalParsed: 0 };
  }

  let parsedData: unknown;
  try {
    parsedData = JSON.parse(cleaned);
  } catch (err) {
    return {
      success: false,
      questions: [],
      errors: [`Định dạng JSON không hợp lệ: ${(err as Error).message}`],
      totalParsed: 0
    };
  }

  if (!Array.isArray(parsedData)) {
    return {
      success: false,
      questions: [],
      errors: ['Tệp JSON phải chứa một mảng danh sách câu hỏi [...]'],
      totalParsed: 0
    };
  }

  parsedData.forEach((item, idx) => {
    const { question, error } = validateQuestion(item, idx);
    if (error) {
      errors.push(error);
    } else if (question) {
      validQuestions.push(question);
    }
  });

  return {
    success: validQuestions.length > 0,
    questions: validQuestions,
    errors,
    totalParsed: validQuestions.length
  };
}

/**
 * RFC 4180 compliant CSV parser that supports quotes, multiline fields, and Vietnamese UTF-8
 */
export function parseCSVToRows(text: string): string[][] {
  const cleanText = text.replace(/^\uFEFF/, '');
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let insideQuote = false;

  for (let i = 0; i < cleanText.length; i++) {
    const char = cleanText[i];
    const nextChar = cleanText[i + 1];

    if (char === '"') {
      if (insideQuote && nextChar === '"') {
        currentField += '"';
        i++; // skip next quote
      } else {
        insideQuote = !insideQuote;
      }
    } else if (char === ',' && !insideQuote) {
      currentRow.push(currentField);
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !insideQuote) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentField);
      if (currentRow.some(col => col.trim().length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }

  // push last field & row
  currentRow.push(currentField);
  if (currentRow.some(col => col.trim().length > 0)) {
    rows.push(currentRow);
  }

  return rows;
}

/**
 * Parses CSV content with expected headers:
 * question, optionA, optionB, optionC, optionD, answer, explanation
 */
export function parseQuestionsCSV(content: string): ParseResult {
  const errors: string[] = [];
  const validQuestions: Question[] = [];

  const rows = parseCSVToRows(content);
  if (rows.length < 2) {
    return {
      success: false,
      questions: [],
      errors: ['Tệp CSV rỗng hoặc chỉ có dòng tiêu đề.'],
      totalParsed: 0
    };
  }

  const headers = rows[0].map(h => h.trim().toLowerCase());
  const colQuestion = headers.findIndex(h => h === 'question' || h === 'câu hỏi' || h === 'cau_hoi');
  const colOptA = headers.findIndex(h => h === 'optiona' || h === 'đáp án a' || h === 'a' || h === 'option1');
  const colOptB = headers.findIndex(h => h === 'optionb' || h === 'đáp án b' || h === 'b' || h === 'option2');
  const colOptC = headers.findIndex(h => h === 'optionc' || h === 'đáp án c' || h === 'c' || h === 'option3');
  const colOptD = headers.findIndex(h => h === 'optiond' || h === 'đáp án d' || h === 'd' || h === 'option4');
  const colAns = headers.findIndex(h => h === 'answer' || h === 'đáp án đúng' || h === 'dap_an');
  const colExp = headers.findIndex(h => h === 'explanation' || h === 'giải thích' || h === 'giai_thich');

  if (colQuestion === -1 || colOptA === -1 || colOptB === -1 || colOptC === -1 || colOptD === -1 || colAns === -1) {
    return {
      success: false,
      questions: [],
      errors: [
        'Tiêu đề cột CSV không đủ. Yêu cầu tối thiểu các cột: question, optionA, optionB, optionC, optionD, answer (tùy chọn: explanation).'
      ],
      totalParsed: 0
    };
  }

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const item = {
      question: row[colQuestion] ?? '',
      options: [
        row[colOptA] ?? '',
        row[colOptB] ?? '',
        row[colOptC] ?? '',
        row[colOptD] ?? ''
      ],
      answer: row[colAns] ?? '',
      explanation: colExp !== -1 ? (row[colExp] ?? '') : ''
    };

    const { question, error } = validateQuestion(item, r - 1);
    if (error) {
      errors.push(error);
    } else if (question) {
      validQuestions.push(question);
    }
  }

  return {
    success: validQuestions.length > 0,
    questions: validQuestions,
    errors,
    totalParsed: validQuestions.length
  };
}

/**
 * Downloads a sample JSON file for users
 */
export function downloadSampleJSON(): void {
  const sampleData = [
    {
      question: "Cây đàn nào được coi là linh hồn và chỉ có mặt trong nghệ thuật Ca trù?",
      options: [
        "Đàn Đáy",
        "Đàn Bầu",
        "Đàn Nhị",
        "Đàn Tỳ Bà"
      ],
      answer: 0,
      explanation: "Đàn đáy với cần dài, thùng không đáy và phím cao là cây đàn đặc trưng duy nhất của Ca trù."
    },
    {
      question: "Ai là người gõ roi chầu trên trống chầu để khen chê câu hát?",
      options: [
        "Kép đàn",
        "Quan viên",
        "Đào nương",
        "Trưởng làng"
      ],
      answer: 1,
      explanation: "Quan viên là vị khách am hiểu âm luật, cầm roi chầu để thưởng thức và thẩm định giọng hát."
    },
    {
      question: "Đào nương trong ca trù sử dụng nhạc cụ nào để giữ nhịp cho canh hát?",
      options: [
        "Bộ Phách",
        "Sênh tiền",
        "Trống cơm",
        "Cồng chiêng"
      ],
      answer: 0,
      explanation: "Đào nương vừa hát vừa trực tiếp gõ phách luồn tay nhịp nhàng theo câu chữ."
    }
  ];

  const blob = new Blob([JSON.stringify(sampleData, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'bo_cau_hoi_ca_tru_mau.json';
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Downloads a sample CSV file with UTF-8 BOM for Excel compatibility
 */
export function downloadSampleCSV(): void {
  const csvContent =
    '\uFEFF' + // UTF-8 BOM for Excel support
    'question,optionA,optionB,optionC,optionD,answer,explanation\n' +
    '"Ca trù được UNESCO ghi danh vào năm nào?","2005","2009","2015","2019","B","Ca trù được ghi danh vào Danh sách cần bảo vệ khẩn cấp vào năm 2009."\n' +
    '"Cây đàn đặc trưng của kép đàn trong ca trù là gì?","Đàn Nguyệt","Đàn Đáy","Đàn Tranh","Đàn Bầu","B","Đàn đáy có 3 dây tơ, phím cao và cần rất dài."\n' +
    '"Nghệ nhân nữ hát ca trù được gọi là gì?","Kép đàn","Quan viên","Đào nương","Đầu bếp","C","Đào nương (hay Ca nương) là người phụ nữ vừa hát vừa gõ phách."\n';

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'bo_cau_hoi_ca_tru_mau.csv';
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Export current questions list to JSON
 */
export function exportQuestionsToJSON(questions: Question[]): void {
  const cleanExport = questions.map(({ question, options, answer, explanation, category }) => ({
    question,
    options,
    answer,
    explanation,
    category
  }));
  const blob = new Blob([JSON.stringify(cleanExport, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ca_tru_cau_hoi_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Export current questions list to CSV
 */
export function exportQuestionsToCSV(questions: Question[]): void {
  const header = 'question,optionA,optionB,optionC,optionD,answer,explanation,category\n';
  const rows = questions.map(q => {
    const esc = (s: string) => `"${(s || '').replace(/"/g, '""')}"`;
    return [
      esc(q.question),
      esc(q.options[0]),
      esc(q.options[1]),
      esc(q.options[2]),
      esc(q.options[3]),
      q.answer,
      esc(q.explanation),
      esc(q.category || '')
    ].join(',');
  }).join('\n');

  const blob = new Blob(['\uFEFF' + header + rows], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ca_tru_cau_hoi_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
