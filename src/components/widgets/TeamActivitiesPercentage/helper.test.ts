import { StatisticCircleDataType } from './types';
import { filterTeams } from './helper';

let data: StatisticCircleDataType[];

beforeEach(() => {
  data = [
    {
      title: 'X-Rays',
      data: [
        { value: 99, name: 'Audits' },
        { value: 18, name: 'Meetings' },
        { value: 63, name: 'Others' },
        { value: 3, name: 'Support' }
      ]
    },
    {
      title: 'Charlie',
      data: [
        { value: 99, name: 'Audits' },
        { value: 18, name: 'Meetings' },
        { value: 63, name: 'Others' },
        { value: 0, name: 'Support' }
      ]
    },
    {
      title: 'Alpha',
      data: [
        { value: 99, name: 'Audits' },
        { value: 18, name: 'Meetings' },
        { value: 63, name: 'Others' },
        { value: 3, name: 'Support' }
      ]
    },
    {
      title: 'bob',
      data: [
        { value: 99, name: 'Audits' },
        { value: 18, name: 'Meetings' },
        { value: 63, name: 'Others' },
        { value: 3, name: 'Support' }
      ]
    }
  ];
});

describe('filter teams function test', () => {
  test('is immutable', () => {
    const result = filterTeams(data, ['Charlie']);
    expect(result.length).toBe(4);
    expect(data.length).toBe(4);

    expect(result[0].title).toBe('Charlie');
    expect(data[0].title).toBe('X-Rays');
    expect(result[1].title).toBe('X-Rays');
    expect(data[1].title).toBe('Charlie');
  });

  test('filter correct with one team title in filter array', () => {
    const result = filterTeams(data, ['Charlie']);

    expect(result[0].title).toBe('Charlie');
    expect(result[1].title).toBe('X-Rays');
    expect(result[2].title).toBe('Alpha');
  });

  test('filter correct with empty filter array', () => {
    const result = filterTeams(data, []);

    expect(result[0].title).toBe('X-Rays');
    expect(result[1].title).toBe('Charlie');
    expect(result[2].title).toBe('Alpha');
  });

  test('filter with 2 options and more must be in alphabetical order', () => {
    const result = filterTeams(data, ['Charlie', 'Alpha']);

    expect(result[0].title).toBe('Alpha');
    expect(result[1].title).toBe('Charlie');
    expect(result[2].title).toBe('X-Rays');
    expect(result[3].title).toBe('bob');
  });

  test('filter must be not case sensitive', () => {
    const result = filterTeams(data, ['Charlie', 'Alpha', 'bob']);

    expect(result[0].title).toBe('Alpha');
    expect(result[1].title).toBe('bob');
    expect(result[2].title).toBe('Charlie');
    expect(result[3].title).toBe('X-Rays');
  });
});
