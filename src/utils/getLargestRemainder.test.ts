import { getLargestRemainder } from './getLargestRemainder';

describe('Activities Percentage helpers', () => {
  test('one of the 33 should be rounded up', () => {
    const mock = [33.33333, 33.33333, 33.33333];
    const result = getLargestRemainder(mock, 100);
    expect(result && result[0]).toBe(34);
    expect(result && result[1]).toBe(33);
    expect(result && result[2]).toBe(33);
  });
});
