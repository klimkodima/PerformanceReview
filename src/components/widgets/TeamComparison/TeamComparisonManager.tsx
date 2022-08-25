import { ReactElement, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { CommonTable } from 'src/components/common';
import { selectCheckedTeams, selectFilteredTeams } from 'src/store/Filter';
import { HEAD_CELL_NAMES } from 'src/components/common/CommonTable/constants';
import { selectPickedDate } from 'src/store/DateFilter';
import { headCells, headerName, PLACEHOLDER_TEXT } from './constants';
import { useTeamComparison } from './hooks';

const { nameColumn } = HEAD_CELL_NAMES;

const TeamComparisonManager = (): ReactElement => {
  const pickedDate = useSelector(selectPickedDate);
  const checkedTeams = useSelector(selectCheckedTeams);
  const filteredTeams = useSelector(selectFilteredTeams);

  const { teamsRows } = useTeamComparison(pickedDate);

  const [filteredTeamsRows, setFilteredTeamsRows] = useState(teamsRows);

  useEffect(() => {
    setFilteredTeamsRows(
      teamsRows.filter(({ name }) =>
        filteredTeams.length > 0
          ? checkedTeams.includes(name) && filteredTeams.includes(name)
          : checkedTeams.includes(name)
      )
    );
  }, [checkedTeams, filteredTeams, teamsRows]);

  const placeholderText = filteredTeamsRows.length ? '' : PLACEHOLDER_TEXT;
  return (
    <div id='team-comparison-widget'>
      <CommonTable
        data={filteredTeamsRows}
        headCells={headCells}
        headerName={headerName}
        defaultOrderBy={nameColumn}
        checkedTeams={checkedTeams}
        isTeamComparisonLead={false}
        placeholderText={placeholderText}
      />
    </div>
  );
};

export default TeamComparisonManager;
