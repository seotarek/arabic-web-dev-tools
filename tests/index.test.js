import assert from 'assert';
import { stripTashkeel, normalizeArabic, convertToRtlCss, fixKeyboardTypo } from '../src/index.js';

// Test 1: Tashkeel Stripping
const textWithTashkeel = "مَرْحَبًا بِكُمْ فِي مَوْقِعِنَا";
assert.strictEqual(stripTashkeel(textWithTashkeel), "مرحبا بكم في موقعنا");

// Test 2: Keyboard typo
assert.strictEqual(fixKeyboardTypo("lvpfn"), "مرحبا");

// Test 3: CSS RTL conversion
const ltrCss = ".box { margin-left: 10px; float: left; }";
assert.strictEqual(convertToRtlCss(ltrCss), ".box { margin-right: 10px; float: right; }");

console.log("All Arabic Web Dev Tools tests passed successfully!");
