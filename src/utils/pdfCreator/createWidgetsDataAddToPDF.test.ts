import { ROLE_NAME } from 'src/constants';
import { createWidgetsDataAddToPDF } from './pdfCreator';

describe('createWidgetsDataAddToPDF function test', () => {
  test(' auditor level', () => {
    const auditorsCount = 0;

    const auditResult = createWidgetsDataAddToPDF(
      auditorsCount,
      ROLE_NAME.AUDITOR
    );

    expect(auditResult.length).toBe(4);

    expect(auditResult[0].widgetName).toBe('ContentAuditor');
    expect(auditResult[1].widgetName).toBe('ActivitiesPercentage');
    expect(auditResult[2].widgetName).toBe('CriteriaWidgets');
    expect(auditResult[3].widgetName).toBe('PerformanceStatistics');
  });

  test('1 auditor, teamLead level', () => {
    const auditorsCount = 1;
    const roleName = '';

    const teamLeadResult = createWidgetsDataAddToPDF(auditorsCount, roleName);

    expect(teamLeadResult.length).toBe(5);

    expect(teamLeadResult[0].widgetName).toBe('ContentAuditor');
    expect(teamLeadResult[1].widgetName).toBe('ActivitiesPercentage');
    expect(teamLeadResult[2].widgetName).toBe('CriteriaWidgets');
    expect(teamLeadResult[3].widgetName).toBe('PerformanceStatistics');
    expect(teamLeadResult[4].widgetName).toBe('TeamComparison');
  });

  test('2 or more auditors, teamLead level', () => {
    const auditorsCount = 3;
    const roleName = '';

    const teamLeadResult = createWidgetsDataAddToPDF(auditorsCount, roleName);

    expect(teamLeadResult.length).toBe(3);

    expect(teamLeadResult[0].widgetName).toBe('PerformanceStatistics');
    expect(teamLeadResult[1].widgetName).toBe('AuditorsStatistics');
    expect(teamLeadResult[2].widgetName).toBe('TeamComparison');
  });

  test('9 or more auditors, teamLead level', () => {
    const auditorsCount = 9;
    const roleName = '';

    const teamLeadResult = createWidgetsDataAddToPDF(auditorsCount, roleName);

    expect(teamLeadResult.length).toBe(3);

    expect(teamLeadResult[0].widgetName).toBe('PerformanceStatistics');
    expect(teamLeadResult[1].widgetName).toBe('TeamComparison');
    expect(teamLeadResult[2].widgetName).toBe('AuditorsStatistics');
  });

  test('1 auditor, admin or manager level', () => {
    const auditorsCount = 1;

    const adminResult = createWidgetsDataAddToPDF(
      auditorsCount,
      ROLE_NAME.ADMIN
    );

    const managerResult = createWidgetsDataAddToPDF(
      auditorsCount,
      ROLE_NAME.MANAGER
    );

    expect(adminResult.length).toBe(6);

    expect(adminResult[0].widgetName).toBe('ContentAuditor');
    expect(adminResult[1].widgetName).toBe('ActivitiesPercentage');
    expect(adminResult[2].widgetName).toBe('CriteriaWidgets');
    expect(adminResult[3].widgetName).toBe('PerformanceStatistics');
    expect(adminResult[4].widgetName).toBe('TeamComparison');
    expect(adminResult[5].widgetName).toBe('TeamActivitiesPercentage');

    expect(managerResult.length).toBe(6);

    expect(managerResult[0].widgetName).toBe('ContentAuditor');
    expect(managerResult[1].widgetName).toBe('ActivitiesPercentage');
    expect(managerResult[2].widgetName).toBe('CriteriaWidgets');
    expect(managerResult[3].widgetName).toBe('PerformanceStatistics');
    expect(managerResult[4].widgetName).toBe('TeamComparison');
    expect(managerResult[5].widgetName).toBe('TeamActivitiesPercentage');
  });

  test('2 or more auditors, admin or manager level', () => {
    const auditorsCount = 2;

    const adminResult = createWidgetsDataAddToPDF(
      auditorsCount,
      ROLE_NAME.ADMIN
    );

    const managerResult = createWidgetsDataAddToPDF(
      auditorsCount,
      ROLE_NAME.MANAGER
    );

    expect(adminResult.length).toBe(4);

    expect(adminResult[0].widgetName).toBe('PerformanceStatistics');
    expect(adminResult[1].widgetName).toBe('AuditorsStatistics');
    expect(adminResult[2].widgetName).toBe('TeamComparison');
    expect(adminResult[3].widgetName).toBe('TeamActivitiesPercentage');

    expect(managerResult.length).toBe(4);

    expect(managerResult[0].widgetName).toBe('PerformanceStatistics');
    expect(managerResult[1].widgetName).toBe('AuditorsStatistics');
    expect(managerResult[2].widgetName).toBe('TeamComparison');
    expect(managerResult[3].widgetName).toBe('TeamActivitiesPercentage');
  });

  test('9 or more auditors, admin or manager level', () => {
    const auditorsCount = 11;

    const adminResult = createWidgetsDataAddToPDF(
      auditorsCount,
      ROLE_NAME.ADMIN
    );

    const managerResult = createWidgetsDataAddToPDF(
      auditorsCount,
      ROLE_NAME.MANAGER
    );

    expect(adminResult.length).toBe(4);

    expect(adminResult[0].widgetName).toBe('PerformanceStatistics');
    expect(adminResult[1].widgetName).toBe('TeamComparison');
    expect(adminResult[2].widgetName).toBe('AuditorsStatistics');
    expect(adminResult[3].widgetName).toBe('TeamActivitiesPercentage');

    expect(managerResult.length).toBe(4);

    expect(managerResult[0].widgetName).toBe('PerformanceStatistics');
    expect(managerResult[1].widgetName).toBe('TeamComparison');
    expect(managerResult[2].widgetName).toBe('AuditorsStatistics');
    expect(managerResult[3].widgetName).toBe('TeamActivitiesPercentage');
  });
});
