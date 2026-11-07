/**
 * Swaps physical left and right CSS properties and values for RTL stylesheets.
 *
 * @param {string} cssText - Raw CSS stylesheet or rule.
 * @returns {string} Flipped CSS.
 */
export function convertToRtlCss(cssText) {
  if (!cssText || typeof cssText !== 'string') return '';
  let out = cssText;

  // Swap properties using temporary placeholders to prevent double-replacement
  const replacements = [
    // Margins
    [/\bmargin-left\b/g, '__TMP_ML__'],
    [/\bmargin-right\b/g, 'margin-left'],
    [/__TMP_ML__/g, 'margin-right'],

    // Paddings
    [/\bpadding-left\b/g, '__TMP_PL__'],
    [/\bpadding-right\b/g, 'padding-left'],
    [/__TMP_PL__/g, 'padding-right'],

    // Borders
    [/\bborder-left\b/g, '__TMP_BL__'],
    [/\bborder-right\b/g, 'border-left'],
    [/__TMP_BL__/g, 'border-right'],

    // Border radii
    [/\bborder-top-left-radius\b/g, '__TMP_BTLR__'],
    [/\bborder-top-right-radius\b/g, 'border-top-left-radius'],
    [/__TMP_BTLR__/g, 'border-top-right-radius'],

    [/\bborder-bottom-left-radius\b/g, '__TMP_BBLR__'],
    [/\bborder-bottom-right-radius\b/g, 'border-bottom-left-radius'],
    [/__TMP_BBLR__/g, 'border-bottom-right-radius'],

    // Insets / Positioning
    [/(?<!-)\bleft\s*:/g, '__TMP_L__:'],
    [/(?<!-)\bright\s*:/g, 'left:'],
    [/__TMP_L__:/g, 'right:'],

    // Text Align
    [/\btext-align\s*:\s*left\b/g, '__TMP_TAL__'],
    [/\btext-align\s*:\s*right\b/g, 'text-align: left'],
    [/__TMP_TAL__/g, 'text-align: right'],

    // Floats & Clears
    [/\bfloat\s*:\s*left\b/g, '__TMP_FL__'],
    [/\bfloat\s*:\s*right\b/g, 'float: left'],
    [/__TMP_FL__/g, 'float: right'],

    [/\bclear\s*:\s*left\b/g, '__TMP_CL__'],
    [/\bclear\s*:\s*right\b/g, 'clear: left'],
    [/__TMP_CL__/g, 'clear: right'],
  ];

  for (const [pattern, repl] of replacements) {
    out = out.replace(pattern, repl);
  }
  return out;
}

/**
 * Converts physical CSS directions to modern W3C CSS Logical Properties (inline-start / inline-end).
 *
 * @param {string} cssText - Raw CSS text.
 * @returns {string} CSS with logical properties.
 */
export function convertToLogicalCss(cssText) {
  if (!cssText || typeof cssText !== 'string') return '';
  let out = cssText;

  const logicalRules = [
    [/\bmargin-left\b/g, 'margin-inline-start'],
    [/\bmargin-right\b/g, 'margin-inline-end'],
    [/\bpadding-left\b/g, 'padding-inline-start'],
    [/\bpadding-right\b/g, 'padding-inline-end'],
    [/\bborder-left\b/g, 'border-inline-start'],
    [/\bborder-right\b/g, 'border-inline-end'],
    [/\bborder-top-left-radius\b/g, 'border-start-start-radius'],
    [/\bborder-top-right-radius\b/g, 'border-start-end-radius'],
    [/\bborder-bottom-left-radius\b/g, 'border-end-start-radius'],
    [/\bborder-bottom-right-radius\b/g, 'border-end-end-radius'],
    [/(?<!-)\bleft\s*:/g, 'inset-inline-start:'],
    [/(?<!-)\bright\s*:/g, 'inset-inline-end:'],
    [/\btext-align\s*:\s*left\b/g, 'text-align: start'],
    [/\btext-align\s*:\s*right\b/g, 'text-align: end'],
  ];

  for (const [pattern, repl] of logicalRules) {
    out = out.replace(pattern, repl);
  }
  return out;
}

/**
 * Inverts physical Tailwind CSS utility classes (e.g. mr-4 <-> ml-4).
 *
 * @param {string} classes - Space-delimited Tailwind classes.
 * @returns {string} Flipped classes.
 */
export function convertTailwindToRtl(classes) {
  if (!classes || typeof classes !== 'string') return '';
  return classes
    .split(/\s+/)
    .filter(Boolean)
    .map(cls => {
      if (cls.startsWith('mr-')) return cls.replace('mr-', 'ml-');
      if (cls.startsWith('ml-')) return cls.replace('ml-', 'mr-');
      if (cls.startsWith('pr-')) return cls.replace('pr-', 'pl-');
      if (cls.startsWith('pl-')) return cls.replace('pl-', 'pr-');
      if (cls.startsWith('left-')) return cls.replace('left-', 'right-');
      if (cls.startsWith('right-')) return cls.replace('right-', 'left-');
      if (cls.startsWith('border-r-')) return cls.replace('border-r-', 'border-l-');
      if (cls.startsWith('border-l-')) return cls.replace('border-l-', 'border-r-');
      if (cls.startsWith('rounded-r-')) return cls.replace('rounded-r-', 'rounded-l-');
      if (cls.startsWith('rounded-l-')) return cls.replace('rounded-l-', 'rounded-r-');
      if (cls === 'text-left') return 'text-right';
      if (cls === 'text-right') return 'text-left';
      return cls;
    })
    .join(' ');
}

/**
 * Converts physical Tailwind CSS utility classes to modern logical equivalents (ms-, me-, ps-, pe-, start-, end-).
 *
 * @param {string} classes - Space-delimited Tailwind classes.
 * @returns {string} Logical Tailwind classes.
 */
export function convertTailwindToLogical(classes) {
  if (!classes || typeof classes !== 'string') return '';
  return classes
    .split(/\s+/)
    .filter(Boolean)
    .map(cls => {
      if (cls.startsWith('mr-')) return cls.replace('mr-', 'me-');
      if (cls.startsWith('ml-')) return cls.replace('ml-', 'ms-');
      if (cls.startsWith('pr-')) return cls.replace('pr-', 'pe-');
      if (cls.startsWith('pl-')) return cls.replace('pl-', 'ps-');
      if (cls.startsWith('left-')) return cls.replace('left-', 'start-');
      if (cls.startsWith('right-')) return cls.replace('right-', 'end-');
      if (cls.startsWith('border-r-')) return cls.replace('border-r-', 'border-e-');
      if (cls.startsWith('border-l-')) return cls.replace('border-l-', 'border-s-');
      if (cls.startsWith('rounded-r-')) return cls.replace('rounded-r-', 'rounded-e-');
      if (cls.startsWith('rounded-l-')) return cls.replace('rounded-l-', 'rounded-s-');
      if (cls === 'text-left') return 'text-start';
      if (cls === 'text-right') return 'text-end';
      return cls;
    })
    .join(' ');
}
