import { ReactElement, memo } from 'react';

import { useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { Button } from '@mui/material';

import { FilterList } from '../FilterList';

import { reset } from 'src/store/Filter/reducer';
import { useTypedSelector } from '../hooks/useTypedSelector';

import { FilterPropsType } from '../types';

import './Filter.scss';

const Filter = memo(
  ({
    levelFilter,
    teamFilter,
    auditorFilter
  }: FilterPropsType): ReactElement => {
    const { t } = useTranslation();
    const {
      filteredTeams,
      filteredLevels,
      filteredAuditors,
      checkedTeams,
      checkedLevels,
      checkedAuditors,
      isDisabledReset
    } = useTypedSelector((state) => state.filter);

    const dispatch = useDispatch();

    return (
      <div className='filter'>
        <div className='filter__wrapper'>
          <div className='filter__header'>
            <h3 className='filter__title'>{t('filter.filters_title_text')}</h3>
            <Button
              className='clear-button'
              onClick={() => dispatch(reset())}
              disabled={isDisabledReset}
            >
              {t('filter.clear_button_text')}
            </Button>
          </div>
          <div>
            <FilterList
              title={t('filter.team')}
              filter={teamFilter}
              filteredData={filteredTeams}
              checkedItems={checkedTeams}
            />
            <FilterList
              title={t('filter.level')}
              filter={levelFilter}
              filteredData={filteredLevels}
              checkedItems={checkedLevels}
            />
            <FilterList
              title={t('filter.auditor')}
              filter={auditorFilter}
              filteredData={filteredAuditors}
              checkedItems={checkedAuditors}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default Filter;

Filter.displayName = 'Filter';
