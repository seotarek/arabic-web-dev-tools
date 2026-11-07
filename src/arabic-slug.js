import { stripTashkeel, removeTatweel } from './tashkeel.js';

const ARABIC_STOP_WORDS = new Set([
  'في', 'من', 'إلى', 'الى', 'عن', 'على', 'علي', 'مع', 'حتى',
  'أو', 'او', 'ثم', 'لكن', 'بل', 'لا', 'ما', 'لم', 'لن',
  'هو', 'هي', 'هم', 'هن', 'هذا', 'هذه', 'هؤلاء', 'ذلك', 'تلك',
  'الذي', 'التي', 'الذين', 'اللاتي', 'اللواتي', 'كيف', 'ماذا', 'لماذا',
  'هل', 'كم', 'متى', 'أين', 'اين', 'ان', 'أن', 'إن', 'كان', 'كانت'
]);

/**
 * Generates clean, URL-safe slug from Arabic and multilingual text.
 *
 * @param {string} text - Source title or string.
 * @param {Object} [options]
 * @param {string} [options.separator='-'] - Word separator.
 * @param {boolean} [options.removeStopWords=false] - Remove common Arabic particles.
 * @param {boolean} [options.normalize=false] - Normalize Alef/Taa/Yaa variants.
 * @param {number} [options.maxLength] - Maximum length of the returned slug.
 * @returns {string} URL slug.
 */
export function generateArabicSlug(text, options = {}) {
  if (!text || typeof text !== 'string') return '';

  const {
    separator = '-',
    removeStopWords = false,
    normalize = false,
    maxLength = null,
  } = options;

  let cleaned = stripTashkeel(text);
  cleaned = removeTatweel(cleaned);

  if (normalize) {
    cleaned = cleaned
      .replace(/[إأآا]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي');
  }

  cleaned = cleaned.toLowerCase();

  // Strip invalid URL characters, punctuation, and non-alphanumeric symbols
  cleaned = cleaned.replace(/[^\u0621-\u064Aa-z0-9\s-]/g, ' ');

  let words = cleaned.trim().split(/\s+/).filter(Boolean);

  if (removeStopWords) {
    words = words.filter(word => !ARABIC_STOP_WORDS.has(word));
  }

  let slug = words.join(separator);

  // Collapse consecutive separators and trim edges
  const escapedSep = separator.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  slug = slug
    .replace(new RegExp(`${escapedSep}+`, 'g'), separator)
    .replace(new RegExp(`^${escapedSep}+|${escapedSep}+$`, 'g'), '');

  if (maxLength && slug.length > maxLength) {
    slug = slug.slice(0, maxLength).replace(new RegExp(`${escapedSep}+$`, 'g'), '');
  }

  return slug;
}

/**
 * Truncates text cleanly at word boundaries for search engine snippets and titles.
 *
 * @param {string} text - Input text.
 * @param {number} [maxChars=155] - Target character threshold.
 * @param {string} [suffix='...'] - Ellipsis suffix when truncated.
 * @returns {string} Truncated text.
 */
export function truncateArabicMeta(text, maxChars = 155, suffix = '...') {
  if (!text || typeof text !== 'string') return '';
  const trimmed = text.trim().replace(/\s+/g, ' ');
  if (trimmed.length <= maxChars) return trimmed;

  const targetLength = Math.max(0, maxChars - suffix.length);
  const truncated = trimmed.slice(0, targetLength);

  const lastSpace = truncated.lastIndexOf(' ');
  const cleanCut = lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated;

  const result = cleanCut.replace(/[\s,.;:!؟،-]+$/, '');
  return `${result}${suffix}`;
}
