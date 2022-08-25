import { getOrderNumber } from 'src/utils/commonFunctions';

describe('validate getOrderNumber function', () => {
  test('Value from 1 to 3must return 1st, 2nd and 3rd accordingly', () => {
    expect(getOrderNumber(1)).toBe('1st');
    expect(getOrderNumber(2)).toBe('2nd');
    expect(getOrderNumber(3)).toBe('3rd');
  });

  test('Value 4 and greater 4 must return 4th and nth accordingly', () => {
    expect(getOrderNumber(4)).toBe('4th');
    expect(getOrderNumber(5)).toBe('5th');
    expect(getOrderNumber(15)).toBe('15th');
  });
});
