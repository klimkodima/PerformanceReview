import { ReactElement, useEffect } from 'react';

import { t } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';

import InfoIcon from '@mui/icons-material/Info';

import { InfoTooltip } from 'src/components/common';
import { selectPickedDate } from 'src/store/DateFilter';
import { fetchCriteria, selectCriteria } from 'src/store/Criteria';
import { getValueType } from './helpers';

import { CriteriaListItemType } from './types';

import './CriteriaWidgets.scss';

const CriteriaWidgets = (): ReactElement => {
  const dispatch = useDispatch();
  const pickedDate = useSelector(selectPickedDate);
  const criteriaData = useSelector(selectCriteria);

  const criteriaWidgetsTitles: string[] = [
    'averagePerformance',
    'averageValidity',
    'hoursCorrespondence',
    'supportAndAuditsTime'
  ];

  const criteriaWidgetData: CriteriaListItemType[] = [];
  for (const key in criteriaData) {
    if (criteriaWidgetsTitles.includes(key)) {
      const isCorrespondence = key === 'hoursCorrespondence';
      const widgetValue: number =
        typeof criteriaData[key] === 'number'
          ? criteriaData[key]
          : criteriaData[key].value;

      criteriaWidgetData.push({
        title: t(`criteria_widgets.${key}`),
        infoText: t(`criteria_widgets.info_text_${key}`),
        widgetValue,
        isCorrespondence
      });
    }
  }

  useEffect(() => {
    dispatch(fetchCriteria());
  }, [pickedDate]);

  return (
    <div className='criteria-container' data-testid='criteria-container'>
      {criteriaWidgetData.map(
        ({
          title,
          infoText,
          widgetValue,
          isCorrespondence
        }: CriteriaListItemType) => (
          <div
            key={title}
            className='criteria-item'
            data-testid='criteria-item'
          >
            <div className='criteria-item__title-block'>
              <span
                className='criteria-item__title'
                data-testid='criteria-item-title'
              >
                {title}
              </span>
              <InfoTooltip
                title={infoText}
                icon={
                  <InfoIcon
                    className='criteria-item__icon'
                    color='primary'
                    data-testid='criteria-item-info-icon'
                  />
                }
              />
            </div>
            <span
              className='criteria-item-statistic'
              data-testid='criteria-item-statistic'
            >
              {widgetValue}
              {getValueType(title, widgetValue)}
            </span>
            {isCorrespondence && (
              <div
                className='criteria-item-smile'
                data-testid='criteria-item-smile'
              >
                <p style={{ display: 'none' }} className='tooltip-text'>
                  {criteriaData.hoursCorrespondence.tooltipText}
                </p>
                <InfoTooltip
                  title={criteriaData.hoursCorrespondence.tooltipText}
                  icon={
                    <img
                      data-testid='criteria-item-tooltip'
                      src={criteriaData.hoursCorrespondence.icon}
                      alt='icon'
                    />
                  }
                />
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default CriteriaWidgets;
