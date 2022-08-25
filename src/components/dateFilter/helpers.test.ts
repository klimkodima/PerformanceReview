import { formatDate, padTo2Digits } from './helper';

describe('date filter helpers', () => {
  test('expect that 1 will be "01" ', () => {
    const num1 = 1;
    const num2 = 15;

    const result1 = padTo2Digits(num1);
    const result2 = padTo2Digits(num2);

    expect(result1).toBe('01');
    expect(result2).toBe('15');
  });

  test('must receive correct format date', () => {
    const mockDate = new Date('2022/04/13');

    const result = formatDate(mockDate);

    expect(result).toBe('2022-04-13');
    expect(mockDate.getDate()).toBe(13);
    expect(mockDate.getFullYear()).toBe(2022);
  });
});
