/**
 * Arabic Web Dev Tools - TypeScript Definitions
 */

export interface NormalizeArabicOptions {
  /** Remove Harakat and diacritics (default: true) */
  stripTashkeel?: boolean;
  /** Remove Tatweel/Kashida (default: true) */
  removeTatweel?: boolean;
  /** Unify Alef with Hamza/Madda (إ, أ, آ, ٱ) to plain Alef (ا) (default: true) */
  normalizeAlef?: boolean;
  /** Convert Taa Marbuta (ة) to Haa (ه) (default: true) */
  normalizeTaa?: boolean;
  /** Convert Alef Maksura (ى) to Yaa (ي) (default: true) */
  normalizeYaa?: boolean;
  /** Convert Persian/Urdu variants (ک, گ, پ, چ, ژ, ڤ) to Arabic equivalents (default: false) */
  normalizePersianUrdu?: boolean;
}

export interface FixKeyboardTypoOptions {
  /** Target language direction: 'auto' (detect based on input), 'ar' (to Arabic), or 'en' (to English) */
  to?: 'auto' | 'ar' | 'en';
}

export interface GenerateArabicSlugOptions {
  /** Word separator (default: '-') */
  separator?: string;
  /** Remove common Arabic particles and prepositions (default: false) */
  removeStopWords?: boolean;
  /** Normalize Alef, Taa Marbuta, and Yaa variants (default: false) */
  normalize?: boolean;
  /** Maximum character length of the generated slug */
  maxLength?: number | null;
}

export interface FormatArabicNumberOptions {
  /** Use Eastern Arabic-Indic numerals (٠-٩) instead of Western digits (default: false) */
  useEasternDigits?: boolean;
  /** Number of decimal places to format */
  decimals?: number;
  /** BCP 47 locale tag (default: 'ar-EG') */
  locale?: string;
}

export interface FormatArabicCurrencyOptions {
  /** Use Eastern Arabic-Indic numerals (default: false) */
  useEasternDigits?: boolean;
  /** Number of fraction digits (default: 2) */
  decimals?: number;
  /** Position of the currency symbol relative to amount (default: 'after') */
  position?: 'before' | 'after';
}

export interface IsRtlOptions {
  /** If true, checks if > 50% of alphanumeric characters are RTL */
  predominant?: boolean;
}

export type BiDiWrapType = 'isolate' | 'rli' | 'lri' | 'fsi' | 'mark' | 'rlm' | 'alm' | 'html';

export declare const BIDI_CHARS: {
  readonly RLM: string;
  readonly LRM: string;
  readonly ALM: string;
  readonly RLI: string;
  readonly LRI: string;
  readonly FSI: string;
  readonly PDI: string;
};

/** Strips all Arabic diacritics and Quranic marks */
export declare function stripTashkeel(text: string): string;

/** Removes Arabic Tatweel (Kashida, U+0640) */
export declare function removeTatweel(text: string): string;

/** Normalizes Arabic letters to standardized forms for search indexing and NLP matching */
export declare function normalizeArabic(text: string, options?: NormalizeArabicOptions): string;

/** Swaps physical left and right CSS properties for RTL layouts */
export declare function convertToRtlCss(cssText: string): string;

/** Converts physical CSS directions to modern W3C CSS Logical Properties */
export declare function convertToLogicalCss(cssText: string): string;

/** Inverts physical Tailwind CSS utility classes (e.g. mr-4 to ml-4) */
export declare function convertTailwindToRtl(classes: string): string;

/** Converts physical Tailwind CSS utility classes to modern logical equivalents (ms-, me-, ps-, pe-) */
export declare function convertTailwindToLogical(classes: string): string;

/** Reverses text accidentally typed with the wrong keyboard layout */
export declare function fixKeyboardTypo(input: string, options?: FixKeyboardTypoOptions): string;

/** Generates clean, URL-safe slug from Arabic and multilingual text */
export declare function generateArabicSlug(text: string, options?: GenerateArabicSlugOptions): string;

/** Truncates text cleanly at word boundaries for search engine snippets and titles */
export declare function truncateArabicMeta(text: string, maxChars?: number, suffix?: string): string;

/** Converts Western digits (0-9) to Eastern Arabic-Indic digits (٠-٩) */
export declare function toEasternDigits(input: string | number): string;

/** Converts Eastern Arabic-Indic (٠-٩) and Persian (۰-۹) digits to Western digits (0-9) */
export declare function toWesternDigits(input: string): string;

/** Formats numbers according to Arabic locale conventions */
export declare function formatArabicNumber(value: number | string, options?: FormatArabicNumberOptions): string;

/** Formats monetary amounts with standard Arabic currency symbols */
export declare function formatArabicCurrency(
  amount: number | string,
  currency?: string,
  options?: FormatArabicCurrencyOptions
): string;

/** Checks if a string contains Arabic or RTL characters */
export declare function isRtl(text: string, options?: IsRtlOptions): boolean;

/** Wraps text with Unicode BiDi control markers or HTML <bdi> */
export declare function wrapBiDi(text: string, type?: BiDiWrapType): string;

/** Fixes trailing punctuation flipping in mixed Arabic and Latin/numerical sentences */
export declare function sanitizeMixedText(text: string): string;
