// Arabic Diacritics Unicode Range: U+064B to U+0652, plus Sukun, Shadda, etc.
const TASHKEEL_REGEX = /[\u064B-\u0652\u0670\u06D6-\u06ED]/g;
const TATWEEL_REGEX = /\u0640/g;

export function stripTashkeel(text) {
  if (!text) return '';
  return text.replace(TASHKEEL_REGEX, '');
}

export function removeTatweel(text) {
  if (!text) return '';
  return text.replace(TATWEEL_REGEX, '');
}

export function normalizeArabic(text) {
  if (!text) return '';
  let res = stripTashkeel(text);
  res = removeTatweel(res);
  // Normalize Alef forms
  res = res.replace(/[إأآا]/g, 'ا');
  // Normalize Taa Marbuta / Haa
  res = res.replace(/ة/g, 'ه');
  // Normalize Yaa / Alef Maksura
  res = res.replace(/ى/g, 'ي');
  return res;
}
