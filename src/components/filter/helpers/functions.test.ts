import { isDisabled, isChecked } from './functions';

describe('validate isDisabled function', () => {
  test('Empty array', () => {
    expect(isDisabled([], 'Jim')).toBe(false);
  });
  test('Array includes value', () => {
    expect(isDisabled(['Fred', 'Ted', 'John'], 'John')).toBe(false);
  });
  test("Array doesn't include value", () => {
    expect(isDisabled(['Fred', 'Ted', 'John'], 'Jim')).toBe(true);
  });
});

describe('validate isChecked function', () => {
  test('Empty array', () => {
    expect(isChecked([], 'Jim')).toBe(false);
  });
  test('Array includes value', () => {
    expect(isChecked(['Fred', 'Ted', 'John'], 'John')).toBe(true);
  });
  test("Array doesn't include value", () => {
    expect(isChecked(['Fred', 'Ted', 'John'], 'Jim')).toBe(false);
  });
});
