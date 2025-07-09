export const generateClamp = (
  expectedMinPx: number,
  expectedMaxPx: number,
  containerMaxPx: number,
  options?: { safeMin?: boolean }
): string => {
  const safeMinRem =
    expectedMinPx === 0 && options?.safeMin
      ? '0.01' // almost zero to avoid clamp locking
      : (expectedMinPx / 16).toFixed(2);

  const preferredVw = ((expectedMaxPx / containerMaxPx) * 100).toFixed(2);
  const maxRem = (expectedMaxPx / 16).toFixed(2);

  return `clamp(${safeMinRem}rem, ${preferredVw}vw, ${maxRem}rem)`;
};
