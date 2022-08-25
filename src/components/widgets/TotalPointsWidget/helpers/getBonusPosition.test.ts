import { getBonusValue } from './functions';

describe('validate getBonusValue function', () => {
  test('Value greater than 0 must return `value`%', () => {
    expect(getBonusValue(15)).toBe('15%');
  });
  test('Pass empty string must return `-`', () => {
    expect(getBonusValue('   ')).toBe('-');
  });
  test('Pass 0 must return `-`', () => {
    expect(getBonusValue(0)).toBe('-');
  });
  test('Pass negative value must return `-`', () => {
    expect(getBonusValue(-15)).toBe('-');
  });
});
