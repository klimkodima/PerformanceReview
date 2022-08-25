import { getDisplayValue } from './functions';

const cases = [
  {
    title: 'Total Points',
    value: 48,
    expected: '48'
  },
  {
    title: 'Level Position',
    value: 3,
    expected: '3rd'
  },
  {
    title: 'Seniority Premium',
    value: 15,
    expected: '15%'
  }
];

describe('display value', () => {
  test.each(cases)('key %p must return value %p', (expectedResult) => {
    const result = getDisplayValue(expectedResult.title, expectedResult.value);
    expect(result).toBe(expectedResult.expected);
  });
});
