export enum ROLE {
  TeamLead = 'TEAM_LEAD',
  Auditor = 'AUDITOR',
  Manager = 'MANAGER',
  Admin = 'ADMIN'
}

export type TAuditor = {
  id: number;
  fullName: string;
  totalPoints: number;
  averagePerformance: number;
  averageValidity: number;
  supportAuditsHours: number;
  correspondentsHours: number;
};
