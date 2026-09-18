# Arabic Web Dev Tools 🛠️ (أدوات المطور العربي)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-none-blue.svg)](https://github.com/seotarek/arabic-web-dev-tools)
[![RTL Supported](https://img.shields.io/badge/RTL-first-orange.svg)](https://github.com/seotarek/arabic-web-dev-tools)

مجموعة أدوات مفتوحة المصدر وخفيفة جداً بدون أي تبعيات خارجية (Zero-dependency) لمطوري الويب العرب، تعمل بالكامل داخل المتصفح (Client-side) وعلى Node.js.

A lightweight, zero-dependency suite of web utility functions and interactive tools tailored specifically for developers building Arabic and RTL web applications.

---

## 🚀 الأدوات المضمنة (Included Modules)

1. **RTL CSS & Tailwind Converter:**
   * تحويل كود CSS التقليدي إلى قواعد تدعم الاتجاه من اليمين لليسار (`margin-left` ⇄ `margin-right`, `left` ⇄ `right`).
   * تحويل كلاسات Tailwind CSS تلقائياً (مثل `mr-4` إلى `ml-4` أو استخدام الخصائص المنطقية `ms-4`).

2. **Tashkeel Stripper & Text Normalizer (معالج النصوص والتشكيل):**
   * إزالة التشكيل والحركات والتطويل (كشيدة) فورياً وبأداء فائق.
   * توحيد أشكال الألف والهمزات والتاء المربوطة لتسهيل الفهرسة ومحركات البحث.

3. **Keyboard Layout Typo Fixer (تصحيح أخطاء الكيبورد المعكوس):**
   * تصحيح النصوص المكتوبة بالخطأ بحروف إنجليزية وهي بالأساس بالعربية (مثل `hghlhl` ⇄ `الامام`).
   * دعم التحويل العكسي الفوري.

4. **Interactive Single-Page Playground (`public/index.html`):**
   * واجهة ويب تفاعلية جاهزة للرفع على GitHub Pages أو Vercel تتيح للمستخدمين استخدام كافة الأدوات مباشرة.

---

## 📦 التثبيت والاستخدام (Installation & Usage)

### عبر Node.js / NPM:

```bash
npm install arabic-web-dev-tools
```

```javascript
import { stripTashkeel, normalizeArabic, convertToRtlCss, fixKeyboardTypo } from 'arabic-web-dev-tools';

// 1. إزالة التشكيل
const clean = stripTashkeel("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ");
console.log(clean); // بسم الله الرحمن الرحيم

// 2. تصحيح خطأ لوحة المفاتيح
const corrected = fixKeyboardTypo("lvpfn");
console.log(corrected); // مرحبا

// 3. تحويل كود CSS إلى RTL
const rtlCss = convertToRtlCss(".card { margin-left: 20px; float: left; }");
console.log(rtlCss); // .card { margin-right: 20px; float: right; }
```

### الاستخدام المباشر في المتصفح:
افتح ملف `public/index.html` في أي متصفح، أو استضفه كـ GitHub Pages للحصول على موقع أدوات سريع يجلب آلاف الزيارات لمحركات البحث.

---

## 📄 الترخيص (License)

مرخص تحت رخصة MIT. مفتوح للمساهمات والتطوير.

المطور: [طارق محمد (Tarek Mohamed)](https://tarek-mohamed.me.eg/).
