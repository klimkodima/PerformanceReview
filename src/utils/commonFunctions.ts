export const getOrderNumber = (countNumber: number): string => {
  const stringDay = countNumber.toString();
  if (countNumber === 10 || countNumber === 20 || countNumber === 30) {
    return `the ${countNumber}th`;
  }
  if (countNumber >= 4 && countNumber <= 31) {
    return `${countNumber}th`;
  }

  if (countNumber === 1 || stringDay.endsWith('1')) {
    return `${countNumber}st`;
  } else if (countNumber === 2 || stringDay.endsWith('2')) {
    return `${countNumber}nd`;
  } else if (countNumber === 3 || stringDay.endsWith('3')) {
    return `${countNumber}rd`;
  }

  return '';
};

export const createFormattedLevel = (level: string): string =>
  level.trim().length
    ? level
        .split('_')
        .map((item) => `${item[0]}${item.slice(1).toLocaleLowerCase()}`)
        .join(' ')
    : '';

export const notNull = <T>(val: T | null): val is T => val !== null;
