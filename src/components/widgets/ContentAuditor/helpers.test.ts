import { getExperience } from './helpers';

describe('validate getExperience function', () => {
  test('test for experience in 1 month', () => {
    expect(getExperience(1)).toBe('1 month');
  });

  test('test for experience in 7 months', () => {
    expect(getExperience(7)).toBe('7 months');
  });

  test('test for experience in 12 months', () => {
    expect(getExperience(12)).toBe('12 months');
  });

  test('test for experience in 17 months', () => {
    expect(getExperience(17)).toBe('1 year 5 months');
  });

  test('test for experience in 36 months', () => {
    expect(getExperience(36)).toBe('3 years');
  });
});
