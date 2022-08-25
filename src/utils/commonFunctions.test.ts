import { createFormattedLevel } from './commonFunctions';

describe('createFormattedLevel test', () => {
  test('test for TRAINEE level', () => {
    expect(createFormattedLevel('TRAINEE')).toBe('Trainee');
  });

  test('test for JUNIOR level', () => {
    expect(createFormattedLevel('JUNIOR')).toBe('Junior');
  });

  test('test for MIDDLE level', () => {
    expect(createFormattedLevel('MIDDLE')).toBe('Middle');
  });

  test('test for SENIOR level', () => {
    expect(createFormattedLevel('SENIOR')).toBe('Senior');
  });

  test('test for TEAM_LEAD level', () => {
    expect(createFormattedLevel('TEAM_LEAD')).toBe('Team Lead');
  });
});
