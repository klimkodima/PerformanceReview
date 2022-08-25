import { getOrderNumber } from '../commonFunctions';

describe('convert day in correct format function test', () => {
  test('if the last number is 1 → add st', () => {
    expect(getOrderNumber(1)).toBe('1st');
    expect(getOrderNumber(11)).toBe('11th');
    expect(getOrderNumber(21)).toBe('21th');
    expect(getOrderNumber(31)).toBe('31th');
  });

  test('if the last number is 2 → add nd', () => {
    expect(getOrderNumber(2)).toBe('2nd');
    expect(getOrderNumber(12)).toBe('12th');
    expect(getOrderNumber(22)).toBe('22th');
  });

  test('if the last number is 3 → add 3rd', () => {
    expect(getOrderNumber(3)).toBe('3rd');
    expect(getOrderNumber(13)).toBe('13th');
    expect(getOrderNumber(23)).toBe('23th');
  });

  test('if the last number is 4 and above (including 0) → add th. E.g., 4th, 5th, etc.', () => {
    expect(getOrderNumber(28)).toBe('28th');
    expect(getOrderNumber(15)).toBe('15th');
  });

  test('if the last number is 0 → also add the', () => {
    expect(getOrderNumber(10)).toBe('the 10th');
    expect(getOrderNumber(20)).toBe('the 20th');
    expect(getOrderNumber(30)).toBe('the 30th');
  });

  test('Numbers: from 11 to 19 are always followed by th', () => {
    expect(getOrderNumber(11)).toBe('11th');
    expect(getOrderNumber(12)).toBe('12th');
    expect(getOrderNumber(13)).toBe('13th');
    expect(getOrderNumber(14)).toBe('14th');
    expect(getOrderNumber(15)).toBe('15th');
    expect(getOrderNumber(16)).toBe('16th');
    expect(getOrderNumber(17)).toBe('17th');
    expect(getOrderNumber(18)).toBe('18th');
    expect(getOrderNumber(19)).toBe('19th');
  });
});
