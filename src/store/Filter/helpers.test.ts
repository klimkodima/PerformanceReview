import { crateAuditorsData, createTeamsData } from './helpers';
import userMockData from './userMockData.json';

describe('Filter helpers test', () => {
  test('create teams data works correctly', () => {
    const mock = [
      {
        teamName: 'X-Rays',
        teamLeaderName: 'Tatiana Klimchenya'
      },
      {
        teamName: 'Charlie',
        teamLeaderName: 'Anastasya Karman'
      },
      {
        teamName: 'Alpha',
        teamLeaderName: 'Bogdana Korniyuk'
      }
    ];

    const result = createTeamsData(userMockData, mock);

    expect(result[1].teamName).toBe('X-Rays');
    expect(result[1].teamLeaderName).toBe('Tatiana Klimchenya');
    expect(result[2].teamName).toBe('Charlie');
    expect(result[2].teamLeaderName).toBe('Anastasya Karman');
    expect(result[3].teamName).toBe('Alpha');
    expect(result[3].teamLeaderName).toBe('Bogdana Korniyuk');
  });

  test('create auditors data works correctly', () => {
    const mock = [
      {
        teamName: 'X-Rays',
        teamLeaderName: 'Tatiana Klimchenya'
      },
      {
        teamName: 'Charlie',
        teamLeaderName: 'Anastasya Karman'
      },
      {
        teamName: 'Alpha',
        teamLeaderName: 'Bogdana Korniyuk'
      }
    ];

    const result = crateAuditorsData(userMockData, mock);

    expect(result.length).toBe(13);

    expect(result[0].teamLeaderName).toBe('Tatiana Klimchenya');
    expect(result[0].teamId).toBe(1);
    expect(result[0].team).toBe('X-Rays');

    expect(result[8].teamLeaderName).toBe('Tatiana Klimchenya');
    expect(result[8].teamId).toBe(1);
    expect(result[8].team).toBe('X-Rays');

    expect(result[12].teamLeaderName).toBe('Anastasya Karman');
    expect(result[12].teamId).toBe(2);
    expect(result[12].team).toBe('Charlie');
    expect(result[12].name).toBe('full name9');
  });
});
