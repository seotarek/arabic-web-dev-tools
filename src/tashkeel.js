// Extended Arabic Diacritics and Quranic marks Unicode Range:
// U+0610 to U+061A (honorifics and annotations)
// U+064B to U+065F (Fatha, Damma, Kasra, Shadda, Sukun, Tanween, Maddah, Hamza above/below, etc.)
// U+0670 (Superscript Alef / Dagger Alef)
// U+06D6 to U+06ED (Quranic stop and recitation marks)
const TASHKEEL_REGEX = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g;
const TATWEEL_REGEX = /\u0640/g;

/**
 * Strips all Arabic diacritics (Harakat, Tashkeel, Tanween, Shadda, Sukun, and Quranic recitation marks).
 *
 * @param {string} text - Arabic text.
 * @returns {string} Text without diacritics.
 */
export function stripTashkeel(text) {
  if (!text || typeof text !== 'string') return '';
  return text.replace(TASHKEEL_REGEX, '');
}

/**
 * Removes Arabic Tatweel (Kashida, U+0640).
 *
 * @param {string} text - Arabic text.
 * @returns {string} Text without Tatweel.
 */
export function removeTatweel(text) {
  if (!text || typeof text !== 'string') return '';
  return text.replace(TATWEEL_REGEX, '');
}

/**
 * Normalizes Arabic letters to standardized forms for consistent search indexing and NLP matching.
 *
 * @param {string} text - Arabic text.
 * @param {Object} [options]
 * @param {boolean} [options.stripTashkeel=true] - Remove Harakat and diacritics.
 * @param {boolean} [options.removeTatweel=true] - Remove Tatweel/Kashida.
 * @param {boolean} [options.normalizeAlef=true] - Unify Alef with Hamza/Madda (إ, أ, آ, ٱ) to plain Alef (ا).
 * @param {boolean} [options.normalizeTaa=true] - Convert Taa Marbuta (ة) to Haa (ه).
 * @param {boolean} [options.normalizeYaa=true] - Convert Alef Maksura (ى) to Yaa (ي).
 * @param {boolean} [options.normalizePersianUrdu=false] - Convert Persian/Urdu variants to Arabic equivalents.
 * @returns {string} Normalized text.
 */
export function normalizeArabic(text, options = {}) {
  if (!text || typeof text !== 'string') return '';
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

  if (normalizeAlef) {
    res = res.replace(/[إأآٱا]/g, 'ا');
  }
  if (normalizeTaa) {
    res = res.replace(/ة/g, 'ه');
  }
  if (normalizeYaa) {
    res = res.replace(/ى/g, 'ي');
  }
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
