/**
 * Arabic Web Dev Tools - Interactive Portal Engine (Vanilla ES Module)
 * Zero external dependencies, pure modern Web API.
 */

// --- 1. CORE LIBRARY DEFINITIONS ---

const TASHKEEL_REGEX = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g;
const TATWEEL_REGEX = /\u0640/g;

export function stripTashkeel(text) {
  if (!text) return '';
  return text.replace(TASHKEEL_REGEX, '');
}

export function removeTatweel(text) {
  if (!text) return '';
  return text.replace(TATWEEL_REGEX, '');
}

export function normalizeArabic(text, options = {}) {
  if (!text) return '';
  const {
    stripTashkeel: shouldStripTashkeel = true,
    removeTatweel: shouldRemoveTatweel = true,
    normalizeAlef = true,
    normalizeTaa = true,
    normalizeYaa = true,
    normalizePersianUrdu = false,
  } = options;

  let res = text;
  if (shouldStripTashkeel) res = stripTashkeel(res);
  if (shouldRemoveTatweel) res = removeTatweel(res);

  if (normalizeAlef) res = res.replace(/[إأآٱا]/g, 'ا');
  if (normalizeTaa) res = res.replace(/ة/g, 'ه');
  if (normalizeYaa) res = res.replace(/ى/g, 'ي');
  if (normalizePersianUrdu) {
    res = res
      .replace(/ک/g, 'ك')
      .replace(/گ/g, 'ك')
      .replace(/[یے]/g, 'ي')
      .replace(/پ/g, 'ب')
      .replace(/چ/g, 'ج')
      .replace(/ژ/g, 'ز')
      .replace(/ڤ/g, 'ف')
      .replace(/ں/g, 'ن')
      .replace(/[ہھ]/g, 'ه');
  }
  return res;
}

export function convertToRtlCss(cssText) {
  if (!cssText) return '';
  let out = cssText;
  const replacements = [
    [/\bmargin-left\b/g, '__TMP_ML__'],
    [/\bmargin-right\b/g, 'margin-left'],
    [/__TMP_ML__/g, 'margin-right'],
    [/\bpadding-left\b/g, '__TMP_PL__'],
    [/\bpadding-right\b/g, 'padding-left'],
    [/__TMP_PL__/g, 'padding-right'],
    [/\bborder-left\b/g, '__TMP_BL__'],
    [/\bborder-right\b/g, 'border-left'],
    [/__TMP_BL__/g, 'border-right'],
    [/\bborder-top-left-radius\b/g, '__TMP_BTLR__'],
    [/\bborder-top-right-radius\b/g, 'border-top-left-radius'],
    [/__TMP_BTLR__/g, 'border-top-right-radius'],
    [/\bborder-bottom-left-radius\b/g, '__TMP_BBLR__'],
    [/\bborder-bottom-right-radius\b/g, 'border-bottom-left-radius'],
    [/__TMP_BBLR__/g, 'border-bottom-right-radius'],
    [/(?<!-)\bleft\s*:/g, '__TMP_L__:'],
    [/(?<!-)\bright\s*:/g, 'left:'],
    [/__TMP_L__:/g, 'right:'],
    [/\btext-align\s*:\s*left\b/g, '__TMP_TAL__'],
    [/\btext-align\s*:\s*right\b/g, 'text-align: left'],
    [/__TMP_TAL__/g, 'text-align: right'],
    [/\bfloat\s*:\s*left\b/g, '__TMP_FL__'],
    [/\bfloat\s*:\s*right\b/g, 'float: left'],
    [/__TMP_FL__/g, 'float: right'],
  ];
  for (const [pattern, repl] of replacements) {
    out = out.replace(pattern, repl);
  }
  return out;
}

export function convertToLogicalCss(cssText) {
  if (!cssText) return '';
  let out = cssText;
  const logicalRules = [
    [/\bmargin-left\b/g, 'margin-inline-start'],
    [/\bmargin-right\b/g, 'margin-inline-end'],
    [/\bpadding-left\b/g, 'padding-inline-start'],
    [/\bpadding-right\b/g, 'padding-inline-end'],
    [/\bborder-left\b/g, 'border-inline-start'],
    [/\bborder-right\b/g, 'border-inline-end'],
    [/\bborder-top-left-radius\b/g, 'border-start-start-radius'],
    [/\bborder-top-right-radius\b/g, 'border-start-end-radius'],
    [/\bborder-bottom-left-radius\b/g, 'border-end-start-radius'],
    [/\bborder-bottom-right-radius\b/g, 'border-end-end-radius'],
    [/(?<!-)\bleft\s*:/g, 'inset-inline-start:'],
    [/(?<!-)\bright\s*:/g, 'inset-inline-end:'],
    [/\btext-align\s*:\s*left\b/g, 'text-align: start'],
    [/\btext-align\s*:\s*right\b/g, 'text-align: end'],
  ];
  for (const [pattern, repl] of logicalRules) {
    out = out.replace(pattern, repl);
  }
  return out;
}

export function convertTailwindToLogical(classes) {
  if (!classes) return '';
  return classes
    .split(/\s+/)
    .filter(Boolean)
    .map(cls => {
      if (cls.startsWith('mr-')) return cls.replace('mr-', 'me-');
      if (cls.startsWith('ml-')) return cls.replace('ml-', 'ms-');
      if (cls.startsWith('pr-')) return cls.replace('pr-', 'pe-');
      if (cls.startsWith('pl-')) return cls.replace('pl-', 'ps-');
      if (cls.startsWith('left-')) return cls.replace('left-', 'start-');
      if (cls.startsWith('right-')) return cls.replace('right-', 'end-');
      if (cls.startsWith('border-r-')) return cls.replace('border-r-', 'border-e-');
      if (cls.startsWith('border-l-')) return cls.replace('border-l-', 'border-s-');
      if (cls.startsWith('rounded-r-')) return cls.replace('rounded-r-', 'rounded-e-');
      if (cls.startsWith('rounded-l-')) return cls.replace('rounded-l-', 'rounded-s-');
      if (cls === 'text-left') return 'text-start';
      if (cls === 'text-right') return 'text-end';
      return cls;
    })
    .join(' ');
}

const EN_TO_AR = {
  '`': 'ذ', 'q': 'ض', 'w': 'ص', 'e': 'ث', 'r': 'ق', 't': 'ف', 'y': 'غ', 'u': 'ع', 'i': 'ه', 'o': 'خ', 'p': 'ح', '[': 'ج', ']': 'د',
  'a': 'ش', 's': 'س', 'd': 'ي', 'f': 'ب', 'g': 'ل', 'h': 'ا', 'j': 'ت', 'k': 'ن', 'l': 'م', ';': 'ك', '\'': 'ط',
  'z': 'ئ', 'x': 'ء', 'c': 'ؤ', 'v': 'ر', 'b': 'لا', 'n': 'ى', 'm': 'ة', ',': 'و', '.': 'ز', '/': 'ظ',
  '~': 'ّ', 'Q': 'َ', 'W': 'ً', 'E': 'ُ', 'R': 'ٌ', 'T': 'لإ', 'Y': 'إ', 'U': '‘', 'I': '÷', 'O': '×', 'P': '؛',
  'A': 'ِ', 'S': 'ٍ', 'D': ']', 'F': '[', 'G': 'لأ', 'H': 'أ', 'J': 'ـ', 'K': '،', 'L': '/',
  'Z': '~', 'X': 'ْ', 'C': '}', 'V': '{', 'B': 'لآ', 'N': 'آ', 'M': '’', '?': '؟'
};

const AR_LIGATURES = [
  ['لآ', 'B'],
  ['لأ', 'G'],
  ['لإ', 'T'],
  ['لا', 'b'],
];

const AR_TO_EN = {
  'ذ': '`', 'ض': 'q', 'ص': 'w', 'ث': 'e', 'ق': 'r', 'ف': 't', 'غ': 'y', 'ع': 'u', 'ه': 'i', 'خ': 'o', 'ح': 'p', 'ج': '[', 'د': ']',
  'ش': 'a', 'س': 's', 'ي': 'd', 'ب': 'f', 'ل': 'g', 'ا': 'h', 'ت': 'j', 'ن': 'k', 'م': 'l', 'ك': ';', 'ط': '\'',
  'ئ': 'z', 'ء': 'x', 'ؤ': 'c', 'ر': 'v', 'ى': 'n', 'ة': 'm', 'و': ',', 'ز': '.', 'ظ': '/',
  'ّ': '~', 'َ': 'Q', 'ً': 'W', 'ُ': 'E', 'ٌ': 'R', 'إ': 'Y', '؛': 'P',
  'ِ': 'A', 'ٍ': 'S', 'أ': 'H', 'ـ': 'J', '،': 'K', 'ْ': 'X', 'آ': 'N', '؟': '?'
};

export function fixKeyboardTypo(input, options = {}) {
  if (!input) return '';
  const { to = 'auto' } = options;
  let target = to;
  if (target === 'auto') {
    target = /[\u0600-\u06FF]/.test(input) ? 'en' : 'ar';
  }
  if (target === 'en') {
    let text = input;
    for (const [arLig, enChar] of AR_LIGATURES) {
      text = text.replaceAll(arLig, enChar);
    }
    return text.split('').map(ch => AR_TO_EN[ch] !== undefined ? AR_TO_EN[ch] : ch).join('');
  } else {
    return input.split('').map(ch => EN_TO_AR[ch] !== undefined ? EN_TO_AR[ch] : (EN_TO_AR[ch.toLowerCase()] || ch)).join('');
  }
}

const ARABIC_STOP_WORDS = new Set([
  'في', 'من', 'إلى', 'الى', 'عن', 'على', 'علي', 'مع', 'حتى',
  'أو', 'او', 'ثم', 'لكن', 'بل', 'لا', 'ما', 'لم', 'لن',
  'هو', 'هي', 'هم', 'هن', 'هذا', 'هذه', 'هؤلاء', 'ذلك', 'تلك',
  'الذي', 'التي', 'الذين', 'اللاتي', 'اللواتي', 'كيف', 'ماذا', 'لماذا',
  'هل', 'كم', 'متى', 'أين', 'اين', 'ان', 'أن', 'إن', 'كان', 'كانت'
]);

export function generateArabicSlug(text, options = {}) {
  if (!text) return '';
  const {
    separator = '-',
    removeStopWords = false,
    normalize = false,
    maxLength = null,
  } = options;

  let cleaned = stripTashkeel(text);
  cleaned = removeTatweel(cleaned);
  if (normalize) {
    cleaned = cleaned.replace(/[إأآا]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي');
  }
  cleaned = cleaned.toLowerCase().replace(/[^\u0621-\u064Aa-z0-9\s-]/g, ' ');
  let words = cleaned.trim().split(/\s+/).filter(Boolean);
  if (removeStopWords) {
    words = words.filter(word => !ARABIC_STOP_WORDS.has(word));
  }
  let slug = words.join(separator);
  const escapedSep = separator.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  slug = slug
    .replace(new RegExp(`${escapedSep}+`, 'g'), separator)
    .replace(new RegExp(`^${escapedSep}+|${escapedSep}+$`, 'g'), '');
  if (maxLength && slug.length > maxLength) {
    slug = slug.slice(0, maxLength).replace(new RegExp(`${escapedSep}+$`, 'g'), '');
  }
  return slug;
}

export function truncateArabicMeta(text, maxChars = 155, suffix = '...') {
  if (!text) return '';
  const trimmed = text.trim().replace(/\s+/g, ' ');
  if (trimmed.length <= maxChars) return trimmed;
  const targetLength = Math.max(0, maxChars - suffix.length);
  const truncated = trimmed.slice(0, targetLength);
  const lastSpace = truncated.lastIndexOf(' ');
  const cleanCut = lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated;
  return `${cleanCut.replace(/[\s,.;:!؟،-]+$/, '')}${suffix}`;
}

const DIGIT_MAP_TO_EASTERN = {
  '0': '٠', '1': '١', '2': '٢', '3': '٣', '4': '٤',
  '5': '٥', '6': '٦', '7': '٧', '8': '٨', '9': '٩'
};
const DIGIT_MAP_TO_WESTERN = {
  '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
  '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
  '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
  '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
  '٫': '.', '٬': ''
};

export function toEasternDigits(input) {
  if (input === null || input === undefined) return '';
  return String(input).replace(/[0-9]/g, match => DIGIT_MAP_TO_EASTERN[match]);
}

export function toWesternDigits(input) {
  if (!input) return '';
  return String(input).replace(/[٠-٩۰-۹٫٬]/g, match => DIGIT_MAP_TO_WESTERN[match] !== undefined ? DIGIT_MAP_TO_WESTERN[match] : match);
}

export function formatArabicCurrency(amount, currency = 'SAR', options = {}) {
  const { useEasternDigits = false, decimals = 2, position = 'after' } = options;
  const symbols = { SAR: 'ر.س', EGP: 'ج.م', AED: 'د.إ', KWD: 'د.ك', QAR: 'ر.ق', USD: '$', EUR: '€' };
  const symbol = symbols[currency.toUpperCase()] || currency;
  const num = parseFloat(toWesternDigits(amount)) || 0;
  const formattedNum = num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const finalNum = useEasternDigits ? toEasternDigits(formattedNum).replace(/\./g, '٫').replace(/,/g, '٬') : formattedNum;
  return position === 'before' ? `${symbol} ${finalNum}` : `${finalNum} ${symbol}`;
}

export const BIDI_CHARS = {
  RLM: '\u200F',
  LRM: '\u200E',
  ALM: '\u061C',
  RLI: '\u2067',
  LRI: '\u2066',
  FSI: '\u2068',
  PDI: '\u2069',
};

export function sanitizeMixedText(text) {
  if (!text) return '';
  const trailingPunctuationRegex = /([a-zA-Z0-9#@%$/\\+*-]+[\s]*)([.!؟:،,?;-]+)$/;
  if (trailingPunctuationRegex.test(text)) {
    return `${text}${BIDI_CHARS.RLM}`;
  }
  return text;
}

// --- 2. INTERACTIVE UI CONTROLLER ---

window.addEventListener('DOMContentLoaded', () => {
  setupCopyButtons();
  setupTashkeelLab();
  setupCssLab();
  setupSlugSerpLab();
  setupNumbersLab();
  setupBidiLab();
  setupKeyboardLab();
});

function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

function setupCopyButtons() {
  document.querySelectorAll('[data-copy-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-copy-target');
      const target = document.getElementById(targetId);
      const val = target.value || target.textContent;
      if (val) {
        navigator.clipboard.writeText(val).then(() => {
          showToast('✓ تم النسخ إلى الحافظة بنجاح!');
        });
      }
    });
  });
}

// 1. Tashkeel Lab
function setupTashkeelLab() {
  const input = document.getElementById('tashkeelInput');
  const meter = document.getElementById('tashkeelMeter');
  const countStats = document.getElementById('tashkeelStats');

  const updateTelemetry = () => {
    const val = input.value;
    const diacritics = (val.match(TASHKEEL_REGEX) || []).length;
    const tatweels = (val.match(TATWEEL_REGEX) || []).length;
    const totalChars = val.length;
    
    countStats.textContent = `حروف: ${totalChars} | حركات وتشكيل: ${diacritics} | كشيدة: ${tatweels}`;
    const percent = totalChars > 0 ? Math.min(100, Math.round(((diacritics + tatweels) / totalChars) * 100)) : 0;
    meter.style.width = `${percent}%`;
  };

  input.addEventListener('input', updateTelemetry);
  updateTelemetry();

  document.getElementById('btnStripTashkeel').addEventListener('click', () => {
    input.value = stripTashkeel(input.value);
    updateTelemetry();
    showToast('✓ تم حذف التشكيل بالكامل');
  });

  document.getElementById('btnRemoveTatweel').addEventListener('click', () => {
    input.value = removeTatweel(input.value);
    updateTelemetry();
    showToast('✓ تم حذف الكشيدة (المد)');
  });

  document.getElementById('btnNormalizeArabic').addEventListener('click', () => {
    input.value = normalizeArabic(input.value, { normalizePersianUrdu: true });
    updateTelemetry();
    showToast('✓ تم توحيد الحروف وحذف التشكيل');
  });
}

// 2. CSS & Tailwind Lab
function setupCssLab() {
  const input = document.getElementById('cssInput');
  const output = document.getElementById('cssOutput');
  const modeRadios = document.querySelectorAll('input[name="cssMode"]');

  const runConvert = () => {
    const val = input.value;
    const mode = document.querySelector('input[name="cssMode"]:checked').value;
    if (mode === 'logical') {
      output.value = convertToLogicalCss(val);
    } else if (mode === 'rtl') {
      output.value = convertToRtlCss(val);
    } else if (mode === 'tailwind') {
      output.value = convertTailwindToLogical(val);
    }
  };

  input.addEventListener('input', runConvert);
  modeRadios.forEach(r => r.addEventListener('change', runConvert));
  runConvert();
}

// 3. Arabic Slug & SERP Lab
function setupSlugSerpLab() {
  const titleInput = document.getElementById('serpTitleInput');
  const descInput = document.getElementById('serpDescInput');
  const stopWordsCheck = document.getElementById('slugStopWords');
  const normalizeCheck = document.getElementById('slugNormalize');
  
  const serpTitle = document.getElementById('serpTitlePreview');
  const serpUrl = document.getElementById('serpUrlPreview');
  const serpSnippet = document.getElementById('serpSnippetPreview');
  const slugOutput = document.getElementById('slugResultText');
  const descMeter = document.getElementById('descCharMeter');
  const descStats = document.getElementById('descStatsText');

  const updateSerp = () => {
    const rawTitle = titleInput.value || 'عنوان الصفحة أو المقال التقني';
    const rawDesc = descInput.value || 'اكتب هنا وصف المقال لمحركات البحث لمشاهدة المعاينة الحية وكيف ستظهر النتيجة داخل صفحة جوجل مع قص الكلمات الزائدة.';
    const removeStopWords = stopWordsCheck.checked;
    const normalize = normalizeCheck.checked;

    const slug = generateArabicSlug(rawTitle, { removeStopWords, normalize, maxLength: 60 });
    const truncatedDesc = truncateArabicMeta(rawDesc, 155);

    serpTitle.textContent = rawTitle;
    serpUrl.textContent = `https://example.com/blog/${slug}`;
    serpSnippet.textContent = truncatedDesc;
    slugOutput.textContent = slug || '(الرابط فارغ)';

    const charCount = rawDesc.length;
    descStats.textContent = `${charCount} / 155 حرف`;
    const meterPercent = Math.min(100, Math.round((charCount / 155) * 100));
    descMeter.style.width = `${meterPercent}%`;
    descMeter.style.background = charCount > 155 ? '#ef4444' : 'linear-gradient(90deg, #10b981, #06b6d4)';
  };

  titleInput.addEventListener('input', updateSerp);
  descInput.addEventListener('input', updateSerp);
  stopWordsCheck.addEventListener('change', updateSerp);
  normalizeCheck.addEventListener('change', updateSerp);
  updateSerp();
}

// 4. Numbers & Currency Lab
function setupNumbersLab() {
  const numberInput = document.getElementById('numberInput');
  const currencySelect = document.getElementById('currencySelect');
  const easternRadio = document.getElementById('useEasternDigitsRadio');
  const westernRadio = document.getElementById('useWesternDigitsRadio');
  const easternDigitsDisplay = document.getElementById('easternDigitsDisplay');
  const formattedCurrencyDisplay = document.getElementById('formattedCurrencyDisplay');

  const updateNumbers = () => {
    const val = numberInput.value || '1499.50';
    const useEastern = easternRadio.checked;
    const currency = currencySelect.value;

    easternDigitsDisplay.textContent = toEasternDigits(val);
    formattedCurrencyDisplay.textContent = formatArabicCurrency(val, currency, { useEasternDigits: useEastern, decimals: 2 });
  };

  numberInput.addEventListener('input', updateNumbers);
  currencySelect.addEventListener('change', updateNumbers);
  easternRadio.addEventListener('change', updateNumbers);
  westernRadio.addEventListener('change', updateNumbers);
  updateNumbers();
}

// 5. BiDi Sandbox
function setupBidiLab() {
  const input = document.getElementById('bidiInput');
  const brokenBox = document.getElementById('bidiBrokenBox');
  const sanitizedBox = document.getElementById('bidiSanitizedBox');

  const updateBidi = () => {
    const val = input.value || 'زوروا موقعنا على https://example.com/arabic-tools!';
    brokenBox.textContent = val;
    sanitizedBox.innerHTML = sanitizeMixedText(val);
  };

  input.addEventListener('input', updateBidi);
  updateBidi();
}

// 6. Keyboard Typo Fixer
function setupKeyboardLab() {
  const input = document.getElementById('keyboardInput');
  const output = document.getElementById('keyboardOutput');

  const updateKeyboard = () => {
    const val = input.value;
    output.textContent = fixKeyboardTypo(val) || '...';
  };

  input.addEventListener('input', updateKeyboard);
  updateKeyboard();

  document.getElementById('btnInvertKeyboard').addEventListener('click', () => {
    const current = output.textContent;
    if (current && current !== '...') {
      input.value = current;
      updateKeyboard();
      showToast('✓ تم عكس التحويل');
    }
  });
}
