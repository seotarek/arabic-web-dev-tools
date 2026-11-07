<p align="center">
  <img src="./assets/banner.svg" alt="Arabic Web Dev Tools Banner" width="100%">
</p>

# Arabic Web Dev Tools 🛠️ (أدوات المطور العربي)

<p align="center">
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License: MIT"></a>
  <img src="https://img.shields.io/badge/Zero%20Dependencies-100%25-success.svg" alt="Zero Dependencies">
  <img src="https://img.shields.io/badge/RTL-Native-orange.svg" alt="RTL Native">
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg" alt="PRs Welcome">
</p>

A zero-dependency suite of production-ready web utilities and standalone interactive single-page applications tailored for developers building modern Arabic and RTL web experiences.

---

## ⚡ الميزات والأدوات المضمنة (Features)

| الأداة | الوصف | مثال |
| :--- | :--- | :--- |
| **Arabic SEO Slug Generator** | توليد روابط URLs نظيفة ومطابقة لمعايير السيو بدون رموز معطوبة | `دليل السيو 2026!` ➔ `دليل-السيو-2026` |
| **Smart Meta Truncator** | قص نصوص الوصف والعناوين لنتائج جوجل بذكاء عند حدود الكلمات | `دليل مفصل لبناء...` |
| **RTL CSS & Tailwind Flip** | عكس وتعديل خواص الاتجاهات في كود CSS تلقائياً | `margin-left: 10px` ➔ `margin-right: 10px` |
| **Tashkeel Stripper** | تنظيف وحذف التشكيل والتنوين والمد (الكشيدة) بدقة فائقة | `مَرْحَبًا` ➔ `مرحبا` |
| **Keyboard Typo Fixer** | استعادة الكلمات المكتوبة بالخطأ بحروف إنجليزية أثناء نسيان الكيبورد | `lvpfh` ➔ `مرحبا` |
| **Normalizer** | توحيد الألفات والهمزات والتاء المربوطة لتسهيل الفهرسة ومحركات البحث | `إبراهيم، مدرسة` ➔ `ابراهيم، مدرسه` |

---

## 📦 التثبيت والاستخدام (Installation)

### عبر Node.js / NPM

```bash
npm install arabic-web-dev-tools
```

```javascript
import {
  stripTashkeel,
  normalizeArabic,
  convertToRtlCss,
  fixKeyboardTypo,
  generateArabicSlug,
  truncateArabicMeta,
} from 'arabic-web-dev-tools';

// 1. توليد رابط سيو نظيف
console.log(generateArabicSlug("أفضل 10 ممارسات في هندسة البرمجيات لعام 2026!"));
// => "أفضل-10-ممارسات-في-هندسة-البرمجيات-لعام-2026"

// مع حذف حروف الجر وتوحيد الحروف
console.log(generateArabicSlug("كيف تبدأ في تعلم البرمجة من الصفر", { removeStopWords: true, normalize: true }));
// => "تبدا-تعلم-البرمجه-الصفر"

// 2. قص نصوص الوصف لمحركات البحث عند حدود الكلمات
console.log(truncateArabicMeta("دليل مفصل يشرح أفضل الممارسات لبناء تطبيقات سريعة", 35));
// => "دليل مفصل يشرح أفضل الممارسات..."

// 3. إزالة التشكيل
console.log(stripTashkeel("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ")); 
// => "بسم الله الرحمن الرحيم"

// 4. تصحيح خطأ الكيبورد
console.log(fixKeyboardTypo("lvpfh"));
// => "مرحبا"

// 5. تحويل CSS إلى RTL
console.log(convertToRtlCss(".sidebar { margin-left: 15px; float: left; }"));
// => ".sidebar { margin-right: 15px; float: right; }"
```

### واجهة الويب الجاهزة (Web UI)

المشروع يتضمن واجهة مستخدم كاملة وتفاعلية داخل مجلد `public/index.html` مبنية بأحدث معايير التصميم (Tailwind CSS) لتعمل مباشرة على المتصفح بدون أي خادم.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Developed with care by [Tarek Mohamed](https://tarek-mohamed.me.eg/).
