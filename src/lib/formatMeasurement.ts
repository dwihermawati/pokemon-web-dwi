export const formatWeight = (weightDecigram: number) => {
  const weightKg = weightDecigram / 10;
  return `${weightKg.toFixed(1)}`;
};

export const formatHeight = (heightDecimeter: number) => {
  const heightM = heightDecimeter / 10;
  return `${heightM.toFixed(1)}`;
};
