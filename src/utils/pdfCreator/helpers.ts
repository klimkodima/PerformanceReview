import jsPDF from 'jspdf';

import { t } from 'i18next';
import 'src/i18n';

import { getOrderNumber } from '../commonFunctions';
import {
  IMAGE_WIDTH,
  MAX_ROWS_PER_PAGE_WITH_HEAD,
  MAX_ROWS_PER_PAGE_WITHOUT_HEAD,
  MONTHS
} from './constants';

export const prepareStylesForScreenshots = (): void => {
  const tooltipTextElements: HTMLElement[] = Array.from(
    document.querySelectorAll('.criteria-item .tooltip-text')
  );

  tooltipTextElements.forEach((element) => {
    element.style.display = 'block';
  });

  const logo = document.getElementById('title-and-logo');
  const sectionHeader = document.getElementById(
    'dashboard-name'
  ) as HTMLElement;
  sectionHeader.style.marginRight = '25px';
  if (logo) {
    logo.style.color = t('pdf_creator.bold_text_color');
    logo.style.display = 'flex';
    logo.style.justifyContent = 'space-between';
    logo.style.alignItems = 'center';
  }

  const criteriaItems = document.getElementsByClassName(
    'criteria-item'
  ) as HTMLCollectionOf<HTMLElement>;
  Array.from(criteriaItems).forEach(({ style }) => {
    style.backgroundColor = t('pdf_creator.pdf_fill_background');
  });

  const performanceStatistics = document.getElementById(
    'performance-statistics-widget'
  );
  if (performanceStatistics) {
    performanceStatistics.style.width = `${IMAGE_WIDTH}px`;

    const averageLevelBox = document.getElementById('average-levels-box');
    if (averageLevelBox) {
      averageLevelBox.style.display = 'none';
    }
  }

  const pointWidget = document.getElementById('widget-point');
  if (pointWidget) {
    pointWidget.style.backgroundColor = t('pdf_creator.pdf_fill_background');
  }

  const activitiesWidget = document.querySelector(
    '.section-activities-content'
  ) as HTMLElement;
  if (activitiesWidget) {
    activitiesWidget.style.backgroundColor = t(
      'pdf_creator.pdf_fill_background'
    );
  }

  // teamComparisonWidget
  const commonTable = document.getElementsByClassName(
    'comparison-table-wrapper'
  ) as HTMLCollectionOf<HTMLElement>;
  if (commonTable) {
    Array.from(commonTable).forEach(({ style }) => {
      style.backgroundColor = t('pdf_creator.pdf_fill_background');
    });
  }
  const tableHeader = document.getElementsByClassName(
    'comparison-table-head-cell'
  ) as HTMLCollectionOf<HTMLElement>;
  if (tableHeader) {
    Array.from(tableHeader).forEach(({ style }) => {
      style.backgroundColor = t('pdf_creator.pdf_fill_background');
    });
  }
  const teamLeadRow = document.getElementsByClassName(
    'comparison-table-lead-team'
  )[0] as HTMLElement;
  if (teamLeadRow) {
    teamLeadRow.style.backgroundColor = t('pdf_creator.pdf_fill_background');
  }

  // AuditorsStatistics
  const table = document.getElementsByClassName(
    'comparison-table'
  ) as HTMLCollectionOf<HTMLElement>;
  if (table) {
    Array.from(table).forEach(({ style }) => {
      style.maxHeight = 'fit-content';
    });
  }

  const container = document.querySelector('#auditors-statistics-widget');
  const auditorsStatisticsList = container?.querySelectorAll(
    '.comparison-table-row'
  ) as NodeListOf<HTMLElement>;
  if (auditorsStatisticsList) {
    auditorsStatisticsList.forEach(({ style }) => {
      style.height = '80px';
    });
  }
};

export const resetStyles = (): void => {
  const tooltipTextElements: HTMLElement[] = Array.from(
    document.querySelectorAll('.criteria-item .tooltip-text')
  );

  tooltipTextElements.forEach((element) => {
    element.style.display = 'none';
  });
  const logo = document.getElementById('title-and-logo');
  const sectionHeader = document.getElementById(
    'dashboard-name'
  ) as HTMLElement;
  sectionHeader.style.marginRight = '';
  if (logo) {
    logo.style.color = '';
    logo.style.display = '';
    logo.style.justifyContent = '';
    logo.style.alignItems = '';
  }

  const criteriaItems = document.getElementsByClassName(
    'criteria-item'
  ) as HTMLCollectionOf<HTMLElement>;
  Array.from(criteriaItems).forEach(({ style }) => {
    style.backgroundColor = '';
  });

  const performanceStatistics = document.getElementById(
    'performance-statistics-widget'
  );
  if (performanceStatistics) {
    performanceStatistics.style.width = '';

    const averageLevelBox = document.getElementById('average-levels-box');
    if (averageLevelBox) {
      averageLevelBox.style.display = '';
    }
  }

  const pointWidget = document.getElementById('widget-point');
  if (pointWidget) {
    pointWidget.style.backgroundColor = '';
  }

  const activitiesWidget = document.querySelector(
    '.section-activities-content'
  ) as HTMLElement;
  if (activitiesWidget) {
    activitiesWidget.style.backgroundColor = '';
  }

  // teamComparisonWidget
  const commonTable = document.getElementsByClassName(
    'comparison-table-wrapper'
  ) as HTMLCollectionOf<HTMLElement>;
  if (commonTable) {
    Array.from(commonTable).forEach(({ style }) => {
      style.backgroundColor = '';
    });
  }
  const tableHeader = document.getElementsByClassName(
    'comparison-table-head-cell'
  ) as HTMLCollectionOf<HTMLElement>;
  if (tableHeader) {
    Array.from(tableHeader).forEach(({ style }) => {
      style.backgroundColor = '';
    });
  }
  const teamLeadRow = document.getElementsByClassName(
    'comparison-table-lead-team'
  )[0] as HTMLElement;
  if (teamLeadRow) {
    teamLeadRow.style.backgroundColor = '';
  }
  // AuditorsStatistics
  const table = document.getElementsByClassName(
    'comparison-table'
  ) as HTMLCollectionOf<HTMLElement>;
  if (table) {
    Array.from(table).forEach(({ style }) => {
      style.maxHeight = '';
    });
  }

  const container = document.querySelector('#auditors-statistics-widget');
  const auditorsStatisticsList = container?.querySelectorAll(
    '.comparison-table-row'
  ) as NodeListOf<HTMLElement>;
  if (auditorsStatisticsList) {
    auditorsStatisticsList.forEach(({ style }) => {
      style.height = '';
    });
  }
};

export const getDate = (date: Date): string => {
  const startDay = date.getDate();
  const startMonth = date.getMonth();
  const startYear = date.getFullYear();

  return `${getOrderNumber(startDay)} ${MONTHS[startMonth]} ${startYear}`;
};

export const addHorizontalLine = (
  doc: jsPDF,
  x1: number,
  y1: number,
  x2: number
): void => {
  doc.setLineWidth(2);
  doc.setDrawColor(t('pdf_creator.common_text_color'));
  doc.line(x1, y1, x2, y1);
};

export const createAuditorsFontSize = (auditors: string[]): number => {
  if (auditors.length < 5) {
    return 35;
  } else if (auditors.length < 10) {
    return 32;
  } else if (auditors.length < 15) {
    return 28;
  } else {
    return 25;
  }
};

export const addOverlayAndSpinner = (): void => {
  const rootElement = document.querySelector('.app') as HTMLElement;
  rootElement.insertAdjacentHTML(
    'afterbegin',
    '<div class="print-overlay" id="print-overlay"><div class="loadingio-spinner-rolling-k8xeawwt5qg"><div class="ldio-hawsfughdlh"><div></div></div></div></div>'
  );
};

export const removeOverlayAndSpinner = (): void => {
  const printOverlay = document.getElementById('print-overlay') as HTMLElement;
  printOverlay.remove();
};

export const prepareStylesForAuditorsTable = ({
  fromIndex,
  toIndex,
  isReset = false
}: {
  fromIndex: number;
  toIndex: number;
  isReset?: boolean;
}): void => {
  const auditorsStatisticsWidget = document.querySelector(
    '#auditors-statistics-widget'
  );
  const auditorsStatisticsList = auditorsStatisticsWidget?.querySelectorAll(
    '.comparison-table-row'
  ) as NodeListOf<HTMLElement>;

  const tableHeadCellList = auditorsStatisticsWidget?.querySelectorAll(
    '.comparison-table-head-cell'
  ) as NodeListOf<HTMLElement>;
  const tableHeadCellSpanList = auditorsStatisticsWidget?.querySelectorAll(
    '.comparison-table-head-cell span'
  ) as NodeListOf<HTMLElement>;

  const tableHeadElement = auditorsStatisticsWidget?.querySelector(
    '.comparison-table-head'
  ) as HTMLElement;

  const tableTitle = auditorsStatisticsWidget?.querySelector(
    '.comparison-table-header'
  ) as HTMLElement;

  for (const [index, element] of auditorsStatisticsList.entries() as any) {
    if (index < fromIndex || index >= toIndex) {
      element.style.display = isReset ? '' : 'none';
      tableHeadElement.style.visibility = isReset ? '' : 'hidden';
      tableHeadElement.style.height = isReset ? '' : '0px';
      tableTitle.style.display = isReset ? '' : 'none';
      tableHeadCellList.forEach(({ style }) => {
        style.height = isReset ? '' : '0px';
        style.padding = isReset ? '' : '0';
        style.lineHeight = isReset ? '' : '0';
        style.borderBottom = isReset ? '' : 'none';
      });
      tableHeadCellSpanList.forEach(({ style }) => {
        style.visibility = isReset ? '' : 'hidden';
        style.height = isReset ? '' : '0px';
      });
    }
  }
};

export const createAuditorsPagesList = (
  checkedAuditors: number
): { fromIndex: number; toIndex: number }[] => {
  const rowsCountToCreate = checkedAuditors - MAX_ROWS_PER_PAGE_WITH_HEAD;

  let firstPack = MAX_ROWS_PER_PAGE_WITH_HEAD;

  const auditorsPagesList = [
    ...Array(Math.ceil(rowsCountToCreate / MAX_ROWS_PER_PAGE_WITHOUT_HEAD))
  ];
  return auditorsPagesList.map(() => ({
    fromIndex: firstPack,
    toIndex: (firstPack += MAX_ROWS_PER_PAGE_WITHOUT_HEAD)
  }));
};
