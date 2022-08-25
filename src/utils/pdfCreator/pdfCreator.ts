import { jsPDF } from 'jspdf';
import { t } from 'i18next';

import 'src/i18n';
import store from 'src/store';
import { contentAuditorWidgetData } from 'src/components/widgets/ContentAuditor';
import { activitiesPercentageWidgetData } from 'src/components/widgets/ActivitiesPercentage';
import { criteriaWidgetsData } from 'src/components/widgets/CriteriaWidgets';
import { performanceStatisticsWidgetData } from 'src/components/widgets/PerformanceStatisticsHOC';
import { TeamComparisonWidgetData } from 'src/components/widgets/TeamComparison';
import { AuditorsStatisticsWidgetData } from 'src/components/widgets/AuditorsStatistics/createPDF';
import { teamActivitiesPercentageWidgetData } from 'src/components/widgets/TeamActivitiesPercentage';
import { ROLE_NAME } from 'src/constants';
import { createComponentImage } from './createComponentImage';
import { createTitle } from './createTitle';
import {
  addHorizontalLine,
  addOverlayAndSpinner,
  removeOverlayAndSpinner,
  prepareStylesForScreenshots,
  resetStyles,
  prepareStylesForAuditorsTable,
  createAuditorsPagesList
} from './helpers';
import {
  IMAGE_WIDTH,
  LEFT_PADDING,
  MAX_ROWS_PER_PAGE_WITH_HEAD,
  PDF_HEIGHT,
  PDF_WIDTH,
  TABLE_HEIGHT_WITH_HEAD,
  TABLE_HEIGHT_WITHOUT_HEAD,
  PADDING_BETWEEN_WIDGETS,
  START_HEIGHT_TO_PLACE_IMAGE
} from './constants';

import { WidgetsDataToCreatePDFType } from './types';

let pagesCount = 1;
let currentPageHeightToPlaceImage = 100;

export const createPDF = (): void => {
  const { roleName } = store.getState().auth.currentUser;
  const checkedAuditorsCount = Object.keys(
    store.getState().filter.checkedAuditorsData
  ).length;
  if (checkedAuditorsCount === 0 && roleName !== ROLE_NAME.AUDITOR) return;
  let isAuditorsStatisticCreated = false;

  const doc = new jsPDF({
    unit: 'px',
    hotfixes: ['px_scaling'],
    format: [PDF_WIDTH, PDF_HEIGHT]
  });

  addOverlayAndSpinner();

  prepareStylesForScreenshots();

  const startFillingDocument = async () => {
    const { returnImg } = await createComponentImage({
      componentWidth: 600,
      componentHeight: 60,
      componentId: 'title-and-logo'
    });

    doc.addImage(
      returnImg,
      'JPEG',
      LEFT_PADDING,
      PADDING_BETWEEN_WIDGETS,
      600,
      60
    );

    addHorizontalLine(
      doc,
      LEFT_PADDING,
      START_HEIGHT_TO_PLACE_IMAGE,
      PDF_WIDTH - LEFT_PADDING
    );

    createTitle(doc);

    addPage(doc);

    for (const {
      widgetName,
      widgetId,
      widgetHeight
    } of createWidgetsDataAddToPDF(checkedAuditorsCount, roleName)) {
      const { height, returnImg } = await createComponentImage({
        componentHeight: widgetHeight,
        componentWidth: IMAGE_WIDTH,
        componentId: widgetId
      });

      if (
        currentPageHeightToPlaceImage + height >=
        PDF_HEIGHT - START_HEIGHT_TO_PLACE_IMAGE
      ) {
        addPage(doc);
        currentPageHeightToPlaceImage = START_HEIGHT_TO_PLACE_IMAGE;
      }

      if (
        widgetName === 'AuditorsStatistics' &&
        height > PDF_HEIGHT - START_HEIGHT_TO_PLACE_IMAGE
      ) {
        isAuditorsStatisticCreated = true;

        const tableWithHead = await createComponentImage({
          componentHeight: TABLE_HEIGHT_WITH_HEAD,
          componentWidth: IMAGE_WIDTH,
          componentId: widgetId
        });
        doc.addImage(
          tableWithHead.returnImg,
          'JPEG',
          LEFT_PADDING,
          currentPageHeightToPlaceImage,
          IMAGE_WIDTH,
          tableWithHead.height
        );
        if (checkedAuditorsCount > MAX_ROWS_PER_PAGE_WITH_HEAD) {
          const auditorsPagesList =
            createAuditorsPagesList(checkedAuditorsCount);

          for (const [
            index,
            auditorsPages
          ] of auditorsPagesList.entries() as any) {
            addPage(doc);
            prepareStylesForAuditorsTable({
              fromIndex: auditorsPages.fromIndex,
              toIndex: auditorsPages.toIndex
            });

            const isLastAuditorsList = index === auditorsPagesList.length - 1;

            const tableWithoutHead = await createComponentImage({
              componentHeight: isLastAuditorsList
                ? null
                : TABLE_HEIGHT_WITHOUT_HEAD,
              componentWidth: IMAGE_WIDTH,
              componentId: widgetId
            });

            doc.addImage(
              tableWithoutHead.returnImg,
              'JPEG',
              LEFT_PADDING,
              currentPageHeightToPlaceImage,
              IMAGE_WIDTH,
              tableWithoutHead.height
            );

            if (isLastAuditorsList) {
              currentPageHeightToPlaceImage =
                START_HEIGHT_TO_PLACE_IMAGE +
                PADDING_BETWEEN_WIDGETS +
                tableWithoutHead.height;
            }

            prepareStylesForAuditorsTable({
              fromIndex: auditorsPages.fromIndex,
              toIndex: auditorsPages.toIndex,
              isReset: true
            });
          }
        }
      } else {
        doc.addImage(
          returnImg,
          'JPEG',
          LEFT_PADDING,
          currentPageHeightToPlaceImage,
          IMAGE_WIDTH,
          height
        );
      }
      if (!isAuditorsStatisticCreated) {
        currentPageHeightToPlaceImage += height + PADDING_BETWEEN_WIDGETS;
      }
    }

    setPagesNumber(doc);
  };

  void startFillingDocument().then(() => {
    savePDF(doc);
    resetStyles();
    removeOverlayAndSpinner();
    pagesCount = 1;
    currentPageHeightToPlaceImage = START_HEIGHT_TO_PLACE_IMAGE;
  });
};

export const createWidgetsDataAddToPDF = (
  auditorsCount: number,
  roleName: string
): WidgetsDataToCreatePDFType[] => {
  if (
    auditorsCount === 1 &&
    roleName !== ROLE_NAME.MANAGER &&
    roleName !== ROLE_NAME.ADMIN
  ) {
    return [
      contentAuditorWidgetData,
      activitiesPercentageWidgetData,
      criteriaWidgetsData,
      performanceStatisticsWidgetData,
      TeamComparisonWidgetData
    ];
  } else if (roleName === ROLE_NAME.AUDITOR) {
    return [
      contentAuditorWidgetData,
      activitiesPercentageWidgetData,
      criteriaWidgetsData,
      performanceStatisticsWidgetData
    ];
  } else if (
    auditorsCount === 1 &&
    (roleName === ROLE_NAME.MANAGER || roleName === ROLE_NAME.ADMIN)
  ) {
    return [
      contentAuditorWidgetData,
      activitiesPercentageWidgetData,
      criteriaWidgetsData,
      performanceStatisticsWidgetData,
      TeamComparisonWidgetData,
      teamActivitiesPercentageWidgetData
    ];
  } else if (
    auditorsCount >= 9 &&
    (roleName === ROLE_NAME.MANAGER || roleName === ROLE_NAME.ADMIN)
  ) {
    return [
      performanceStatisticsWidgetData,
      TeamComparisonWidgetData,
      AuditorsStatisticsWidgetData,
      teamActivitiesPercentageWidgetData
    ];
  } else if (
    auditorsCount > 1 &&
    (roleName === ROLE_NAME.MANAGER || roleName === ROLE_NAME.ADMIN)
  ) {
    return [
      performanceStatisticsWidgetData,
      AuditorsStatisticsWidgetData,
      TeamComparisonWidgetData,
      teamActivitiesPercentageWidgetData
    ];
  } else if (auditorsCount >= 9) {
    return [
      performanceStatisticsWidgetData,
      TeamComparisonWidgetData,
      AuditorsStatisticsWidgetData
    ];
  } else if (auditorsCount > 1) {
    return [
      performanceStatisticsWidgetData,
      AuditorsStatisticsWidgetData,
      TeamComparisonWidgetData
    ];
  } else {
    return [];
  }
};

export const savePDF = (doc: jsPDF): void => {
  doc.save(t('pdf_creator.document_title'));
};

const setPagesNumber = (doc: jsPDF) => {
  for (let i = 1; i <= pagesCount; i++) {
    doc.setPage(i);

    doc.text(
      `Page ${i} of ${pagesCount}`,
      PDF_WIDTH - LEFT_PADDING * 2.5,
      1700
    );
  }
};

export const addPage = (doc: jsPDF): void => {
  doc.addPage();

  addHorizontalLine(doc, LEFT_PADDING, 1654, PDF_WIDTH - LEFT_PADDING);

  pagesCount += 1;
};
