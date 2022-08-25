export const createWorksFromDate = (date: string): string => {
  const worksFromArr = date.split('-');
  const year = worksFromArr.shift();
  if (year) {
    worksFromArr.push(year);
  }
  return worksFromArr.join('/');
};
