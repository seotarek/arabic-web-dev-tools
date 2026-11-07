const WESTERN_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const EASTERN_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

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

const ARABIC_CURRENCY_SYMBOLS = {
  SAR: 'ر.س',
  EGP: 'ج.م',
  AED: 'د.إ',
  KWD: 'د.ك',
  QAR: 'ر.ق',
  BHD: 'د.ب',
  OMR: 'ر.ع',
  JOD: 'د.أ',
  USD: '$',
  EUR: '€',
  GBP: '£'
};

/**
 * Converts Western digits (0-9) to Eastern Arabic-Indic digits (٠-٩).
 *
 * @param {string|number} input - Digits to convert.
 * @returns {string} Text with Eastern Arabic digits.
 */
export function toEasternDigits(input) {
  if (input === null || input === undefined) return '';
  return String(input).replace(/[0-9]/g, match => DIGIT_MAP_TO_EASTERN[match]);
}

/**
 * Converts Eastern Arabic-Indic (٠-٩) and Persian (۰-۹) digits to Western standard digits (0-9).
 *
 * @param {string} input - Text containing Arabic/Persian digits.
 * @returns {string} Text with Western digits.
 */
export function toWesternDigits(input) {
  if (!input || typeof input !== 'string') return '';
  return input.replace(/[٠-٩۰-۹٫٬]/g, match => DIGIT_MAP_TO_WESTERN[match] !== undefined ? DIGIT_MAP_TO_WESTERN[match] : match);
}

/**
 * Formats a number according to Arabic locale conventions with customizable separators and numeral systems.
 *
 * @param {number|string} value - Number to format.
 * @param {Object} [options]
 * @param {boolean} [options.useEasternDigits=false] - Whether to use Eastern Arabic numerals (٠-٩).
 * @param {number} [options.decimals] - Maximum fraction digits.
 * @param {string} [options.locale='ar-EG'] - Arabic locale code (e.g. ar-EG, ar-SA).
 * @returns {string} Formatted number string.
 */
export function formatArabicNumber(value, options = {}) {
  const num = typeof value === 'string' ? parseFloat(toWesternDigits(value)) : Number(value);
  if (isNaN(num)) return '';

  const {
    useEasternDigits = false,
    decimals = undefined,
    locale = 'ar-EG'
  } = options;

  const intlOptions = {
    numberingSystem: useEasternDigits ? 'arab' : 'latn',
    ...(decimals !== undefined ? { minimumFractionDigits: decimals, maximumFractionDigits: decimals } : {})
  };

  try {
    return new Intl.NumberFormat(locale, intlOptions).format(num);
  } catch {
    let formatted = decimals !== undefined ? num.toFixed(decimals) : String(num);
    return useEasternDigits ? toEasternDigits(formatted) : formatted;
  }
}

/**
 * Formats monetary amounts with standard Arabic currency symbols and typography.
 *
 * @param {number|string} amount - Monetary amount.
 * @param {string} [currency='SAR'] - ISO 4217 currency code or custom symbol.
 * @param {Object} [options]
 * @param {boolean} [options.useEasternDigits=false] - Use Eastern Arabic numerals.
 * @param {number} [options.decimals=2] - Number of fraction digits.
 * @param {'before'|'after'} [options.position='after'] - Symbol position relative to amount.
 * @returns {string} Formatted currency string.
 */
export function formatArabicCurrency(amount, currency = 'SAR', options = {}) {
  const {
    useEasternDigits = false,
    decimals = 2,
    position = 'after'
  } = options;

  const symbol = ARABIC_CURRENCY_SYMBOLS[currency.toUpperCase()] || currency;
  const formattedNumber = formatArabicNumber(amount, { useEasternDigits, decimals });
  if (!formattedNumber) return '';

  return position === 'before'
    ? `${symbol} ${formattedNumber}`
    : `${formattedNumber} ${symbol}`;
}
