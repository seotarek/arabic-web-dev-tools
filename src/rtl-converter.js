export function convertToRtlCss(cssText) {
  if (!cssText) return '';
  let out = cssText;
  
  // Swap properties using a temporary placeholder
  const replacements = [
    [/\bmargin-left\b/g, '__TMP_ML__'],
    [/\bmargin-right\b/g, 'margin-left'],
    [/__TMP_ML__/g, 'margin-right'],

    [/\bpadding-left\b/g, '__TMP_PL__'],
    [/\bpadding-right\b/g, 'padding-left'],
    [/__TMP_PL__/g, 'padding-right'],

    [/\bleft\s*:/g, '__TMP_L__:'],
    [/\bright\s*:/g, 'left:'],
    [/__TMP_L__:/g, 'right:'],

    [/\btext-align\s*:\s*left\b/g, 'text-align: right'],
    [/\btext-align\s*:\s*right\b/g, 'text-align: left'],

    [/\bfloat\s*:\s*left\b/g, 'float: right'],
    [/\bfloat\s*:\s*right\b/g, 'float: left'],
  ];

  for (const [pattern, repl] of replacements) {
    out = out.replace(pattern, repl);
  }
  return out;
}

export function convertTailwindToRtl(classes) {
  if (!classes) return '';
  return classes
    .split(/\s+/)
    .map(cls => {
      if (cls.startsWith('mr-')) return cls.replace('mr-', 'ml-');
      if (cls.startsWith('ml-')) return cls.replace('ml-', 'mr-');
      if (cls.startsWith('pr-')) return cls.replace('pr-', 'pl-');
      if (cls.startsWith('pl-')) return cls.replace('pl-', 'pr-');
      if (cls.startsWith('left-')) return cls.replace('left-', 'right-');
      if (cls.startsWith('right-')) return cls.replace('right-', 'left-');
      if (cls === 'text-left') return 'text-right';
      if (cls === 'text-right') return 'text-left';
      return cls;
    })
    .join(' ');
}
