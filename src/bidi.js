// Unicode BiDi Control Characters
export const BIDI_CHARS = {
  RLM: '\u200F', // Right-to-Left Mark
  LRM: '\u200E', // Left-to-Right Mark
  ALM: '\u061C', // Arabic Letter Mark
  RLI: '\u2067', // Right-to-Left Isolate
  LRI: '\u2066', // Left-to-Right Isolate
  FSI: '\u2068', // First Strong Isolate
  PDI: '\u2069', // Pop Directional Isolate
};

const ARABIC_UNICODE_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

/**
 * Checks if a string contains Arabic or RTL characters, or is predominantly RTL.
 *
 * @param {string} text - Input text.
 * @param {Object} [options]
 * @param {boolean} [options.predominant=false] - If true, requires > 50% of alphanumeric characters to be RTL.
 * @returns {boolean} True if RTL.
 */
export function isRtl(text, options = {}) {
  if (!text || typeof text !== 'string') return false;
  const { predominant = false } = options;

  if (!predominant) {
    return ARABIC_UNICODE_REGEX.test(text);
  }

  const chars = text.match(/[\p{L}\p{N}]/gu) || [];
  if (chars.length === 0) return false;

  const rtlCount = chars.filter(ch => ARABIC_UNICODE_REGEX.test(ch)).length;
  return rtlCount > (chars.length / 2);
}

/**
 * Wraps text with Unicode BiDi isolate markers or HTML <bdi> to prevent mixed-direction layout bleeding.
 *
 * @param {string} text - Text to isolate.
 * @param {'isolate'|'rli'|'lri'|'fsi'|'mark'|'html'} [type='isolate'] - Isolation strategy.
 * @returns {string} Direction-isolated text.
 */
export function wrapBiDi(text, type = 'isolate') {
  if (!text || typeof text !== 'string') return '';

  switch (type.toLowerCase()) {
    case 'rli':
      return `${BIDI_CHARS.RLI}${text}${BIDI_CHARS.PDI}`;
    case 'lri':
      return `${BIDI_CHARS.LRI}${text}${BIDI_CHARS.PDI}`;
    case 'fsi':
    case 'isolate':
      return `${BIDI_CHARS.FSI}${text}${BIDI_CHARS.PDI}`;
    case 'mark':
    case 'rlm':
      return `${text}${BIDI_CHARS.RLM}`;
    case 'alm':
      return `${text}${BIDI_CHARS.ALM}`;
    case 'html':
      return `<bdi>${text}</bdi>`;
    default:
      return `${BIDI_CHARS.FSI}${text}${BIDI_CHARS.PDI}`;
  }
}

/**
 * Fixes trailing punctuation flipping in mixed Arabic and Latin/numerical sentences.
 * Appends Unicode RLM mark when a sentence ends with Latin text or digits followed by punctuation.
 *
 * @param {string} text - Mixed language text.
 * @returns {string} Sanitized text with stabilized punctuation rendering.
 */
export function sanitizeMixedText(text) {
  if (!text || typeof text !== 'string') return '';
  if (!isRtl(text)) return text;

  // Pattern: Mixed text ending in Latin characters or numbers followed by sentence-ending punctuation (. ? ! : -)
  const trailingPunctuationRegex = /([a-zA-Z0-9#@%$/\\+*-]+[\s]*)([.!؟:،,?;-]+)$/;
  if (trailingPunctuationRegex.test(text)) {
    return `${text}${BIDI_CHARS.RLM}`;
  }

  return text;
}
