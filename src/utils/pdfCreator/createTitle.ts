import jsPDF from 'jspdf';

import { t } from 'i18next';
import 'src/i18n';

import store from 'src/store';
import { ROLE_NAME } from 'src/constants';
import { addHorizontalLine, createAuditorsFontSize, getDate } from './helpers';
import {
  LEFT_PADDING,
  PDF_WIDTH,
  PDF_HEIGHT,
  TOP_MARGIN_HEIGHT
} from './constants';

import { CheckedAuditorsDataType } from 'src/store/Filter/types';

export const createTitle = (doc: jsPDF): void => {
  doc
    .setFont('helvetica')
    .setFontSize(25)
    .setTextColor(t('pdf_creator.common_text_color'));

  const dateRange = store.getState().dateFilter.pickedDate;
  const startDate = new Date(dateRange.startDate);
  const finishDate = new Date(dateRange.finishDate);
  const auditors: CheckedAuditorsDataType =
    store.getState().filter.checkedAuditorsData;
  const { roleName } = store.getState().auth.currentUser;
  const auditorNamesList: string[] = Object.values(auditors).map(
    ({ name }) => name
  );

  const auditorsFontSize = createAuditorsFontSize(auditorNamesList);
  let auditorText =
    auditorNamesList.length > 1
      ? `${auditorNamesList.join(', ')}`
      : auditorNamesList[0];

  if (roleName === ROLE_NAME.AUDITOR) {
    auditorText = store.getState().contentAuditor.auditorData.fullName;
  }

  doc
    .text(`${t('pdf_creator.title_report')}:`, PDF_WIDTH / 2, PDF_HEIGHT / 3, {
      align: 'center'
    })
    .setFont('', 'bold')
    .setFont('helvetica')
    .setFontSize(auditorsFontSize)
    .setTextColor(t('pdf_creator.bold_text_color'));

  let textYCoordinate = PDF_HEIGHT / 3 + TOP_MARGIN_HEIGHT;
  const lineHeight = auditorsFontSize + 15;
  const wrapWidth = PDF_WIDTH - LEFT_PADDING * 2;

  const splitText: string = doc.splitTextToSize(auditorText, wrapWidth);
  for (let i = 0; i < splitText.length; i++) {
    const textWidth =
      (doc.getStringUnitWidth(splitText[i]) * auditorsFontSize) /
      doc.internal.scaleFactor;
    const textXCoordinate = (PDF_WIDTH - textWidth) / 2;
    doc.text(splitText[i], textXCoordinate, textYCoordinate);
    textYCoordinate += lineHeight;
  }

  doc
    .setFontSize(30)
    .setTextColor(t('pdf_creator.common_text_color'))
    .setFont('', 'normal')
    .setFont('helvetica');

  doc
    .text(
      `${t('pdf_creator.period')} ${getDate(startDate)} - ${getDate(
        finishDate
      )}`,
      PDF_WIDTH / 2,
      textYCoordinate + TOP_MARGIN_HEIGHT - lineHeight,
      { align: 'center' }
    )
    .setFontSize(20)
    .setTextColor(t('pdf_creator.common_text_color'));

  addHorizontalLine(doc, LEFT_PADDING, 1654, PDF_WIDTH - LEFT_PADDING);
};
