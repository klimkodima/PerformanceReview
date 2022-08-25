import { ReactElement, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { checkResetEnabled, setFilteredAuditorsData } from 'src/store/Filter';
import Filter from './Filter';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { getAuditors } from '../helpers/functions';

import { AuditorType } from 'src/store/Filter/types';

const FilterContainer = (): ReactElement => {
  const dispatch = useDispatch();
  const { data, searchedAuditors, isShowFilter } = useTypedSelector(
    (state) => state.filter
  );

  const teams: string[] = Array.from(
    new Set(data.map(({ team }: AuditorType) => team))
  );

  const levels: string[] = Array.from(
    new Set(data.map(({ level }: AuditorType) => level))
  );

  const auditors = getAuditors(searchedAuditors, data);

  useEffect(() => {
    dispatch(checkResetEnabled());
    dispatch(setFilteredAuditorsData());
  }, [data]);

  if (isShowFilter) {
    return (
      <Filter
        teamFilter={teams}
        levelFilter={levels}
        auditorFilter={auditors}
      />
    );
  } else {
    return <></>;
  }
};

export default FilterContainer;
