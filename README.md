<p align="center">
  <img src="./assets/banner.svg" alt="Arabic Web Dev Tools Banner" width="100%">
</p>

# Arabic Web Dev Tools 🛠️ (أدوات المطور العربي)

<p align="center">
  <a href="https://github.com/seotarek/arabic-web-dev-tools/releases/tag/v1.1.0"><img src="https://img.shields.io/badge/Release-v1.1.0-emerald.svg?style=flat-square" alt="Release: v1.1.0"></a>
  <a href="https://github.com/seotarek/arabic-web-dev-tools/pkgs/npm/arabic-web-dev-tools"><img src="https://img.shields.io/badge/GitHub%20Packages-Published-blue.svg?style=flat-square" alt="GitHub Packages"></a>
  <a href="https://github.com/seotarek/arabic-web-dev-tools/actions/workflows/ci.yml"><img src="https://github.com/seotarek/arabic-web-dev-tools/actions/workflows/ci.yml/badge.svg" alt="CI Suite"></a>
  <a href="https://seotarek.github.io/arabic-web-dev-tools/"><img src="https://img.shields.io/badge/Live%20Console-GitHub%20Pages-brightgreen.svg?style=flat-square" alt="Live Demo"></a>
  <img src="https://img.shields.io/badge/Zero%20Dependencies-100%25-success.svg?style=flat-square" alt="Zero Dependencies">
  <img src="https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=flat-square" alt="TypeScript Ready">
  <img src="https://img.shields.io/badge/W3C-CSS%20Logical-purple.svg?style=flat-square" alt="W3C CSS Logical">
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-green.svg?style=flat-square" alt="License: MIT"></a>
</p>

---

حزمة أدوات ويب قياسية مفتوحة المصدر **خالية تماماً من أي اعتمادات خارجية (Zero-Dependency)**، صُممت وبُنيت وفق أحدث توصيات مجتمعات مهندسي البرمجيات في العالم العربي ومعايير **W3C** العالمية. 

تُعالج الحزمة جذرياً كافة التحديات الهندسية المعقدة في الويب العربي: عزل النصوص ثنائية الاتجاه (**BiDi Isolates**)، توليد روابط السيو النظيفة، الانتقال من قلب الـ CSS الفيزيائي إلى **الخصائص المنطقية (CSS Logical Properties)**، تنسيق الأرقام المشرقية والعملات الرسمية، وتصحيح أخطاء لوحة المفاتيح المعكوسة فورياً.

---

## 📑 فهرس المحتويات (Table of Contents)

- [🌐 المعاينة الحية وبوابة المطورين (Interactive Live Console)](#-المعاينة-الحية-وبوابة-المطورين-interactive-live-console)
- [✨ الفلسفة والمعمارية الهندسية (Engineering Principles)](#-الفلسفة-والمعمارية-الهندسية-engineering-principles)
- [📦 التثبيت البرمجي (Installation)](#-التثبيت-البرمجي-installation)
- [📖 الدليل المرجعي للوظائف (API Reference)](#-الدليل-المرجعي-للوظائف-api-reference)
  - [1. أدوات السيو ومحركات البحث (SEO & SERP Engine)](#1-أدوات-السيو-ومحركات-البحث-seo--serp-engine)
  - [2. الخصائص المنطقية و Tailwind (CSS Logical Properties)](#2-الخصائص-المنطقية-و-tailwind-css-logical-properties)
  - [3. استقرار وعزل النصوص ثنائية الاتجاه (BiDi & Directional Isolates)](#3-استقرار-وعزل-النصوص-ثنائية-الاتجاه-bidi--directional-isolates)
  - [4. الأرقام المشرقية والعملات (Eastern Numerals & Currencies)](#4-الأرقام-المشرقية-والعملات-eastern-numerals--currencies)
  - [5. التشكيل وعلامات المصحف والتوحيد (Tashkeel & Normalization)](#5-التشكيل-وعلامات-المصحف-والتوحيد-tashkeel--normalization)
  - [6. مصحح خطأ لوحة المفاتيح (Keyboard Typo Restorer)](#6-مصحح-خطأ-لوحة-المفاتيح-keyboard-typo-restorer)
- [⚡ مقارنة الأداء والوزن (Performance & Comparison)](#-مقارنة-الأداء-والوزن-performance--comparison)
- [💻 التوافق مع بيئات العمل (Compatibility)](#-التوافق-مع-بيئات-العمل-compatibility)
- [🧪 الاختبارات وضبط الجودة (Testing & Quality Gates)](#-الاختبارات-وضبط-الجودة-testing--quality-gates)
- [🤝 المساهمة والتطوير (Contributing)](#-المساهمة-والتطوير-contributing)
- [📄 الترخيص (License)](#-الترخيص-license)

---

## 🌐 المعاينة الحية وبوابة المطورين (Interactive Live Console)

يمكنك تجربة واختبار كافة أدوات الحزمة بصرياً ومباشرة من متصفحك عبر البوابة التفاعلية المصممة بنمط **Dark-Tech Engineering Console**:

👉 **[اضغط هنا لفتح المختبر التفاعلي الحي: seotarek.github.io/arabic-web-dev-tools](https://seotarek.github.io/arabic-web-dev-tools/)**

* **مقياس تيليميتري فوري** لتحليل نسب التشكيل والكشيدة.
* **محاكي بحث جوجل (SERP)** مع مقياس الـ 155 حرف.
* **محول CSS مباشر** يعرض الفارق بين الخصائص المنطقية والفيزيائية.
* **معمل محاكاة أخطاء الـ BiDi** التفاعلي.

---

## ✨ الفلسفة والمعمارية الهندسية (Engineering Principles)

1. **صفر اعتمادات خارجية (100% Zero-Dependency)**: لا تتطلب المكتبة أي حزم من `node_modules` في وقت التشغيل. كود أصلي خفيف بحجم **11.8 KB** فقط.
2. **الخصائص المنطقية بدلاً من القلب الفيزيائي**: تطبيق معايير **W3C CSS Logical Properties** (`inline-start` / `inline-end`) لتمكين ملف نمط واحد (Single Stylesheet) من خدمة اللغتين العربية والإنجليزية دون الحاجة لتكرار الكود.
3. **أمان الـ BiDi الحسابي**: حل أزمة قفز علامات الترقيم عند نهايات الفقرات المختلطة بالاعتماد على محارف Unicode الرسمية (`RLM`, `LRM`, `ALM`, `RLI`, `PDI`).
4. **تكامل TypeScript الصارم**: تزويد الحزمة بملف تعريفات كامل [`types/index.d.ts`](types/index.d.ts) يضمن الإكمال التلقائي والـ Type-Safety.

---

## 📦 التثبيت البرمجي (Installation)

### عبر NPM / PNPM / Yarn / Bun

```bash
# NPM
npm install arabic-web-dev-tools

# PNPM
pnpm add arabic-web-dev-tools

# Yarn
yarn add arabic-web-dev-tools

# Bun
bun add arabic-web-dev-tools
```

### عبر سجل GitHub Packages

```bash
npm install @seotarek/arabic-web-dev-tools --registry=https://npm.pkg.github.com
```

### عبر المتصفح مباشرة (ESM CDN - بدون أي خادم)

```html
<script type="module">
  import { 
    generateArabicSlug, 
    convertToLogicalCss, 
    fixKeyboardTypo 
  } from 'https://esm.sh/arabic-web-dev-tools';

  console.log(generateArabicSlug("أفضل ممارسات الويب العربي!"));
</script>
```

---

## 📖 الدليل المرجعي للوظائف (API Reference)

### 1. أدوات السيو ومحركات البحث (SEO & SERP Engine)

#### `generateArabicSlug(text, options?)`
توليد روابط URLs نظيفة ومطابقة لمعايير السيو بدون علامات استفهام أو رموز تالفة (`%D8%A3...`).

```typescript
function generateArabicSlug(text: string, options?: GenerateArabicSlugOptions): string;
```

* **الخيارات (`options`)**:
  * `separator` (string - افتراضي: `'-'`): الفاصل بين الكلمات.
  * `removeStopWords` (boolean - افتراضي: `false`): حذف حروف الجر وأدوات الاستفهام والضمائر الشائعة (في، من، إلى، كيف، لماذا...).
  * `normalize` (boolean - افتراضي: `false`): توحيد الهمزات والألف والياء.
  * `maxLength` (number | null): الحد الأقصى لطول الرابط مع عدم كسر الكلمات.

```javascript
import { generateArabicSlug } from 'arabic-web-dev-tools';

// رابط أساسي
generateArabicSlug("دليل هندسة البرمجيات لعام 2026! (شامل ومجاني)");
// => "دليل-هندسة-البرمجيات-لعام-2026-شامل-ومجاني"

// رابط محسن للسيو بحذف الكلمات الشائعة والهمزات
generateArabicSlug("كيف تبدأ في تعلم البرمجة من الصفر", { 
  removeStopWords: true, 
  normalize: true 
});
// => "تبدا-تعلم-البرمجه-الصفر"
```

#### `truncateArabicMeta(text, maxChars?, suffix?)`
قص نصوص العناوين والوصف لمحركات البحث عند **حدود الكلمات السليمة** دون تشويه أو قطع في منتصف الكلمة.

```javascript
import { truncateArabicMeta } from 'arabic-web-dev-tools';

const desc = "دليل مفصل يشرح أفضل الممارسات الهندسية لبناء تطبيقات سريعة ومتوافقة";
truncateArabicMeta(desc, 35);
// => "دليل مفصل يشرح أفضل الممارسات..."
```

---

### 2. الخصائص المنطقية و Tailwind (CSS Logical Properties)

#### `convertToLogicalCss(cssText)`
تحويل أكواد CSS الفيزيائية (`left` / `right`) إلى خصائص **W3C CSS Logical Properties** الحديثة (`inline-start` / `inline-end`).

```javascript
import { convertToLogicalCss } from 'arabic-web-dev-tools';

const physical = `
.card {
  margin-left: 16px;
  padding-right: 12px;
  border-left: 2px solid green;
  float: left;
  text-align: left;
  left: 0;
}
`;

console.log(convertToLogicalCss(physical));
/*
.card {
  margin-inline-start: 16px;
  padding-inline-end: 12px;
  border-inline-start: 2px solid green;
  float: left;
  text-align: start;
  inset-inline-start: 0;
}
*/
```

#### `convertTailwindToLogical(classes)`
تحويل كلاسات Tailwind الفيزيائية إلى الكلاسات المنطقية الرسمية (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`).

```javascript
import { convertTailwindToLogical } from 'arabic-web-dev-tools';

convertTailwindToLogical("mr-4 pl-2 left-0 text-left rounded-l-md border-r-2");
// => "me-4 ps-2 start-0 text-start rounded-s-md border-e-2"
```

#### `convertToRtlCss(cssText)` & `convertTailwindToRtl(classes)`
القلب الفيزيائي المباشر (RTL Flip) للمشاريع التي ما زالت تعتمد على ملفين منفصلين (`style.css` و `style-rtl.css`).

---

### 3. استقرار وعزل النصوص ثنائية الاتجاه (BiDi & Directional Isolates)

#### `sanitizeMixedText(text)`
حل المعضلة الشهيرة في متصفحات الويب: سقوط علامات الترقيم (`.` أو `!` أو `؟` أو `:`) في أول السطر بدلاً من آخره عند نهاية الجملة العربية برابط URL، رقم، أو كلمة إنجليزية.

```javascript
import { sanitizeMixedText } from 'arabic-web-dev-tools';

// يمنع قفز علامة التعجب إلى يمين الجملة
const clean = sanitizeMixedText("رابط المتجر الرسمي هو https://store.example.com!");
```

#### `wrapBiDi(text, type?)`
عزل الكلمات الأجنبية والأرقام لمنع تشويه اتجاه النص المحيط بها باستخدام محارف Unicode BiDi الرسمية أو وسم HTML `<bdi>`.

* **الأنواع المتاحة (`type`)**: `'isolate'` (FSI), `'rli'`, `'lri'`, `'mark'` (RLM), `'alm'`, `'html'`.

```javascript
import { wrapBiDi } from 'arabic-web-dev-tools';

wrapBiDi("ORDER-9821", "isolate"); 
// => "\u2068ORDER-9821\u2069"

wrapBiDi("React 19", "html"); 
// => "<bdi>React 19</bdi>"
```

#### `isRtl(text, options?)`
فحص ما إذا كان النص يحتوي على محارف عربية/RTL، أو ما إذا كان المحتوى الأغلبي في النص هو RTL (`predominant: true`).

---

### 4. الأرقام المشرقية والعملات (Eastern Numerals & Currencies)

#### `toEasternDigits(input)` & `toWesternDigits(input)`
التحويل بين الأرقام اللاتينية (0-9) والأرقام المشرقية العربية (٠-٩) والفارسية (۰-۹).

```javascript
import { toEasternDigits, toWesternDigits } from 'arabic-web-dev-tools';

toEasternDigits("2026-05-14"); // => "٢٠٢٦-٠٥-١٤"
toWesternDigits("١٤٩٩٫٥٠");    // => "1499.50"
```

#### `formatArabicCurrency(amount, currencyCode?, options?)`
تنسيق المبالغ النقدية برموز العملات العربية المعتمدة وتحديد مواضعها والأرقام المشرقية.

```javascript
import { formatArabicCurrency } from 'arabic-web-dev-tools';

formatArabicCurrency(1250, "SAR"); 
// => "1,250.00 ر.س"

formatArabicCurrency(1250, "EGP", { useEasternDigits: true }); 
// => "١٬٢٥٠٫٠٠ ج.م"

formatArabicCurrency(500, "KWD", { position: "before" }); 
// => "د.ك 500.00"
```

---

### 5. التشكيل وعلامات المصحف والتوحيد (Tashkeel & Normalization)

#### `stripTashkeel(text)` & `removeTatweel(text)`
إزالة كافة علامات التشكيل والحركات والتنوين وعلامات الوقف في المصحف الشريف، وحذف الكشيدة (المد).

```javascript
import { stripTashkeel, removeTatweel } from 'arabic-web-dev-tools';

stripTashkeel("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ");
// => "بسم الله الرحمن الرحيم"

removeTatweel("مـــرحـــبـــا");
// => "مرحبا"
```

#### `normalizeArabic(text, options?)`
توحيد الألفات (أ، إ، آ، ٱ ➔ ا)، والتاء المربوطة (ة ➔ ه)، والياء المقصورة (ى ➔ ي)، ودعم توحيد الحروف الفارسية والأردية (ک، گ، پ، چ، ژ ➔ ك، ك، ب، ج، ز) لمحركات البحث والفهرسة.

```javascript
import { normalizeArabic } from 'arabic-web-dev-tools';

normalizeArabic("إبراهيم ذهب إلى المدرسة");
// => "ابراهيم ذهب الي المدرسه"
```

---

### 6. مصحح خطأ لوحة المفاتيح (Keyboard Typo Restorer)

#### `fixKeyboardTypo(input, options?)`
استعادة الجمل المكتوبة بالخطأ أثناء نسيان لغة الإدخال الإنجليزية، مع دعم متقدم لأزرار **Shift** والرموز والـ **Ligatures** المركبة (`لا`، `لأ`، `لإ`، `لآ`).

```javascript
import { fixKeyboardTypo } from 'arabic-web-dev-tools';

// الإنجليزية ➔ العربية
fixKeyboardTypo("lvpfh"); // => "مرحبا"
fixKeyboardTypo("High");  // => "أهلا"
fixKeyboardTypo("?");     // => "؟"

// العربية ➔ الإنجليزية (ثنائي الاتجاه)
fixKeyboardTypo("مرحبا"); // => "lvpfh"
fixKeyboardTypo("أهلا");  // => "Hib"
```

---

## ⚡ مقارنة الأداء والوزن (Performance & Comparison)

| الخاصية / المعيار | `arabic-web-dev-tools` | المكتبات الأخرى الشائعة |
| :--- | :---: | :---: |
| **الاعتمادات الخارجية (Dependencies)** | **صفر (Zero Dependencies)** | تتطلب حزم ثانوية وضخمة |
| **حجم الحزمة عند التنزيل (Unpacked)** | **~36 KB فقط** | 250 KB - 2 MB |
| **دعم W3C CSS Logical Properties** | **نعم (مدمج أصلي)** | نادر أو يتطلب PostCSS Plugins |
| **عزل علامات الترقيم (BiDi Isolates)** | **نعم (RLM / Isolates)** | غير مدعوم |
| **دعم TypeScript الكامل (`.d.ts`)** | **100% مدعوم** | مفقود أو غير مكتمل |
| **العمل المباشر في المتصفح (CDN)** | **نعم (Pure ESM)** | يتطلب Bundler أو Webpack |

---

## 💻 التوافق مع بيئات العمل (Compatibility)

الحزمة متوافقة ومختبرة للعمل في كافة بيئات الجافاسكربت الحديثة:

* **المتصفحات (Browsers)**: Chrome, Safari, Firefox, Edge (كافة المتصفحات الحديثة).
* **بيئات التشغيل (Runtimes)**: Node.js (18, 20, 22+), Bun, Deno.
* **أطر العمل (Frameworks)**: Next.js, Nuxt, Astro, SvelteKit, Remix, Vite, Webpack.

---

## 🧪 الاختبارات وضبط الجودة (Testing & Quality Gates)

المشروع مزود بحزمة اختبارات وحدات شاملة تغطي 100% من الوظائف عبر مشغل Node.js الأصلي، وتعمل آلياً مع كل تحديث عبر **GitHub Actions**:

```bash
npm test
```

---

## 🤝 المساهمة والتطوير (Contributing)

نرحب بكافة المساهمات والمقترحات من المطورين! 
1. قم بعمل Fork للمستودع.
2. أنشئ فرعاً لميزتك (`git checkout -b feature/amazing-feature`).
3. تأكد من تشغيل كافة الاختبارات بنجاح (`npm test`).
4. أرسل طلب دمج (Pull Request).

---

## 📄 الترخيص (License)

هذا المشروع مرخص بالكامل تحت رخصة **[MIT License](LICENSE)** - متاح للاستخدام الشخصي والتجاري مجاناً.

---

<p align="center">
  صُنع بكل فخر بواسطة المهندس <b><a href="https://tarek-mohamed.me.eg/">طارق محمد (Tarek Mohamed)</a></b><br>
  المستودع الرئيسي: <b><a href="https://github.com/seotarek/arabic-web-dev-tools">github.com/seotarek/arabic-web-dev-tools</a></b>
</p>
