export const createFormattedString = (value: string): string => {
  const arr = value.split('').map((char, index) => {
    if (index === 0) return char;
    return char.toLowerCase();
  });
  return arr.join('').replace(/_/g, ' ');
};
