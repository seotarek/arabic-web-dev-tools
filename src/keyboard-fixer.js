const EN_TO_AR = {
  '`': 'ذ', 'q': 'ض', 'w': 'ص', 'e': 'ث', 'r': 'ق', 't': 'ف', 'y': 'غ', 'u': 'ع', 'i': 'ه', 'o': 'خ', 'p': 'ح', '[': 'ج', ']': 'د',
  'a': 'ش', 's': 'س', 'd': 'ي', 'f': 'ب', 'g': 'ل', 'h': 'ا', 'j': 'ت', 'k': 'ن', 'l': 'م', ';': 'ك', '\'': 'ط',
  'z': 'ئ', 'x': 'ء', 'c': 'ؤ', 'v': 'ر', 'b': 'لا', 'n': 'ى', 'm': 'ة', ',': 'و', '.': 'ز', '/': 'ظ'
};

const AR_TO_EN = Object.fromEntries(Object.entries(EN_TO_AR).map(([en, ar]) => [ar, en]));

export function fixKeyboardTypo(input) {
  if (!input) return '';
  
  // Check if input is predominantly English or Arabic
  const hasArabic = /[\u0600-\u06FF]/.test(input);
  
  if (hasArabic) {
    // Translate Arabic to English
    return input.split('').map(ch => AR_TO_EN[ch] || ch).join('');
  } else {
    // Translate English to Arabic
    return input.split('').map(ch => EN_TO_AR[ch.toLowerCase()] || ch).join('');
  }
}
