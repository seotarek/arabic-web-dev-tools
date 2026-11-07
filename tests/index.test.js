import assert from 'assert';
import {
  stripTashkeel,
  normalizeArabic,
  convertToRtlCss,
  fixKeyboardTypo,
  generateArabicSlug,
  truncateArabicMeta,
} from '../src/index.js';

// Test 1: Tashkeel Stripping
const textWithTashkeel = "مَرْحَبًا بِكُمْ فِي مَوْقِعِنَا";
assert.strictEqual(stripTashkeel(textWithTashkeel), "مرحبا بكم في موقعنا");

// Test 2: Keyboard typo
assert.strictEqual(fixKeyboardTypo("lvpfh"), "مرحبا");
assert.strictEqual(fixKeyboardTypo("lvpfn"), "مرحبى");

// Test 3: CSS RTL conversion
const ltrCss = ".box { margin-left: 10px; float: left; }";
assert.strictEqual(convertToRtlCss(ltrCss), ".box { margin-right: 10px; float: right; }");

// Test 4: Arabic Slug - standard with punctuation
const rawTitle = "دليل هندسة البرمجيات لعام 2026! (شامل ومجاني)";
assert.strictEqual(
  generateArabicSlug(rawTitle),
  "دليل-هندسة-البرمجيات-لعام-2026-شامل-ومجاني"
);

// Test 5: Arabic Slug - with tashkeel and normalization
const tashkeelTitle = "أَفْضَلُ 10 مُمَارَسَاتٍ فِي تَطْوِيرِ الْوِيبْ";
assert.strictEqual(
  generateArabicSlug(tashkeelTitle, { normalize: true }),
  "افضل-10-ممارسات-في-تطوير-الويب"
);

// Test 6: Arabic Slug - remove stop words
const stopWordsTitle = "كيف تبدأ في تعلم البرمجة من الصفر";
assert.strictEqual(
  generateArabicSlug(stopWordsTitle, { removeStopWords: true }),
  "تبدأ-تعلم-البرمجة-الصفر"
);

// Test 7: Arabic Slug - maxLength truncation cleanly
const longTitle = "مقال طويل جدا جدا جدا جدا يتجاوز الحد المسموح";
const truncatedSlug = generateArabicSlug(longTitle, { maxLength: 20 });
assert.ok(truncatedSlug.length <= 20);
assert.ok(!truncatedSlug.endsWith('-'));

// Test 8: Truncate Arabic Meta - under threshold
const shortMeta = "هذا نص قصير لا يتجاوز الحد";
assert.strictEqual(truncateArabicMeta(shortMeta, 100), shortMeta);

// Test 9: Truncate Arabic Meta - word boundary cut
const fullDescription = "دليل مفصل يشرح أفضل الممارسات الهندسية لبناء تطبيقات سريعة";
const truncatedMeta = truncateArabicMeta(fullDescription, 35);
assert.strictEqual(truncatedMeta, "دليل مفصل يشرح أفضل الممارسات...");

console.log("All Arabic Web Dev Tools tests passed successfully!");
