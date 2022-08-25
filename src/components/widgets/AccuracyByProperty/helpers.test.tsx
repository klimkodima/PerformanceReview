import { getRangeColor } from './helpers';

describe('validate getRangeColor function', () => {
  test('test for green color', () => {
    expect(getRangeColor(100)).toBe('range green');
  });

  test('test for green color', () => {
    expect(getRangeColor(80)).toBe('range green');
  });

  test('test for yellow color', () => {
    expect(getRangeColor(79)).toBe('range yellow');
  });

  test('test for yellow color', () => {
    expect(getRangeColor(27)).toBe('range yellow');
  });

  test('test for red color', () => {
    expect(getRangeColor(26)).toBe('range red');
  });

  test('test for red color', () => {
    expect(getRangeColor(0)).toBe('range red');
  });
});
