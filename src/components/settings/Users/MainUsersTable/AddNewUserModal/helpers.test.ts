import mockUsersData from 'src/store/Users/mockUsers.json';
import { createTeams } from './helpers';

const mockTeams = [
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

describe('addNewUserModal helpers test', () => {
  test('works correct', () => {
    const result = createTeams(mockUsersData, mockTeams);
    expect(result.length).toBe(3);
    expect(result[0].teamName).toBe('X-Rays');
    expect(result[0].teamId).toBe(1);
    expect(result[1].teamName).toBe('Charlie');
    expect(result[1].teamId).toBe(2);
    expect(result[2].teamName).toBe('Alpha');
    expect(result[2].teamId).toBe(3);
  });
});
