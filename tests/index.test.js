import assert from 'node:assert';
import {
  stripTashkeel,
  normalizeArabic,
  removeTatweel,
  convertToRtlCss,
  convertToLogicalCss,
  convertTailwindToRtl,
  convertTailwindToLogical,
  fixKeyboardTypo,
  generateArabicSlug,
  truncateArabicMeta,
  toEasternDigits,
  toWesternDigits,
  formatArabicNumber,
  formatArabicCurrency,
  isRtl,
  wrapBiDi,
  sanitizeMixedText,
  BIDI_CHARS
} from '../src/index.js';

console.log('--- Running Arabic Web Dev Tools Test Suite ---');

// 1. Tashkeel and Tatweel
const sampleWithTashkeel = 'مَرْحَبًا بِكُمْ فِي مَوْقِعِنَا';
assert.strictEqual(stripTashkeel(sampleWithTashkeel), 'مرحبا بكم في موقعنا');

const quranicWithMarks = 'الرَّحْمَٰنِ الرَّحِيمِ';
assert.strictEqual(stripTashkeel(quranicWithMarks), 'الرحمن الرحيم');

const tatweelText = 'مـــرحـــبـــا';
assert.strictEqual(removeTatweel(tatweelText), 'مرحبا');

// 2. Normalization
const complexArabic = 'إِبْرَاهِيمُ أَرْسَلَ رِسَالَةً إِلَى عَلِيٍّ';
assert.strictEqual(normalizeArabic(complexArabic), 'ابراهيم ارسل رساله الي علي');

const persianUrdu = 'کاربر گرامى چطورید';
assert.strictEqual(
  normalizeArabic(persianUrdu, { normalizePersianUrdu: true }),
  'كاربر كرامي جطوريد'
);

// 3. Keyboard Typo Fixer
assert.strictEqual(fixKeyboardTypo('lvpfh'), 'مرحبا');
assert.strictEqual(fixKeyboardTypo('lvpfn'), 'مرحبى');
assert.strictEqual(fixKeyboardTypo('High'), 'أهلا');
assert.strictEqual(fixKeyboardTypo('Hib'), 'أهلا');
assert.strictEqual(fixKeyboardTypo('?'), '؟');
assert.strictEqual(fixKeyboardTypo('مرحبا'), 'lvpfh');
assert.strictEqual(fixKeyboardTypo('لا'), 'b');
assert.strictEqual(fixKeyboardTypo('لأ'), 'G');
assert.strictEqual(fixKeyboardTypo('لإ'), 'T');
assert.strictEqual(fixKeyboardTypo('لآ'), 'B');
assert.strictEqual(fixKeyboardTypo('أهلا'), 'Hib');

// 4. CSS Physical Flipping
const physicalCss = '.box { margin-left: 10px; padding-right: 20px; float: left; text-align: left; left: 5px; }';
const flippedCss = convertToRtlCss(physicalCss);
assert.strictEqual(flippedCss, '.box { margin-right: 10px; padding-left: 20px; float: right; text-align: right; right: 5px; }');

// 5. CSS Logical Properties
const rawPhysical = '.card { margin-left: 16px; margin-right: 8px; padding-left: 12px; left: 0; text-align: left; }';
const logicalCss = convertToLogicalCss(rawPhysical);
assert.strictEqual(
  logicalCss,
  '.card { margin-inline-start: 16px; margin-inline-end: 8px; padding-inline-start: 12px; inset-inline-start: 0; text-align: start; }'
);

// 6. Tailwind Conversions
const tailwindPhysical = 'mr-4 pl-2 left-0 text-left';
assert.strictEqual(convertTailwindToRtl(tailwindPhysical), 'ml-4 pr-2 right-0 text-right');
assert.strictEqual(convertTailwindToLogical(tailwindPhysical), 'me-4 ps-2 start-0 text-start');

// 7. Arabic SEO Slug
const title = 'دليل هندسة البرمجيات لعام 2026! (شامل ومجاني)';
assert.strictEqual(
  generateArabicSlug(title),
  'دليل-هندسة-البرمجيات-لعام-2026-شامل-ومجاني'
);

const stopWordsTitle = 'كيف تبدأ في تعلم البرمجة من الصفر';
assert.strictEqual(
  generateArabicSlug(stopWordsTitle, { removeStopWords: true }),
  'تبدأ-تعلم-البرمجة-الصفر'
);

const longTitle = 'مقال تقني طويل جدا جدا جدا جدا يتجاوز الحد';
const truncatedSlug = generateArabicSlug(longTitle, { maxLength: 20 });
assert.ok(truncatedSlug.length <= 20);
assert.ok(!truncatedSlug.endsWith('-'));

// 8. Meta Truncation
const fullMeta = 'دليل مفصل يشرح أفضل الممارسات الهندسية لبناء تطبيقات سريعة';
const metaResult = truncateArabicMeta(fullMeta, 35);
assert.strictEqual(metaResult, 'دليل مفصل يشرح أفضل الممارسات...');

// 9. Numbers Utilities
assert.strictEqual(toEasternDigits('2026-05-14'), '٢٠٢٦-٠٥-١٤');
assert.strictEqual(toEasternDigits(12345), '١٢٣٤٥');
assert.strictEqual(toWesternDigits('٢٠٢٦-٠٥-١٤'), '2026-05-14');
assert.strictEqual(toWesternDigits('۰۱۲۳۴۵۶۷۸۹'), '0123456789');

const formattedWestern = formatArabicNumber(1250000, { useEasternDigits: false });
assert.ok(formattedWestern.includes('1') && formattedWestern.includes('250'));

const formattedEastern = formatArabicNumber(1250, { useEasternDigits: true });
assert.ok(formattedEastern.includes('١') && formattedEastern.includes('٢٥٠'));

// 10. Currency Formatting
const egp = formatArabicCurrency(150, 'EGP');
assert.ok(egp.includes('ج.م') && egp.includes('150'));

const sar = formatArabicCurrency(250, 'SAR', { position: 'before' });
assert.ok(sar.startsWith('ر.س'));

// 11. BiDi Utilities
assert.strictEqual(isRtl('مرحبا بالعالم'), true);
assert.strictEqual(isRtl('Hello World'), false);
assert.strictEqual(isRtl('Hello مرحبا', { predominant: true }), false);
assert.strictEqual(isRtl('مرحبا Hello مرحبا', { predominant: true }), true);

const isolated = wrapBiDi('PRO-2026', 'isolate');
assert.strictEqual(isolated, `${BIDI_CHARS.FSI}PRO-2026${BIDI_CHARS.PDI}`);

const htmlIsolated = wrapBiDi('English Term', 'html');
assert.strictEqual(htmlIsolated, '<bdi>English Term</bdi>');

const problematicSentence = 'رابط الموقع هو https://example.com!';
const sanitized = sanitizeMixedText(problematicSentence);
assert.strictEqual(sanitized, `${problematicSentence}${BIDI_CHARS.RLM}`);

console.log('✓ All 11 test suites passed successfully with zero errors!');
