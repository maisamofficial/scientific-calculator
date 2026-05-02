import { create, all } from 'mathjs';

const math = create(all);

export const calculate = (expression: string): string => {
  try {
    if (!expression || expression === '0') return '0';

    // UI Symbols to mathjs internal functions mapping
    let sanitized = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, 'pi')
      .replace(/√/g, 'sqrt')
      .replace(/³√/g, 'cbrt')
      .replace(/sin⁻¹/g, 'asin')
      .replace(/cos⁻¹/g, 'acos')
      .replace(/tan⁻¹/g, 'atan')
      .replace(/ln/g, 'log') // mathjs log() is natural log
      .replace(/log/g, 'log10')
      .replace(/x²/g, '^2')
      .replace(/x³/g, '^3')
      .replace(/xʸ/g, '^')
      .replace(/mod/g, '%')
      .replace(/abs/g, 'abs');

    // Handle Division by zero explicitly for better UX
    if (sanitized.match(/\/0(?!\.)/)) return 'Error';

    const result = math.evaluate(sanitized);
    
    if (typeof result === 'number') {
      if (isNaN(result) || !isFinite(result)) return 'Error';
      // High precision formatting
      const formatted = Number(result.toPrecision(12));
      return formatted.toString();
    }
    
    // For complex numbers or matrices (though not expected here)
    return result.toString();
  } catch (error) {
    return 'Error';
  }
};

export const toggleSign = (display: string): string => {
  if (display === '0' || display === 'Error') return display;
  if (display.startsWith('-')) return display.substring(1);
  return '-' + display;
};
