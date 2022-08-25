export const padTo2Digits = (num: number): string =>
  num.toString().padStart(2, '0');

export const formatDate = (date: Date): string =>
  [
    date.getFullYear(),
    padTo2Digits(+date.getMonth() + 1),
    padTo2Digits(+date.getDate())
  ].join('-');
