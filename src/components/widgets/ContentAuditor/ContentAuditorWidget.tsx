import { FC, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';

import { ContentAuditorType } from 'src/store/ContentAuditor';
import imageIcon from 'src/assets/img/01_Auditor_icon.png';
import { ContentImage } from '../../common';
import ContentRow from './ContentRow';
import { getOutputData } from './helpers';

import { inputDataType, outputDataType } from './types';

import './ContentAuditorWidget.scss';

type ContentAuditorPropsType = {
  auditorData: ContentAuditorType;
};

const ContentAuditorWidget: FC<ContentAuditorPropsType> = ({
  auditorData
}): ReactElement => {
  const { t } = useTranslation();

  return (
    <div
      className='widgets-wrapper widget'
      data-testid='widget'
      id='content-auditor-widget'
    >
      <div className='widget__content content' data-testid='content'>
        <h3 className='content__header' data-testid='content-header'>
          {t('content_auditor.section_header')}
        </h3>
        <div className='content__block' data-testid='content-block'>
          {Object.entries(auditorData)
            .map(([key, value]) => ({ key, value } as inputDataType))
            .map((item: inputDataType) => getOutputData(item))
            .sort((a: outputDataType, b: outputDataType) => a.order - b.order)
            .map((item: outputDataType) => {
              if (
                item.label === t('content_auditor.photo.') ||
                !item.label.trim().length
              ) {
                return;
              }
              return (
                <ContentRow
                  key={item.order}
                  classesContainer='content__row'
                  classesLabel='label'
                  classesText='text'
                  label={item.label}
                  text={item.text}
                />
              );
            })}
        </div>
        {auditorData.photo ? (
          <ContentImage
            classes='content__img'
            src={auditorData.photo}
            alt={auditorData.fullName}
          />
        ) : (
          <ContentImage
            classes='content__img'
            src={imageIcon}
            alt={t('content_auditor.default_alt_text')}
          />
        )}
      </div>
    </div>
  );
};

export default ContentAuditorWidget;
