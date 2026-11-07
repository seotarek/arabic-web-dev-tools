const EN_TO_AR = {
  // Lowercase / standard keys
  '`': 'ذ', 'q': 'ض', 'w': 'ص', 'e': 'ث', 'r': 'ق', 't': 'ف', 'y': 'غ', 'u': 'ع', 'i': 'ه', 'o': 'خ', 'p': 'ح', '[': 'ج', ']': 'د',
  'a': 'ش', 's': 'س', 'd': 'ي', 'f': 'ب', 'g': 'ل', 'h': 'ا', 'j': 'ت', 'k': 'ن', 'l': 'م', ';': 'ك', '\'': 'ط',
  'z': 'ئ', 'x': 'ء', 'c': 'ؤ', 'v': 'ر', 'b': 'لا', 'n': 'ى', 'm': 'ة', ',': 'و', '.': 'ز', '/': 'ظ',

  // Uppercase / Shift keys
  '~': 'ّ', 'Q': 'َ', 'W': 'ً', 'E': 'ُ', 'R': 'ٌ', 'T': 'لإ', 'Y': 'إ', 'U': '‘', 'I': '÷', 'O': '×', 'P': '؛',
  'A': 'ِ', 'S': 'ٍ', 'D': ']', 'F': '[', 'G': 'لأ', 'H': 'أ', 'J': 'ـ', 'K': '،', 'L': '/',
  'Z': '~', 'X': 'ْ', 'C': '}', 'V': '{', 'B': 'لآ', 'N': 'آ', 'M': '’', '?': '؟'
};

// Priority multi-character ligatures for Arabic to English
const AR_LIGATURES = [
  ['لآ', 'B'],
  ['لأ', 'G'],
  ['لإ', 'T'],
  ['لا', 'b'],
];

const AR_TO_EN = {
  // Standard Arabic letters and punctuation
  'ذ': '`', 'ض': 'q', 'ص': 'w', 'ث': 'e', 'ق': 'r', 'ف': 't', 'غ': 'y', 'ع': 'u', 'ه': 'i', 'خ': 'o', 'ح': 'p', 'ج': '[', 'د': ']',
  'ش': 'a', 'س': 's', 'ي': 'd', 'ب': 'f', 'ل': 'g', 'ا': 'h', 'ت': 'j', 'ن': 'k', 'م': 'l', 'ك': ';', 'ط': '\'',
  'ئ': 'z', 'ء': 'x', 'ؤ': 'c', 'ر': 'v', 'ى': 'n', 'ة': 'm', 'و': ',', 'ز': '.', 'ظ': '/',
  
  // Shift / Diacritics / Punctuation
  'ّ': '~', 'َ': 'Q', 'ً': 'W', 'ُ': 'E', 'ٌ': 'R', 'إ': 'Y', '؛': 'P',
  'ِ': 'A', 'ٍ': 'S', 'أ': 'H', 'ـ': 'J', '،': 'K', 'ْ': 'X', 'آ': 'N', '؟': '?'
};

/**
 * Reverses typed text when the user accidentally typed with the wrong keyboard layout.
 *
 * @param {string} input - Text to convert.
 * @param {Object} [options]
 * @param {'auto'|'ar'|'en'} [options.to='auto'] - Target language direction.
 * @returns {string} Converted text.
 */
export function fixKeyboardTypo(input, options = {}) {
  if (!input || typeof input !== 'string') return '';
  const { to = 'auto' } = options;

  let targetDirection = to;
  if (targetDirection === 'auto') {
    const hasArabic = /[\u0600-\u06FF]/.test(input);
    targetDirection = hasArabic ? 'en' : 'ar';
  }

  if (targetDirection === 'en') {
    let text = input;
    // Replace ligatures first
    for (const [arLig, enChar] of AR_LIGATURES) {
      text = text.replaceAll(arLig, enChar);
    }
    return text.split('').map(ch => AR_TO_EN[ch] !== undefined ? AR_TO_EN[ch] : ch).join('');
  } else {
    return input.split('').map(ch => EN_TO_AR[ch] !== undefined ? EN_TO_AR[ch] : (EN_TO_AR[ch.toLowerCase()] || ch)).join('');
  }
}
